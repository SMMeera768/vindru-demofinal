// Modern Hero Animations
document.addEventListener('DOMContentLoaded', () => {
  
  // Typing Effect
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 1000);
  }
  
  // Counter Animation
  const counters = document.querySelectorAll('.hero-stat-number');
  const speed = 200;
  
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;
    let count = 0;
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count) + '+';
        setTimeout(updateCount, 10);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCount();
  };
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
  
  // Parallax Effect
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-animation, .hero-particles');
    
    parallaxElements.forEach(el => {
      el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  });
  
});
