// components/article-card.tsx
import Link from "next/link";

type Article = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  created_at?: string | null;
  source_url?: string | null;
};

export function ArticleCard({ article }: { article: Article }) {
  const href = article?.slug ? `/news/${article.slug}` : "#";

  return (
    <article className="card">
      <header className="cardHeader">
        <Link href={href} className="cardTitleLink">
          <h2 className="cardTitle">{article.title ?? "خبر"}</h2>
        </Link>
      </header>

      {article.excerpt ? (
        <p className="cardExcerpt">{article.excerpt}</p>
      ) : (
        <p className="cardExcerpt cardMuted">لا يوجد ملخص.</p>
      )}

      <footer className="cardFooter">
        <span className="cardMeta">
          {article.created_at
            ? new Date(article.created_at).toLocaleString("ar")
            : ""}
        </span>

        <div className="cardActions">
          <Link href={href} className="cardBtn">
            قراءة الخبر
          </Link>

          {article.source_url ? (
            <a
              className="cardBtnSecondary"
              href={article.source_url}
              target="_blank"
              rel="noreferrer"
              title="رابط المصدر"
            >
              المصدر
            </a>
          ) : null}
        </div>
      </footer>
    </article>
  );
}