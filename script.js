// Modern Portfolio Website JavaScript - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio website initialized');
  
  // Page loader animation with custom timed reveal
  window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(function() {
      loader.style.opacity = '0';
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  });

  // Enhanced ScrollReveal for more dynamic animations
  // Guard: if CDN fails to load, skip ScrollReveal rather than crashing the script
  const sr = (typeof ScrollReveal !== 'undefined') ? ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
  }) : null;
  
  if (sr) {
    // Apply reveal animations with more varied effects
    sr.reveal('.hero-text h1', { distance: '70px', duration: 1400, origin: 'left' });
    sr.reveal('.hero-text h2', { delay: 200, distance: '50px', duration: 1400 });
    sr.reveal('.hero-text .description', { delay: 400, distance: '30px' });
    sr.reveal('.hero-buttons', { delay: 600, distance: '30px' });
    sr.reveal('.profile-placeholder', { delay: 400, origin: 'right', distance: '100px' });
    
    sr.reveal('.section-header', { distance: '30px' });
    sr.reveal('.underline', { delay: 300, distance: '20px' });
    
    sr.reveal('.about-text', { origin: 'left', distance: '80px' });
    sr.reveal('.about-image-placeholder', { origin: 'right', delay: 300, distance: '80px' });
    sr.reveal('.about-stats', { delay: 400, interval: 100 });
    
    sr.reveal('.skill-category', { interval: 200, distance: '40px' });
    sr.reveal('.project-card', { interval: 200, distance: '50px' });

    // Contact section: low viewFactor so it triggers as soon as any part enters viewport
    sr.reveal('.contact-info', { origin: 'left', distance: '60px', viewFactor: 0.05 });
    sr.reveal('.contact-form', { origin: 'right', delay: 150, distance: '60px', viewFactor: 0.05 });

    // Safety net: after 3 seconds force contact section visible in case scroll never triggered
    setTimeout(function() {
      var contactEls = document.querySelectorAll('.contact-info, .contact-form');
      contactEls.forEach(function(el) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 3000);
  }
  
  // Typing animation for the hero section
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
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          // Show only projects that match the filter category
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
  
  // Form submission — opens email client with pre-filled message
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formResponse.textContent = 'Please fill in all fields.';
        formResponse.style.color = '#ff4d4d';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formResponse.textContent = 'Please enter a valid email address.';
        formResponse.style.color = '#ff4d4d';
        return;
      }

      const body = 'From: ' + name + '\nEmail: ' + email + '\n\n' + message;
      const mailtoLink = 'mailto:nixon_marcellon.offsec@outlook.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailtoLink;

      formResponse.textContent = 'Thanks ' + name + '! Your email client should open now.';
      formResponse.style.color = '#00c6ff';
      contactForm.reset();
    });
  }
  
  // Add hover effect to project cards with smooth animations
  projectCards.forEach(card => {
    const img = card.querySelector('.project-img img');
    const info = card.querySelector('.project-info');
    
    card.addEventListener('mouseenter', () => {
      if (img) img.style.transform = 'scale(1.1)';
      if (info) info.style.background = 'rgba(20, 20, 20, 0.9)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (img) img.style.transform = 'scale(1)';
      if (info) info.style.background = '';
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
  
  // Parallax effect for background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax');
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});