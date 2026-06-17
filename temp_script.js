// filepath: e:\py_projects\zero_to_mastery_python\webserver\script.js
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio website initialized');
  
  // Page loader animation
  window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(function() {
      loader.style.opacity = '0';
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  });
  
  // Create particle animation for background similar to designembraced.com
  createParticles();
  
  function createParticles() {
    const backgroundAnimation = document.querySelector('.background-animation');
    
    if (!backgroundAnimation) return;
    
    const numParticles = 5;
    
    // Remove existing particles
    while (backgroundAnimation.firstChild) {
      backgroundAnimation.removeChild(backgroundAnimation.firstChild);
    }
    
    // Create new particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('span');
      
      // Random size between 50px and 200px
      const size = Math.random() * 150 + 50;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random animation duration between 10 and 30 seconds
      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      backgroundAnimation.appendChild(particle);
    }
  }
  
  // Animate skill bars when they come into view
  const skillProgress = document.querySelectorAll('.skill-progress');
  
  // Initialize IntersectionObserver
  const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When skill section is visible
      if (entry.isIntersecting) {
        const progress = entry.target;
        const percentage = progress.getAttribute('data-progress');
        progress.style.width = percentage;
        observeSkills.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  }, { threshold: 0.2 });
  
  // Observe all skill progress bars
  skillProgress.forEach(progress => {
    observeSkills.observe(progress);
  });
  
  // Navbar scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(navLink => {
      navLink.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        // Show all projects if filter is 'all'
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else {
          // Show only projects that match the filter category
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simulate form submission
      formResponse.textContent = `Thank you ${name}! Your message has been sent successfully.`;
      formResponse.style.color = '#00c6ff';
      
      // Clear the form
      contactForm.reset();
      
      // Log the data (in a real app, this would be sent to a server)
      console.log({
        name: name,
        email: email,
        subject: subject,
        message: message
      });
    });
  }
  
  // Typing animation for hero section
  const typingElement = document.querySelector('.typing');
  if (typingElement) {
    const phrases = ['Cybersecurity Expert', 'Python Developer', 'Security Analyst', 'Full-Stack Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        // Typing text
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150; // Slower when typing
      }
      
      // If phrase is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
      }
      
      // If deletion is complete
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      }
      
      setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeText, 1800); // Start after loader animation
  }

  // Add hover effect to project cards
  const projectImages = document.querySelectorAll('.project-img');
  projectImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
  
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
