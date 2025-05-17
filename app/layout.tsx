import { ClerkProvider} from '@clerk/nextjs'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VidCell",
  description: "VidCell for real time interactions",
  icons: {
    icon: "/icons/logo.svg", // for regular browsers
    shortcut: "/icons/logo.svg", // for pinned tabs
    apple: "/icons/logo.svg", // for Apple devices
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout:{
              logoImageUrl:'/icons/logo.svg'
          },
          variables:{
            colorText:"white",
            colorBackground: "#1C1F2E",
            colorPrimary: "blue",
            colorInputText:"white",
            colorInputBackground:"#252A41"
          }
        }}
      >
      <body
        className={`${geistSans.variable} bg-dark-2 ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster/>
        <Analytics/>
      </body>
      </ClerkProvider>
    </html>
  );
}
