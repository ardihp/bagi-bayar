import type { Metadata, Viewport } from "next";
import { Figtree, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const pixel = Pixelify_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixel",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Expense Splitter - Travel Expense Splitter",
  description: "Aplikasi pencatat destinasi perjalanan dan pembagi pengeluaran",
  applicationName: "Expense Splitter",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Expense Splitter",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        figtree.variable,
        pixel.variable,
      )}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/png" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
