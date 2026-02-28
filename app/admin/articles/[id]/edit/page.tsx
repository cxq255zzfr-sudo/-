import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { getArticleById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { updateArticleAction } from '@/app/admin/actions';

export default async function EditArticlePage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const query = await searchParams;
  const article = await getArticleById(id);

  if (!article) notFound();

  return (
    <main className="admin-shell">
      <div className="container">
        <header className="admin-topbar">
          <div>
            <h1>تعديل الخبر</h1>
            <p>عدّل بيانات الخبر ثم احفظ التغييرات.</p>
          </div>

          <div className="admin-topbar-actions">
            <Link href="/admin" className="admin-link-btn">
              العودة للوحة التحكم
            </Link>
          </div>
        </header>

        <article className="admin-card">
          {query.error ? <div className="admin-empty">{decodeURIComponent(query.error)}</div> : null}

          <form action={updateArticleAction} className="admin-form">
            <input type="hidden" name="id" value={article.id} />

            <label>
              <span>عنوان الخبر</span>
              <input name="title" defaultValue={article.title} required />
            </label>

            <label>
              <span>الرابط المختصر (slug)</span>
              <input name="slug" defaultValue={article.slug} />
            </label>

            <label>
              <span>المقتطف</span>
              <textarea name="excerpt" defaultValue={article.excerpt || ''} rows={6} />
            </label>

            <label>
              <span>التصنيف</span>
              <input name="category" defaultValue={article.category || 'عام'} />
            </label>

            <label>
              <span>رابط الصورة</span>
              <input
                name="image_url"
                type="text"
                defaultValue={article.image_url || ''}
                placeholder="https://..."
              />
            </label>

            <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="checkbox" name="is_featured" defaultChecked={article.is_featured} />
              <span>خبر مميز</span>
            </label>

            <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="checkbox" name="is_published" defaultChecked={article.is_published} />
              <span>منشور</span>
            </label>

            <div className="admin-actions">
              <button type="submit" className="admin-btn primary">
                حفظ التعديلات
              </button>

              <Link href="/admin" className="admin-link-btn">
                إلغاء
              </Link>
            </div>
          </form>
        </article>
      </div>
    </main>
  );
}