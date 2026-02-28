'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { COOKIE_NAME, getAdminCredentials } from '@/lib/auth';
import { getSupabase, hasSupabase } from '@/lib/supabase';
import { slugify } from '@/lib/utils';

const TABLE = 'articles';
const BUCKET = 'news-images';

export async function loginAction(formData: FormData) {
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');
  const creds = getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    redirect('/admin/login?error=1');
  }

  const store = await cookies();
  store.set(COOKIE_NAME, 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  redirect('/admin');
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect('/');
}

async function uploadImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const supabase = getSupabase();
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || 'image/jpeg',
    upsert: false
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createArticleAction(formData: FormData) {
  if (!hasSupabase()) redirect('/admin?notice=setup');

  const title = String(formData.get('title') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const body = String(formData.get('body') || '').trim();
  const category = String(formData.get('category') || '').trim() || 'عام';
  const isFeatured = formData.get('is_featured') === 'on';
  const isPublished = formData.get('is_published') === 'on';
  const file = formData.get('image') as File | null;

  if (!title || !excerpt || !body) redirect('/admin?error=missing');

  const supabase = getSupabase();
  const imageUrl = await uploadImage(file);

  const { error } = await supabase.from(TABLE).insert({
    title,
    slug: slugify(title),
    excerpt,
    body,
    category,
    image_url: imageUrl,
    is_featured: isFeatured,
    is_published: isPublished
  });

  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=created');
}

export async function deleteArticleAction(formData: FormData) {
  if (!hasSupabase()) redirect('/admin?notice=setup');
  const id = String(formData.get('id') || '');
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=deleted');
}

export async function togglePublishAction(formData: FormData) {
  if (!hasSupabase()) redirect('/admin?notice=setup');
  const id = String(formData.get('id') || '');
  const nextState = String(formData.get('nextState') || '') === 'true';
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).update({ is_published: nextState }).eq('id', id);
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=toggled');
}

export async function updateArticleAction(formData: FormData) {
  if (!hasSupabase()) redirect('/admin?notice=setup');
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const body = String(formData.get('body') || '').trim();
  const category = String(formData.get('category') || '').trim() || 'عام';
  const currentImage = String(formData.get('current_image') || '').trim() || null;
  const isFeatured = formData.get('is_featured') === 'on';
  const isPublished = formData.get('is_published') === 'on';
  const file = formData.get('image') as File | null;

  const imageUrl = (await uploadImage(file)) ?? currentImage;
  const supabase = getSupabase();
  const { error } = await supabase
    .from(TABLE)
    .update({
      title,
      slug: slugify(title),
      excerpt,
      body,
      category,
      image_url: imageUrl,
      is_featured: isFeatured,
      is_published: isPublished
    })
    .eq('id', id);

  if (error) redirect(`/admin/articles/${id}/edit?error=${encodeURIComponent(error.message)}`);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=updated');
}
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