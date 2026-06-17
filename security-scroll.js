/**
 * Enhanced Scrolling with Security Themes
 * Adds scroll-triggered security animations and effects
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Security scroll effects initialized');
  
  // Initialize scroll effects
  initScrollEffects();
  
  // Setup scroll-triggered animations
  setupScrollAnimations();
  
  // Add security scan indicator to scrollbar
  createSecurityScrollIndicator();
});

/**
 * Initialize basic scroll effects
 */
function initScrollEffects() {
  // Track scrolling for effects
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Handle header visibility
    handleHeaderVisibility(scrollTop, scrollDirection);
    
    // Apply scroll-based effects
    applyScrollEffects(scrollTop);
    
    // Update scan position in the scrollbar indicator
    updateScrollIndicator(scrollTop);
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

/**
 * Handle header visibility on scroll
 */
function handleHeaderVisibility(scrollTop, direction) {
  const header = document.querySelector('header');
  if (!header) return;
  
  // Add/remove fixed class based on scroll position
  if (scrollTop > 100) {
    header.classList.add('fixed');
    
    // Hide on scroll down, show on scroll up
    if (direction === 'down') {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
  } else {
    header.classList.remove('fixed');
    header.classList.remove('hidden');
  }
}

/**
 * Apply various scroll-based effects
 */
function applyScrollEffects(scrollTop) {
  // Parallax for background elements
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.2;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
  
  // Trigger random glitches on scroll
  if (scrollTop % 250 < 15 && Math.random() > 0.7) { // Occasionally trigger
    triggerRandomGlitch();
  }
  
  // Change security status based on scroll depth
  updateSecurityStatus(scrollTop);
}

/**
 * Setup scroll-triggered animations using ScrollReveal
 */
function setupScrollAnimations() {
  // Check if ScrollReveal is available
  if (typeof ScrollReveal === 'function') {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1000,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      interval: 100,
      opacity: 0,
      origin: 'bottom',
      reset: false
    });
    
    // Reveal hero elements
    sr.reveal('.hero-text > *', {
      interval: 150,
      cleanup: true
    });
    
    // Reveal about section
    sr.reveal('.about-content > div', {
      origin: 'left',
      interval: 200
    });
    
    // Reveal skills with scanner effect
    sr.reveal('.skill-category', {
      origin: 'right',
      interval: 150,
      beforeReveal: function(element) {
        element.classList.add('scanning');
        setTimeout(() => {
          element.classList.remove('scanning');
        }, 1000);
      }
    });
    
    // Reveal project cards with security scan
    sr.reveal('.project-card', {
      interval: 100,
      beforeReveal: function(element) {
        // Add security scan effect before revealing
        element.classList.add('scanning');
        setTimeout(() => {
          element.classList.remove('scanning');
          element.classList.add('validated');
        }, 800);
      }
    });
    
    // Reveal contact form with encryption effect
    sr.reveal('#contactForm', {
      beforeReveal: function(element) {
        element.classList.add('decrypting');
        setTimeout(() => {
          element.classList.remove('decrypting');
        }, 1200);
      }
    });
  }
}

/**
 * Create security-themed scroll indicator 
 */
function createSecurityScrollIndicator() {
  // Create container
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'security-scroll-indicator';
  
  // Create the scanner effect
  const scanner = document.createElement('div');
  scanner.className = 'scroll-scanner';
  
  // Create the track
  const scrollTrack = document.createElement('div');
  scrollTrack.className = 'scroll-track';
  
  // Add scanner to track
  scrollTrack.appendChild(scanner);
  scrollIndicator.appendChild(scrollTrack);
  
  // Add to body
  document.body.appendChild(scrollIndicator);
  
  // Initialize scanner position
  updateScrollIndicator(window.pageYOffset || document.documentElement.scrollTop);
}

/**
 * Update scroll indicator position
 */
function updateScrollIndicator(scrollTop) {
  const scanner = document.querySelector('.scroll-scanner');
  if (!scanner) return;
  
  const docHeight = Math.max(
    document.body.scrollHeight, 
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  
  const windowHeight = window.innerHeight;
  const scrollPercent = scrollTop / (docHeight - windowHeight);
  
  scanner.style.top = `${scrollPercent * 100}%`;
}

/**
 * Update security status based on scroll depth
 */
function updateSecurityStatus(scrollTop) {
  // Calculate how far user has scrolled through the document
  const docHeight = Math.max(
    document.body.scrollHeight, 
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  
  const windowHeight = window.innerHeight;
  const scrollPercent = scrollTop / (docHeight - windowHeight);
  
  // Get or create security status element
  let securityStatus = document.querySelector('.security-status');
  
  if (!securityStatus) {
    securityStatus = document.createElement('div');
    securityStatus.className = 'security-status';
    document.body.appendChild(securityStatus);
  }
  
  // Update security status based on scroll depth
  if (scrollPercent < 0.2) {
    securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Perimeter Secure';
    securityStatus.className = 'security-status level-1';
  } else if (scrollPercent < 0.5) {
    securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Access Granted: Level 2';
    securityStatus.className = 'security-status level-2';
  } else if (scrollPercent < 0.8) {
    securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Confidential Access: Level 3';
    securityStatus.className = 'security-status level-3';
  } else {
    securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Top Clearance Achieved';
    securityStatus.className = 'security-status level-4';
  }
}

/**
 * Trigger a random glitch effect somewhere on the page
 */
function triggerRandomGlitch() {
  if (typeof window.triggerGlitch !== 'function') {
    console.log('Glitch function not available');
    return;
  }
  
  // Select random element to glitch
  const glitchTargets = [
    '.section-header h2',
    '.hero h1',
    '.security-badge',
    '.footer-logo'
  ];
  
  const randomTarget = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
  const elements = document.querySelectorAll(randomTarget);
  
  if (elements.length > 0) {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    window.triggerGlitch(randomElement);
  }
}
