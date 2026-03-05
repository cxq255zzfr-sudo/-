export type TelegramPost = {
  externalId: string;
  url: string;
  dateISO: string | null;
  text: string;
  imageUrl: string | null;
};

function cleanText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export async function fetchTelegramPosts(
  channel: string,
  limit = 10
): Promise<TelegramPost[]> {
  const url = `https://t.me/s/${channel}`;

  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      'accept-language': 'ar,en;q=0.8',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Telegram channel: ${res.status}`);
  }

  const html = await res.text();
  const parts = html.split('class="tgme_widget_message_wrap');
  const posts: TelegramPost[] = [];

  for (let i = 1; i < parts.length && posts.length < limit; i++) {
    const chunk = parts[i];

    const idMatch =
      chunk.match(/data-post="[^"]+\/(\d+)"/) ||
      chunk.match(new RegExp(`${channel}\/(\\d+)`));

    const externalId = idMatch?.[1];
    if (!externalId) continue;

    const postUrl = `https://t.me/${channel}/${externalId}`;

    const dateMatch = chunk.match(/datetime="([^"]+)"/);
    const dateISO = dateMatch?.[1] ?? null;

    const textMatch = chunk.match(
      /class="tgme_widget_message_text[^"]*">([\s\S]*?)<\/div>/
    );
    const text = cleanText(textMatch?.[1] ?? '');

    const imgMatch =
      chunk.match(/<img[^>]+src="([^"]+)"[^>]*>/) ||
      chunk.match(/background-image:url\('([^']+)'\)/);

    const imageUrl = imgMatch?.[1] ?? null;

    if (!text && !imageUrl) continue;

    posts.push({
      externalId,
      url: postUrl,
      dateISO,
      text,
      imageUrl,
    });
  }

  return posts;
}

export function buildTelegramTitle(text: string) {
  const firstLine = text.split('\n').find(Boolean)?.trim() || 'خبر جديد';
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}...` : firstLine;
}

export function buildTelegramExcerpt(text: string) {
  const value = text.replace(/\s+/g, ' ').trim();
  return value.length > 260 ? `${value.slice(0, 257)}...` : value;
}

export function slugifyArabic(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}