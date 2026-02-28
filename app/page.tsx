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
            <span className="badge">خبر مميز</span>
            <h2>{featured?.title ?? 'شبكة أخبار سوريا الحرة'}</h2>
            <p>
              تغطية إخبارية حديثة، واجهة نظيفة، وأخبار منشورة تظهر تلقائيًا من لوحة التحكم.
            </p>

            <div className="hero-actions">
              {featured?.slug ? (
                <a className="button" href={`/news/${featured.slug}`}>
                  قراءة الخبر المميز
                </a>
              ) : null}

              <a className="button secondary" href="#latest">
                تصفح آخر الأخبار
              </a>
            </div>
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