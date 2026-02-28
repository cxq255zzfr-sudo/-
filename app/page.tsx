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
            <div className="hero-copy">
              <span className="section-kicker">شبكة أخبار سوريا الحرة</span>
              <h2>{featured?.title ?? 'آخر الأخبار والتغطيات الموثوقة'}</h2>

              {featured?.excerpt ? (
                <p>{featured.excerpt}</p>
              ) : (
                <p>تغطية إخبارية حديثة مع عرض منظم للأخبار المنشورة.</p>
              )}

              <div className="hero-actions">
                {featured?.slug ? (
                  <a className="button" href={`/news/${featured.slug}`}>
                    قراءة الخبر
                  </a>
                ) : null}

                <a className="button secondary" href="#latest">
                  تصفح آخر الأخبار
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="platforms" className="section platforms-section">
          <div className="section-head">
            <h2>منصاتنا الرسمية</h2>
          </div>

          <div className="platform-links">
            <a href="http://telegram.me/ALMHARAR" target="_blank" rel="noreferrer">
              تليجرام
            </a>
            <a href="https://www.facebook.com/networkmoharar" target="_blank" rel="noreferrer">
              فيسبوك
            </a>
            <a href="https://twitter.com/networkmoharar" target="_blank" rel="noreferrer">
              إكس
            </a>
            <a href="https://youtube.com/channel/UCFm-Fy_6kb9F-al0F53LjHQ" target="_blank" rel="noreferrer">
              يوتيوب
            </a>
            <a
              href="https://www.tiktok.com/@abomahmudalhalaby?_t=8r0L1CRiCLw&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              تيك توك
            </a>
            <a href="https://whatsapp.com/channel/0029Va9oCqMBadmbK22OTv3F" target="_blank" rel="noreferrer">
              واتساب
            </a>
          </div>
        </section>

        <section id="latest" className="section">
          <div className="section-head">
            <h2>آخر الأخبار</h2>
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
              <p>ستظهر الأخبار هنا تلقائيًا بعد نشرها من لوحة التحكم.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}