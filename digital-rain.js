/**
 * Digital Rain Effect
 * Creates a Matrix-style background effect that appears every 10 seconds
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Digital rain effect initialized');
  
  // Create a canvas for the digital rain
  setupDigitalRain();
  
  // Track user activity
  let userIsActive = false;
  let lastActivityTime = Date.now();
  
  // User activity listeners
  document.addEventListener('mousemove', registerUserActivity);
  document.addEventListener('keypress', registerUserActivity);
  document.addEventListener('click', registerUserActivity);
  document.addEventListener('scroll', registerUserActivity);
  
  function registerUserActivity() {
    userIsActive = true;
    lastActivityTime = Date.now();
    setTimeout(() => {
      // If 2 seconds have passed since last activity, user is no longer considered active
      if (Date.now() - lastActivityTime >= 2000) {
        userIsActive = false;
      }
    }, 2000);
  }
    // Initial trigger after a short delay
  setTimeout(() => {
    if (!userIsActive && autoRainEnabled) triggerDigitalRain();
  }, 3000);
  
  // Periodically trigger the effect every 10 seconds
  setInterval(() => {
    if (!userIsActive && autoRainEnabled) triggerDigitalRain();
  }, 10000); // Run every 10 seconds
});

/**
 * Create the canvas for digital rain
 */
function setupDigitalRain() {
  // Create container
  const container = document.createElement('div');
  container.classList.add('digital-rain-container');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '1000';
  container.style.opacity = '0';
  container.style.transition = 'opacity 2s ease';
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.classList.add('digital-rain');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  
  // Add to DOM
  container.appendChild(canvas);
  document.body.appendChild(container);
  
  // Initialize the canvas size
  resizeCanvas();
  
  // Handle window resizing
  window.addEventListener('resize', resizeCanvas);
  
  /**
   * Resize canvas to window size
   */
  function resizeCanvas() {
    const digitalRain = document.querySelector('.digital-rain');
    if (digitalRain) {
      digitalRain.width = window.innerWidth;
      digitalRain.height = window.innerHeight;
    }
  }
}

/**
 * Trigger the digital rain animation
 * @param {number} duration - How long the effect should last in ms
 */
function triggerDigitalRain(duration = 5000) {
  const container = document.querySelector('.digital-rain-container');
  const canvas = document.querySelector('.digital-rain');
    if (!container || !canvas) return;
  
  // Make visible (slightly more visible)
  container.style.opacity = '0.18';
  
  // Get canvas context
  const ctx = canvas.getContext('2d');
  
  // Define characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
  
  // Set font
  ctx.font = '15px Courier New';
  
  // Calculate columns
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Array to track y positions
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -20) - 10;
  }
  
  // Counter for animation
  let frameCount = 0;
  const maxFrames = Math.floor(duration / 30); // 30ms per frame
  
  // Start animation
  const digitalRain = setInterval(() => {
    // Slightly transparent black to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Green text
    ctx.fillStyle = '#0fa';
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const char = chars[Math.floor(Math.random() * chars.length)];
      
      // Draw the character
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      
      // Move down
      drops[i]++;
      
      // Reset when off the screen & randomize start position
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.floor(Math.random() * -20) - 10;
      }
    }
    
    // Increment frame counter
    frameCount++;
    
    // Check if animation duration has been reached
    if (frameCount >= maxFrames) {
      clearInterval(digitalRain);
      container.style.opacity = '0';
    }
  }, 30);
  
  // Safety cleanup in case the interval doesn't stop
  setTimeout(() => {
    clearInterval(digitalRain);
    container.style.opacity = '0';
  }, duration + 1000);
}

// Export for external use
window.triggerDigitalRain = triggerDigitalRain;

/**
 * Manually trigger the digital rain effect with the option to set duration
 * Can be called from other scripts using: window.triggerMatrixRain(duration)
 */
window.triggerMatrixRain = function(duration) {
  triggerDigitalRain(duration || 5000);
};

// Add a toggle function to enable/disable the automatic triggers
let autoRainEnabled = true;
window.toggleMatrixRainAuto = function(enable) {
  if (enable !== undefined) {
    autoRainEnabled = enable;
  } else {
    autoRainEnabled = !autoRainEnabled;
  }
  console.log(`Matrix rain auto-trigger ${autoRainEnabled ? 'enabled' : 'disabled'}`);
  return autoRainEnabled;
};
