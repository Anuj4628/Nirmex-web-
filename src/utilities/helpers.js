/**
 * Utility helper functions
 */

/**
 * Conditionally joins class names together
 * @param  {...any} classes 
 * @returns {string}
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Safe scroll to top or target element
 * @param {string} [elementId] 
 */
export function smoothScrollTo(elementId) {
  if (!elementId || elementId === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = document.querySelector(elementId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

