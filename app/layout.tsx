import type { Metadata } from "next";
import BottomNav from "@/components/BottomNav";
import QuickChat from "@/components/QuickChat";
import ToastHost from "@/components/ToastHost";
import { ThemeProvider } from "@/components/ThemeSystem";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medintel | Find care with confidence",
  description: "Explore care options, prepare for appointments, and connect with clinicians.",
};

// Enforces clean white light appearance throughout the page.
const themeBootScript = `try{var d=document.documentElement;localStorage.setItem("medintel-mode","light");d.dataset.mode="light";}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head>
      <body><ThemeProvider>{children}<QuickChat /><BottomNav /><ToastHost /></ThemeProvider></body>
    </html>
  );
}
