import Link from 'next/link';
import { formatArabicDate } from '@/lib/utils';
import { Article } from '@/lib/types';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="newsletter-card fade-in">
      <div className="newsletter-card__header">
        <div>
          <div className="author-row">
            <h3>{article.title}</h3>
            <span className="verified-badge">✓</span>
          </div>
          <small>{article.category || 'قسم الأخبار'}</small>
        </div>
        <time>{formatArabicDate(article.created_at)}</time>
      </div>

      <p>{article.excerpt || '—'}</p>

      <div className="card-link-row">
        <Link href={`/news/${article.slug}`} className="news-read-link">
          قراءة الخبر
        </Link>
      </div>
    </article>
  );
}