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
});