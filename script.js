// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typing animation (infinite loop)
const nameElement = document.getElementById("typed-name");
const nameText = "";
let i = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting && i < nameText.length) {
    // Typing
    nameElement.textContent += nameText.charAt(i);
    i++;
    setTimeout(typeEffect, 150);
  } else if (isDeleting && i > 0) {
    // Deleting
    nameElement.textContent = nameText.substring(0, i - 1);
    i--;
    setTimeout(typeEffect, 100);
  } else if (!isDeleting && i === nameText.length) {
    // Pause before deleting
    isDeleting = true;
    setTimeout(typeEffect, 1200);
  } else if (isDeleting && i === 0) {
    // Restart typing
    isDeleting = false;
    setTimeout(typeEffect, 500);
  }
}

// Form submission with Formspree
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const statusElement = document.getElementById('form-status');
  
  // Show sending status
  statusElement.textContent = 'Sending your message...';
  statusElement.className = 'form-status sending';
  statusElement.style.display = 'block';
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      statusElement.textContent = 'Thank you for your message! I will get back to you soon.';
      statusElement.className = 'form-status success';
      form.reset();
    } else {
      const errorData = await response.json();
      if (errorData.errors) {
        statusElement.textContent = errorData.errors.map(error => error.message).join(', ');
      } else {
        statusElement.textContent = 'Oops! There was a problem submitting your form. Please try again.';
      }
      statusElement.className = 'form-status error';
    }
  } catch (error) {
    statusElement.textContent = 'Oops! There was a problem submitting your form. Please try again.';
    statusElement.className = 'form-status error';
  }
  
  // Hide status message after 5 seconds
  setTimeout(() => {
    statusElement.style.display = 'none';
  }, 5000);
});

// Enhanced hover effect for service cards
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Add mouseenter event
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.5s ease';
    });
    
    // Add mouseleave event  
    card.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.5s ease';
    });
  });
});

// Initialize everything when page loads
window.onload = function() {
  typeEffect();
};

// NK Loading functionality with different animations
window.addEventListener('load', function() {
  const loadingOverlay = document.getElementById('loading-overlay');
  const progressBar = document.querySelector('.nk-loader-progress');
  const nkIcon = document.querySelector('.nk-icon');
  
  // Choose one animation style:
  // nkIcon.classList.add('nk-bounce');
  // nkIcon.classList.add('nk-flip');
  // nkIcon.classList.add('nk-glitch');
  // nkIcon.classList.add('nk-flicker');
  nkIcon.classList.add('nk-wave');
  
  // For wave animation, use this HTML structure instead:
  // <div class="nk-icon nk-wave"><span>N</span><span>K</span></div>
  
  // Simulate progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    
    if (progress >= 10) {
      clearInterval(progressInterval);
      
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
          loadingOverlay.style.display = 'none';
        }, 100);
      }, 100);
    }
  }, 100);
});