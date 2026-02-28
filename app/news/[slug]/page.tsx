import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/data';
import { formatArabicDate } from '@/lib/utils';

export default async function NewsArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="container" style={{ padding: '40px 0 60px' }}>
      <article className="article-page">
        <Link href="/" className="news-read-link">
          العودة إلى الرئيسية
        </Link>

        <h1 style={{ marginTop: '18px' }}>{article.title}</h1>

        <div className="meta" style={{ marginTop: '10px', marginBottom: '18px' }}>
          {article.category || 'قسم الأخبار'} — {formatArabicDate(article.created_at)}
        </div>

        {article.image_url ? (
          <img src={article.image_url} alt={article.title} className="cover" />
        ) : null}

        <div className="article-content">
          {article.excerpt || article.title}
        </div>
      </article>
    </main>
  );
}