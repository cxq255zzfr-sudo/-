create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body text not null,
  category text not null default 'عام',
  image_url text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists articles_created_at_idx on public.articles (created_at desc);
create index if not exists articles_slug_idx on public.articles (slug);

insert into public.articles (title, slug, excerpt, body, category, is_featured, is_published)
values
(
  'أول خبر تجريبي',
  'first-demo-news',
  'هذا مثال على خبر أولي داخل القاعدة.',
  'بعد تشغيل النظام وربط Supabase، تستطيع حذف هذا الخبر وإضافة أخبارك الحقيقية من لوحة التحكم.',
  'محلي',
  true,
  true
)
on conflict (slug) do nothing;
