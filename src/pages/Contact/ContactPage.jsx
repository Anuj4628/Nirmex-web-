import React, { useState } from 'react';
import CTASection from '@/components/home/CTA';
import contactHeroImg from '@/assets/images/contact-hero-industrial.jpg';
import './ContactPage.css';

/**
 * Product category options for Enquiry Form
 */
const PRODUCT_OPTIONS = [
  'Forged Fittings',
  'Industrial Flanges',
  'Industrial Fasteners',
  'Butt Weld Fittings',
  'Pipes & Tubes',
  'Sheets & Plates',
  'Rods & Round Bars',
  'Ferrule Fittings',
  'Dairy & Pharma Fittings',
  'Hose Pipes',
  'Perforated Sheets',
  'Wire Mesh',
  'Other Industrial Requirements',
];

/**
 * FAQ Data for Section 5
 */
const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How can I enquire about a product?',
    answer:
      'Use the enquiry form to provide your contact details, select a product category, and describe your requirements. You can then choose WhatsApp or Gmail to prepare your enquiry directly.',
  },
  {
    id: 'faq-2',
    question: 'Which details should I include in a product enquiry?',
    answer:
      'Include the product type, material grade if known (e.g. 304, 316L, Duplex, Monel), required dimensions/size, quantity, and any applicable ASME/ASTM specification. This helps our technical sales team understand and process your requirements swiftly.',
  },
  {
    id: 'faq-3',
    question: 'How can I contact the domestic sales team?',
    answer:
      'Use the Domestic Sales email address displayed in the contact details section (sales.nirmexmetalind@gmail.com) or reach our office directly via telephone (+91 22 6615 7058).',
  },
  {
    id: 'faq-4',
    question: 'How can I make an export enquiry?',
    answer:
      'Contact our Exports division using the listed export email address (sales@nirmexmetal.com) and include your product specifications, quantities, and destination port details.',
  },
  {
    id: 'faq-5',
    question: 'Where is the head office located?',
    answer:
      'Our corporate head office is located at 103, 1st Floor, Omkar Tower, 3rd Khetwadi Lane Back Road, Mumbai - 400 004, Maharashtra, India. Use the interactive map and "Get Directions" button for exact navigation.',
  },
];

export const ContactPage = () => {
  // Toast Notification state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);

  // FAQ Accordion State (first item open by default)
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  // Copy to clipboard utility with user feedback
  const handleCopy = (text, label) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast(`${label} copied successfully`);
        })
        .catch(() => {
          fallbackCopy(text, label);
        });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text, label) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        showToast(`${label} copied successfully`);
      } else {
        showToast(`Could not copy automatically. Value: ${text}`);
      }
    } catch {
      showToast(`Please manually copy: ${text}`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  // Form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form Validation & Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 7) {
      errors.phone = 'Please enter a valid contact phone number.';
    }

    if (!formData.product) {
      errors.product = 'Please select a product of interest.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please describe your product requirements.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setChoiceModalOpen(true);
  };

  // Prepare dispatch message
  const prepareEnquiryText = () => {
    return [
      `Hello Nirmex Metal Industries,`,
      ``,
      `I would like to submit an industrial product enquiry:`,
      `• Name: ${formData.fullName.trim()}`,
      formData.company.trim() ? `• Company: ${formData.company.trim()}` : null,
      `• Email: ${formData.email.trim()}`,
      `• Phone: ${formData.phone.trim()}`,
      `• Product: ${formData.product}`,
      `• Requirements: ${formData.message.trim()}`,
      ``,
      `Please provide product availability, specification confirmation, and commercial quotation.`,
    ]
      .filter((line) => line !== null)
      .join('\n');
  };

  // Option 1: WhatsApp
  const handleSendWhatsApp = () => {
    const text = prepareEnquiryText();
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/919619806901?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Option 2: Gmail Compose / Mailto
  const handleSendGmail = () => {
    const text = prepareEnquiryText();
    const subject = `New Product Enquiry - ${formData.product || 'Industrial Metal'}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(text);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@nirmexmetal.com&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToEnquiry = (e) => {
    e.preventDefault();
    const formEl = document.querySelector('#enquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="nirmex-contact-page">
      {/* Toast Feedback */}
      {toastVisible && (
        <div className="nirmex-toast" role="status" aria-live="polite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          SECTION 1: CONTACT HERO SECTION
          ===================================================================== */}
      <section className="nirmex-contact-hero" aria-labelledby="contact-hero-title">
        <div className="nirmex-contact-hero__bg-wrap" aria-hidden="true">
          <img
            src={contactHeroImg}
            alt="Nirmex Metal Industries industrial customer support and technical consultation"
            className="nirmex-contact-hero__bg-img"
            loading="eager"
          />
          <div className="nirmex-contact-hero__gradient" />
        </div>

        <div className="nirmex-contact-container nirmex-contact-hero__container">
          <div className="nirmex-contact-hero__card">
            <div className="nirmex-contact-hero__eyebrow-wrap">
              <span className="nirmex-contact-hero__eyebrow-line" aria-hidden="true" />
              <span className="nirmex-contact-hero__eyebrow">CONTACT NIRMEX METAL INDUSTRIES</span>
            </div>

            <h1 id="contact-hero-title" className="nirmex-contact-hero__title">
              Let's Connect for Your Industrial Requirements
            </h1>

            <p className="nirmex-contact-hero__desc">
              Looking for forged fittings, flanges, fasteners, buttweld fittings, or other industrial metal products? Our team is here to assist you with product enquiries, specifications, and business-related questions.
            </p>

            <div className="nirmex-contact-hero__actions">
              <a
                href="#enquiry-form"
                onClick={handleScrollToEnquiry}
                className="nirmex-btn nirmex-btn--primary"
                aria-label="Scroll to enquiry form"
              >
                <span>Send an Enquiry</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=103,+1st+Floor,+Omkar+Tower,+3rd+Khetwadi+Lane+Back+Road,+Mumbai+-+400+004,+Maharashtra,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="nirmex-btn nirmex-btn--secondary"
                aria-label="Get directions to Mumbai head office in Google Maps"
              >
                <span>Get Directions</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: CONTACT DETAILS — PREMIUM INFORMATION CARDS
          ===================================================================== */}
      <section className="nirmex-contact-section" aria-labelledby="contact-cards-heading">
        <div className="nirmex-contact-container">
          <div className="nirmex-contact-section-header">
            <div className="nirmex-contact-eyebrow">
              <span className="nirmex-contact-eyebrow__bar" aria-hidden="true" />
              <span>CORPORATE CONTACT INFORMATION</span>
            </div>
            <h2 id="contact-cards-heading" className="nirmex-contact-heading">
              Get in Touch with Our Team
            </h2>
            <p className="nirmex-contact-subtitle">
              Reach out to us for product enquiries, sales assistance, and information about our industrial metal product range.
            </p>
          </div>

          {/* Primary 4 Cards Grid */}
          <div className="nirmex-cards-grid">
            {/* Card 1 — Head Office */}
            <div className="nirmex-info-card">
              <div className="nirmex-info-card__header">
                <div className="nirmex-info-card__icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <line x1="9" y1="9" x2="9" y2="9.01" />
                    <line x1="9" y1="13" x2="9" y2="13.01" />
                    <line x1="9" y1="17" x2="9" y2="17.01" />
                  </svg>
                </div>
                <h3 className="nirmex-info-card__title">Head Office</h3>
              </div>

              <div className="nirmex-info-card__body">
                <div className="nirmex-info-card__company">Nirmex Metal Industries</div>
                <p className="nirmex-info-card__address">
                  103, 1st Floor, Omkar Tower,<br />
                  3rd Khetwadi Lane Back Road,<br />
                  Mumbai - 400 004, Maharashtra, India
                </p>
              </div>

              <div className="nirmex-info-card__actions">
                <button
                  type="button"
                  className="nirmex-card-btn"
                  onClick={() =>
                    handleCopy(
                      'Nirmex Metal Industries, 103, 1st Floor, Omkar Tower, 3rd Khetwadi Lane Back Road, Mumbai - 400 004, Maharashtra, India',
                      'Head Office Address'
                    )
                  }
                  aria-label="Copy head office address to clipboard"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy Address</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=103,+1st+Floor,+Omkar+Tower,+3rd+Khetwadi+Lane+Back+Road,+Mumbai+-+400+004,+Maharashtra,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nirmex-card-btn nirmex-card-btn--primary"
                  aria-label="Get directions to Mumbai head office"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Card 2 — Contact Person */}
            <div className="nirmex-info-card">
              <div className="nirmex-info-card__header">
                <div className="nirmex-info-card__icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="nirmex-info-card__title">Contact Person</h3>
              </div>

              <div className="nirmex-info-card__body">
                <div className="nirmex-info-card__person-name">Mr. Naresh Lodha</div>
                <div className="nirmex-info-card__phone-num">+91 9930395528</div>
              </div>

              <div className="nirmex-info-card__actions">
                <button
                  type="button"
                  className="nirmex-card-btn"
                  onClick={() => handleCopy('+91 9930395528', 'Contact Person Number')}
                  aria-label="Copy contact person mobile number"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy Number</span>
                </button>

                <a
                  href="tel:+919930395528"
                  className="nirmex-card-btn nirmex-card-btn--primary"
                  aria-label="Call Mr. Naresh Lodha"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Card 3 — Telephone */}
            <div className="nirmex-info-card">
              <div className="nirmex-info-card__header">
                <div className="nirmex-info-card__icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="nirmex-info-card__title">Telephone</h3>
              </div>

              <div className="nirmex-info-card__body">
                <div className="nirmex-info-card__company">Corporate Landline</div>
                <div className="nirmex-info-card__phone-num">+91 22 6615 7058</div>
              </div>

              <div className="nirmex-info-card__actions">
                <button
                  type="button"
                  className="nirmex-card-btn"
                  onClick={() => handleCopy('+91 22 6615 7058', 'Office Telephone Number')}
                  aria-label="Copy office telephone number"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy Number</span>
                </button>

                <a
                  href="tel:+912266157058"
                  className="nirmex-card-btn nirmex-card-btn--primary"
                  aria-label="Call corporate office telephone"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Office</span>
                </a>
              </div>
            </div>

            {/* Card 4 — Manufacturing Unit */}
            <div className="nirmex-info-card">
              <div className="nirmex-info-card__header">
                <div className="nirmex-info-card__icon-wrap" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    <path d="M17 18h1" />
                    <path d="M12 18h1" />
                    <path d="M7 18h1" />
                  </svg>
                </div>
                <h3 className="nirmex-info-card__title">Manufacturing Unit</h3>
              </div>

              <div className="nirmex-info-card__body">
                <p className="nirmex-info-card__address">
                  Village Neveva,<br />
                  District Banaskantha,<br />
                  Gujarat - 385310
                </p>
                <div className="nirmex-info-card__phone-num" style={{ marginTop: '8px', fontSize: '1rem' }}>
                  Mobile: +91 7303304316
                </div>
              </div>

              <div className="nirmex-info-card__actions">
                <button
                  type="button"
                  className="nirmex-card-btn"
                  onClick={() =>
                    handleCopy('Village Neveva, District Banaskantha, Gujarat - 385310', 'Factory Address')
                  }
                  aria-label="Copy manufacturing unit address"
                >
                  <span>Copy Address</span>
                </button>

                <button
                  type="button"
                  className="nirmex-card-btn"
                  onClick={() => handleCopy('+91 7303304316', 'Manufacturing Unit Mobile')}
                  aria-label="Copy manufacturing unit mobile"
                >
                  <span>Copy Mobile</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Village+Neveva,+District+Banaskantha,+Gujarat+-+385310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nirmex-card-btn nirmex-card-btn--primary"
                  aria-label="Get directions to Gujarat manufacturing facility"
                >
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 5 — Email Contacts (Full Width) */}
          <div className="nirmex-email-card">
            <div className="nirmex-email-card__header">
              <div className="nirmex-info-card__icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="nirmex-email-card__title">Direct Email Channels</h3>
            </div>

            <div className="nirmex-email-rows">
              {/* Row 1: Domestic Sales */}
              <div className="nirmex-email-row">
                <span className="nirmex-email-row__channel">Domestic Sales</span>
                <div className="nirmex-email-row__address">sales.nirmexmetalind@gmail.com</div>
                <div className="nirmex-email-row__actions">
                  <button
                    type="button"
                    className="nirmex-card-btn"
                    onClick={() => handleCopy('sales.nirmexmetalind@gmail.com', 'Domestic Sales Email')}
                    aria-label="Copy domestic sales email"
                  >
                    <span>Copy Email</span>
                  </button>
                  <a
                    href="mailto:sales.nirmexmetalind@gmail.com"
                    className="nirmex-card-btn nirmex-card-btn--primary"
                    aria-label="Email domestic sales team"
                  >
                    <span>Email Us</span>
                  </a>
                </div>
              </div>

              {/* Row 2: Exports */}
              <div className="nirmex-email-row">
                <span className="nirmex-email-row__channel">Exports Division</span>
                <div className="nirmex-email-row__address">sales@nirmexmetal.com</div>
                <div className="nirmex-email-row__actions">
                  <button
                    type="button"
                    className="nirmex-card-btn"
                    onClick={() => handleCopy('sales@nirmexmetal.com', 'Exports Email')}
                    aria-label="Copy exports email"
                  >
                    <span>Copy Email</span>
                  </button>
                  <a
                    href="mailto:sales@nirmexmetal.com"
                    className="nirmex-card-btn nirmex-card-btn--primary"
                    aria-label="Email exports division"
                  >
                    <span>Email Us</span>
                  </a>
                </div>
              </div>

              {/* Row 3: General Enquiry */}
              <div className="nirmex-email-row">
                <span className="nirmex-email-row__channel">General Enquiry</span>
                <div className="nirmex-email-row__address">info@nirmexmetal.com</div>
                <div className="nirmex-email-row__actions">
                  <button
                    type="button"
                    className="nirmex-card-btn"
                    onClick={() => handleCopy('info@nirmexmetal.com', 'General Enquiry Email')}
                    aria-label="Copy general enquiry email"
                  >
                    <span>Copy Email</span>
                  </button>
                  <a
                    href="mailto:info@nirmexmetal.com"
                    className="nirmex-card-btn nirmex-card-btn--primary"
                    aria-label="Email general enquiry team"
                  >
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: ENQUIRY FORM + LOCATION MAP
          ===================================================================== */}
      <section id="enquiry-form" className="nirmex-contact-section nirmex-contact-section--alt" aria-labelledby="enquiry-form-heading">
        <div className="nirmex-contact-container">
          <div className="nirmex-enquiry-grid">
            {/* Left: Interactive Client-Side Enquiry Form */}
            <div className="nirmex-form-card">
              <div className="nirmex-form-card__header">
                <div className="nirmex-contact-eyebrow">
                  <span className="nirmex-contact-eyebrow__bar" aria-hidden="true" />
                  <span>DIRECT INQUIRY DISPATCH</span>
                </div>
                <h2 id="enquiry-form-heading" className="nirmex-form-card__title">
                  Send Us Your Enquiry
                </h2>
                <p className="nirmex-form-card__desc">
                  Tell us what you are looking for, and choose how you would like to contact our team.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="nirmex-contact-form" noValidate>
                {/* Full Name & Company Name */}
                <div className="nirmex-form-row">
                  <div className="nirmex-form-group">
                    <label htmlFor="fullName" className="nirmex-form-label">
                      Full Name <span className="nirmex-req">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Sharma"
                      className={`nirmex-form-input ${formErrors.fullName ? 'nirmex-form-input--error' : ''}`}
                      required
                    />
                    {formErrors.fullName && <span className="nirmex-form-error">{formErrors.fullName}</span>}
                  </div>

                  <div className="nirmex-form-group">
                    <label htmlFor="company" className="nirmex-form-label">
                      Company Name <span className="nirmex-optional">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Engineering Ltd."
                      className="nirmex-form-input"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="nirmex-form-row">
                  <div className="nirmex-form-group">
                    <label htmlFor="email" className="nirmex-form-label">
                      Email Address <span className="nirmex-req">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`nirmex-form-input ${formErrors.email ? 'nirmex-form-input--error' : ''}`}
                      required
                    />
                    {formErrors.email && <span className="nirmex-form-error">{formErrors.email}</span>}
                  </div>

                  <div className="nirmex-form-group">
                    <label htmlFor="phone" className="nirmex-form-label">
                      Phone Number <span className="nirmex-req">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`nirmex-form-input ${formErrors.phone ? 'nirmex-form-input--error' : ''}`}
                      required
                    />
                    {formErrors.phone && <span className="nirmex-form-error">{formErrors.phone}</span>}
                  </div>
                </div>

                {/* Product of Interest */}
                <div className="nirmex-form-group">
                  <label htmlFor="product" className="nirmex-form-label">
                    Product of Interest <span className="nirmex-req">*</span>
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className={`nirmex-form-select ${formErrors.product ? 'nirmex-form-select--error' : ''}`}
                    required
                  >
                    <option value="">Select a product category...</option>
                    {PRODUCT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {formErrors.product && <span className="nirmex-form-error">{formErrors.product}</span>}
                </div>

                {/* Message / Requirements */}
                <div className="nirmex-form-group">
                  <label htmlFor="message" className="nirmex-form-label">
                    Message / Product Requirements <span className="nirmex-req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify material grade (e.g. 304, 316L, Duplex), sizes, wall thickness, quantities, or specific ASTM standards..."
                    className={`nirmex-form-textarea ${formErrors.message ? 'nirmex-form-textarea--error' : ''}`}
                    required
                  />
                  {formErrors.message && <span className="nirmex-form-error">{formErrors.message}</span>}
                </div>

                {/* Submit Action */}
                <button type="submit" className="nirmex-btn nirmex-btn--primary nirmex-form-submit-btn">
                  <span>Submit Enquiry</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right: Mumbai Head Office Interactive Map */}
            <div className="nirmex-map-card">
              <div className="nirmex-map-frame-wrap">
                <iframe
                  title="Nirmex Metal Industries Mumbai Head Office Location"
                  src="https://maps.google.com/maps?q=103%20Omkar%20Tower%2C%203rd%20Khetwadi%20Lane%20Back%20Road%2C%20Mumbai%20400004&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="nirmex-map-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="nirmex-map-info">
                <div className="nirmex-map-info__header">
                  <span className="nirmex-map-info__dot" aria-hidden="true" />
                  <h3 className="nirmex-map-info__title">Head Office Location</h3>
                </div>

                <p className="nirmex-map-info__address">
                  <strong>Nirmex Metal Industries</strong><br />
                  103, 1st Floor, Omkar Tower, 3rd Khetwadi Lane Back Road,<br />
                  Mumbai - 400 004, Maharashtra, India
                </p>

                <div className="nirmex-map-info__actions">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=103,+1st+Floor,+Omkar+Tower,+3rd+Khetwadi+Lane+Back+Road,+Mumbai+-+400+004,+Maharashtra,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nirmex-card-btn nirmex-card-btn--primary"
                    aria-label="Open directions to Mumbai office in Google Maps"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>Get Directions</span>
                  </a>

                  <button
                    type="button"
                    className="nirmex-card-btn"
                    onClick={() =>
                      handleCopy(
                        'Nirmex Metal Industries, 103, 1st Floor, Omkar Tower, 3rd Khetwadi Lane Back Road, Mumbai - 400 004, Maharashtra, India',
                        'Head Office Address'
                      )
                    }
                    aria-label="Copy head office address to clipboard"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span>Copy Address</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: WHY CONTACT NIRMEX METAL INDUSTRIES?
          ===================================================================== */}
      <section className="nirmex-contact-section" aria-labelledby="why-contact-heading">
        <div className="nirmex-contact-container">
          <div className="nirmex-contact-section-header">
            <div className="nirmex-contact-eyebrow">
              <span className="nirmex-contact-eyebrow__bar" aria-hidden="true" />
              <span>DEDICATED INDUSTRIAL ASSISTANCE</span>
            </div>
            <h2 id="why-contact-heading" className="nirmex-contact-heading">
              How Can We Help You?
            </h2>
            <p className="nirmex-contact-subtitle">
              Connect with our team to discuss your product requirements and identify suitable industrial metal products.
            </p>
          </div>

          <div className="nirmex-why-contact-grid">
            {/* Card 1 */}
            <div className="nirmex-why-contact-card">
              <div className="nirmex-why-contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="nirmex-why-contact-card__title">Product Enquiries</h3>
              <p className="nirmex-why-contact-card__desc">
                Ask about available forged fittings, flanges, fasteners, buttweld fittings, and other product categories in stock or custom manufacture.
              </p>
            </div>

            {/* Card 2 */}
            <div className="nirmex-why-contact-card">
              <div className="nirmex-why-contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="nirmex-why-contact-card__title">Technical Specifications</h3>
              <p className="nirmex-why-contact-card__desc">
                Share the required material grade, dimensions, product type, or applicable specification so the enquiry can be directed appropriately.
              </p>
            </div>

            {/* Card 3 */}
            <div className="nirmex-why-contact-card">
              <div className="nirmex-why-contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3 className="nirmex-why-contact-card__title">Domestic Sales</h3>
              <p className="nirmex-why-contact-card__desc">
                Contact our team for domestic sales enquiries, immediate mill stock availability, and Pan-India scheduled deliveries.
              </p>
            </div>

            {/* Card 4 */}
            <div className="nirmex-why-contact-card">
              <div className="nirmex-why-contact-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="nirmex-why-contact-card__title">Export Enquiries</h3>
              <p className="nirmex-why-contact-card__desc">
                Reach out to discuss export-related product enquiries, international third-party inspections, and global documentation requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FAQ ACCORDION
          ===================================================================== */}
      <section className="nirmex-contact-section nirmex-contact-section--alt" aria-labelledby="faq-heading">
        <div className="nirmex-contact-container">
          <div className="nirmex-contact-section-header">
            <div className="nirmex-contact-eyebrow">
              <span className="nirmex-contact-eyebrow__bar" aria-hidden="true" />
              <span>COMMONLY ASKED QUESTIONS</span>
            </div>
            <h2 id="faq-heading" className="nirmex-contact-heading">
              Frequently Asked Questions
            </h2>
            <p className="nirmex-contact-subtitle">
              Quick answers about enquiry submissions, product specifications, and sales assistance.
            </p>
          </div>

          <div className="nirmex-faq-wrap">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id} className={`nirmex-faq-item ${isOpen ? 'nirmex-faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="nirmex-faq-trigger"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span>{item.question}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`nirmex-faq-chevron ${isOpen ? 'nirmex-faq-chevron--rotated' : ''}`}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div id={`faq-answer-${item.id}`} className="nirmex-faq-body">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: EXISTING CTA SECTION
          ===================================================================== */}
      <CTASection />

      {/* =====================================================================
          CHOICE PANEL MODAL (WHATSAPP vs GMAIL)
          ===================================================================== */}
      {choiceModalOpen && (
        <div
          className="nirmex-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="choice-modal-title"
          onClick={() => setChoiceModalOpen(false)}
        >
          <div className="nirmex-choice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nirmex-choice-modal__header">
              <h3 id="choice-modal-title" className="nirmex-choice-modal__title">
                Choose How to Send Your Enquiry
              </h3>
              <p className="nirmex-choice-modal__desc">
                Your enquiry details are ready. Please select your preferred platform to review and send directly to our team:
              </p>
            </div>

            <div className="nirmex-choice-options">
              {/* Option 1: WhatsApp */}
              <button
                type="button"
                className="nirmex-choice-btn nirmex-choice-btn--wa"
                onClick={handleSendWhatsApp}
              >
                <div className="nirmex-choice-icon nirmex-choice-icon--wa" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="nirmex-choice-info">
                  <strong>Send via WhatsApp</strong>
                  <span>Opens WhatsApp with prefilled enquiry to +91 96198 06901</span>
                </div>
                <span className="nirmex-choice-arrow" aria-hidden="true">›</span>
              </button>

              {/* Option 2: Gmail */}
              <button
                type="button"
                className="nirmex-choice-btn nirmex-choice-btn--gmail"
                onClick={handleSendGmail}
              >
                <div className="nirmex-choice-icon nirmex-choice-icon--gmail" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="nirmex-choice-info">
                  <strong>Send via Gmail / Email</strong>
                  <span>Opens Gmail compose with prefilled enquiry to info@nirmexmetal.com</span>
                </div>
                <span className="nirmex-choice-arrow" aria-hidden="true">›</span>
              </button>
            </div>

            <div className="nirmex-choice-modal__footer">
              <button
                type="button"
                className="nirmex-choice-cancel-btn"
                onClick={() => setChoiceModalOpen(false)}
              >
                Review or Edit Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;

