import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_DOMAIN } from '@/utils/seoRouting';

/**
 * Reusable Dynamic SEO, Meta, OpenGraph & Schema Generator
 */
export const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  breadcrumbs = [],
  productSchema = null,
}) => {
  const location = useLocation();

  const brand = 'Nirmex Metal Industries';
  const siteUrl = SITE_DOMAIN;
  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`)
    : `${siteUrl}${location.pathname}`;

  const fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;
  const metaDescription =
    description ||
    'Nirmex Metal Industries is an ISO 9001:2015 certified manufacturer, stockist, and worldwide exporter of industrial piping components in Mumbai, India.';

  const defaultOgImage = `${siteUrl}/nirmex-logo.png`;
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : defaultOgImage;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('description', metaDescription);
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 3. Open Graph Tags
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', metaDescription, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', brand, true);
    setMeta('og:image', resolvedOgImage, true);

    // 4. Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', metaDescription);
    setMeta('twitter:image', resolvedOgImage);

    // 5. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data
    const schemas = [];

    // Organization & LocalBusiness
    schemas.push({
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness'],
      name: brand,
      url: siteUrl,
      logo: `${siteUrl}/nirmex-logo.png`,
      description:
        'ISO 9001:2015 certified manufacturer and exporter of flanges, forged fittings, buttweld fittings, fasteners, pipes, and tubes.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'India',
      },
      telephone: '+91-9820524419',
      email: 'sales@nirmexmetal.com',
    });

    // WebSite
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: brand,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/products/flanges-manufactured-in-mumbai?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    // BreadcrumbList
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`,
        })),
      });
    }

    // Product Schema (where applicable)
    if (productSchema) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productSchema.name || fullTitle,
        description: productSchema.description || metaDescription,
        image: productSchema.image || resolvedOgImage,
        brand: {
          '@type': 'Brand',
          name: brand,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: brand,
          },
        },
      });
    }

    // Inject JSON-LD Script
    let scriptEl = document.querySelector('script#nirmex-seo-jsonld');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'nirmex-seo-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemas);

    return () => {
      // Cleanup on unmount if needed
    };
  }, [fullTitle, metaDescription, canonicalUrl, resolvedOgImage, ogType, breadcrumbs, productSchema]);

  return null;
};

export default SEO;

