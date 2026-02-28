'use server';

import { cookies } from 'next/headers';
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

export async function loginAction(formData: FormData) {
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '').trim();

  const adminUser = String(process.env.ADMIN_USER || '').trim();
  const adminPass = String(process.env.ADMIN_PASS || '').trim();

  if (!adminUser || !adminPass) {
    redirect('/admin/login?error=1');
  }

  if (username !== adminUser || password !== adminPass) {
    redirect('/admin/login?error=1');
  }

  const cookieStore = await cookies();

  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });

  redirect('/admin');
}

export async function updateArticleAction(formData: FormData) {
  const id = String(formData.get('id') || '').trim();
  const title = String(formData.get('title') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const image_url = String(formData.get('image_url') || '').trim();
  const is_published = formData.get('is_published') === 'on';
  const is_featured = formData.get('is_featured') === 'on';

  if (!id) {
    throw new Error('معرف الخبر مفقود');
  }

  if (!title) {
    throw new Error('العنوان مطلوب');
  }

  const slug = slugInput || toSlug(title);

  if (!slug) {
    throw new Error('تعذر إنشاء الرابط المختصر');
  }

  const supabase = getSupabase();

  const { error } = await supabase
    .from('articles')
    .update({
      title,
      slug,
      excerpt,
      category: category || 'عام',
      image_url: image_url || null,
      is_published,
      is_featured
    })
    .eq('id', id);

  if (error) {
    throw error;
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/news/${slug}`);
  revalidatePath(`/admin/articles/${id}/edit`);

  redirect('/admin?success=updated');
}