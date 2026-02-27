import { demoArticles } from './demo-data';
import { getSupabase, hasSupabase } from './supabase';
import { Article } from './types';

const TABLE = 'articles';

export async function getPublishedArticles(): Promise<Article[]> {
  if (!hasSupabase()) return demoArticles;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Article[];
}

export async function getAllArticles(): Promise<Article[]> {
  if (!hasSupabase()) return demoArticles;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!hasSupabase()) return demoArticles.find((item) => item.slug === slug) ?? null;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw error;
  return data as Article | null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!hasSupabase()) return demoArticles.find((item) => item.id === id) ?? null;

  const supabase = getSupabase();
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as Article | null;
}
