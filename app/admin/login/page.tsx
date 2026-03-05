import Link from 'next/link';
import { loginAction } from '../actions';

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="container center-box">
      <div className="panel">
        <h2>دخول الإدارة</h2>
        <p className="note">هذه الصفحة خاصة بإدارة الأخبار. أدخل اسم المستخدم وكلمة المرور.</p>
        {params.error ? <div className="error">بيانات الدخول غير صحيحة.</div> : null}
        <form action={loginAction} className="form-grid" style={{ marginTop: 16 }}>
          <label>
            اسم المستخدم
            <input name="username" required />
          </label>
          <label>
            كلمة المرور
            <input type="password" name="password" required />
          </label>
          <button type="submit">دخول</button>
        </form>
        <div style={{ marginTop: 16 }}>
          <Link href="/" className="button secondary">العودة للرئيسية</Link>
        </div>
      </div>
    </main>
  );
}
