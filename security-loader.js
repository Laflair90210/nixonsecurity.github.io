/**
 * Security-Themed Loading Animation
 * Creates an interactive security scanning loader experience
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Security loader initialized');
  
  // Initialize the security loader
  initSecurityLoader();
});

/**
 * Initialize the security loader animation
 */
function initSecurityLoader() {
  // Security scan messages to display during loading
  const securityMessages = [
    'Initializing secure connection...',
    'Performing security scan...',
    'Checking for vulnerabilities...',
    'Encrypting communication channel...',
    'Verifying authenticity...',
    'Loading security modules...',
    'Establishing secure session...',
    'Setting up protective measures...',
    'Initializing firewall...',
    'Access granted. Loading secure content...'
  ];
  
  // Get the loader element
  const loader = document.querySelector('.loader');
  if (!loader) return;
  
  // Create secured environment before showing content
  createSecurityEnvironment(loader, securityMessages);
}

/**
 * Create security environment in the loader
 */
function createSecurityEnvironment(loader, messages) {
  // Clear any existing content
  loader.querySelector('.loader-content').innerHTML = '';
  
  // Create security scan visualization
  const securityScan = document.createElement('div');
  securityScan.className = 'security-scan';
  securityScan.innerHTML = `
    <div class="security-scan-grid"></div>
    <i class="fas fa-shield-alt security-icon"></i>
  `;
  
  // Create logo
  const logo = document.createElement('div');
  logo.className = 'loader-logo';
  logo.textContent = 'NIXON';
  
  // Create status display area
  const statusArea = document.createElement('div');
  statusArea.className = 'scan-status';
  
  // Create progress bar
  const progressContainer = document.createElement('div');
  progressContainer.className = 'scan-progress';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'scan-progress-bar';
  
  progressContainer.appendChild(progressBar);
  
  // Assemble the loader content
  const loaderContent = loader.querySelector('.loader-content');
  loaderContent.appendChild(securityScan);
  loaderContent.appendChild(logo);
  loaderContent.appendChild(progressContainer);
  loaderContent.appendChild(statusArea);
  
  // Start the security animation sequence
  startSecuritySequence(statusArea, progressBar, messages);
}

/**
 * Start the security animation sequence
 */
function startSecuritySequence(statusArea, progressBar, messages) {
  let count = 0;
  const messageDelay = 600; // ms between messages
  const totalProgress = messages.length;
  
  // Function to display security messages one by one
  function displayNextMessage() {
    if (count >= messages.length) {
      finishLoading();
      return;
    }
    
    const message = document.createElement('div');
    message.className = 'status-message';
    message.innerHTML = `<span class="flicker">[</span> ${messages[count]} <span class="flicker">]</span>`;
    message.style.animationDelay = `${count * 0.1}s`;
    
    statusArea.appendChild(message);
    
    // Update progress
    const progressPercent = ((count + 1) / totalProgress) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    count++;
    
    // If there are more messages, schedule the next one
    if (count < messages.length) {
      setTimeout(displayNextMessage, messageDelay);
    } else {
      // Final message before completion
      setTimeout(() => {
        const finalMessage = document.createElement('div');
        finalMessage.className = 'status-message';
        finalMessage.innerHTML = '<span style="color: #00ff66; font-weight: bold;">✓ Security checks complete. Welcome.</span>';
        statusArea.appendChild(finalMessage);
        
        // Complete the loading sequence
        setTimeout(finishLoading, 1000);
      }, messageDelay);
    }
  }
  
  // Start displaying messages after a short delay
  setTimeout(displayNextMessage, 500);
}

/**
 * Finish the loading sequence and reveal the website
 */
function finishLoading() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden');
    
    // Remove the loader from DOM after transition completes
    setTimeout(() => {
      loader.remove();
      
      // Trigger a "secured" event that other scripts can listen for
      document.dispatchEvent(new CustomEvent('siteSecured'));
    }, 600);
  }
  
  // Enable scroll after loading completes
  document.body.style.overflow = 'auto';
}

// Ensure that loading isn't stuck if resources take too long
window.addEventListener('load', function() {
  // Set a maximum loading time of 8 seconds
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader && !loader.classList.contains('hidden')) {
      console.log('Forcing loader completion due to timeout');
      finishLoading();
    }
  }, 8000);
});
