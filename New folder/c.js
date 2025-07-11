const translations = {
  en: {
    contact_title: "Contact Me",
    send_message: "Send Message",
    ph_name: "Your Name",
    ph_email: "Your Email",
    ph_message: "Your Message"
  },
  fr: {
    contact_title: "Contactez-moi",
    send_message: "Envoyer le message",
    ph_name: "Votre nom",
    ph_email: "Votre e-mail",
    ph_message: "Votre message"
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });
  document.getElementById('toggleLang').textContent = lang === 'en' ? 'FR' : 'EN';
}

document.addEventListener('DOMContentLoaded', function() {
  // Language persistence
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);

  document.getElementById('toggleLang').addEventListener('click', function() {
    const currentLang = localStorage.getItem('lang') || 'en';
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
  });

  // Form reset on load and on back/forward navigation
  const form = document.getElementById('contactForm');
  if (form) form.reset();
  window.addEventListener('pageshow', function(event) {
    if (event.persisted && form) form.reset();
  });

  const chatBoard = document.getElementById('chatBoard');
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  if (!chatBoard || !chatToggleBtn || !chatCloseBtn || !chatMessages || !chatForm || !chatInput) {
    console.error('Chatboard elements not found!');
    return;
  }

  // Show chat board
  chatToggleBtn.addEventListener('click', function() {
    chatBoard.classList.add('open');
    chatToggleBtn.style.display = 'none';
    chatMessages.innerHTML = '';
    setTimeout(function() {
      addMessage("Hello! I'm Nadia's assistant. How can I help you today?");
    }, 300);
  });

  // Hide chat board
  chatCloseBtn.addEventListener('click', function() {
    chatBoard.classList.remove('open');
    chatToggleBtn.style.display = 'flex';
  });

  // Add message to chat
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

  // Simple bot response
  function getBotResponse(userMsg) {
    const msg = userMsg.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) return "Hi there! How can I help you?";
    if (msg.includes('project')) return "Check out my projects above!";
    if (msg.includes('contact')) return "You can use the contact form or email me at fombutuhn@gmail.com.";
    return "I'm here to answer questions about Nadia's portfolio!";
  }

  // Handle chat form submit
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