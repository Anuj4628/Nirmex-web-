import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage';
import AboutPage from '@/pages/About/AboutPage';
import ContactPage from '@/pages/Contact/ContactPage';
import MaterialPage from '@/pages/Material/MaterialPage';
import ProductMaterialPage from '@/pages/Products/ProductMaterialPage';
import ProductDetailPage from '@/pages/Catalogue/ProductDetailPage';
import GradeDetailPage from '@/pages/Catalogue/GradeDetailPage';
import TypeDetailPage from '@/pages/Catalogue/TypeDetailPage';
import SEORouteResolver from '@/pages/SEORouteResolver';
import './App.css';

/**
 * Root Application Component with Complete Bidirectional Material ↔ Product Architecture:
 * - Home Page: /
 * - Material Landing Pages: /stainless-steel, /carbon-steel, /materials/:slug
 * - Product Category Landing Page: /products/:slug, /flanges-manufactured-in-mumbai
 * - Material-Specific Product Description Page: /products/:material/:product
 * - Grade Detail Page: /products/:material/:product/grades/:gradeSlug
 * - Type Detail Page: /products/:material/:product/types/:typeSlug
 * - Smart Dynamic SEO Route Resolver: /:seoSlug
 * - Fallback: Redirect to /
 */
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          
          {/* Master Industrial Catalogue Routes */}
          <Route path="/products" element={<Navigate to="/products/flanges" replace />} />
          <Route path="/products/:material/:product" element={<ProductDetailPage />} />
          <Route path="/products/:material/:product/grades/:gradeSlug" element={<GradeDetailPage />} />
          <Route path="/products/:material/:product/types/:typeSlug" element={<TypeDetailPage />} />
          
          {/* Product Category Landing Page */}
          <Route path="/products/:slug" element={<ProductMaterialPage />} />

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

          <Route path="/materials/:materialSlug" element={<MaterialPage />} />
          <Route path="/material/:materialSlug" element={<MaterialPage />} />

          {/* Dynamic SEO URLs (e.g. /flanges-manufactured-in-mumbai, /flanges-stainless-steel-manufactured-in-mumbai) */}
          <Route path="/:seoSlug" element={<SEORouteResolver />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
