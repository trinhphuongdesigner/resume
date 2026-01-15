import type { Metadata } from "next";
import { Poppins, Roboto_Slab } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "Mr. Trinh Phuong - Full-stack Developer",
  description: "Personal Resume Website",
  icons: {
    icon: "/img/brand/favicon_io/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${robotoSlab.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
