/**
 * Initialization script for glitch effects
 */
document.addEventListener('DOMContentLoaded', function() {
  // Simulate security verification after short delay
  setTimeout(() => {
    // Show security verification message
    if (window.showError) {
      window.showError('System security verified', 'SECURE_CONN_OK');
    }
  }, 5000);
  
  // Add event listener to terminal text for interactive effect
  const terminalTexts = document.querySelectorAll('.terminal-text');
  terminalTexts.forEach(terminal => {
    terminal.addEventListener('click', () => {
      // Get and clear current content
      const originalText = terminal.getAttribute('data-original-text') || terminal.textContent;
      const hackerPhrases = [
        'Access granted.',
        'System secured.',
        'Vulnerabilities patched.',
        'Firewall active.',
        'Encryption enabled.',
        'Security is not just a feature.',
        'Code integrity maintained.',
        'Trust but verify.',
        'Defense in depth activated.'
      ];
      
      // Pick a random phrase that's different from the current one
      let newPhrase;
      do {
        newPhrase = hackerPhrases[Math.floor(Math.random() * hackerPhrases.length)];
      } while (newPhrase === originalText);
      
      // Update terminal with new text
      terminal.setAttribute('data-text', newPhrase);
      terminal.textContent = '';
      
      // Re-trigger animation
      const cursor = document.createElement('span');
      cursor.classList.add('terminal-cursor');
      terminal.appendChild(cursor);
      
      // Type animation for new content
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < newPhrase.length) {
          terminal.insertBefore(
            document.createTextNode(newPhrase.charAt(charIndex)),
            cursor
          );
          charIndex++;
        } else {
          clearInterval(typeInterval);
          terminal.setAttribute('data-original-text', newPhrase);
        }
      }, 100);
    });
  });
  
  // Add random glitching to page elements
  setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance each interval
      const glitchTargets = [
        'h1', 'h2', 'h3', '.btn', '.nav-links a', '.skill-name'
      ];
      
      // Pick a random selector
      const randomSelector = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
      
      // Find all matching elements
      const elements = document.querySelectorAll(randomSelector);
      
      // Pick a random element
      if (elements.length > 0) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        // Add temporary glitch class
        randomElement.classList.add('glitch-temp');
        
        // Remove after short duration
        setTimeout(() => {
          randomElement.classList.remove('glitch-temp');
        }, 200);
      }
    }
  }, 10000); // Every 10 seconds
});
