/**
 * Security-themed form validation
 * Adds cybersecurity-style validation and submission effects
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Security form validation initialized');
  
  // Get the contact form element
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // submission handled by script.js — only add input validation here
    setupSecurityInputs();
  }
});

/**
 * Set up security-themed input validation
 */
function setupSecurityInputs() {
  const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
  
  inputs.forEach(input => {
    // Add "checking" class on focus
    input.addEventListener('focus', function() {
      this.classList.add('scanning');
      
      // Remove checking class after 1 second
      setTimeout(() => {
        this.classList.remove('scanning');
      }, 1000);
    });
    
    // Check for suspicious patterns on input change
    input.addEventListener('input', function() {
      validateInput(this);
    });
    
    // Final validation on blur
    input.addEventListener('blur', function() {
      validateInput(this, true);
    });
  });
}

/**
 * Validate input for security concerns
 * @param {HTMLElement} input - Input element to validate
 * @param {boolean} showFeedback - Whether to show validation feedback
 */
function validateInput(input, showFeedback = false) {
  const value = input.value;
  let isValid = true;
  let message = '';
  
  // Email specific validation
  if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      isValid = false;
      message = 'Invalid email format detected';
    }
  }
  
  // Check for potential script injection
  if (/<script|javascript:|onclick|onerror/i.test(value)) {
    isValid = false;
    message = 'Potential security threat detected';
    
    // Trigger digital rain effect for severe threats
    if (window.triggerDigitalRain) {
      window.triggerDigitalRain(4000);
    }
    
    // Show security warning
    if (window.showError) {
      window.showError('Script injection attempt blocked', 'SEC_THREAT_001');
    }
  }
  
  // Check for excessively long input (potential buffer overflow demonstration)
  if (value.length > 500) {
    isValid = false;
    message = 'Input exceeds maximum allowed length';
  }
  
  // Update visual feedback
  if (showFeedback) {
    // Remove previous state
    input.classList.remove('secure', 'warning');
    
    if (value) {
      if (isValid) {
        input.classList.add('secure');
        
        // Small chance of showing a "secure" message
        if (Math.random() < 0.3) {
          const formResponse = document.getElementById('formResponse');
          if (formResponse) {
            formResponse.textContent = 'Input validation passed';
            formResponse.className = 'success';
            
            // Clear message after 2 seconds
            setTimeout(() => {
              formResponse.textContent = '';
              formResponse.className = '';
            }, 2000);
          }
        }
      } else {
        input.classList.add('warning');
        
        // Show error message
        const formResponse = document.getElementById('formResponse');
        if (formResponse) {
          formResponse.textContent = message;
          formResponse.className = 'error';
          
          // Play glitch animation
          formResponse.classList.add('glitch-text');
          setTimeout(() => {
            formResponse.classList.remove('glitch-text');
          }, 2000);
        }
      }
    }
  }
  
  return isValid;
}

/**
 * Handle form submission with security animation
 * @param {Event} e - Submit event
 */
function handleSecureFormSubmit(e) {
  e.preventDefault();
  
  // Get form inputs
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formResponse = document.getElementById('formResponse');
  
  // Validate all inputs
  const nameValid = validateInput(nameInput, true);
  const emailValid = validateInput(emailInput, true);
  const subjectValid = validateInput(subjectInput, true);
  const messageValid = validateInput(messageInput, true);
  
  // Check if all inputs are valid
  if (nameValid && emailValid && subjectValid && messageValid) {
    // Show securing message
    formResponse.textContent = 'Securing connection...';
    formResponse.className = 'processing';
    
    // Simulate encryption
    setTimeout(() => {
      formResponse.textContent = 'Encrypting message...';
      
      // Add encryption visual
      document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
        input.classList.add('encrypting');
      });
      
      // Simulate submission
      setTimeout(() => {
        formResponse.textContent = 'Message sent securely!';
        formResponse.className = 'success';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Remove encryption visual
        document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
          input.classList.remove('encrypting');
        });
        
        // Trigger digital rain for effect
        if (window.triggerDigitalRain) {
          window.triggerDigitalRain(3000);
        }
        
        // Show success message
        if (window.showError) {
          window.showError('Message encrypted and sent', 'MSG_SENT_200');
        }
      }, 1500);
    }, 1000);
  } else {
    // Show error
    formResponse.textContent = 'Please correct the security issues in your inputs.';
    formResponse.className = 'error';
    
    // Trigger small glitch
    if (window.triggerDigitalRain) {
      window.triggerDigitalRain(2000);
    }
  }
}
