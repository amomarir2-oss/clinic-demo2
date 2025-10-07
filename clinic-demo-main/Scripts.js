// Optional: If you want to animate the search input on click
document.querySelectorAll('.search-icon').forEach(icon => {
  icon.addEventListener('click', function() {
    const input = this.parentElement.querySelector('.search-input');
    if (input) {
      input.focus();
    }
  });
});

// Ensure flag direction for 🇩🇿 is correct
function updateLangSelector(lang) {
  // Update main button label and flag
  const mainBtn = document.querySelector('.main-lang-btn');
  const mainFlag = document.getElementById('main-flag');
  const mainLabel = document.getElementById('main-lang-label');
  if (!mainBtn || !mainFlag || !mainLabel) return;
  if (lang === 'ar') {
    mainFlag.textContent = '🇩🇿';
    mainLabel.textContent = 'العربية';
    mainBtn.classList.add('flag-dz');
    mainBtn.style.direction = 'rtl';
    mainBtn.style.textAlign = 'right';
  } else if (lang === 'en') {
    mainFlag.textContent = '🇬🇧';
    mainLabel.textContent = 'English';
    mainBtn.classList.remove('flag-dz');
    mainBtn.style.direction = 'ltr';
    mainBtn.style.textAlign = 'left';
  } else {
    mainFlag.textContent = '🇫🇷';
    mainLabel.textContent = 'Français';
    mainBtn.classList.remove('flag-dz');
    mainBtn.style.direction = 'ltr';
    mainBtn.style.textAlign = 'left';
  }
}

document.querySelectorAll('.lang-options .lang-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = this.getAttribute('data-lang');
    updateLangSelector(lang);
    setLanguage(lang);
    try { localStorage.setItem('lang', lang); } catch (_) {}
  });
});

// Theme Toggle Functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  }
}

// Handle Navigation, Login, and Signup
document.addEventListener('click', function(e) {
  // Handle login button click
  if (e.target.closest('#btn-login')) {
    e.preventDefault();
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
    return;
  }

  // Handle signup button click
  if (e.target.closest('#btn-signup')) {
    e.preventDefault();
    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
    return;
  }

  // Check if clicked element is a navigation link or dropdown item
  if (e.target.classList.contains('nav-link') || e.target.classList.contains('dropdown-item')) {
    // Skip for theme toggle button and language buttons
    const isThemeToggle = e.target.closest('#theme-toggle');
    const isLanguageBtn = e.target.classList.contains('lang-btn') || e.target.closest('.lang-btn');
    
    if (!isThemeToggle && !isLanguageBtn) {
      e.preventDefault();
      // Create a new page with white background
      const newPage = window.open('', '_blank');
      newPage.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Nouvelle Page</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #ffffff;
              min-height: 100vh;
            }
          </style>
        </head>
        <body></body>
        </html>
      `);
      newPage.document.close();
    }
  }
});

// Initialize theme toggle
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

// Check for saved theme preference and set main button to current language
document.addEventListener('DOMContentLoaded', () => {
  let initialLang = 'fr';
  try {
    initialLang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'fr';
  } catch (_) {
    initialLang = document.documentElement.getAttribute('lang') || 'fr';
  }
  updateLangSelector(initialLang);
});
// Dark mode toggle (legacy button support if present)
const toggleDark = document.getElementById("toggle-dark");
if (toggleDark) {
  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = toggleDark.querySelector("i");
    if (icon) {
      if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }
  });
}

// Import translations from JSON file
let translations = {};

// Fetch translations
fetch('translations.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    // Re-apply current language after loading translations
    if (currentLang) {
      applyTranslations(currentLang);
    }
  })
  .catch(error => {
    console.error('Error loading translations:', error);
  });

function setLanguage(lang) {
  const t = translations[lang];

  // helper: convert camelCase or snake_case keys to kebab-case ids used in HTML
  const toKebab = (str) =>
    String(str)
      // handle consecutive capitals as one block (e.g., menuRDV -> menu-rdv)
      .replace(/([a-z0-9])([A-Z]+)/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase();

  // apply text/placeholder for all mapped keys
  Object.keys(t).forEach((key) => {
    const value = t[key];
    const lowerKey = String(key).toLowerCase();

    // attribute translations: title*
    if (lowerKey.startsWith('title') || lowerKey.endsWith('title')) {
      const baseKey = String(key).replace(/^title/i, '').replace(/title$/i, '');
      const baseId = toKebab(baseKey);
      const target = document.getElementById(baseId) || document.getElementById(key) || document.getElementById(toKebab(key));
      if (target) target.setAttribute('title', value);
      return;
    }

    // attribute translations: *Aria or *AriaLabel
    if (/(aria(label)?)$/i.test(key) || lowerKey.includes('aria')) {
      const baseKey = String(key).replace(/aria(label)?$/i, '');
      const baseId = toKebab(baseKey);
      const target = document.getElementById(baseId) || document.getElementById(key) || document.getElementById(toKebab(key));
      if (target) target.setAttribute('aria-label', value);
      return;
    }

    const fallbackId = toKebab(key); // e.g. siteTitle -> site-title
    const el = document.getElementById(key) || document.getElementById(fallbackId);
    if (!el) return;

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = value;
    } else {
      el.innerHTML = value;
    }
  });

  // hero section explicit updates (in case innerHTML mapping misses)
  if (document.getElementById('hero-title')) {
    document.getElementById('hero-title').textContent = t.heroTitle;
  }
  if (document.getElementById('hero-desc')) {
    document.getElementById('hero-desc').textContent = t.heroDesc;
  }
  if (document.getElementById('hero-btn')) {
    document.getElementById('hero-btn').textContent = t.heroBtn;
  }

  // document title update (both <title id="site-title"> and browser tab title)
  const titleEl = document.getElementById('site-title');
  if (titleEl) titleEl.textContent = t.siteTitle;
  if (t.siteTitle) document.title = t.siteTitle;

  // direction and lang for Arabic
  const isRTL = lang === 'ar';
  document.body.classList.toggle('rtl', isRTL);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = this.getAttribute('data-lang');
    setLanguage(lang);
    try { localStorage.setItem('lang', lang); } catch (_) {}
  });
});

// Hero diaporama/slideshow effect
// Using the two requested images:
//  https://cliniqueaudin.com/wp-content/uploads/2025/06/Untitled-8888.jpg
//  https://cliniquemaisonslaffitte.vivalto-sante.com/wp-content/uploads/2022/07/facade-exterieure-entree-urgences-clinique-de-maisons-laffitte.jpg
// To use local files, save them to e.g. "assets/images/..." and replace the URLs below with "./assets/images/..."
const heroSection = document.querySelector('.hero-section');
const heroIndicatorsContainerId = 'hero-indicators';
const heroImages = [

  "https://cliniqueaudin.com/wp-content/uploads/2025/06/Untitled-8888.jpg",
  "https://cliniquemaisonslaffitte.vivalto-sante.com/wp-content/uploads/2022/07/facade-exterieure-entree-urgences-clinique-de-maisons-laffitte.jpg",
  "https://www.lonasante.com/wp-content/uploads/2025/02/Etablissements-de-sante-prives-et-cliniques-avec-specialites.jpg",
  "https://www.cliniquealazhar.com/sites/default/files/galerie_images/IMG_2158.jpg",
  "https://hijrahtomorocco.com/wp-content/uploads/2023/05/giving-birth-in-morocco-delivering-a-baby-in-morocco.jpg"
];
let heroIndex = 0;
let heroInterval;

function setHeroImage(idx) {
  if (!heroSection) return;
  heroSection.style.backgroundImage = `url('${heroImages[idx]}')`;
  updateActiveIndicator(idx);
}

function showNextHeroImage() {
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroImage(heroIndex);
}
function showPrevHeroImage() {
  heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
  setHeroImage(heroIndex);
}
function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(showNextHeroImage, 4000);
}

function createHeroIndicators() {
  const container = document.getElementById(heroIndicatorsContainerId);
  if (!container) return;
  container.innerHTML = '';
  heroImages.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'hero-dot';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    btn.setAttribute('data-index', i);
    btn.addEventListener('click', (e) => {
      heroIndex = i;
      setHeroImage(heroIndex);
      resetHeroInterval();
    });
    container.appendChild(btn);
  });
  updateActiveIndicator(heroIndex);
}

function updateActiveIndicator(idx) {
  const container = document.getElementById(heroIndicatorsContainerId);
  if (!container) return;
  Array.from(container.children).forEach((el, i) => {
    const active = i === idx;
    el.classList.toggle('active', active);
    el.setAttribute('aria-current', active ? 'true' : 'false');
  });
}

// Initial setup
createHeroIndicators();
setHeroImage(heroIndex);
heroInterval = setInterval(showNextHeroImage, 4000);

// Initialize language on load from persisted selection or <html lang>
document.addEventListener('DOMContentLoaded', () => {
  let initialLang = 'fr';
  try {
    initialLang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'fr';
  } catch (_) {
    initialLang = document.documentElement.getAttribute('lang') || 'fr';
  }
  setLanguage(initialLang);
});

// Arrow button events
document.getElementById('hero-arrow-left').addEventListener('click', () => {
  showPrevHeroImage();
  resetHeroInterval();
});
document.getElementById('hero-arrow-right').addEventListener('click', () => {
  showNextHeroImage();
  resetHeroInterval();
});

