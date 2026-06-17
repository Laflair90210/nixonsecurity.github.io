/**
 * Cybersecurity-themed error handling
 * Adds an immersive error display mechanism with glitching effects
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Error handling system initialized');
  
  // Setup error overlay
  setupErrorOverlay();
  
  // Add security warning to demonstrate features
  addSecurityWarning();
  
  // Add event listener to project cards to simulate security scanning
  setupSecuritySimulation();
});

/**
 * Create error overlay container
 */
function setupErrorOverlay() {
  // Create digital distortion overlay
  const distortion = document.createElement('div');
  distortion.classList.add('digital-distortion');
  document.body.appendChild(distortion);
}

/**
 * Display a simulated error with glitch animation
 * @param {string} message - Error message to display
 * @param {string} code - Error code to show (optional)
 */
function showError(message, code = 'ERR_SECURITY_001') {
  // Create error container
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');
  
  // Create error message element
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  
  // Create error code element
  const errorCode = document.createElement('div');
  errorCode.classList.add('error-code');
  errorCode.textContent = code;
  
  // Assemble the error container
  errorContainer.appendChild(errorMessage);
  errorContainer.appendChild(errorCode);
  document.body.appendChild(errorContainer);
  
  // Add brief distortion effect
  const distortion = document.querySelector('.digital-distortion');
  distortion.style.opacity = '1';
  
  setTimeout(() => {
    distortion.style.opacity = '0';
  }, 500);
  
  // Remove after some time
  setTimeout(() => {
    errorContainer.style.opacity = '0';
    setTimeout(() => {
      errorContainer.remove();
    }, 300);
  }, 5000);
}

/**
 * Add security warning to the page
 */
function addSecurityWarning() {
  const warningContainer = document.createElement('div');
  warningContainer.classList.add('security-warning');
  warningContainer.innerHTML = '<i class="fas fa-shield-alt"></i> Secure connection established';
  
  document.body.appendChild(warningContainer);
  
  // Remove after some time
  setTimeout(() => {
    warningContainer.style.opacity = '0';
    setTimeout(() => {
      warningContainer.remove();
    }, 500);
  }, 8000);
}

/**
 * Setup simulated security scanning on project elements
 */
function setupSecuritySimulation() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      // Display simulated scanning only ~20% of the time
      if (Math.random() < 0.2) {
        simulateSecurityScan(card);
      }
    });
  });
}

/**
 * Simulate a security scan on an element
 * @param {HTMLElement} element - Element to scan
 */
function simulateSecurityScan(element) {
  // Add scanning class
  element.classList.add('scanning');
  
  // Create scanning overlay
  const scanner = document.createElement('div');
  scanner.classList.add('scanner-overlay');
  scanner.innerHTML = `
    <div class="scan-line"></div>
    <div class="scan-text">SCANNING</div>
  `;
  element.appendChild(scanner);
  
  // Show scanning message
  setTimeout(() => {
    showError('Security scan in progress...', 'SEC_SCAN_ACTIVE');
  }, 500);
  
  // Remove scanning overlay after delay
  setTimeout(() => {
    scanner.remove();
    element.classList.remove('scanning');
  }, 3000);
}

// Export for external use
window.showError = showError;
