/**
 * Project Image Replacement 
 * Replaces placeholder images with high-quality cybersecurity-themed images
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Image replacement initialized');
  
  // Set up project images with proper loading attributes
  setupProjectImages();
  
  // Use Intersection Observer to load images only when visible
  observeProjectCards();
});

/**
 * Replace placeholder images with real cybersecurity-themed images
 */
function setupProjectImages() {
  // Define high-quality project images with proper alt text
  const projectImages = [
    {
      category: 'cybersecurity',
      src: 'images/security-scanner-project.webp',
      alt: 'Security vulnerability scanner interface showing a network scan in progress',
      fallback: 'images/security-scanner-project.jpg'
    },
    {
      category: 'python',
      src: 'images/data-encryption-project.webp',
      alt: 'Data encryption visualization showing secure data transfer',
      fallback: 'images/data-encryption-project.jpg'
    },
    {
      category: 'cybersecurity',
      src: 'images/network-monitor-project.webp',
      alt: 'Network traffic monitoring dashboard with real-time threat detection',
      fallback: 'images/network-monitor-project.jpg'
    },
    {
      category: 'web',
      src: 'images/secure-web-app-project.webp',
      alt: 'Secure web application interface with authentication system',
      fallback: 'images/secure-web-app-project.jpg'
    },
    {
      category: 'python',
      src: 'images/ml-threat-detection-project.webp',
      alt: 'Machine learning-based threat detection system visualizing patterns',
      fallback: 'images/ml-threat-detection-project.jpg'
    },
    {
      category: 'web',
      src: 'images/secure-api-project.webp',
      alt: 'Secure API gateway with authentication and authorization controls',
      fallback: 'images/secure-api-project.jpg'
    }
  ];

  // Create directory for images if it doesn't exist
  createImagesDirectory();
  
  // Get all project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  // Apply images to project cards
  projectCards.forEach((card, index) => {
    // Get the image element inside the card
    const imgElement = card.querySelector('.project-img img');
    
    if (imgElement && index < projectImages.length) {
      const imageInfo = projectImages[index];
      
      // Set data attributes for lazy loading
      imgElement.setAttribute('data-src', imageInfo.src);
      imgElement.setAttribute('data-fallback', imageInfo.fallback);
      imgElement.setAttribute('alt', imageInfo.alt);
      
      // Add category class to card if not already added
      if (card.dataset.category === undefined) {
        card.dataset.category = imageInfo.category;
      }
      
      // Add loading="lazy" for browsers that support it
      imgElement.setAttribute('loading', 'lazy');
      
      // Add error handling
      imgElement.onerror = function() {
        // If WebP fails, try the fallback JPG
        if (this.src.endsWith('.webp')) {
          this.src = this.getAttribute('data-fallback');
        }
      };
    }
  });
}

/**
 * Use Intersection Observer to load images only when visible
 */
function observeProjectCards() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const imgElement = card.querySelector('.project-img img');
          
          if (imgElement && imgElement.hasAttribute('data-src')) {
            // Apply scanning effect before loading image
            card.querySelector('.project-img').classList.add('scanning');
            
            // Set a timeout to simulate security scanning
            setTimeout(() => {
              // Load the image
              imgElement.src = imgElement.getAttribute('data-src');
              
              // Add animation class
              imgElement.classList.add('fade-in');
              
              // Remove scanning class after image loads
              imgElement.onload = function() {
                card.querySelector('.project-img').classList.remove('scanning');
              };
              
              // Stop observing once loaded
              observer.unobserve(card);
            }, 500);
          }
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    loadAllProjectImages();
  }
}

/**
 * Fallback image loading for browsers without Intersection Observer
 */
function loadAllProjectImages() {
  document.querySelectorAll('.project-img img').forEach(img => {
    if (img.hasAttribute('data-src')) {
      img.src = img.getAttribute('data-src');
    }
  });
}

/**
 * Create images directory if it doesn't exist
 */
function createImagesDirectory() {
  // In a real application, this would be handled server-side
  // For this client-side demo, we'll just log a message
  console.log('Image directory should be created at server side');
  
  // Normally would use something like:
  // const fs = require('fs');
  // if (!fs.existsSync('./images')) {
  //   fs.mkdirSync('./images');
  // }
}

/**
 * Generate sample images (in a real project, you would download/create actual images)
 */
function generateSampleImages() {
  // This is just placeholder code for demonstration
  console.log('In a production environment, actual images should be used');
  
  // Create images directory in the server
  // Use actual cybersecurity-themed images
}
