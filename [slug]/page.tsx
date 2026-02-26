import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { getArticleBySlug } from '@/lib/data';
import { formatArabicDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <SiteHeader />
      <main className="container">
        <article className="article-page">
          <div className="row-between">
            <span className="badge">{article.category}</span>
            <span className="meta">{formatArabicDate(article.created_at)}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="note">{article.excerpt}</p>
          {article.image_url && <Image src={article.image_url} alt={article.title} width={1200} height={720} className="cover" />}
          <div className="article-content">{article.body}</div>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="button secondary">العودة للرئيسية</Link>
          </div>
        </article>
      </main>
    </>
  );
}
