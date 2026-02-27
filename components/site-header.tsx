import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Image src="/logo.png" alt="شعار شبكة أخبار سوريا الحرة" width={62} height={62} />
          <div className="brand-text">
            <h1>شبكة أخبار سوريا الحرة</h1>
            <p>واجهة عامة + لوحة تحكم أولية حقيقية</p>
          </div>
        </div>
        <nav className="nav">
          <Link href="/">الرئيسية</Link>
          <a href="#latest">آخر الأخبار</a>
          <Link href="/admin/login">دخول الإدارة</Link>
        </nav>
      </div>
    </header>
  );
}
