/**
 * Pallavi Gupta - Portfolio JavaScript
 * Capabilities:
 * - Dynamic typing effect for titles
 * - Mobile hamburger navigation toggle
 * - Sticky navbar state on scroll & active link highlighting
 * - Interactive portfolio category filtering
 * - Form validation with interactive success feedback modal
 * - Smooth scroll behavior with offset consideration
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Dynamic Typing Effect (Hero Section)
     ========================================================================== */
  const typedTextSpan = document.getElementById('typed-text');
  const titles = [
    'Social Media Handler',
    'Website Developer',
    'MBA & AI Expert',
    'Digital Growth Strategist'
  ];

  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1800; // Delay between current and next title
  let titleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < titles[titleIndex].length) {
      typedTextSpan.textContent += titles[titleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = titles[titleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      titleIndex++;
      if (titleIndex >= titles.length) titleIndex = 0;
      setTimeout(type, typingDelay + 300);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, 800);
  }

  /* ==========================================================================
     2. Sticky Glassmorphism Navbar & Active Link Observer
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Add backdrop style when scrolled
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active navigation link on scroll
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     3. Mobile Hamburger Menu Toggle
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMenu();
      }
    }
  });

  /* ==========================================================================
     4. Portfolio Filter System
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. Interactive Contact Form with Validation & Feedback Modal
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const serviceInput = document.getElementById('service');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const serviceError = document.getElementById('serviceError');
  const messageError = document.getElementById('messageError');

  const successModal = document.getElementById('successModal');
  const modalClientName = document.getElementById('modalClientName');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Helper validation functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    serviceError.textContent = '';
    messageError.textContent = '';

    document.querySelectorAll('.input-container').forEach(el => {
      el.classList.remove('has-error');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        nameInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email address is required.';
        emailInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      }

      // Validate Service Selection
      if (!serviceInput.value) {
        serviceError.textContent = 'Please select a service you are interested in.';
        serviceInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a short message about your project.';
        messageInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters.';
        messageInput.closest('.input-container').classList.add('has-error');
        isValid = false;
      }

      // If valid, submit and show interactive modal
      if (isValid) {
        const clientName = nameInput.value.trim();
        modalClientName.textContent = clientName;

        // Display modal
        successModal.classList.add('active');

        // Reset form
        contactForm.reset();
      }
    });
  }

  // Close modal logic
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  // Close modal when clicking backdrop
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }
});
