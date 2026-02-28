'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

function toSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\w-]/g, '')
    .replace(/-+/g, '-');
}

export async function createArticleAction(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const image_url = String(formData.get('image_url') || '').trim();
  const is_published = formData.get('is_published') === 'on';
  const is_featured = formData.get('is_featured') === 'on';

  if (!title) {
    throw new Error('العنوان مطلوب');
  }

  const slug = slugInput || toSlug(title);

  if (!slug) {
    throw new Error('تعذر إنشاء الرابط المختصر');
  }

  const supabase = getSupabase();

  const { error } = await supabase.from('articles').insert({
    title,
    slug,
    excerpt,
    category: category || 'عام',
    image_url: image_url || null,
    is_published,
    is_featured
  });

  if (error) {
    throw error;
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}