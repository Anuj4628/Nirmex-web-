import React from 'react';
import ProductMaterialSidebar from '../FlangeMaterialSidebar/FlangeMaterialSidebar';

/**
 * CatalogueSidebar Component
 * 
 * Re-exports the Master Red Material Navigation Sidebar for 100% unified
 * material navigation across all products in the catalogue.
 */
export const CatalogueSidebar = ({
  activeMaterialSlug = 'stainless-steel',
  activeProductSlug = 'flanges',
  productName = '',
  className = '',
}) => {
  return (
    <ProductMaterialSidebar
      activeMaterialSlug={activeMaterialSlug}
      activeProductSlug={activeProductSlug}
      productName={productName}
      className={className}
    />
  );
};

export default CatalogueSidebar;
