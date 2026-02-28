import { ArticleCard } from '@/components/article-card';
import { SiteHeader } from '@/components/site-header';
import { getPublishedArticles } from '@/lib/data';

export const revalidate = 0;

function isValidArticle(article: any) {
  if (!article) return false;

  const title = typeof article.title === 'string' ? article.title.trim() : '';
  const excerpt = typeof article.excerpt === 'string' ? article.excerpt.trim() : '';
  const slug = typeof article.slug === 'string' ? article.slug.trim() : '';

  if (!title || !slug) return false;

  const badText = `${title} ${excerpt}`.toLowerCase();

  if (
    badText.includes('application error') ||
    badText.includes('client-side exception') ||
    badText.includes('server-side exception') ||
    badText.includes('اسم المستخدم') ||
    badText.includes('كلمة المرور')
  ) {
    return false;
  }

  return true;
}

export default async function HomePage() {
  const rawArticles = await getPublishedArticles();
  const articles = rawArticles.filter(isValidArticle);
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

            <div className="hero-actions">
              {featured?.slug ? (
                <a className="button" href={`/news/${featured.slug}`}>
                  قراءة الخبر المميز
                </a>
              ) : null}

              <a className="button secondary" href="#latest">
                الانتقال إلى آخر الأخبار
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
              <h3>لا توجد أخبار صالحة للعرض الآن</h3>
              <p>أضف خبرًا جديدًا من لوحة التحكم، ثم انشره ليظهر هنا.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}