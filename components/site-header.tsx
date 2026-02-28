import Image from 'next/image';

export function SiteHeader() {
  return (
    <header className="hero-header">
      <div className="hero-glow hero-glow--left" />
      <div className="hero-glow hero-glow--right" />

      <div className="container hero-content">
        <div className="logo-shell">
          <Image
            src="/logo.png"
            alt="شعار شبكة أخبار سوريا الحرة"
            width={118}
            height={118}
            priority
          />
        </div>

        <h1>شبكة أخبار سوريا الحرة</h1>

        <div className="social-links social-links--header">
          <a href="http://telegram.me/ALMHARAR" target="_blank" rel="noreferrer">
            تليجرام
          </a>
          <a href="https://www.facebook.com/networkmoharar" target="_blank" rel="noreferrer">
            فيسبوك
          </a>
          <a href="https://twitter.com/networkmoharar" target="_blank" rel="noreferrer">
            إكس
          </a>
          <a href="https://youtube.com/channel/UCFm-Fy_6kb9F-al0F53LjHQ" target="_blank" rel="noreferrer">
            يوتيوب
          </a>
          <a
            href="https://www.tiktok.com/@abomahmudalhalaby?_t=8r0L1CRiCLw&_r=1"
            target="_blank"
            rel="noreferrer"
          >
            تيك توك
          </a>
          <a href="https://whatsapp.com/channel/0029Va9oCqMBadmbK22OTv3F" target="_blank" rel="noreferrer">
            واتساب
          </a>
        </div>
      </div>
    </header>
  );
}