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

  return (
    <>
      <SiteHeader />

      <main className="container section-space">
        <div id="latest" className="section-title">
          <h2>آخر الأخبار</h2>
          <div className="section-line" />
        </div>

        <div className="news-stack">
          {articles.length > 0 ? (
            articles.map((article) => <ArticleCard key={article.id} article={article} />)
          ) : (
            <article className="newsletter-card fade-in">
              <div className="newsletter-card__header">
                <div>
                  <div className="author-row">
                    <h3>إدارة التحرير</h3>
                    <span className="verified-badge">✓</span>
                  </div>
                  <small>@SyriaFreeNews</small>
                </div>
                <time>الآن</time>
              </div>
              <p>لا توجد أخبار منشورة بعد. ستظهر الأخبار هنا تلقائيًا بعد نشرها من لوحة التحكم.</p>
            </article>
          )}
        </div>
      </main>

      <footer id="platforms" className="site-footer">
        <div className="container footer-inner">
          <div className="footer-social-box">
            <h3>⭐ لمتابعتنا عبر حساباتنا الرسمية على مواقع التواصل الاجتماعي</h3>
            <div className="social-links social-links--footer">
              <a href="http://telegram.me/ALMHARAR" target="_blank" rel="noreferrer">
                <span>تليجرام</span>
              </a>
              <a href="https://www.facebook.com/networkmoharar" target="_blank" rel="noreferrer">
                <span>فيسبوك</span>
              </a>
              <a href="https://twitter.com/networkmoharar" target="_blank" rel="noreferrer">
                <span>إكس</span>
              </a>
              <a href="https://youtube.com/channel/UCFm-Fy_6kb9F-al0F53LjHQ" target="_blank" rel="noreferrer">
                <span>يوتيوب</span>
              </a>
              <a
                href="https://www.tiktok.com/@abomahmudalhalaby?_t=8r0L1CRiCLw&_r=1"
                target="_blank"
                rel="noreferrer"
              >
                <span>تيك توك</span>
              </a>
              <a href="https://whatsapp.com/channel/0029Va9oCqMBadmbK22OTv3F" target="_blank" rel="noreferrer">
                <span>واتساب</span>
              </a>
            </div>
          </div>
          <p>© 2026 شبكة أخبار سوريا الحرة. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </>
  );
}