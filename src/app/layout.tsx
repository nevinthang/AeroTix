

import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js with Poppins",
  description: "Using Poppins font in a Next.js project",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
      <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   const pathname = usePathname();
//   const hideLayout = pathname === '/auth' || pathname === '/auth/register';

//   return (
//     <html lang="en">
//       <body className={`${poppins.variable} antialiased`}>
//         {!hideLayout && <Navbar />}
//         {children}
//         {!hideLayout && <Footer />}
//       </body>
//     </html>
//   );
// }

