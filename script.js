
  // ========================
  // Navbar Scroll Animation
  // ========================
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });

  window.addEventListener('load', function () {
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      navbar.style.transition = 'all 0.6s ease';
      navbar.style.opacity = '1';
      navbar.style.transform = 'translateY(0)';
    }, 100);
  });

  // ========================
  // Mobile Nav Toggle
  // ========================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // ========================
  // Smooth Scrolling
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
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

  // ========================
  // On-Scroll Animations
  // ========================
  function animateOnScroll() {
    document.querySelectorAll('.animate').forEach(el => {
      const position = el.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        el.style.opacity = 1;
        el.style.visibility = 'visible';
      }
    });
  }

  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // ========================
  // Skill Counter Animation
  // ========================
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (target === 100 ? '%' : '+');
        }
      };

      updateCounter();
    });
  }

  function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const percentage = fill.getAttribute('data-skill');
      fill.style.setProperty('--skill-percentage', percentage + '%');
    });
  }

  function animateSkillProgress() {
    document.querySelectorAll('.skill-progress').forEach(progress => {
      const percentage = progress.getAttribute('data-progress');
      progress.style.setProperty('--progress', percentage + '%');
    });
  }

  window.addEventListener('load', () => {
    setTimeout(animateCounters, 1000);
    setTimeout(animateSkillBars, 1500);
    setTimeout(animateSkillProgress, 2000);
  });

  // ========================
  // CHAT BOARD FUNCTIONALITY
  // ========================
  document.addEventListener('DOMContentLoaded', function () {
    const chatBoard = document.getElementById('chatBoard');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');

    chatToggleBtn.addEventListener('click', function () {
      chatBoard.style.display = 'flex';
      chatToggleBtn.style.display = 'none';
      addMessage("👋 Hi! I'm here to help you.");
    });

    chatCloseBtn.addEventListener('click', function () {
      chatBoard.style.display = 'none';
      chatToggleBtn.style.display = 'block';
    });

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const userMsg = chatInput.value.trim();
      if (!userMsg) return;
      addMessage(userMsg, true);
      chatInput.value = '';
      setTimeout(() => {
        addMessage(getBotResponse(userMsg));
      }, 500);
    });

    function addMessage(message, isUser = false) {
      const div = document.createElement('div');
      div.className = 'chat-message ' + (isUser ? 'user' : 'bot');
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.textContent = message;
      div.appendChild(bubble);
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(msg) {
      msg = msg.toLowerCase();
      if (msg.includes('hello') || msg.includes('hi')) return "Hi there! I'm Nadia's portfolio assistant. Ask me anything about Nadia's work, skills, or experience.";
      if (msg.includes('about') || msg.includes('who are you')) return "I'm Nadia Fombutuh, a Full Stack Developer and Digital Solutions Specialist passionate about crafting digital experiences. My portfolio showcases my web development, data analysis, and creative design skills.";
      if (msg.includes('skill')) return "Nadia's technical skills include HTML5, CSS3, JavaScript (ES6+), Python (Django/Flask), PHP (Laravel/Core), MySQL, PostgreSQL, Adobe Illustrator, and more. She is experienced in both frontend and backend development.";
      if (msg.includes('experience')) return "Nadia has over 2 years of experience in the technology sector, specializing in scalable web applications, visual design, and data-driven solutions.";
      if (msg.includes('project')) return "Featured projects include a Community Charity Platform, Graphic Design Projects, and Web Development Solutions for various clients. Each project demonstrates a blend of technical and creative skills.";
      if (msg.includes('contact')) return "You can contact Nadia using the form on this page or by emailing fombutuhn@gmail.com. She's available for work and collaborations!";
      if (msg.includes('education') || msg.includes('school')) return "Nadia is pursuing a Bachelor of Applied Computing (2023-2026) at Institute Universitaire de la cote, specializing in Management of Information Systems.";
      if (msg.includes('certification')) return "Nadia holds certifications in Microsoft Excel (90%), Adobe Illustrator (80%), and Full-Stack Web Development (80%).";
      if (msg.includes('cv') || msg.includes('resume')) return "You can download Nadia's professional CV from the link in the social section above.";
      return "I'm here to answer questions about Nadia Fombutuh's portfolio, skills, experience, and projects. Try asking about skills, experience, projects, or how to contact Nadia!";
    }
  });

