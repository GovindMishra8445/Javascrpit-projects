// DOM elements
const hamburgerContainer = document.querySelector('.hamburger-contener');
const headerContainer = document.querySelector('.header-contener');
const nav = document.querySelector('nav');
const goToTop = document.querySelector('.go-to-top');
const logo = document.querySelector('.logo');
const imageLogo = document.querySelector('.image-log');
const menuOverlay = document.querySelector('.menu-overlay');
const sections = document.querySelectorAll('.section');

// Mobile menu toggle
hamburgerContainer.addEventListener('click', (e) => {
  e.stopPropagation();
  headerContainer.classList.toggle('menu-open');
});

// Close menu when clicking nav links
nav.addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target.tagName === 'A') {
    headerContainer.classList.remove('menu-open');
  }
});

// Close menu when clicking overlay
if (menuOverlay) {
  menuOverlay.addEventListener('click', () => {
    headerContainer.classList.remove('menu-open');
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !hamburgerContainer.contains(e.target)) {
    headerContainer.classList.remove('menu-open');
  }
});

// Logo click to reload
if (logo) {
  logo.addEventListener('click', () => {
    location.reload();
  });
}

// Also handle image logo click if it exists
if (imageLogo) {
  imageLogo.addEventListener('click', () => {
    location.reload();
  });
}

// Smooth scroll to top
goToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Intersection Observer for section animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections for animation
sections.forEach(section => {
  sectionObserver.observe(section);
});

// Go to top button visibility based on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    goToTop.classList.add('visible');
  } else {
    goToTop.classList.remove('visible');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    // Handle top link
    if (targetId === '#top' || targetId === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    headerContainer.classList.remove('menu-open');
  }
});

// Initialize sections visibility on load
window.addEventListener('load', () => {
  setTimeout(() => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('visible');
      }
    });
  }, 100);
});

// Handle window resize - close mobile menu if switching to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 968) {
    headerContainer.classList.remove('menu-open');
  }
});

// Prevent menu from staying open when navigating back/forward
window.addEventListener('pageshow', () => {
  headerContainer.classList.remove('menu-open');
});

// Add active state to navigation links based on current section
const updateActiveNavLink = () => {
  const scrollPosition = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    
    if (correspondingLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        // Add active class to current link
        correspondingLink.classList.add('active');
      }
    }
  });
};

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active nav link on load
window.addEventListener('load', updateActiveNavLink);