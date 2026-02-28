import Image from 'next/image';
import Link from 'next/link';
import { loginAction } from '../actions';

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === '1';

  return (
    <main className="admin-login-page">
      <div className="admin-login-glow admin-login-glow--left" />
      <div className="admin-login-glow admin-login-glow--right" />

      <div className="admin-login-card">
        <div className="admin-login-logo">
          <Image
            src="/logo.png"
            alt="شعار شبكة أخبار سوريا الحرة"
            width={92}
            height={92}
            priority
          />
        </div>

        <h1>دخول الإدارة</h1>
        <p>هذه الصفحة مخصصة لإدارة الموقع فقط.</p>

        {hasError ? (
          <div className="admin-login-error">بيانات الدخول غير صحيحة.</div>
        ) : null}

        <form action={loginAction} className="admin-login-form">
          <label>
            <span>اسم المستخدم</span>
            <input name="username" type="text" required />
          </label>

          <label>
            <span>كلمة المرور</span>
            <input name="password" type="password" required />
          </label>

          <button type="submit">دخول</button>
        </form>

        <div className="admin-login-footer">
          <Link href="/">العودة للرئيسية</Link>
        </div>
      </div>
    </main>
  );
}