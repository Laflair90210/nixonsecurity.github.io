/**
 * Code typing animation
 * Simulates live coding with a realistic typing effect
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Code animation initialized');
  
  // Initialize code typing animation when in view
  initCodeTypingAnimation();
});

/**
 * Initialize a typing animation for code snippets
 */
function initCodeTypingAnimation() {
  const codeSnippets = document.querySelectorAll('.code-snippet');
  
  codeSnippets.forEach(snippet => {
    // Create a cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    
    // Store original content
    const originalContent = snippet.querySelector('.code-content').innerHTML;
    const codeContent = snippet.querySelector('.code-content');
    
    // Set up intersection observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !snippet.classList.contains('animated')) {
          // Mark as animated to prevent re-triggering
          snippet.classList.add('animated');
          
          // Clear content for animation
          codeContent.innerHTML = '';
          codeContent.appendChild(cursor);
          
          // Start typing animation
          let i = 0;
          let isTag = false;
          let currentTag = '';
          const originalText = originalContent;
          
          function type() {
            if (i < originalText.length) {
              // Check for HTML tags
              if (originalText.charAt(i) === '<') {
                isTag = true;
                currentTag = '';
              }
              
              if (isTag) {
                currentTag += originalText.charAt(i);
              } else {
                // For text content, add a bit of random delay for realistic typing
                if (Math.random() > 0.9) {
                  setTimeout(type, 200); // Occasional longer pause
                  return;
                }
              }
              
              if (isTag && originalText.charAt(i) === '>') {
                isTag = false;
                codeContent.innerHTML = codeContent.innerHTML.replace(/<span class="cursor"><\/span>$/, '') + currentTag + '<span class="cursor"></span>';
              } else if (!isTag) {
                codeContent.innerHTML = codeContent.innerHTML.replace(/<span class="cursor"><\/span>$/, '') + originalText.charAt(i) + '<span class="cursor"></span>';
              }
              
              i++;
              
              // Varying typing speed
              const speed = isTag ? 0 : Math.random() * 20 + 10;
              setTimeout(type, speed);
            } else {
              // Finished typing, make cursor blink
              cursor.style.animation = 'cursor-blink 1.2s step-end infinite';
            }
          }
          
          // Start the typing with a small initial delay
          setTimeout(type, 1000);
        }
      });
    }, { threshold: 0.5 });
    
    // Start observing
    observer.observe(snippet);
  });
}

/**
 * Manually trigger typing animation for a code snippet
 * @param {HTMLElement} element - Code snippet container element
 */
function triggerCodeTyping(element) {
  if (!element) return;
  
  // Reset the element
  element.classList.remove('animated');
  
  // Trigger intersection observer manually
  const event = new CustomEvent('scroll');
  window.dispatchEvent(event);
}

// Export for external use
window.triggerCodeTyping = triggerCodeTyping;
