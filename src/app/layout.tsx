import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tala-kinshasa.netlify.app';

const splash = [
  [375, 667, 2],
  [390, 844, 3],
  [393, 852, 3],
  [430, 932, 3],
  [360, 780, 3],
].map(([w, h, d]) => ({
  url: `/splash/splash-${w * d}x${h * d}.png`,
  media: `(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${d}) and (orientation: portrait)`,
}));

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Tala — Marché immobilier & véhicules à Kinshasa',
    template: '%s · Tala',
  },
  description:
    'Tala : annonces gratuites à Kinshasa — immobilier, véhicules, électronique. Boosts et forfaits agents optionnels. Aucune commission sur la vente.',
  applicationName: 'Tala',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Tala',
    statusBarStyle: 'default',
    startupImage: splash,
  },
  other: { 'apple-mobile-web-app-capable': 'yes' },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Tala — Le marché de Kinshasa',
    description: 'Immobilier, motors, classifieds. Français-first. FC / $.',
    locale: 'fr_CD',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#e11d48',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="mx-auto min-h-dvh max-w-lg bg-bg">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
