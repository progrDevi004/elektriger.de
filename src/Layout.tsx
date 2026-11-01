import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "./components/CookieBanner";
import GoogleAnalytics from "./components/GoogleAnalytics";
import FloatingContactButtons from "./components/FloatingContactButtons";

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-teal border-t-transparent animate-spin rounded-full" />
  </div>
);

const Layout = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <TooltipProvider>
      <Sonner />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <CookieBanner />
      <FloatingContactButtons />
      <GoogleAnalytics />
    </TooltipProvider>
  </ThemeProvider>
);

export default Layout;
