import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://doctorveritatis.vercel.app'),
  title: "Doctor Veritatis - Santo Tomás de Aquino",
  description: "Portal digital dedicado a la obra teológica y filosófica de Santo Tomás de Aquino",
  icons: {
    icon: [
      { url: '/santotomas.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/santotomas.svg',
  },
  openGraph: {
    title: "Doctor Veritatis - Santo Tomás de Aquino",
    description: "Portal digital dedicado a la obra teológica y filosófica de Santo Tomás de Aquino",
    type: "website",
    images: [
      {
        url: "/santotomas.jpg",
        width: 400,
        height: 500,
        alt: "Santo Tomás de Aquino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doctor Veritatis - Santo Tomás de Aquino",
    description: "Portal digital dedicado a la obra teológica y filosófica de Santo Tomás de Aquino",
    images: ["/santotomas.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
