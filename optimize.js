/**
 * Performance Optimization and Browser Compatibility
 * Utility functions for optimizing performance and ensuring cross-browser compatibility
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Optimization utilities initialized');
  
  // Detect browser and apply specific fixes if needed
  detectBrowser();
  
  // Optimize animations based on device capability
  optimizeAnimations();
  
  // Lazy load images for better performance
  setupLazyLoading();
  
  // Preload critical assets
  preloadCriticalAssets();
  
  // Fix the footer position issue if it exists
  fixFooterPosition();
});

/**
 * Detect browser and apply specific fixes
 */
function detectBrowser() {
  const userAgent = navigator.userAgent;
  const browserInfo = document.createElement('div');
  browserInfo.style.display = 'none';
  
  // Check for Safari (known issues with some CSS animations)
  if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
    document.body.classList.add('safari');
    console.log('Safari detected - applying compatibility fixes');
    
    // Fix for Safari-specific glitch effect issues
    const glitchElements = document.querySelectorAll('.glitch-enhanced');
    glitchElements.forEach(element => {
      element.style.willChange = 'transform';
    });
  }
  
  // Check for Firefox (known issues with some CSS filters)
  if (userAgent.indexOf('Firefox') > -1) {
    document.body.classList.add('firefox');
    console.log('Firefox detected - applying compatibility fixes');
    
    // Adjust filter values for better Firefox compatibility
    const filterElements = document.querySelectorAll('.project-card, .security-badge');
    filterElements.forEach(element => {
      element.style.filter = 'none';
      element.style.backdropFilter = 'none';
      element.classList.add('firefox-fallback');
    });
  }
  
  // Check for IE/Edge legacy
  if (/MSIE|Trident|Edge/.test(userAgent) && !/Edge\//.test(userAgent)) {
    document.body.classList.add('ms-browser');
    console.log('Legacy Microsoft browser detected - applying fallbacks');
    
    // Disable advanced animations for old Edge/IE
    document.body.classList.add('reduced-motion');
  }
}

/**
 * Optimize animations based on device capability and user preference
 */
function optimizeAnimations() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
    console.log('Reduced motion preference detected - simplifying animations');
  }
  
  // Check for mobile device
  if (window.innerWidth <= 768) {
    document.body.classList.add('mobile-device');
    console.log('Mobile device detected - optimizing animations for performance');
    
    // Reduce animation complexity on mobile
    adjustAnimationPerformance();
  }
  
  // Monitor performance and adjust animations if needed
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      
      entries.forEach(entry => {
        if (entry.duration > 100) { // If frame takes too long
          console.log('Performance issue detected - reducing animation complexity');
          document.body.classList.add('reduced-animation-complexity');
          adjustAnimationPerformance();
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }
}

/**
 * Adjust animation performance based on device capability
 */
function adjustAnimationPerformance() {
  // Reduce the frequency of random glitches
  if (window.randomGlitchInterval) {
    clearInterval(window.randomGlitchInterval);
    window.randomGlitchInterval = setInterval(triggerRandomGlitch, 8000); // Less frequent
  }
  
  // Simplify digital rain effect
  const digitalRainCanvas = document.querySelector('.digital-rain');
  if (digitalRainCanvas && window.digitalRainSettings) {
    window.digitalRainSettings.density = 0.3; // Reduce density
    window.digitalRainSettings.speed = 0.7;  // Slow down speed
  }
  
  // Simplify other CPU-intensive animations
  document.querySelectorAll('.glitch-enhanced').forEach(el => {
    el.classList.add('simplified');
  });
}

/**
 * Setup lazy loading for images to improve loading time
 */
function setupLazyLoading() {
  // Use native lazy loading if supported
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  } else {
    // Implement a basic intersection observer for lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            imageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach(image => {
        imageObserver.observe(image);
      });
    }
  }
}

/**
 * Preload critical assets to improve initial load time
 */
function preloadCriticalAssets() {
  // Preload critical fonts
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
  ];
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Preload critical images
  const criticalImages = document.querySelectorAll('.hero img, .about-image img, .project-img img');
  criticalImages.forEach(img => {
    if (img.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    }
  });
}

/**
 * Fix the footer position issue
 */
function fixFooterPosition() {
  // Check if footer is misplaced
  const footer = document.querySelector('footer');
  if (footer && footer.parentElement !== document.body) {
    // Find the incorrect footer in head
    const incorrectFooter = document.querySelector('head footer');
    if (incorrectFooter) {
      // Remove the incorrect footer
      incorrectFooter.parentElement.removeChild(incorrectFooter);
      
      // Add footer at the correct position
      document.body.appendChild(footer);
      console.log('Fixed footer position issue');
    }
  }
}

/**
 * Debounce function to limit the rate at which a function can fire
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Attach window resize handler with debounce for better performance
window.addEventListener('resize', debounce(() => {
  console.log('Window resized - adjusting layout');
  
  // Update canvas dimensions if they exist
  const canvases = document.querySelectorAll('canvas');
  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Check if mobile optimization is needed
  if (window.innerWidth <= 768 && !document.body.classList.contains('mobile-device')) {
    document.body.classList.add('mobile-device');
    adjustAnimationPerformance();
  } else if (window.innerWidth > 768 && document.body.classList.contains('mobile-device')) {
    document.body.classList.remove('mobile-device');
    // Reset animation performance if back to desktop
    if ('restoreAnimationDefaults' in window) {
      window.restoreAnimationDefaults();
    }
  }
}, 250));
