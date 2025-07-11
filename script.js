
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    //contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      //alert('Thank you for your message! I will get back to you soon.');
      //contactForm.reset();
    //});

    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.animate');
      elements.forEach(el => {
        const position = el.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          el.style.opacity = 1;
          el.style.visibility = 'visible';
        }
      });
    }

    // Initialize animations
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ===========================
    // CHAT BOARD FUNCTIONALITY
    // ===========================

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      const chatBoard = document.getElementById('chatBoard');
      const chatToggleBtn = document.getElementById('chatToggleBtn');
      const chatCloseBtn = document.getElementById('chatCloseBtn');
      const chatMessages = document.getElementById('chatMessages');
      const chatForm = document.getElementById('chatForm');
      const chatInput = document.getElementById('chatInput');

      chatToggleBtn.addEventListener('click', function() {
        chatBoard.classList.add('open');
        chatToggleBtn.style.display = 'none';
        chatMessages.innerHTML = '';
        setTimeout(function() {
          addMessage("Hello! 👋 I'm Nadia's assistant. How can I help you today?");
        }, 300);
      });

      chatCloseBtn.addEventListener('click', function() {
        chatBoard.classList.remove('open');
        chatToggleBtn.style.display = 'flex';
      });

      function addMessage(message, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + (isUser ? 'user' : 'bot');
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = message;
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      function getBotResponse(userMsg) {
        const msg = userMsg.toLowerCase();
        if (msg.includes('hello') || msg.includes('hi')) return "Hi there! How can I help you?";
        if (msg.includes('project')) return "Check out my projects above!";
        if (msg.includes('contact')) return "You can use the contact form or email me at fombutuhn@gmail.com.";
        if (msg.includes('skills') || msg.includes('skill')) return "I am skilled in HTML, CSS, JavaScript, PHP, and Python!";
        if (msg.includes('experience')) return "I have over 2 years of experience in web development.";
        return "I'm here to answer questions about Nadia's portfolio!";
      }

      chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;
        addMessage(userMsg, true);
        chatInput.value = '';
        setTimeout(function() {
          addMessage(getBotResponse(userMsg));
        }, 700);
      });
    });
  