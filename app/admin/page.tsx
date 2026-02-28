import Link from 'next/link';
import { getAllArticles } from '@/lib/data';

function safeCount(items: any[], fn: (item: any) => boolean) {
  return items.filter(fn).length;
}

function shorten(text?: string | null, max = 140) {
  if (!text) return '—';
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export default async function AdminDashboardPage() {
  const articles = await getAllArticles();

  const publishedCount = safeCount(articles, (item) => item?.is_published);
  const draftCount = safeCount(articles, (item) => !item?.is_published);
  const featuredCount = safeCount(articles, (item) => item?.is_featured);

  return (
    <main className="admin-shell">
      <div className="container">
        <header className="admin-topbar">
          <div>
            <h1>لوحة التحكم</h1>
            <p>من هنا يمكنك متابعة الأخبار الحالية وإدارة المحتوى المنشور.</p>
          </div>

          <div className="admin-topbar-actions">
            <Link href="/admin/articles/new" className="admin-link-btn primary">
              إضافة خبر
            </Link>

            <Link href="/" className="admin-link-btn">
              عرض الموقع
            </Link>
          </div>
        </header>

        <section className="admin-grid">
          <div className="admin-split">
            <article className="admin-card">
              <h3>إجمالي الأخبار</h3>
              <p className="admin-muted">{articles.length}</p>
            </article>

            <article className="admin-card">
              <h3>الأخبار المنشورة</h3>
              <p className="admin-muted">{publishedCount}</p>
            </article>

            <article className="admin-card">
              <h3>المسودات</h3>
              <p className="admin-muted">{draftCount}</p>
            </article>

            <article className="admin-card">
              <h3>الأخبار المميزة</h3>
              <p className="admin-muted">{featuredCount}</p>
            </article>
          </div>

          <article className="admin-card">
            <h2>آخر الأخبار</h2>
            <p>قائمة الأخبار الحالية داخل النظام</p>

            {articles.length > 0 ? (
              <div className="admin-grid">
                {articles.map((article) => (
                  <article key={article.id} className="admin-card">
                    <h3>{article.title || 'بدون عنوان'}</h3>

                    <p className="admin-muted">
                      {article.category || 'عام'} — {article.slug || 'بدون رابط'}
                    </p>

                    <div className="admin-actions" style={{ margin: '12px 0' }}>
                      {article.is_published ? (
                        <span className="admin-badge">منشور</span>
                      ) : (
                        <span className="admin-badge">مسودة</span>
                      )}

                      {article.is_featured ? (
                        <span className="admin-badge">مميز</span>
                      ) : null}
                    </div>

                    <p>{shorten(article.excerpt, 180)}</p>

                    <div className="admin-actions" style={{ marginTop: '14px' }}>
                      <Link href={`/news/${article.slug}`} className="admin-link-btn">
                        عرض
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="admin-empty">
                لا توجد أخبار داخل النظام الآن.
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}