export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
};
