# شبكة أخبار سوريا الحرة — النسخة الأولية الحقيقية

هذه نسخة **Next.js + Supabase + Vercel** فيها:
- صفحة رئيسية عامة
- صفحة تفاصيل خبر
- لوحة دخول للإدارة
- لوحة تحكم أولية حقيقية لإضافة الأخبار وتعديلها وحذفها ونشرها
- رفع صورة للخبر إلى Supabase Storage

## 1) تشغيل محليًا
```bash
npm install
npm run dev
```

## 2) إنشاء قاعدة البيانات في Supabase
1. أنشئ مشروعًا جديدًا في Supabase.
2. افتح **SQL Editor**.
3. انسخ محتوى الملف:
   - `sql/schema.sql`
4. نفّذه.

## 3) إنشاء Storage bucket للصور
في Supabase:
1. افتح **Storage**
2. أنشئ bucket باسم:
   - `news-images`
3. اجعله **Public**

## 4) متغيرات البيئة
أضف هذه القيم في ملف `.env.local` محليًا، أو في **Vercel > Project > Settings > Environment Variables**:

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_USER`
- `ADMIN_PASS`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

انسخ المثال من:
- `.env.example`

## 5) لوحة التحكم
- رابط الدخول: `/admin/login`
- بعد الدخول: `/admin`

## 6) ملاحظات مهمة
- `SUPABASE_SERVICE_ROLE_KEY` لا تضعه إلا في **Environment Variables**، ولا تضعه داخل ملفات الواجهة.
- إذا لم تضف متغيرات Supabase سيعمل الموقع ببيانات تجريبية فقط.
- هذه نسخة أولية حقيقية. المرحلة التالية يمكن أن تشمل:
  - إدارة التصنيفات بشكل مستقل
  - شريط عاجل
  - بحث
  - تعليقات
  - تعدد المستخدمين
