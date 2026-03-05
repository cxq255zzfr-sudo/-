// lib/data.ts
import { supabaseAdmin } from "@/lib/supabase-admin";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  source_url: string | null;
  channel_username: string | null;
  message_id: number | null;
  created_at: string | null;
  is_published: boolean | null;
};

const TABLE = "articles";

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!slug) return null;

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return null;
  return (data ?? null) as Article | null;
}