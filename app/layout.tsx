import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'شبكة أخبار سوريا الحرة',
  description: 'موقع إخباري مع لوحة تحكم أولية حقيقية'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
