/**
 * Matrix Rain Triggers
 * Adds custom triggers for the Matrix-style digital rain animation
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Matrix triggers initialized');
  
  // Add click handlers to security-themed elements to trigger Matrix effect
  setupMatrixTriggers();
  
  // Add keyboard shortcut for manually triggering the effect (Ctrl+Shift+M)
  setupKeyboardShortcut();
});

/**
 * Setup triggers for Matrix rain effect
 */
function setupMatrixTriggers() {
  // Elements that will trigger the Matrix effect when clicked
  const triggerElements = [
    '.security-badge',
    '.footer-logo',
    '.encryption-line',
    '.binary-footer'
  ];
  
  // Add click handlers
  triggerElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.addEventListener('click', function(e) {
        // Don't trigger if it's part of a link
        if (e.target.closest('a')) return;
        
        // Trigger the Matrix effect with a slightly longer duration
        if (window.triggerMatrixRain) {
          window.triggerMatrixRain(6000);
        }
        
        // Add a temporary class for feedback
        this.classList.add('matrix-triggered');
        
        // Remove the class after animation completes
        setTimeout(() => {
          this.classList.remove('matrix-triggered');
        }, 1000);
      });
    });
  });
}

/**
 * Setup keyboard shortcut (Ctrl+Shift+M) for manually triggering the Matrix effect
 */
function setupKeyboardShortcut() {
  document.addEventListener('keydown', function(e) {
    // Check for Ctrl+Shift+M (77 is the key code for M)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 77) {
      if (window.triggerMatrixRain) {
        window.triggerMatrixRain(7000);
        
        // Show a temporary notification
        showNotification("Matrix mode activated");
      }
    }
  });
}

/**
 * Show a temporary notification
 */
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.matrix-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'matrix-notification';
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(0, 30, 60, 0.9)';
    notification.style.color = '#0fa';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.border = '1px solid #0fa';
    notification.style.fontFamily = 'monospace';
    notification.style.zIndex = '10000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    notification.style.textShadow = '0 0 5px #0fa';
  }
  
  // Set message and show
  notification.textContent = message;
  notification.style.opacity = '1';
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
  }, 3000);
}

// Add a css style for the matrix-triggered class
const style = document.createElement('style');
style.textContent = `
.matrix-triggered {
  animation: matrixPulse 1s ease;
}

@keyframes matrixPulse {
  0% { box-shadow: 0 0 0 rgba(0, 255, 170, 0.7); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 170, 0.7); }
  100% { box-shadow: 0 0 0 rgba(0, 255, 170, 0.7); }
}
`;
document.head.appendChild(style);
