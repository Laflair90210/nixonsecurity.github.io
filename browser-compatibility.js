/**
 * Cross-Browser Compatibility Testing
 * Tests features and applies fixes for different browsers
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Browser compatibility testing initialized');
  
  // Run compatibility tests
  testCompatibility();
  
  // Check for WebP support
  checkWebpSupport();
  
  // Check CSS feature support
  checkCssFeatureSupport();
  
  // Log browser and feature support
  logBrowserSupport();
});

/**
 * Test compatibility with various browser features
 */
function testCompatibility() {
  const tests = {
    flexbox: supportsFlex(),
    grid: supportsGrid(),
    webp: supportsWebP(),
    webgl: supportsWebGL(),
    animations: supportsAnimations(),
    backdrop: supportsBackdropFilter()
  };
  
  // Apply fixes based on test results
  applyCompatibilityFixes(tests);
}

/**
 * Apply fixes for browser compatibility issues
 */
function applyCompatibilityFixes(tests) {
  // Add classes to the body element to indicate feature support
  for (const [feature, supported] of Object.entries(tests)) {
    if (supported) {
      document.body.classList.add(`supports-${feature}`);
    } else {
      document.body.classList.add(`no-${feature}`);
      console.log(`Applying fallback for unsupported feature: ${feature}`);
    }
  }
  
  // Flexbox fallback
  if (!tests.flexbox) {
    const flexContainers = document.querySelectorAll('.skills-content, .projects-grid, .about-content');
    flexContainers.forEach(container => {
      container.classList.add('flex-fallback');
    });
  }
  
  // Grid fallback
  if (!tests.grid) {
    const gridContainers = document.querySelectorAll('.projects-grid');
    gridContainers.forEach(container => {
      container.classList.add('grid-fallback');
    });
  }
  
  // Animation fallback
  if (!tests.animations) {
    document.body.classList.add('reduced-motion');
  }
  
  // WebGL fallback for complex animations
  if (!tests.webgl) {
    document.body.classList.add('no-webgl');
    
    // Disable or simplify WebGL-dependent features
    const digitalRainContainer = document.querySelector('.digital-rain-container');
    if (digitalRainContainer) {
      digitalRainContainer.style.display = 'none';
    }
  }
  
  // Backdrop filter fallback
  if (!tests.backdrop) {
    const elementsWithBackdrop = document.querySelectorAll('.project-info, .nav-blur, .modal');
    elementsWithBackdrop.forEach(el => {
      el.classList.add('backdrop-fallback');
    });
  }
}

/**
 * Check for WebP support
 */
function checkWebpSupport() {
  const webpTest = new Image();
  webpTest.onload = function() {
    document.body.classList.add('webp');
  };
  webpTest.onerror = function() {
    document.body.classList.add('no-webp');
    
    // Apply fallbacks for WebP images
    const images = document.querySelectorAll('img[data-fallback]');
    images.forEach(img => {
      if (img.src.endsWith('.webp')) {
        img.src = img.getAttribute('data-fallback');
      }
    });
  };
  webpTest.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
}

/**
 * Check CSS feature support and apply fallbacks
 */
function checkCssFeatureSupport() {
  // Check for CSS custom properties (variables)
  if (!supportsCssVariables()) {
    console.log('CSS Variables not supported - applying fallbacks');
    applyCssVariableFallbacks();
  }
  
  // Check for clip-path support
  if (!supportsClipPath()) {
    console.log('clip-path not supported - applying fallbacks');
    const clipPathElements = document.querySelectorAll('.glitch span, .cyber-mask');
    clipPathElements.forEach(el => {
      el.classList.add('clip-fallback');
    });
  }
}

/**
 * Log browser information and feature support
 */
function logBrowserSupport() {
  const browserInfo = {
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    language: navigator.language,
    platform: navigator.platform,
    cookiesEnabled: navigator.cookieEnabled,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pixelRatio: window.devicePixelRatio || 1
  };
  
  console.log('Browser information:', browserInfo);
}

/**
 * Utility functions to test feature support
 */
function supportsFlex() {
  const test = document.createElement('div');
  test.style.display = 'flex';
  return test.style.display === 'flex';
}

function supportsGrid() {
  const test = document.createElement('div');
  test.style.display = 'grid';
  return test.style.display === 'grid';
}

function supportsWebP() {
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function supportsAnimations() {
  const style = document.createElement('div').style;
  return 'animation' in style || 'webkitAnimation' in style;
}

function supportsCssVariables() {
  return window.CSS && CSS.supports('(--test: 0)');
}

function supportsClipPath() {
  const style = document.createElement('div').style;
  return 'clipPath' in style || 'webkitClipPath' in style;
}

function supportsBackdropFilter() {
  const style = document.createElement('div').style;
  return 'backdropFilter' in style || 'webkitBackdropFilter' in style;
}

/**
 * Apply fallbacks for CSS variables for older browsers
 */
function applyCssVariableFallbacks() {
  // Fallback colors
  const fallbacks = {
    '--primary-color': '#00ff66',
    '--secondary-color': '#0088ff',
    '--bg-color': '#0a192f',
    '--text-color': '#e6f1ff',
    '--accent-color': '#64ffda'
  };
  
  // Apply fallbacks
  Object.entries(fallbacks).forEach(([variable, value]) => {
    document.querySelectorAll('*').forEach(el => {
      const computedStyle = getComputedStyle(el);
      if (computedStyle.getPropertyValue(variable)) {
        el.style.setProperty(variable.replace('--', ''), value);
      }
    });
  });
}
