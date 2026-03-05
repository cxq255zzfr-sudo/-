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
    <main className="container" style={{ padding: '32px 0 48px' }}>
      <div className="panel" style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="row-between">
          <h2>تعديل الخبر</h2>
          <Link href="/admin" className="button secondary">العودة للوحة</Link>
        </div>
        {query.error ? <div className="error">{decodeURIComponent(query.error)}</div> : null}
        <form action={updateArticleAction} className="form-grid" style={{ marginTop: 18 }}>
          <input type="hidden" name="id" value={article.id} />
          <input type="hidden" name="current_image" value={article.image_url ?? ''} />
          <label>
            عنوان الخبر
            <input name="title" defaultValue={article.title} required />
          </label>
          <label>
            ملخص قصير
            <textarea name="excerpt" defaultValue={article.excerpt} required />
          </label>
          <label>
            نص الخبر
            <textarea name="body" defaultValue={article.body} required style={{ minHeight: 260 }} />
          </label>
          <label>
            التصنيف
            <select name="category" defaultValue={article.category}>
              <option>محلي</option>
              <option>سياسي</option>
              <option>أمني</option>
              <option>اقتصاد</option>
              <option>منوع</option>
              <option>تقني</option>
            </select>
          </label>
          <label>
            استبدال صورة الخبر
            <input type="file" name="image" accept="image/*" />
          </label>
          <label><input type="checkbox" name="is_featured" defaultChecked={article.is_featured} /> خبر مميز</label>
          <label><input type="checkbox" name="is_published" defaultChecked={article.is_published} /> منشور</label>
          <button type="submit">حفظ التعديلات</button>
        </form>
      </div>
    </main>
  );
}
