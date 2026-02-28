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
              <p>لا توجد أخبار منشورة بعد. ستظهر الأخبار هنا تلقائيًا بعد النشر من لوحة التحكم.</p>
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
      </foo<footer id="platforms" className="site-footer">
  <div className="container footer-inner">
    <div className="footer-social-box">
      <h3>⭐ لمتابعتنا عبر حساباتنا الرسمية على مواقع التواصل الاجتماعي</h3>

      <div className="social-links social-links--footer">
        <a
          href="http://telegram.me/ALMHARAR"
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
          title="Telegram"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21.5 4.5 3.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.2c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.5.2 1.7-.9l3-14.1c.3-1.3-.5-1.9-1.3-1.6ZM9 13.7l9.5-6c.5-.3 1-.1.6.2l-7.8 7-.3 3.2-1.9-4.4Z" />
          </svg>
        </a>

        <a
          href="https://www.facebook.com/networkmoharar"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          title="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.4V11H7.5v3h2.7v8h3.3Z" />
          </svg>
        </a>

        <a
          href="https://twitter.com/networkmoharar"
          target="_blank"
          rel="noreferrer"
          aria-label="X"
          title="X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.4L6.3 22H3.2l7.3-8.4L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
          </svg>
        </a>

        <a
          href="https://youtube.com/channel/UCFm-Fy_6kb9F-al0F53LjHQ"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          title="YouTube"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23 12s0-3.1-.4-4.6c-.2-.8-.9-1.5-1.7-1.7C19.4 5.3 12 5.3 12 5.3s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.9 1 12 1 12s0 3.1.4 4.6c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.6.4-4.6ZM9.5 15.5v-7l6 3.5-6 3.5Z" />
          </svg>
        </a>

        <a
          href="https://www.tiktok.com/@abomahmudalhalaby?_t=8r0L1CRiCLw&_r=1"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          title="TikTok"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.6 2c.2 1.7 1.2 3.2 2.7 4.1 1 .6 2.1 1 3.3 1v3.1c-1.5 0-3-.4-4.3-1.1v6.2c0 3.6-2.9 6.5-6.5 6.5S5.3 18.9 5.3 15.3s2.9-6.5 6.5-6.5c.3 0 .6 0 .9.1v3.2a3.5 3.5 0 1 0 2.7 3.2V2h3.2Z" />
          </svg>
        </a>

        <a
          href="https://whatsapp.com/channel/0029Va9oCqMBadmbK22OTv3F"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3.5A11 11 0 0 0 3.7 17.2L2 22l4.9-1.6A11 11 0 1 0 20.5 3.5Zm-8.4 17c-1.8 0-3.5-.5-5-1.4l-.4-.2-2.9 1 .9-2.8-.2-.4a8 8 0 1 1 7.6 3.8Zm4.4-5.9c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.9-.2-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.1-.3.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.4-.2.2-.8.8-.8 2s.8 2.4.9 2.5c.1.2 1.7 2.7 4.2 3.7.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.3-.6 1.5-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
          </svg>
        </a>
      </div>
    </div>

    <p>© 2026 شبكة أخبار سوريا الحرة. جميع الحقوق محفوظة.</p>
  </div>
</footer>ter>
    </>
  );
}