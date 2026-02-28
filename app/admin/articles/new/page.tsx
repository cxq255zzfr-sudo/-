import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { createArticleAction } from '@/app/admin/actions';

export default async function NewArticlePage() {
  await requireAdmin();

  return (
    <main className="container" style={{ padding: '32px 0 48px' }}>
      <div className="panel" style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="row-between">
          <h2>إضافة خبر جديد</h2>
          <Link href="/admin" className="button secondary">العودة للوحة</Link>
        </div>
        <form action={createArticleAction} className="form-grid" style={{ marginTop: 18 }}>
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
            <textarea name="body" required style={{ minHeight: 260 }} />
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
          <button type="submit">حفظ الخبر</button>
        </form>
      </div>
    </main>
  );
}
