import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage';
import AboutPage from '@/pages/About/AboutPage';
import ContactPage from '@/pages/Contact/ContactPage';
import MaterialPage from '@/pages/Material/MaterialPage';
import SEORouteResolver from '@/pages/SEORouteResolver';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import './App.css';

/**
 * Ensures page scroll is reset to top on navigation between routes
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

/**
 * Root Application Component with Complete Dynamic SEO URL Architecture:
 * - Home Page: /
 * - Material Landing Pages: /stainless-steel, /carbon-steel, /copper, etc.
 * - Product Category Landing Page: /products/flanges-manufactured-in-mumbai
 * - Material-Specific Product Page: /products/flanges-stainless-steel-manufactured-in-mumbai
 * - Grade Detail Page: /products/flanges-stainless-steel-304-manufactured-in-mumbai
 * - Product Type Detail Page: /products/flanges-stainless-steel-304-weld-neck-flanges-manufactured-in-mumbai
 * - Automatic 404 for invalid combinations (No fallback to Stainless Steel)
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          
          {/* Master Industrial Catalogue Root Redirect */}
          <Route path="/products" element={<Navigate to="/products/flanges-manufactured-in-mumbai" replace />} />
          
          {/* Legacy multi-segment parameter routes handled by smart resolver */}
          <Route path="/products/:material/:product/grades/:gradeSlug" element={<SEORouteResolver />} />
          <Route path="/products/:material/:product/types/:typeSlug" element={<SEORouteResolver />} />
          <Route path="/products/:material/:product" element={<SEORouteResolver />} />
          
          {/* Dynamic SEO URLs under /products/ (e.g. /products/flanges-manufactured-in-mumbai, /products/flanges-stainless-steel-304-manufactured-in-mumbai) */}
          <Route path="/products/:seoSlug" element={<SEORouteResolver />} />

          {/* Dedicated Material Landing Pages */}
          <Route path="/stainless-steel" element={<MaterialPage materialSlug="stainless-steel" />} />
          <Route path="/carbon-steel" element={<MaterialPage materialSlug="carbon-steel" />} />
          <Route path="/alloy-steel" element={<MaterialPage materialSlug="alloy-steel" />} />
          <Route path="/duplex-super-duplex" element={<MaterialPage materialSlug="duplex-super-duplex" />} />
          <Route path="/duplex-stainless-steel" element={<MaterialPage materialSlug="duplex-super-duplex" />} />
          <Route path="/super-duplex-stainless-steel" element={<MaterialPage materialSlug="duplex-super-duplex" />} />
          <Route path="/nickel-alloy" element={<MaterialPage materialSlug="nickel-alloy" />} />
          <Route path="/high-alloy" element={<MaterialPage materialSlug="high-alloy" />} />
          <Route path="/inconel" element={<MaterialPage materialSlug="inconel" />} />
          <Route path="/monel" element={<MaterialPage materialSlug="monel" />} />
          <Route path="/hastelloy" element={<MaterialPage materialSlug="hastelloy" />} />
          <Route path="/titanium" element={<MaterialPage materialSlug="titanium" />} />
          <Route path="/copper" element={<MaterialPage materialSlug="copper" />} />
          <Route path="/aluminium" element={<MaterialPage materialSlug="aluminium" />} />

          <Route path="/materials/:materialSlug" element={<SEORouteResolver />} />
          <Route path="/material/:materialSlug" element={<SEORouteResolver />} />

          {/* Dynamic Root SEO URLs (e.g. /flanges-manufactured-in-mumbai, /flanges-stainless-steel-manufactured-in-mumbai) */}
          <Route path="/:seoSlug" element={<SEORouteResolver />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
