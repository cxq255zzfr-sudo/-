import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { getAllArticles } from '@/lib/data';
import { hasSupabase } from '@/lib/supabase';
import { createArticleAction, deleteArticleAction, logoutAction, togglePublishAction } from './actions';
import { formatArabicDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ success?: string; error?: string; notice?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const articles = await getAllArticles();

  return (
    <main className="container admin-shell">
      <aside className="panel">
        <div className="row-between">
          <h2>إدارة الأخبار</h2>
          <form action={logoutAction}><button type="submit" className="secondary">خروج</button></form>
        </div>
        <p className="note">من هنا تبدأ النسخة الأولية الحقيقية: إضافة خبر، تعديل، حذف، ونشر.</p>
        {!hasSupabase() ? (
          <div className="setup-note" style={{ marginTop: 0 }}>
            اللوحة تحتاج ربط Supabase حتى تعمل الحفظ الحقيقي. إلى أن يتم ذلك، سترى بيانات تجريبية فقط.
          </div>
        ) : null}
        {params.success ? <div className="success">تم تنفيذ العملية بنجاح.</div> : null}
        {params.notice ? <div className="error">أكمل إعداد Supabase أولًا.</div> : null}
        {params.error ? <div className="error">{decodeURIComponent(params.error)}</div> : null}
        <form action={createArticleAction} className="form-grid" style={{ marginTop: 16 }}>
          <label>
            عنوان الخبر
            <input name="title" required />
          </label>
          <label>
            ملخص قصير
            <textarea name="excerpt" required />
          </label>
          <label>
            نص الخبر
            <textarea name="body" required style={{ minHeight: 220 }} />
          </label>
          <label>
            التصنيف
            <select name="category" defaultValue="محلي">
              <option>محلي</option>
              <option>سياسي</option>
              <option>أمني</option>
              <option>اقتصاد</option>
              <option>منوع</option>
              <option>تقني</option>
            </select>
          </label>
          <label>
            صورة الخبر
            <input type="file" name="image" accept="image/*" />
          </label>
          <label><input type="checkbox" name="is_featured" /> خبر مميز</label>
          <label><input type="checkbox" name="is_published" defaultChecked /> منشور</label>
          <button type="submit">إضافة خبر</button>
        </form>
      </aside>

      <section className="panel">
        <div className="row-between">
          <h3>الأخبار الحالية</h3>
          <Link href="/" className="button secondary">مشاهدة الموقع</Link>
        </div>
        <div className="table-list">
          {articles.map((article) => (
            <div key={article.id} className="table-item">
              <div className="row-between">
                <strong>{article.title}</strong>
                <span className="badge">{article.is_published ? 'منشور' : 'مسودة'}</span>
              </div>
              <div className="note">{article.excerpt}</div>
              <div className="meta">{article.category} • {formatArabicDate(article.created_at)}</div>
              <div className="row">
                <Link className="button secondary" href={`/admin/articles/${article.id}/edit`}>تعديل</Link>
                <form action={togglePublishAction}>
                  <input type="hidden" name="id" value={article.id} />
                  <input type="hidden" name="nextState" value={String(!article.is_published)} />
                  <button type="submit" className="secondary">{article.is_published ? 'إخفاء' : 'نشر'}</button>
                </form>
                <form action={deleteArticleAction}>
                  <input type="hidden" name="id" value={article.id} />
                  <button type="submit" className="secondary">حذف</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
