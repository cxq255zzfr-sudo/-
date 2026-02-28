import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Image src="/logo.png" alt="شعار شبكة أخبار سوريا الحرة" width={62} height={62} priority />
          <div className="brand-text">
            <h1>شبكة أخبار سوريا الحرة</h1>
            <p>نشرة إخبارية شاملة تغطي أحدث التطورات والأخبار</p>
          </div>
        </div>

        <nav className="nav">
          <Link href="/">الرئيسية</Link>
          <a href="#latest">آخر الأخبار</a>
          <a href="http://telegram.me/ALMHARAR" target="_blank" rel="noreferrer">تليجرام</a>
          <a href="https://www.facebook.com/networkmoharar" target="_blank" rel="noreferrer">فيسبوك</a>
          <a href="https://twitter.com/networkmoharar" target="_blank" rel="noreferrer">إكس</a>
        </nav>
      </div>
    </header>
  );
}
