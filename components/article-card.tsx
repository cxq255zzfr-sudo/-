import Image from 'next/image';
import Link from 'next/link';
import { formatArabicDate } from '@/lib/utils';
import { Article } from '@/lib/types';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="newsletter-card fade-in">
      {article.image_url ? (
        <div style={{ marginBottom: '16px' }}>
          <Image
            src={article.image_url}
            alt={article.title}
            width={1200}
            height={675}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
              objectFit: 'cover'
            }}
          />
        </div>
      ) : null}

      <div className="newsletter-card__header">
        <div>
          <div className="author-row">
            <h3>{article.category || 'قسم الأخبار'}</h3>
            <span className="verified-badge">✓</span>
          </div>
          <small>@SyriaFreeNews</small>
        </div>
        <time>{formatArabicDate(article.created_at)}</time>
      </div>

      <p>{article.excerpt || article.title}</p>

      <div className="card-link-row">
        <Link href={`/news/${article.slug}`} className="news-read-link">
          قراءة الخبر
        </Link>
      </div>
    </article>
  );
}