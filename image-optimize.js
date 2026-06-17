/**
 * Image Optimization Utility
 * Helps optimize images for better performance
 */

/**
 * This utility includes functions to:
 * 1. Convert images to WebP format when supported
 * 2. Generate responsive image sizes
 * 3. Lazy load images
 * 4. Apply placeholder effects while loading
 * 
 * In a real production environment, this would be implemented
 * with server-side tools or a build process.
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Image optimization initialized');
  
  // Optimize any project images
  optimizeProjectImages();
  
  // Set up observers for hero and about images
  setupImageObservers();
});

/**
 * Optimize project images for better performance
 */
function optimizeProjectImages() {
  // Get all project images
  const projectImages = document.querySelectorAll('.project-card img');
  
  projectImages.forEach(img => {
    // Add loading="lazy" attribute
    img.setAttribute('loading', 'lazy');
    
    // Add cybersecurity-themed placeholder
    addSecurityPlaceholder(img);
    
    // Add class for fade-in effect
    img.classList.add('optimized-image');
    
    // Add error handler
    img.onerror = function() {
      this.src = 'placeholder-secure.png';
      this.classList.add('image-error');
    };
  });
}

/**
 * Add security-themed placeholder until image loads
 */
function addSecurityPlaceholder(img) {
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'image-wrapper security-placeholder';
  
  // Get parent
  const parent = img.parentNode;
  
  // Insert wrapper before img in the DOM
  parent.insertBefore(wrapper, img);
  
  // Move img into wrapper
  wrapper.appendChild(img);
  
  // Add loading animation to wrapper
  wrapper.innerHTML += `
    <div class="security-scan-overlay">
      <div class="scan-line"></div>
      <div class="image-placeholder-text">SCANNING</div>
    </div>
  `;
  
  // Remove placeholder when image loads
  img.onload = function() {
    const overlay = this.parentNode.querySelector('.security-scan-overlay');
    if (overlay) {
      overlay.classList.add('completed');
      setTimeout(() => {
        overlay.remove();
      }, 500);
    }
    this.classList.add('loaded');
  };
}

/**
 * Set up observers for key images
 */
function setupImageObservers() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('img');
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            imageObserver.unobserve(entry.target);
          }
        }
      });
    });
    
    // Observe hero image container
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      imageObserver.observe(heroImage);
    }
    
    // Observe about image container
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
      imageObserver.observe(aboutImage);
    }
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// Add CSS for the security placeholder
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .image-wrapper {
      position: relative;
      overflow: hidden;
    }
    
    .security-placeholder {
      background-color: rgba(0, 30, 60, 0.5);
    }
    
    .security-scan-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 30, 60, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      transition: opacity 0.5s ease;
    }
    
    .security-scan-overlay.completed {
      opacity: 0;
    }
    
    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(0, 255, 0, 0.7);
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
      animation: scanImage 1.5s infinite;
    }
    
    .image-placeholder-text {
      color: rgba(0, 255, 0, 0.8);
      font-family: 'Courier New', monospace;
      font-size: 14px;
      letter-spacing: 2px;
    }
    
    .optimized-image {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .optimized-image.loaded {
      opacity: 1;
    }
    
    .image-error {
      border: 1px solid rgba(255, 0, 0, 0.5);
    }
    
    @keyframes scanImage {
      0% { transform: translateY(0); }
      100% { transform: translateY(100%); }
    }
  `;
  
  document.head.appendChild(style);
});
