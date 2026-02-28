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
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-glow admin-dashboard-glow--left" />
      <div className="admin-dashboard-glow admin-dashboard-glow--right" />

      <div className="container admin-dashboard-shell">
        <header className="admin-dashboard-header">
          <div>
            <span className="admin-kicker">لوحة التحكم</span>
            <h1>إدارة شبكة أخبار سوريا الحرة</h1>
            <p>من هنا يمكنك متابعة الأخبار الحالية وإدارة المحتوى المنشور.</p>
          </div>

          <div className="admin-dashboard-actions">
            <Link href="/" className="admin-outline-button">
              عرض الموقع
            </Link>
          </div>
        </header>

        <section className="admin-stats-grid">
          <article className="admin-stat-card">
            <span>إجمالي الأخبار</span>
            <strong>{articles.length}</strong>
          </article>

          <article className="admin-stat-card">
            <span>الأخبار المنشورة</span>
            <strong>{publishedCount}</strong>
          </article>

          <article className="admin-stat-card">
            <span>المسودات</span>
            <strong>{draftCount}</strong>
          </article>

          <article className="admin-stat-card">
            <span>الأخبار المميزة</span>
            <strong>{featuredCount}</strong>
          </article>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>آخر الأخبار</h2>
              <p>قائمة الأخبار الحالية داخل النظام</p>
            </div>
          </div>

          {articles.length > 0 ? (
            <div className="admin-articles-list">
              {articles.map((article) => (
                <article key={article.id} className="admin-article-card">
                  <div className="admin-article-top">
                    <div>
                      <h3>{article.title || 'بدون عنوان'}</h3>
                      <div className="admin-article-meta">
                        <span>{article.category || 'عام'}</span>
                        <span>{article.slug || 'بدون رابط'}</span>
                      </div>
                    </div>

                    <div className="admin-badges">
                      {article.is_published ? (
                        <span className="admin-badge admin-badge--published">منشور</span>
                      ) : (
                        <span className="admin-badge admin-badge--draft">مسودة</span>
                      )}

                      {article.is_featured ? (
                        <span className="admin-badge admin-badge--featured">مميز</span>
                      ) : null}
                    </div>
                  </div>

                  <p>{shorten(article.excerpt || article.content, 180)}</p>

                  <div className="admin-article-actions">
                    <Link href={`/news/${article.slug}`} className="admin-outline-button">
                      عرض
                    </Link>

                    <Link href={`/admin/articles/${article.id}/edit`} className="admin-main-button">
                      تعديل
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <h3>لا توجد أخبار داخل النظام</h3>
              <p>بعد إضافة أو جلب أخبار جديدة، ستظهر هنا مباشرة.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}