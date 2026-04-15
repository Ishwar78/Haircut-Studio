import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./pages/ScrollToTop";

import Index from "./pages/Index";
import Explore from "./pages/Explore";
import TryNow from "./pages/TryNow";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminExplore from "./pages/admin/AdminExplore";
import AdminServices from "./pages/admin/AdminServices";
import AdminTryNow from "./pages/admin/AdminTryNow";
import AdminBeforeAfter from "./pages/admin/AdminBeforeAfter";
import AdminInquiry from "./pages/admin/AdminInquiry";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import AdminBooking from "./pages/admin/AdminBooking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/try-now" element={<TryNow />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<Terms />} />

          <Route path="*" element={<NotFound />} />
         

          {/* Admin */}
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/explore" element={<AdminExplore />} />
<Route path="/admin/services" element={<AdminServices />} />
<Route path="/admin/try-now" element={<AdminTryNow />} />
<Route path="/admin/before-after" element={<AdminBeforeAfter />} />
<Route path="/admin/contact" element={<AdminInquiry />} />
<Route path="/admin/bookings" element={<AdminBooking />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
