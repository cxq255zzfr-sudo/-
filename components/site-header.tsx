import Image from 'next/image';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand">
          <Image
            src="/logo.png"
            alt="شعار شبكة أخبار سوريا الحرة"
            width={74}
            height={74}
            className="brand-logo"
          />
          <div className="brand-text">
            <h1>شبكة أخبار سوريا الحرة</h1>
          </div>
        </a>

        <nav className="nav">
          <a href="#latest">آخر الأخبار</a>
          <a href="#platforms">منصاتنا</a>
        </nav>
      </div>
    </header>
  );
}