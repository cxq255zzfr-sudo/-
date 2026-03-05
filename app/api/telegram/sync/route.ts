// app/api/telegram/sync/route.ts
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { supabaseAdmin } from "@/lib/supabase-admin";

const CHANNEL = process.env.TELEGRAM_CHANNEL || "ALMHARAR";
const SOURCE_URL = `https://t.me/s/${CHANNEL}`;

function parseMessageId(permalink: string) {
  const idStr = permalink.split("/").pop() || "";
  const id = Number(idStr);
  return Number.isFinite(id) ? id : null;
}

function slugFromPermalink(permalink: string) {
  const msgId = parseMessageId(permalink);
  return `${CHANNEL.toLowerCase()}-${msgId ?? Date.now()}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.FETCH_SECRET || secret !== process.env.FETCH_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(SOURCE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: `Failed to fetch telegram page: ${res.status}` },
      { status: 500 }
    );
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const items: Array<{ permalink: string; text: string; dateISO: string }> = [];

  $(".tgme_widget_message_wrap").each((_, el) => {
    const wrap = $(el);
    const permalink = wrap.find("a.tgme_widget_message_date").attr("href") || "";
    const text = wrap.find(".tgme_widget_message_text").text().trim();
    const dateISO = wrap.find("time").attr("datetime") || new Date().toISOString();
    if (permalink && text) items.push({ permalink, text, dateISO });
  });

  const latest = items.slice(0, 20);

  let saved = 0;
  let firstError: any = null;

  for (const m of latest) {
    const message_id = parseMessageId(m.permalink);
    const slug = slugFromPermalink(m.permalink);
    const title = m.text.split("\n")[0].trim().slice(0, 120) || "خبر";
    const excerpt = m.text.replace(/\s+/g, " ").slice(0, 180);

    // ✅ مهم: جدولك يستخدم body وليس content
    const payload: any = {
      title,
      slug,
      excerpt,
      body: m.text, // ✅ هنا الحل
      source_url: m.permalink,
      channel_username: CHANNEL,
      message_id,
      created_at: m.dateISO,
      is_published: true,
    };

    const { error } = await supabaseAdmin
      .from("articles")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      if (!firstError) firstError = error;
      console.error("Supabase upsert error:", error);
      continue;
    }

    saved++;
  }

  return NextResponse.json({
    ok: true,
    fetched: latest.length,
    saved,
    firstError,
  });
}