import Image from 'next/image';
import Link from 'next/link';
import { formatArabicDate } from '@/lib/utils';
import { Article } from '@/lib/types';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card">
      {article.image_url ? (
        <Image
          src={article.image_url}
          alt={article.title}
          width={640}
          height={360}
          className="card-image"
        />
      ) : (
        <div className="card-image" />
      )}

      <div className="card-body">
        <span className="badge">{article.category || 'عام'}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt || '—'}</p>
        <div className="meta">{formatArabicDate(article.created_at)}</div>
        <div className="card-actions">
          <Link className="button secondary" href={`/news/${article.slug}`}>
            قراءة الخبر
          </Link>
        </div>
      </div>
    </article>
  );
}
