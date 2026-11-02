import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage';
import AboutPage from '@/pages/About/AboutPage';
import ContactPage from '@/pages/Contact/ContactPage';
import ProductMaterialPage from '@/pages/Products/ProductMaterialPage';
import ProductDetailPage from '@/pages/Catalogue/ProductDetailPage';
import GradeDetailPage from '@/pages/Catalogue/GradeDetailPage';
import TypeDetailPage from '@/pages/Catalogue/TypeDetailPage';
import './App.css';

/**
 * Root Application Component with Multi-Route Architecture:
 * - Home Page: /
 * - Material Category Landing Page: /products/:slug
 * - Material-Specific Product Description Page: /products/:material/:product
 * - Grade Detail Page: /products/:material/:product/grades/:gradeSlug
 * - Type Detail Page: /products/:material/:product/types/:typeSlug
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
          <Route path="/products" element={<Navigate to="/products/stainless-steel/flanges" replace />} />
          <Route path="/products/:material/:product" element={<ProductDetailPage />} />
          <Route path="/products/:material/:product/grades/:gradeSlug" element={<GradeDetailPage />} />
          <Route path="/products/:material/:product/types/:typeSlug" element={<TypeDetailPage />} />
          
          {/* Category Overview Page */}
          <Route path="/products/:slug" element={<ProductMaterialPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
