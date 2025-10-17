// ===== PORTFOLIO INTERACTIVITY & ANIMATIONS =====

document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });

  // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== SCROLL INDICATOR =====
  const scrollIndicator = document.querySelector('.scroll-arrow');

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function (e) {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .skill-category, .project-card, .contact-info-item, .stat-item, .process-step, .benefit-item, .trust-stat, .testimonial-card, .success-metric, .value-prop');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // ===== TYPING ANIMATION FOR HERO TEXT =====
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');

  if (heroTitle && heroSubtitle) {
    // Add typing effect to hero title
    typeWriter(heroTitle, "Transform Your Ideas Into Digital Reality", 100);

    // Add typing effect to subtitle after title is done
    setTimeout(() => {
      typeWriter(heroSubtitle, "Professional Full-Stack Web & Mobile Developer", 80);
    }, 3000);
  }

  // ===== HERO BENEFITS ANIMATION =====
  const benefitItems = document.querySelectorAll('.benefit-item');
  benefitItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.classList.add('animate-fade-in');
  });

  // ===== TRUST STATS ANIMATION =====
  const trustStats = document.querySelectorAll('.trust-stat');
  trustStats.forEach((stat, index) => {
    stat.style.animationDelay = `${index * 0.3}s`;
    stat.classList.add('animate-fade-in');
  });

  // ===== VALUE PROPS ANIMATION =====
  const valueProps = document.querySelectorAll('.value-prop');
  valueProps.forEach((prop, index) => {
    prop.style.animationDelay = `${index * 0.2}s`;
    prop.classList.add('animate-fade-in');
  });

  // ===== SUCCESS METRICS ANIMATION =====
  const successMetrics = document.querySelectorAll('.success-metric');
  successMetrics.forEach((metric, index) => {
    metric.style.animationDelay = `${index * 0.2}s`;
    metric.classList.add('animate-fade-in');
  });

  // ===== SKILL ITEMS HOVER EFFECT =====
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateX(10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateX(0) scale(1)';
    });
  });

  // ===== PROJECT CARDS INTERACTION =====
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    const image = card.querySelector('.project-image img');

    card.addEventListener('mouseenter', function () {
      if (overlay && image) {
        overlay.style.opacity = '1';
        image.style.transform = 'scale(1.1)';
      }
    });

    card.addEventListener('mouseleave', function () {
      if (overlay && image) {
        overlay.style.opacity = '0';
        image.style.transform = 'scale(1)';
      }
    });
  });

  // ===== SOCIAL ICONS INTERACTION =====
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.1)';
    });

    icon.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===== STATS COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + (target === 3 ? '+' : target === 15 ? '+' : target === 10 ? '+' : '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + (target === 3 ? '+' : target === 15 ? '+' : target === 10 ? '+' : '');
      }
    }, 16);
  };

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          if (!isNaN(target)) {
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-row');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ===== ENHANCED FORM VALIDATION =====
  const quickContactForm = document.querySelector('#quickContactForm');
  if (quickContactForm) {
    // Real-time validation
    const inputs = quickContactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });

    quickContactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (validateForm()) {
        await submitForm(this);
      }
    });
  }

  // ===== FORM VALIDATION FUNCTIONS =====
  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(e);

    // Validation rules
    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
          isValid = false;
        }
        break;

      case 'email':
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!isValidEmail(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;

      case 'service':
        if (!value) {
          errorMessage = 'Please select a service';
          isValid = false;
        }
        break;

      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
          isValid = false;
        }
        break;

      case 'consent':
        if (!field.checked) {
          errorMessage = 'You must agree to the privacy policy';
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      showFieldError(field, errorMessage);
    }

    return isValid;
  }

  function validateForm() {
    const form = document.querySelector('#quickContactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      const event = { target: input };
      if (!validateField(event)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('is-invalid');
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  function showFieldError(field, message) {
    field.classList.add('is-invalid');
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ===== FORM SUBMISSION =====
  async function submitForm(form) {
    const submitBtn = form.querySelector('#submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnProgress = submitBtn.querySelector('.btn-progress');
    const formFeedback = document.getElementById('formFeedback');

    // Show loading state with enhanced animations
    submitBtn.disabled = true;

    // Add loading classes for smooth transitions
    btnLoading.classList.remove('d-none');
    btnLoading.classList.add('show');
    btnProgress.classList.remove('d-none');
    btnProgress.classList.add('show');

    // Hide text with animation
    btnText.style.opacity = '0';
    btnText.style.transform = 'translateY(-10px)';

    try {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Simulate API call (replace with actual endpoint)
      await simulateFormSubmission(data);

      // Success state
      formFeedback.innerHTML = `
        <div class="alert alert-success" role="alert">
          <i class="fas fa-check-circle me-2"></i>
          <strong>Success!</strong> Your message has been sent. I'll get back to you within 24 hours.
        </div>
      `;

      // Auto-hide success alert after 30 seconds
      setTimeout(() => {
        const successAlert = formFeedback.querySelector('.alert-success');
        if (successAlert) {
          successAlert.style.transition = 'opacity 0.5s ease-out';
          successAlert.style.opacity = '0';
          setTimeout(() => {
            formFeedback.innerHTML = '';
          }, 100);
        }
      }, 5000);

      showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
      form.reset();

    } catch (error) {
      // Error state
      formFeedback.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          <strong>Error!</strong> There was a problem sending your message. Please try again or contact me directly.
        </div>
      `;

      showNotification('Failed to send message. Please try again.', 'error');
      console.error('Form submission error:', error);

    } finally {
      // Reset button state with smooth transitions
      setTimeout(() => {
        submitBtn.disabled = false;

        // Hide loading elements
        btnLoading.classList.remove('show');
        btnProgress.classList.remove('show');

        // Show text with animation
        btnText.style.opacity = '1';
        btnText.style.transform = 'translateY(0)';

        // Clean up after animations complete
        setTimeout(() => {
          btnLoading.classList.add('d-none');
          btnProgress.classList.add('d-none');
        }, 300);
      }, 500); // Small delay to show completion
    }
  }

  // Simulate form submission (replace with actual API call)
  function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve({ success: true, data });
        } else {
          reject(new Error('Simulated network error'));
        }
      }, 2000);
    });
  }

  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
        width: 100%;
        pointer-events: none;
      `;
      document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Get icon and colors based on type
    const notificationConfig = {
      success: {
        icon: 'fas fa-check-circle',
        bgColor: '#10b981',
        borderColor: '#059669',
        iconColor: '#ffffff',
        textColor: '#ffffff'
      },
      error: {
        icon: 'fas fa-exclamation-circle',
        bgColor: '#ef4444',
        borderColor: '#dc2626',
        iconColor: '#ffffff',
        textColor: '#ffffff'
      },
      info: {
        icon: 'fas fa-info-circle',
        bgColor: '#3b82f6',
        borderColor: '#2563eb',
        iconColor: '#ffffff',
        textColor: '#ffffff'
      },
      warning: {
        icon: 'fas fa-exclamation-triangle',
        bgColor: '#f59e0b',
        borderColor: '#d97706',
        iconColor: '#ffffff',
        textColor: '#ffffff'
      }
    };

    const config = notificationConfig[type] || notificationConfig.info;

    // Create notification HTML structure
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <i class="${config.icon}"></i>
        </div>
        <div class="notification-body">
          <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="notification-progress"></div>
    `;

    // Add comprehensive styles
    notification.style.cssText = `
      background: ${config.bgColor};
      border: 1px solid ${config.borderColor};
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transform: translateX(100%) scale(0.95);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      overflow: hidden;
      position: relative;
    `;

    // Add CSS for internal elements
    const style = document.createElement('style');
    style.textContent = `
      .notification-content {
        display: flex;
        align-items: flex-start;
        padding: 16px;
        gap: 12px;
        position: relative;
        z-index: 2;
      }
      
      .notification-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${config.iconColor};
        font-size: 18px;
      }
      
      .notification-body {
        flex: 1;
        min-width: 0;
      }
      
      .notification-message {
        color: ${config.textColor};
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        margin: 0;
        word-wrap: break-word;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: ${config.textColor};
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
      
      .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      .notification-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.3);
        width: 100%;
        transform-origin: left;
        animation: notificationProgress 5s linear forwards;
      }
      
      @keyframes notificationProgress {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
      }
      
      @media (max-width: 480px) {
        #notification-container {
          right: 10px;
          left: 10px;
          max-width: none;
        }
        
        .notification-content {
          padding: 14px;
        }
        
        .notification-message {
          font-size: 13px;
        }
      }
    `;

    // Add styles to head if not already added
    if (!document.getElementById('notification-styles')) {
      style.id = 'notification-styles';
      document.head.appendChild(style);
    }

    // Add to container
    notificationContainer.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0) scale(1)';
      notification.style.opacity = '1';
    });

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      hideNotification(notification);
    });

    // Auto-hide after 5 seconds
    const autoHideTimer = setTimeout(() => {
      hideNotification(notification);
    }, 5000);

    // Store timer reference for potential manual close
    notification._autoHideTimer = autoHideTimer;

    return notification;
  }

  function hideNotification(notification) {
    if (!notification || !notification.parentNode) return;

    // Clear auto-hide timer if it exists
    if (notification._autoHideTimer) {
      clearTimeout(notification._autoHideTimer);
    }

    // Animate out
    notification.style.transform = 'translateX(100%) scale(0.95)';
    notification.style.opacity = '0';

    // Remove from DOM after animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  }

  // ===== SCROLL TO TOP BUTTON =====
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');

  // Style the button
  Object.assign(scrollToTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
    transform: 'translateY(100px)',
    transition: 'all 0.3s ease',
    zIndex: '1000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
      scrollToTopBtn.style.transform = 'translateY(100px)';
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== PERFORMANCE OPTIMIZATION =====
  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener('keydown', function (e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }

    // Arrow keys for navigation (when focus is on nav)
    const activeNavLink = document.querySelector('.nav-link:focus');
    if (activeNavLink && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      const navLinksArray = Array.from(navLinks);
      const currentIndex = navLinksArray.indexOf(activeNavLink);
      let nextIndex;

      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navLinksArray.length - 1;
      } else {
        nextIndex = currentIndex < navLinksArray.length - 1 ? currentIndex + 1 : 0;
      }

      navLinksArray[nextIndex].focus();
    }
  });

  // ===== ACCESSIBILITY IMPROVEMENTS =====
  // Add skip link for screen readers
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;

  skipLink.addEventListener('focus', function () {
    this.style.top = '6px';
  });

  skipLink.addEventListener('blur', function () {
    this.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const mainContent = document.querySelector('#home');
  if (mainContent) {
    mainContent.id = 'main-content';
  }

  // Initialize pricing quote buttons
  initPricingQuoteButtons();

  console.log('Portfolio loaded successfully! 🚀');
});

// ===== TYPING ANIMATION FUNCTION =====
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ===== PRICING QUOTE BUTTONS =====
function initPricingQuoteButtons() {
  const quoteButtons = document.querySelectorAll('.pricing-tier .btn');

  quoteButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Get the tier name from the parent pricing tier
      const pricingTier = this.closest('.pricing-tier');
      const tierName = pricingTier.querySelector('.tier-name').textContent;

      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Pre-fill the service dropdown after a short delay
        setTimeout(() => {
          const serviceSelect = document.getElementById('contactService');
          if (serviceSelect) {
            // Map tier names to service options
            const serviceMapping = {
              'Starter': 'web-development',
              'Business': 'web-development',
              'Premium': 'web-development'
            };

            const serviceValue = serviceMapping[tierName] || 'web-development';
            serviceSelect.value = serviceValue;

            // Add a note about the selected tier in the message
            const messageTextarea = document.getElementById('contactMessage');
            if (messageTextarea && !messageTextarea.value.trim()) {
              messageTextarea.value = `I'm interested in the ${tierName} package for web development. `;
              messageTextarea.focus();
            }
          }
        }, 500);
      }
    });
  });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
  console.error('JavaScript error:', e.error);
});

// ===== SERVICE WORKER REGISTRATION (for PWA features) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed');
      });
  });
}