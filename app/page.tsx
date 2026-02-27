import { ArticleCard } from '@/components/article-card';
import { SiteHeader } from '@/components/site-header';
import { getPublishedArticles } from '@/lib/data';
import { hasSupabase } from '@/lib/supabase';

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
              هذه النسخة الأولية الحقيقية مهيأة لتعمل مع Supabase وVercel. يمكن للإدارة تسجيل الدخول، إضافة الأخبار،
              تعديلها، حذفها، ونشرها لتظهر مباشرة في الصفحة الرئيسية.
            </p>
            {!hasSupabase() && (
              <div className="setup-note">
                الموقع يعمل الآن ببيانات تجريبية فقط. بعد إضافة متغيرات البيئة وإنشاء الجداول من ملف SQL ستتحول لوحة
                التحكم إلى إدارة حقيقية كاملة للأخبار.
              </div>
            )}
          </div>
        </section>

        <section id="latest">
          <h2 className="section-title">آخر الأخبار</h2>
          <div className="grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>
      <footer className="footer container">© شبكة أخبار سوريا الحرة</footer>
    </>
  );
}
