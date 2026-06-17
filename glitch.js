/**
 * Glitch Effect Controller
 * Manages and applies various glitch animations to elements
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Glitch effects initialized');
  
  // Apply glitch effects to designated elements
  initGlitchEffects();
  
  // Setup random glitching on hover elements
  setupHoverGlitch();
  
  // Setup cursor-based glitch triggering
  setupCursorGlitchTriggers();
  
  // Setup interval-based text corruption
  setupTextCorruption();
});

/**
 * Initialize the glitch effects by finding elements with glitch classes
 * and setting up their content for the effect to work properly
 */
function initGlitchEffects() {
  // Setup glitch effect elements
  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach(element => {
    const text = element.innerText;
    element.innerHTML = `
      ${text}
      <span aria-hidden="true">${text}</span>
      <span aria-hidden="true">${text}</span>
    `;
  });
  
  // Setup subtle glitch effect elements
  const subtleGlitchElements = document.querySelectorAll('.glitch-subtle');
  subtleGlitchElements.forEach(element => {
    element.setAttribute('data-text', element.innerText);
  });
  
  // Setup cyber glitch effect elements
  const cyberGlitchElements = document.querySelectorAll('.cyber-glitch');
  cyberGlitchElements.forEach(element => {
    element.setAttribute('data-text', element.innerText);
  });
  
  // Setup text corruption elements
  const textCorruptElements = document.querySelectorAll('.text-corrupt');
  textCorruptElements.forEach(element => {
    element.setAttribute('data-text', element.innerText);
  });
}

/**
 * Setup hover-triggered glitch effects
 */
function setupHoverGlitch() {
  const hoverElements = document.querySelectorAll('.glitch-hover');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('is-glitching');
    });
    
    element.addEventListener('mouseleave', () => {
      setTimeout(() => {
        element.classList.remove('is-glitching');
      }, 300);
    });
  });
}

/**
 * Setup cursor-based glitch triggering
 * Elements will glitch when the cursor is nearby
 */
function setupCursorGlitchTriggers() {
  const triggerElements = document.querySelectorAll('.cursor-trigger');
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    triggerElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
      // Calculate distance
      const distance = Math.sqrt(
        Math.pow(center.x - clientX, 2) + 
        Math.pow(center.y - clientY, 2)
      );
      
      // Trigger glitch if cursor is nearby
      if (distance < 100) {
        element.classList.add('is-glitching');
      } else {
        element.classList.remove('is-glitching');
      }
    });
  });
}

/**
 * Setup random glitching on text elements to simulate
 * text corruption (good for cybersecurity theme)
 */
function setupTextCorruption() {
  // Apply random glitches to different elements periodically
  setInterval(() => {
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, .btn, .nav-links a');
    const randomIndex = Math.floor(Math.random() * allHeadings.length);
    const randomElement = allHeadings[randomIndex];
    
    // Skip elements that already have glitch classes
    if (randomElement.classList.contains('glitch') || 
        randomElement.classList.contains('glitch-subtle') ||
        randomElement.classList.contains('cyber-glitch')) {
      return;
    }
    
    // Apply temporary glitch
    randomElement.classList.add('glitch-temp');
    
    // Remove after a short duration
    setTimeout(() => {
      randomElement.classList.remove('glitch-temp');
    }, 150);
  }, 5000); // Every 5 seconds
}

/**
 * Manually trigger a glitch effect on an element
 * @param {HTMLElement} element - The element to apply the glitch to
 * @param {string} effectType - The type of glitch effect (default, subtle, cyber)
 * @param {number} duration - How long the effect should last in ms
 */
function triggerGlitch(element, effectType = 'default', duration = 1000) {
  if (!element) return;
  
  // Store original state
  const originalClasses = [...element.classList];
  const originalHTML = element.innerHTML;
  const originalText = element.innerText;
  
  // Apply the glitch effect
  switch (effectType) {
    case 'subtle':
      element.classList.add('glitch-subtle');
      element.setAttribute('data-text', originalText);
      break;
      
    case 'cyber':
      element.classList.add('cyber-glitch');
      element.setAttribute('data-text', originalText);
      break;
      
    default:
      element.classList.add('glitch');
      element.innerHTML = `
        ${originalText}
        <span aria-hidden="true">${originalText}</span>
        <span aria-hidden="true">${originalText}</span>
      `;
      break;
  }
  
  // Reset after duration
  setTimeout(() => {
    // Remove all classes and add back original ones
    [...element.classList].forEach(cls => element.classList.remove(cls));
    originalClasses.forEach(cls => element.classList.add(cls));
    
    // Reset content
    element.innerHTML = originalHTML;
    
    // Clean up data attributes
    element.removeAttribute('data-text');
  }, duration);
}

// Export for external use
window.triggerGlitch = triggerGlitch;

/**
 * Setup terminal typing animation for elements with terminal-text class
 */
function setupTerminalTypingAnimation() {
  const terminalElements = document.querySelectorAll('.terminal-text');
  
  terminalElements.forEach(element => {
    const text = element.getAttribute('data-text') || element.textContent;
    element.textContent = ''; // Clear content
    element.setAttribute('data-original-text', text);
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.classList.add('terminal-cursor');
    element.appendChild(cursor);
    
    // Type animation
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        // Randomly decide to add a glitch
        if (Math.random() < 0.05) {
          // Add wrong character that will be replaced in next iteration
          const wrongChar = getRandomChar();
          element.insertBefore(
            document.createTextNode(wrongChar),
            cursor
          );
          // Schedule correction
          setTimeout(() => {
            if (element.textContent.includes(wrongChar)) {
              element.textContent = element.textContent.replace(wrongChar, '');
              element.insertBefore(
                document.createTextNode(text.charAt(charIndex)),
                cursor
              );
            }
          }, 100);
        } else {
          // Add correct character
          element.insertBefore(
            document.createTextNode(text.charAt(charIndex)),
            cursor
          );
        }
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  });
}

/**
 * Setup glitch effects for project cards
 */
function setupGlitchCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.classList.add('glitch-card');
    
    // Add security badge to project cards
    const badge = document.createElement('div');
    badge.classList.add('security-badge');
    badge.innerHTML = '<i class="fas fa-shield-alt"></i> Security Verified';
    card.appendChild(badge);
    
    // Add event listeners for mouse movement to create interactive effect
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      // Generate CSS variables for positioning effects
      card.style.setProperty('--mouse-x', x.toFixed(2));
      card.style.setProperty('--mouse-y', y.toFixed(2));
    });
    
    // Add click event to trigger glitch
    card.addEventListener('click', () => {
      const title = card.querySelector('h3');
      if (title) {
        triggerGlitch(title, 'cyber', 800);
      }
    });
  });
}

/**
 * Helper function to get random character for terminal effect
 */
function getRandomChar() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?/~`';
  return characters.charAt(Math.floor(Math.random() * characters.length));
}
