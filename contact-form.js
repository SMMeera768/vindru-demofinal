// Contact Form Email Handler
const contactForm = document.getElementById('vindru-contact-form');
const formStatus = document.getElementById('form-status');

if(contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    formStatus.textContent = '';
    
    try {
      const formData = new FormData(contactForm);
      const response = await fetch('send-email.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if(result.success) {
        formStatus.textContent = result.message;
        formStatus.style.color = '#10b981';
        contactForm.reset();
      } else {
        formStatus.textContent = result.message;
        formStatus.style.color = '#ef4444';
      }
    } catch(error) {
      formStatus.textContent = 'Error sending message. Please try again.';
      formStatus.style.color = '#ef4444';
    } finally {
      // Hide loading
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
    }
  });
}
