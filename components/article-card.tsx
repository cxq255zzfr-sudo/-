import Link from 'next/link';
import { formatArabicDate } from '@/lib/utils';
import { Article } from '@/lib/types';

function isValidImageUrl(url?: string | null) {
  return typeof url === 'string' && url.trim().length > 0;
}

export function ArticleCard({ article }: { article: Article }) {
  const hasImage = isValidImageUrl(article.image_url);

  return (
    <article className="card">
      {hasImage ? (
        <img
          src={article.image_url!}
          alt={article.title}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="card-image" />
      )}

      <div className="card-body">
        <span className="badge">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
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