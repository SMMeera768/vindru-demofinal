// Quote Modal Functionality
(function() {
  'use strict';

  // Create modal HTML
  const modalHTML = `
    <div class="quote-modal" id="quoteModal">
      <div class="quote-content">
        <button class="quote-close" aria-label="Close quote request form">&times;</button>
        <h3>Request a Quote</h3>
        <p>Fill out the form below and our team will get back to you within 24 hours.</p>
        
        <form class="quote-form" id="quoteForm">
          <div class="form-group">
            <label for="quoteName">Full Name *</label>
            <input type="text" id="quoteName" name="name" required placeholder="John Doe">
          </div>
          
          <div class="form-group">
            <label for="quoteEmail">Email Address *</label>
            <input type="email" id="quoteEmail" name="email" required placeholder="john@company.com">
          </div>
          
          <div class="form-group">
            <label for="quotePhone">Phone Number</label>
            <input type="tel" id="quotePhone" name="phone" placeholder="+1 234 567 8900">
          </div>
          
          <div class="form-group">
            <label for="quoteProduct">Product Interest *</label>
            <select id="quoteProduct" name="product" required>
              <option value="">Select a product...</option>
              <option value="drill-rigs">Drill Rigs</option>
              <option value="hammers">Hammers</option>
              <option value="drill-bits">Drill Bits</option>
              <option value="drill-pipes">Drill Pipes</option>
              <option value="compressors">Compressors & Pumps</option>
              <option value="engines">Engines</option>
              <option value="accessories">Accessories</option>
              <option value="used-equipment">Used Equipment</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="quoteMessage">Additional Details</label>
            <textarea id="quoteMessage" name="message" placeholder="Tell us about your project requirements..."></textarea>
          </div>
          
          <button type="submit" class="quote-submit">Submit Request</button>
        </form>
      </div>
    </div>
  `;

  // Insert modal into page
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('quoteModal');
    const closeBtn = modal.querySelector('.quote-close');
    const form = document.getElementById('quoteForm');

    // Open modal function
    window.openQuoteModal = function() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Update ARIA
      const menuToggle = document.getElementById('menuToggle');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    };

    // Close modal function
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      form.reset();
      
      // Update ARIA
      const menuToggle = document.getElementById('menuToggle');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }

    // Close button
    closeBtn.addEventListener('click', closeModal);

    // Click outside to close
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send to your backend
      console.log('Quote request submitted:', data);
      
      // Show success message (you can customize this)
      alert('Thank you! Your quote request has been submitted. We will contact you within 24 hours.');
      
      closeModal();
    });

    // Add click handlers to all quote buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('request-quote-btn') || 
          e.target.closest('.request-quote-btn')) {
        e.preventDefault();
        openQuoteModal();
      }
    });
  });
})();
