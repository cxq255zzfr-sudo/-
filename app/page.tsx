import { ArticleCard } from '@/components/article-card';
import { SiteHeader } from '@/components/site-header';
import { getPublishedArticles } from '@/lib/data';

export const revalidate = 0;

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const featured = articles.find((article) => article.is_featured) ?? articles[0];

  return (
    <>
      <SiteHeader />

      <main className="container">
        <section className="hero">
          <div className="hero-card">
            <h2>{featured?.title ?? 'شبكة أخبار سوريا الحرة'}</h2>
            <p>
              هذه هي الواجهة العامة للموقع. يمكن من خلالها عرض الأخبار المنشورة، بينما تبقى لوحة
              التحكم مخصصة للإدارة فقط.
            </p>

            {featured ? (
              <div className="hero-actions">
                <a className="button" href={`/news/${featured.slug}`}>
                  قراءة الخبر المميز
                </a>
                <a className="button secondary" href="#latest">
                  الانتقال إلى آخر الأخبار
                </a>
              </div>
            ) : (
              <div className="hero-actions">
                <a className="button secondary" href="#latest">
                  عرض الأخبار
                </a>
              </div>
            )}
          </div>
        </section>

        <section id="latest" className="section">
          <div className="section-head">
            <h2>آخر الأخبار</h2>
            <p>جميع الأخبار المنشورة تظهر هنا تلقائيًا.</p>
          </div>

          {articles.length > 0 ? (
            <div className="grid">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>لا توجد أخبار منشورة بعد</h3>
              <p>بعد إضافة خبر من لوحة التحكم ونشره، سيظهر هنا مباشرة.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}