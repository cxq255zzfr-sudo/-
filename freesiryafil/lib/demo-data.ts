import { Article } from './types';

export const demoArticles: Article[] = [
  {
    id: 'demo-1',
    title: 'انطلاق النسخة الأولية لموقع شبكة أخبار سوريا الحرة',
    slug: 'launch-free-syria-news-net',
    excerpt: 'هذه بيانات تجريبية تظهر إلى أن يتم ربط Supabase وإضافة الأخبار الحقيقية من لوحة التحكم.',
    body: 'هذه نسخة أولية حقيقية من الموقع. بعد ربط Supabase ستستطيع إضافة الأخبار وتعديلها وحذفها من لوحة التحكم مباشرة، وستظهر هنا تلقائيًا.',
    category: 'محلي',
    image_url: null,
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'demo-2',
    title: 'لوحة التحكم جاهزة للإدارة بعد الإعداد',
    slug: 'admin-ready-after-setup',
    excerpt: 'يمكن للمشرف تسجيل الدخول وإدارة الأخبار بعد إضافة متغيرات البيئة وإنشاء قاعدة البيانات.',
    body: 'بعد إضافة متغيرات البيئة في Vercel وإنشاء الجداول من ملف SQL المرفق، ستصبح اللوحة تعمل بشكل حقيقي لإدارة الأخبار.',
    category: 'تقني',
    image_url: null,
    is_featured: false,
    is_published: true,
    created_at: new Date(Date.now() - 3600 * 1000).toISOString()
  }
];
