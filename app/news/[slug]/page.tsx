// app/news/[slug]/page.tsx
import { getArticleBySlug } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) return notFound();
  if (article.is_published === false) return notFound();

  const content =
    (article as any).body ??
    (article as any).content ??
    (article as any).details ??
    (article as any).text ??
    "";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold leading-snug">{article.title}</h1>

      <div className="mt-2 text-sm opacity-70">
        {article.created_at ? new Date(article.created_at).toLocaleString("ar") : ""}
      </div>

      <article className="prose prose-zinc mt-6 max-w-none">
        <div style={{ whiteSpace: "pre-wrap" }}>
          {content || "لا يوجد نص تفصيلي لهذا الخبر."}
        </div>
      </article>
    </main>
  );
}