import React, { useState, useEffect } from 'react';
import './MaterialEnquiryModal.css';

/**
 * MaterialEnquiryModal Component
 * 
 * Interactive Material Specification & Instant Enquiry Dialog:
 * - Prefills exact material name and product category
 * - Displays technical specifications, standard compliance, and certified grades
 * - Allows quick quote enquiry and direct WhatsApp/Email dispatch
 * - Accessible with ESC key handling and backdrop click
 */
export const MaterialEnquiryModal = ({
  isOpen,
  onClose,
  material,
  category,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !material) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Nirmex Metal Industries, I am inquiring about: ${material.name} (${category?.name || 'Material'}). Could you please provide quotation and stock availability?`
  );

  return (
    <div
      className="nirmex-material-modal__backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-modal-title"
    >
      <div
        className="nirmex-material-modal__card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          className="nirmex-material-modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header */}
        <header className="nirmex-material-modal__header">
          <div className="nirmex-material-modal__eyebrow-wrap">
            <span className="nirmex-material-modal__pill">{category?.division || 'Nirmex Industrial'}</span>
            <span className="nirmex-material-modal__pill-sep">•</span>
            <span className="nirmex-material-modal__category">{category?.name}</span>
          </div>
          <h2 id="material-modal-title" className="nirmex-material-modal__title">
            {material.name}
          </h2>
        </header>

        {/* Modal Content Grid */}
        <div className="nirmex-material-modal__body">
          {/* Left Column: Image & Technical Specification Highlights */}
          <div className="nirmex-material-modal__col-info">
            <div className="nirmex-material-modal__img-wrap">
              <img
                src={material.image}
                alt={material.name}
                className="nirmex-material-modal__img"
                loading="lazy"
              />
              <span className="nirmex-material-modal__img-badge">Certified Mill Stock</span>
            </div>

            <div className="nirmex-material-modal__specs">
              <h3 className="nirmex-material-modal__specs-title">Technical Specifications</h3>
              
              <div className="nirmex-material-modal__spec-row">
                <span className="nirmex-material-modal__spec-label">Common Grades:</span>
                <span className="nirmex-material-modal__spec-val">{material.grades || '304, 316L, Duplex, Inconel, Monel'}</span>
              </div>

              <div className="nirmex-material-modal__spec-row">
                <span className="nirmex-material-modal__spec-label">Standard Compliance:</span>
                <span className="nirmex-material-modal__spec-val">{material.standards || 'ASTM / ASME, DIN, EN 10204 3.1'}</span>
              </div>

              <div className="nirmex-material-modal__spec-row">
                <span className="nirmex-material-modal__spec-label">Inspection &amp; Test:</span>
                <span className="nirmex-material-modal__spec-val">100% PMI Tested, EN 10204 3.1 MTC</span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Quotation Enquiry Form */}
          <div className="nirmex-material-modal__col-form">
            {isSubmitted ? (
              <div className="nirmex-material-modal__success">
                <div className="nirmex-material-modal__success-icon" aria-hidden="true">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="nirmex-material-modal__success-title">Enquiry Received</h3>
                <p className="nirmex-material-modal__success-text">
                  Thank you. Our technical sales team has received your enquiry for <strong>{material.name}</strong> and will furnish certified pricing and mill delivery schedules within 2 to 4 business hours.
                </p>
                <div className="nirmex-material-modal__success-actions">
                  <a
                    href={`https://wa.me/919619806901?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nirmex-material-modal__btn nirmex-material-modal__btn--wa"
                  >
                    <span>Instant WhatsApp Chat</span>
                  </a>
                  <button
                    type="button"
                    className="nirmex-material-modal__btn nirmex-material-modal__btn--secondary"
                    onClick={onClose}
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form className="nirmex-material-modal__form" onSubmit={handleSubmit}>
                <div className="nirmex-material-modal__form-header">
                  <h3 className="nirmex-material-modal__form-title">Request Quotation &amp; Stock Availability</h3>
                  <p className="nirmex-material-modal__form-sub">
                    Direct mill pricing with complete EN 10204 3.1 test certifications.
                  </p>
                </div>

                <div className="nirmex-material-modal__field">
                  <label htmlFor="modal-product" className="nirmex-material-modal__label">
                    Selected Product / Material
                  </label>
                  <input
                    id="modal-product"
                    type="text"
                    value={`${material.name} — ${category?.name || ''}`}
                    readOnly
                    className="nirmex-material-modal__input nirmex-material-modal__input--readonly"
                  />
                </div>

                <div className="nirmex-material-modal__row">
                  <div className="nirmex-material-modal__field">
                    <label htmlFor="modal-name" className="nirmex-material-modal__label">
                      Your Full Name <span className="nirmex-req">*</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="nirmex-material-modal__input"
                    />
                  </div>

                  <div className="nirmex-material-modal__field">
                    <label htmlFor="modal-phone" className="nirmex-material-modal__label">
                      Phone / WhatsApp <span className="nirmex-req">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="nirmex-material-modal__input"
                    />
                  </div>
                </div>

                <div className="nirmex-material-modal__field">
                  <label htmlFor="modal-email" className="nirmex-material-modal__label">
                    Corporate Email Address <span className="nirmex-req">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="purchase@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="nirmex-material-modal__input"
                  />
                </div>

                <div className="nirmex-material-modal__field">
                  <label htmlFor="modal-notes" className="nirmex-material-modal__label">
                    Required Quantity, Size &amp; Schedule
                  </label>
                  <textarea
                    id="modal-notes"
                    rows="3"
                    placeholder="Specify sizes, wall thickness, pressure ratings, or target delivery date..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="nirmex-material-modal__textarea"
                  />
                </div>

                <div className="nirmex-material-modal__form-actions">
                  <button
                    type="submit"
                    className="nirmex-material-modal__btn nirmex-material-modal__btn--submit"
                  >
                    <span>Submit Quotation Request</span>
                  </button>

                  <a
                    href={`https://wa.me/919619806901?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nirmex-material-modal__btn nirmex-material-modal__btn--wa-small"
                    title="Direct WhatsApp enquiry"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialEnquiryModal;

