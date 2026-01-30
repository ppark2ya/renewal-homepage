import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dozn Exchange | Best Rate, Faster Exchange",
  description:
    "365 days, 24 hours, the closest unmanned exchange kiosk. Exchange foreign currency quickly and safely anywhere in the country at Dozn Exchange.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
