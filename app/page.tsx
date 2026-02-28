import { ArticleCard } from '@/components/article-card';
import { SiteHeader } from '@/components/site-header';
import { getPublishedArticles } from '@/lib/data';

export const revalidate = 0;

function isValidArticle(article: any) {
  if (!article) return false;

  const title = typeof article.title === 'string' ? article.title.trim() : '';
  const slug = typeof article.slug === 'string' ? article.slug.trim() : '';
  const excerpt = typeof article.excerpt === 'string' ? article.excerpt.trim() : '';

  if (!title || !slug) return false;

  const badText = `${title} ${excerpt}`.toLowerCase();

  return !(
    badText.includes('application error') ||
    badText.includes('client-side exception') ||
    badText.includes('server-side exception') ||
    badText.includes('اسم المستخدم') ||
    badText.includes('كلمة المرور') ||
    badText.includes('login') ||
    badText.includes('admin')
  );
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
              {featured?.excerpt ||
                'تغطية إخبارية شاملة لأحدث التطورات والأخبار، مع عرض منظم وواضح للمحتوى المنشور.'}
            </p>
          </div>
        </section>

        <section id="latest">
          <h2 className="section-title">آخر الأخبار</h2>
          <div className="grid">
            {articles.length > 0 ? (
              articles.map((article) => <ArticleCard key={article.id} article={article} />)
            ) : (
              <div className="panel">
                <h3>لا توجد أخبار منشورة بعد</h3>
                <p className="note">ستظهر الأخبار هنا تلقائيًا بعد النشر من لوحة التحكم.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer container">
        © 2026 شبكة أخبار سوريا الحرة
      </footer>
    </>
  );
}
