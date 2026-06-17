/**
 * Enhanced Particle Animation System
 * Creates an interactive background animation similar to designembraced.com
 */

class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 50 : 100;
    this.mousePosition = { x: null, y: null };
    this.lastMousePosition = { x: null, y: null };
    this.hoverRadius = 120;
    
    this.colors = [
      'rgba(80, 0, 202, 0.8)',
      'rgba(0, 198, 255, 0.8)',
      'rgba(128, 0, 255, 0.8)',
      'rgba(64, 224, 208, 0.8)'
    ];
    
    this.init();
  }
  
  init() {
    // Add canvas to the page and style it
    this.canvas.id = 'particles-canvas';
    document.body.appendChild(this.canvas);
    
    // Style the canvas
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    // Set canvas size
    this.resizeCanvas();
    
    // Add event listeners
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    
    // Create particles
    this.createParticles();
    
    // Start animation loop
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Recreate particles on resize
    this.createParticles();
  }
  
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 4 + 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        originalSpeedX: Math.random() * 1 - 0.5,
        originalSpeedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  handleMouseMove(e) {
    this.lastMousePosition = { ...this.mousePosition };
    this.mousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  }
  
  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    
    // Set the particle color with opacity
    const color = particle.color.replace('rgba(', '').replace(')', '').split(',');
    this.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${particle.opacity})`;
    
    this.ctx.fill();
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Draw connection line with opacity based on distance
          const opacity = 1 - distance / 150;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  updateParticles() {
    for (const particle of this.particles) {
      // Default movement
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Mouse interaction
      if (this.mousePosition.x !== null && this.mousePosition.y !== null) {
        const dx = this.mousePosition.x - particle.x;
        const dy = this.mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.hoverRadius) {
          // Calculate force direction (away from mouse)
          const forceDirectionX = -dx / distance;
          const forceDirectionY = -dy / distance;
          
          // Force is stronger when closer to the mouse
          const force = (this.hoverRadius - distance) / this.hoverRadius;
          
          // Apply force
          particle.speedX = particle.originalSpeedX + forceDirectionX * force * 2;
          particle.speedY = particle.originalSpeedY + forceDirectionY * force * 2;
        } else {
          // Gradually return to original speed
          particle.speedX = particle.speedX * 0.9 + particle.originalSpeedX * 0.1;
          particle.speedY = particle.speedY * 0.9 + particle.originalSpeedY * 0.1;
        }
      }
      
      // Boundary check
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX = -particle.speedX;
        particle.originalSpeedX = -particle.originalSpeedX;
      }
      
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY = -particle.speedY;
        particle.originalSpeedY = -particle.originalSpeedY;
      }
    }
  }
  
  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.updateParticles();
    
    // Draw connections between particles
    this.drawConnections();
    
    // Draw particles
    for (const particle of this.particles) {
      this.drawParticle(particle);
    }
    
    // Request next frame
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the particle system when the page loads
window.addEventListener('load', () => {
  new ParticleSystem();
});
