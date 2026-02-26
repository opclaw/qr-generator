import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://qr-generator.vercel.app'),
  alternates: {
    canonical: 'https://qr-generator.vercel.app',
  },
  title: 'QR Code Generator — Create QR Codes | Free Online Tool',
  description: 'Generate QR codes for URLs, text, WiFi, and more. Free online QR code creator.',
  keywords: ['qr code generator', 'qr generator', 'create qr code', 'qr code maker'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qr-generator.vercel.app',
    siteName: 'QR Generator',
    title: 'QR Code Generator — Create QR Codes',
    description: 'Generate QR codes for URLs, text, WiFi, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, WiFi, and more.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'QR Code Generator',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'URL QR codes, Text QR codes, WiFi QR codes, Custom colors',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
