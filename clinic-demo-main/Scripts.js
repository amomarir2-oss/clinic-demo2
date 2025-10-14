// Cookie Consent Management
document.addEventListener('DOMContentLoaded', function() {
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  
  // Check if user has already accepted cookies
  if (!localStorage.getItem('cookieConsent')) {
    // Add a slight delay before showing for better effect
    setTimeout(() => {
      cookieConsent.classList.add('show');
      // Add entrance sound effect (subtle)
      const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAZIAAVFRUVFRUVFSoqKioqKioqQEBAQEBAQEBVVVVVVVVVVWpqampqampqgICAgICAgICVlZWVlZWVlaurq6urq6urwMDAwMDAwMDV1dXV1dXV1erq6urq6urq//////////////////8AAAAOTGF2ZjU4LjEyLjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAEgAAGSAABQUFBQUFBQUKCgoKCgoKCg8PDw8PDw8PFBQUFBQUFBQZAAAAAAAA//////////////////////////////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAaWQQABzAAAGSBCyKxzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      audio.volume = 0.2;  // Keep it subtle
      audio.play().catch(() => {}); // Ignore errors if audio can't play
    }, 1000);
  }
  
  // Handle accept cookies button click with a nice fade out effect
  acceptCookiesBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent.style.transition = 'right 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
    cookieConsent.style.opacity = '0';
    setTimeout(() => {
      cookieConsent.classList.remove('show');
      cookieConsent.style.opacity = '';
    }, 500);
  });
});

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

// Debug helper: call debugToggleTheme() from console to cycle themes and verify cookie popup colors
function debugToggleTheme() {
  const themes = ['light', 'dark', 'amoled', 'blue-dark', 'medical', 'warm', 'nature'];
  const current = (localStorage.getItem('selectedTheme') || 'light');
  const idx = themes.indexOf(current);
  const next = themes[(idx + 1) % themes.length];
  applyTheme(next);
  localStorage.setItem('selectedTheme', next);
  console.info('Theme switched to', next);
}

// Top-level: mark a nav/submenu element active (used across scopes)
function setActiveNav(element) {
  if (!element) return;
  // Remove active from all relevant items
  document.querySelectorAll('.navbar .nav-link, .navbar .dropdown-item, .sub-menu .sub-link').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
}

// Cookie Settings Management
document.addEventListener('DOMContentLoaded', function() {
  const preferenceCookies = document.getElementById('preferenceCookies');
  const deleteCookiesBtn = document.getElementById('deleteCookies');

  // Load saved preferences
  if (localStorage.getItem('preferenceCookies') === 'true') {
    preferenceCookies.checked = true;
  }

  // Handle preference cookies toggle
  preferenceCookies.addEventListener('change', function() {
    localStorage.setItem('preferenceCookies', this.checked);
  });

  // Handle delete all cookies button
  deleteCookiesBtn.addEventListener('click', function() {
    // Clear localStorage
    localStorage.clear();
    // Reset checkboxes
    preferenceCookies.checked = false;
    // Show cookie consent banner again
    document.getElementById('cookieConsent').classList.add('show');
  });
});

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
    // Immediately set active state for clicked nav item
    const clickedNav = e.target.closest('.nav-link, .dropdown-item, .sub-link');
    if (clickedNav) {
      try { setActiveNav(clickedNav); } catch (_) {}
    }
    // Skip for theme toggle button and language buttons
    const isThemeToggle = e.target.closest('#theme-toggle');
    const isLanguageBtn = e.target.classList.contains('lang-btn') || e.target.closest('.lang-btn');
    
    if (!isThemeToggle && !isLanguageBtn) {
      // If the clicked nav item is a normal anchor with a real href, allow the browser to navigate.
      const anchor = clickedNav.closest('a');
      const href = anchor ? (anchor.getAttribute('href') || '').trim() : '';

      // If href is a non-empty, non-placeholder link (not '#'), let it proceed normally.
      if (href && href !== '#') {
        // If it's an in-page hash, update the URL/hash and smooth-scroll to target if exists.
        if (href.startsWith('#')) {
          e.preventDefault();
          try {
            history.replaceState(null, '', href);
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          } catch (_) {}
        } else {
          // Allow normal navigation to proceed (same tab). Do not call preventDefault.
          return;
        }
      } else {
        // Placeholder or javascript-only hrefs: prevent default and do nothing (no blank page)
        e.preventDefault();
      }
    }
  }
});

// Initialize theme toggle (old button - keeping for compatibility)
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Settings Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Clear any problematic settings first
  clearProblematicSettings();
  // Initialize settings modal controls
  initializeSettingsModal();
  // Ensure modals work properly
  fixModalIssues();
});

function clearProblematicSettings() {
  // Remove high contrast class and clear from localStorage
  document.body.classList.remove('high-contrast');
  try {
    localStorage.removeItem('highContrast');
  } catch (e) {
    console.log('Could not clear localStorage');
  }
}

function fixModalIssues() {
  // Ensure Bootstrap modals are properly initialized
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    // Remove any problematic styles that might hide modals
    modal.style.display = '';
    modal.style.visibility = '';
    modal.style.opacity = '';
  });
}

function initializeSettingsModal() {
  // Theme selection in settings modal
  const themeRadios = document.querySelectorAll('input[name="themeSelect"]');
  themeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        applyTheme(this.value);
        localStorage.setItem('selectedTheme', this.value);
      }
    });
  });
  
  // Language selection in settings modal
  const langRadios = document.querySelectorAll('.lang-radio');
  langRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        setLanguage(this.value);
        updateLangSelector(this.value);
      }
    });
  });
  
  // Font size controls
  const fontSizeRadios = document.querySelectorAll('input[name="fontSize"]');
  fontSizeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        applyFontSize(this.value);
        localStorage.setItem('fontSize', this.value);
      }
    });
  });
  
  // High contrast toggle
  const highContrastToggle = document.getElementById('highContrastToggle');
  if (highContrastToggle) {
    highContrastToggle.addEventListener('change', function() {
      document.body.classList.toggle('high-contrast', this.checked);
      localStorage.setItem('highContrast', this.checked);
    });
  }
  
  // Reduce motion toggle
  const reduceMotionToggle = document.getElementById('reduceMotionToggle');
  if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', function() {
      document.body.classList.toggle('reduce-motion', this.checked);
      localStorage.setItem('reduceMotion', this.checked);
    });
  }
  
  // Notification toggles
  const appointmentNotifications = document.getElementById('appointmentNotifications');
  const healthTipsNotifications = document.getElementById('healthTipsNotifications');
  
  if (appointmentNotifications) {
    appointmentNotifications.addEventListener('change', function() {
      localStorage.setItem('appointmentNotifications', this.checked);
    });
  }
  
  if (healthTipsNotifications) {
    healthTipsNotifications.addEventListener('change', function() {
      localStorage.setItem('healthTipsNotifications', this.checked);
    });
  }
  
  // Privacy toggles
  const analyticsToggle = document.getElementById('analyticsToggle');
  const cookiesToggle = document.getElementById('cookiesToggle');
  
  if (analyticsToggle) {
    analyticsToggle.addEventListener('change', function() {
      localStorage.setItem('analytics', this.checked);
    });
  }
  
  if (cookiesToggle) {
    cookiesToggle.addEventListener('change', function() {
      localStorage.setItem('cookies', this.checked);
    });
  }
  
  // Save settings button
  const saveSettingsBtn = document.getElementById('saveSettings');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', function() {
      // Show success message
      showSettingsSavedMessage();
      // Close modal
      const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
      if (settingsModal) {
        settingsModal.hide();
      }
    });
  }
  
  // Load saved settings
  loadSavedSettings();
}

function updateThemeIcon(iconElement, isDarkMode) {
  if (iconElement) {
    if (isDarkMode) {
      iconElement.classList.remove('fa-sun');
      iconElement.classList.add('fa-moon');
    } else {
      iconElement.classList.remove('fa-moon');
      iconElement.classList.add('fa-sun');
    }
  }
}

function applyFontSize(size) {
  // Keep classes for legacy selectors
  document.body.classList.remove('font-small', 'font-medium', 'font-large');
  document.body.classList.add(`font-${size}`);

  // Set root font-size so we change actual layout text sizes (not browser zoom)
  const root = document.documentElement;
  switch (size) {
    case 'small':
      root.style.fontSize = '14px';
      break;
    case 'large':
      root.style.fontSize = '18px';
      break;
    case 'medium':
    default:
      root.style.fontSize = '16px';
      break;
  }
}

function applyTheme(theme) {
  // Remove all existing theme classes
  const themeClasses = ['theme-dark', 'theme-amoled', 'theme-blue-dark', 'theme-medical', 'theme-warm', 'theme-nature', 'theme-elegant'];
  document.body.classList.remove(...themeClasses);
  // Also remove legacy dark-mode
  document.body.classList.remove('dark-mode');

  // Apply the selected theme class and set data attributes for CSS compatibility
  switch (theme) {
    case 'dark':
      document.body.classList.add('theme-dark');
      break;
    case 'amoled':
      document.body.classList.add('theme-amoled');
      break;
    case 'blue-dark':
      document.body.classList.add('theme-blue-dark');
      break;
    case 'medical':
      document.body.classList.add('theme-medical');
      break;
    case 'warm':
      document.body.classList.add('theme-warm');
      break;
    case 'nature':
      document.body.classList.add('theme-nature');
      break;
    case 'elegant':
      document.body.classList.add('theme-elegant');
      break;
    case 'light':
    default:
      // Light theme is the default, no additional classes needed
      break;
  }

  // Set data attributes on <html> and <body> so both data-theme and data-bs-theme selectors work
  try {
    const root = document.documentElement;
    if (theme === 'light' || !theme) {
      root.removeAttribute('data-theme');
      root.removeAttribute('data-bs-theme');
      document.body.removeAttribute('data-theme');
      document.body.removeAttribute('data-bs-theme');
    } else {
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
      document.body.setAttribute('data-theme', theme);
      document.body.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
    }
  } catch (e) {
    // ignore DOM exceptions
  }
}

function loadSavedSettings() {
  try {
    // Remove any existing high contrast class first
    document.body.classList.remove('high-contrast');
    
    // Load theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    const themeRadio = document.querySelector(`input[name="themeSelect"][value="${savedTheme}"]`);
    if (themeRadio) {
      themeRadio.checked = true;
      applyTheme(savedTheme);
    }
    
    // Load font size
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const fontSizeRadio = document.querySelector(`input[name="fontSize"][value="${savedFontSize}"]`);
    if (fontSizeRadio) {
      fontSizeRadio.checked = true;
      applyFontSize(savedFontSize);
    }
    
    // Load high contrast - default to false
    const highContrast = localStorage.getItem('highContrast') === 'true';
    const highContrastToggle = document.getElementById('highContrastToggle');
    if (highContrastToggle) {
      highContrastToggle.checked = false; // Force disable by default
      document.body.classList.remove('high-contrast'); // Ensure it's removed
    }
    
    // Load reduce motion
    const reduceMotion = localStorage.getItem('reduceMotion') === 'true';
    const reduceMotionToggle = document.getElementById('reduceMotionToggle');
    if (reduceMotionToggle) {
      reduceMotionToggle.checked = reduceMotion;
      document.body.classList.toggle('reduce-motion', reduceMotion);
    }
    
    // Load notification preferences
    const appointmentNotifications = localStorage.getItem('appointmentNotifications') !== 'false';
    const healthTipsNotifications = localStorage.getItem('healthTipsNotifications') === 'true';
    
    const appointmentToggle = document.getElementById('appointmentNotifications');
    const healthTipsToggle = document.getElementById('healthTipsNotifications');
    
    if (appointmentToggle) appointmentToggle.checked = appointmentNotifications;
    if (healthTipsToggle) healthTipsToggle.checked = healthTipsNotifications;
    
    // Load privacy preferences
    const analytics = localStorage.getItem('analytics') !== 'false';
    const cookies = localStorage.getItem('cookies') !== 'false';
    
    const analyticsToggle = document.getElementById('analyticsToggle');
    const cookiesToggle = document.getElementById('cookiesToggle');
    
    if (analyticsToggle) analyticsToggle.checked = analytics;
    if (cookiesToggle) cookiesToggle.checked = cookies;
    
    // Load current language selection
    const currentLang = localStorage.getItem('lang') || 'fr';
    const langRadio = document.querySelector(`input[name="languageSelect"][value="${currentLang}"]`);
    if (langRadio) {
      langRadio.checked = true;
    }
    
  } catch (error) {
    console.log('Could not load some settings from localStorage');
  }
}

function showSettingsSavedMessage() {
  // Create a temporary success message
  const message = document.createElement('div');
  message.className = 'alert alert-success position-fixed';
  message.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
  message.innerHTML = '<i class="fas fa-check-circle me-2"></i>Settings saved successfully!';
  
  document.body.appendChild(message);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    if (message.parentNode) {
      message.parentNode.removeChild(message);
    }
  }, 3000);
}

// Check for saved theme preference and set main button to current language
document.addEventListener('DOMContentLoaded', () => {
  let initialLang = 'fr';
  try {
    initialLang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'fr';
  } catch (_) {
    initialLang = document.documentElement.getAttribute('lang') || 'fr';
  }
  updateLangSelector(initialLang);
  
  // Wire click handlers to mark clicked link as active. We don't prevent existing behavior here.
  document.querySelectorAll('.navbar .nav-link, .navbar .dropdown-item, .sub-menu .sub-link').forEach(el => {
    el.addEventListener('click', function(e) {
      try { setActiveNav(this); } catch (err) { /* ignore */ }

      // If this link is an in-page anchor, update the hash so refresh/links reflect the active state
      const href = this.getAttribute('href') || '';
      if (href.startsWith('#')) {
        try { history.replaceState(null, '', href); } catch (_) {}
      }
    });
  });

  // On load, set active item from location.hash when possible, otherwise pick the first nav-link
  (function setInitialActiveFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(`[href="${hash}"]`);
      if (target) { setActiveNav(target); return; }
    }
    const first = document.querySelector('.navbar .nav-link');
    if (first) setActiveNav(first);
  })();
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

// Import translations from separate language files
let translations = {};
let loaded = false;
let currentLanguage = 'fr';

// Load translation for specific language
async function loadTranslation(lang) {
  try {
    const response = await fetch(`locales/${lang}/translation.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang} translations`);
    }
    const data = await response.json();
    translations[lang] = data;
    return data;
  } catch (error) {
    console.error(`Error loading ${lang} translations:`, error);
    // Fallback to French if other language fails
    if (lang !== 'fr') {
      return loadTranslation('fr');
    }
    return {};
  }
}

// Initialize translations
async function initTranslations() {
  const initial = getInitialLang();
  currentLanguage = initial;
  
  // Load initial language
  await loadTranslation(initial);
  loaded = true;
  setLanguage(initial);
}

function getInitialLang() {
  try {
    return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'fr';
  } catch (_) {
    return document.documentElement.getAttribute('lang') || 'fr';
  }
}

async function setLanguage(lang) {
  // Load translation if not already loaded
  if (!translations[lang]) {
    await loadTranslation(lang);
  }
  
  const t = translations[lang];
  if (!t) return;
  
  currentLanguage = lang;

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

  // Update logo alt using siteBrand if present
  const logoImg = document.getElementById('logoAltTarget');
  if (logoImg && t.siteBrand) logoImg.alt = stripTags(t.siteBrand);

  // Update title attributes for specific elements (use separate title translations)
  const siteBrandSubtitle = document.getElementById('siteBrandSubtitle');
  if (siteBrandSubtitle && t.titleSiteBrandSubtitle) siteBrandSubtitle.title = t.titleSiteBrandSubtitle;
  
  const heroInfoTitle = document.getElementById('heroInfoTitle');
  if (heroInfoTitle && t.titleHeroInfoTitle) heroInfoTitle.title = t.titleHeroInfoTitle;

  // Update title attributes for UI elements
  const titleSearch = document.getElementById('titleSearch');
  if (titleSearch && t.titleSearch) titleSearch.title = t.titleSearch;
  
  const titleLanguages = document.getElementById('titleLanguages');
  if (titleLanguages && t.titleLanguages) titleLanguages.title = t.titleLanguages;
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle && t.titleThemeToggle) themeToggle.title = t.titleThemeToggle;
  
  // Update aria-label attributes
  const searchInput = document.getElementById('searchInput');
  if (searchInput && t.searchInputAria) searchInput.setAttribute('aria-label', t.searchInputAria);
  
  const backToTop = document.getElementById('backToTop');
  if (backToTop && t.backToTopAria) backToTop.setAttribute('aria-label', t.backToTopAria);
  
  const heroArrowLeft = document.getElementById('hero-arrow-left');
  if (heroArrowLeft && t.heroArrowLeftAria) heroArrowLeft.setAttribute('aria-label', t.heroArrowLeftAria);
  
  const heroArrowRight = document.getElementById('hero-arrow-right');
  if (heroArrowRight && t.heroArrowRightAria) heroArrowRight.setAttribute('aria-label', t.heroArrowRightAria);
  
  const heroIndicators = document.getElementById('hero-indicators');
  if (heroIndicators && t.heroCarouselIndicatorsAria) heroIndicators.setAttribute('aria-label', t.heroCarouselIndicatorsAria);

  // hero section explicit updates (in case innerHTML mapping misses)
  if (document.getElementById('heroTitle') && t.heroTitle) document.getElementById('heroTitle').textContent = t.heroTitle;
  if (document.getElementById('heroDesc') && t.heroDesc) document.getElementById('heroDesc').textContent = t.heroDesc;
  if (document.getElementById('heroBtn') && t.heroBtn) document.getElementById('heroBtn').textContent = t.heroBtn;

  // document title update (both <title id="site-title"> and browser tab title)
  const titleEl = document.getElementById('siteTitle');
  if (titleEl && t.siteTitle) titleEl.textContent = t.siteTitle;
  if (t.siteTitle) document.title = t.siteTitle;
  
  // Explicit updates for key brand elements
  const siteBrandSubtitleEl = document.getElementById('siteBrandSubtitle');
  if (siteBrandSubtitleEl && t.siteBrandSubtitle) siteBrandSubtitleEl.textContent = t.siteBrandSubtitle;
  
  const siteBrandShortEl = document.getElementById('siteBrandShort');
  if (siteBrandShortEl && t.siteBrandShort) siteBrandShortEl.textContent = t.siteBrandShort;
  
  const siteBrandEl = document.getElementById('siteBrand');
  if (siteBrandEl && t.siteBrand) siteBrandEl.textContent = t.siteBrand;
  
  // Update section titles
  const letUsHelpTitle = document.getElementById('letUsHelpTitle');
  if (letUsHelpTitle && t.letUsHelpTitle) letUsHelpTitle.textContent = t.letUsHelpTitle;
  
  const letUsHelpSubtitle = document.getElementById('letUsHelpSubtitle');
  if (letUsHelpSubtitle && t.letUsHelpSubtitle) letUsHelpSubtitle.textContent = t.letUsHelpSubtitle;
  
  const recentNewsTitle = document.getElementById('recentNewsTitle');
  if (recentNewsTitle && t.recentNewsTitle) recentNewsTitle.textContent = t.recentNewsTitle;
  
  const searchedConditionsTitle = document.getElementById('searchedConditionsTitle');
  if (searchedConditionsTitle && t.searchedConditionsTitle) searchedConditionsTitle.textContent = t.searchedConditionsTitle;
  
  const featuredSpecialtiesTitle = document.getElementById('featuredSpecialtiesTitle');
  if (featuredSpecialtiesTitle && t.featuredSpecialtiesTitle) featuredSpecialtiesTitle.textContent = t.featuredSpecialtiesTitle;
  
  // Update contact section (removed from DOM in HTML). Keep guard in case it's re-added dynamically.
  const contactTitle = document.getElementById('contactTitle');
  if (contactTitle && t.contactTitle) contactTitle.textContent = t.contactTitle;
  
  // Update sub-menu items
  const subServices = document.getElementById('sub-services');
  if (subServices && t.subServices) subServices.textContent = t.subServices;
  
  const subSpecialties = document.getElementById('sub-specialties');
  if (subSpecialties && t.subSpecialties) subSpecialties.textContent = t.subSpecialties;
  
  // sub-contact nav item removed from HTML; keep a guard for dynamic insertion
  const subContact = document.getElementById('sub-contact');
  if (subContact && t.subContact) subContact.textContent = t.subContact;
  
  // Update news articles
  const newsTitle1 = document.getElementById('newsTitle1');
  if (newsTitle1 && t.newsTitle1) newsTitle1.textContent = t.newsTitle1;
  
  const newsExcerpt1 = document.getElementById('newsExcerpt1');
  if (newsExcerpt1 && t.newsExcerpt1) newsExcerpt1.textContent = t.newsExcerpt1;
  
  const newsLink1 = document.getElementById('newsLink1');
  if (newsLink1 && t.newsLink1) newsLink1.textContent = t.newsLink1;
  
  const newsTitle2 = document.getElementById('newsTitle2');
  if (newsTitle2 && t.newsTitle2) newsTitle2.textContent = t.newsTitle2;
  
  const newsExcerpt2 = document.getElementById('newsExcerpt2');
  if (newsExcerpt2 && t.newsExcerpt2) newsExcerpt2.textContent = t.newsExcerpt2;
  
  const newsLink2 = document.getElementById('newsLink2');
  if (newsLink2 && t.newsLink2) newsLink2.textContent = t.newsLink2;
  
  const newsTitle3 = document.getElementById('newsTitle3');
  if (newsTitle3 && t.newsTitle3) newsTitle3.textContent = t.newsTitle3;
  
  const newsExcerpt3 = document.getElementById('newsExcerpt3');
  if (newsExcerpt3 && t.newsExcerpt3) newsExcerpt3.textContent = t.newsExcerpt3;
  
  const newsLink3 = document.getElementById('newsLink3');
  if (newsLink3 && t.newsLink3) newsLink3.textContent = t.newsLink3;
  
  // Update specialty cards
  const specialtyGynecologyName = document.getElementById('specialtyGynecologyName');
  if (specialtyGynecologyName && t.specialtyGynecologyName) specialtyGynecologyName.textContent = t.specialtyGynecologyName;
  
  const specialtyGynecologyDesc = document.getElementById('specialtyGynecologyDesc');
  if (specialtyGynecologyDesc && t.specialtyGynecologyDesc) specialtyGynecologyDesc.textContent = t.specialtyGynecologyDesc;
  
  const specialtyGynecologyFeature1 = document.getElementById('specialtyGynecologyFeature1');
  if (specialtyGynecologyFeature1 && t.specialtyGynecologyFeature1) specialtyGynecologyFeature1.textContent = t.specialtyGynecologyFeature1;
  
  const specialtyGynecologyFeature2 = document.getElementById('specialtyGynecologyFeature2');
  if (specialtyGynecologyFeature2 && t.specialtyGynecologyFeature2) specialtyGynecologyFeature2.textContent = t.specialtyGynecologyFeature2;
  
  const specialtyGynecologyLink = document.getElementById('specialtyGynecologyLink');
  if (specialtyGynecologyLink && t.specialtyGynecologyLink) specialtyGynecologyLink.textContent = t.specialtyGynecologyLink;
  
  const specialtyPediatricsName = document.getElementById('specialtyPediatricsName');
  if (specialtyPediatricsName && t.specialtyPediatricsName) specialtyPediatricsName.textContent = t.specialtyPediatricsName;
  
  const specialtyPediatricsDesc = document.getElementById('specialtyPediatricsDesc');
  if (specialtyPediatricsDesc && t.specialtyPediatricsDesc) specialtyPediatricsDesc.textContent = t.specialtyPediatricsDesc;
  
  const specialtyPediatricsFeature1 = document.getElementById('specialtyPediatricsFeature1');
  if (specialtyPediatricsFeature1 && t.specialtyPediatricsFeature1) specialtyPediatricsFeature1.textContent = t.specialtyPediatricsFeature1;
  
  const specialtyPediatricsFeature2 = document.getElementById('specialtyPediatricsFeature2');
  if (specialtyPediatricsFeature2 && t.specialtyPediatricsFeature2) specialtyPediatricsFeature2.textContent = t.specialtyPediatricsFeature2;
  
  const specialtyPediatricsLink = document.getElementById('specialtyPediatricsLink');
  if (specialtyPediatricsLink && t.specialtyPediatricsLink) specialtyPediatricsLink.textContent = t.specialtyPediatricsLink;
  
  const specialtySurgeryName = document.getElementById('specialtySurgeryName');
  if (specialtySurgeryName && t.specialtySurgeryName) specialtySurgeryName.textContent = t.specialtySurgeryName;
  
  const specialtySurgeryDesc = document.getElementById('specialtySurgeryDesc');
  if (specialtySurgeryDesc && t.specialtySurgeryDesc) specialtySurgeryDesc.textContent = t.specialtySurgeryDesc;
  
  const specialtySurgeryFeature1 = document.getElementById('specialtySurgeryFeature1');
  if (specialtySurgeryFeature1 && t.specialtySurgeryFeature1) specialtySurgeryFeature1.textContent = t.specialtySurgeryFeature1;
  
  const specialtySurgeryFeature2 = document.getElementById('specialtySurgeryFeature2');
  if (specialtySurgeryFeature2 && t.specialtySurgeryFeature2) specialtySurgeryFeature2.textContent = t.specialtySurgeryFeature2;
  
  const specialtySurgeryLink = document.getElementById('specialtySurgeryLink');
  if (specialtySurgeryLink && t.specialtySurgeryLink) specialtySurgeryLink.textContent = t.specialtySurgeryLink;
  
  const specialtyEmergencyName = document.getElementById('specialtyEmergencyName');
  if (specialtyEmergencyName && t.specialtyEmergencyName) specialtyEmergencyName.textContent = t.specialtyEmergencyName;
  
  const specialtyEmergencyDesc = document.getElementById('specialtyEmergencyDesc');
  if (specialtyEmergencyDesc && t.specialtyEmergencyDesc) specialtyEmergencyDesc.textContent = t.specialtyEmergencyDesc;
  
  const specialtyEmergencyFeature1 = document.getElementById('specialtyEmergencyFeature1');
  if (specialtyEmergencyFeature1 && t.specialtyEmergencyFeature1) specialtyEmergencyFeature1.textContent = t.specialtyEmergencyFeature1;
  
  const specialtyEmergencyFeature2 = document.getElementById('specialtyEmergencyFeature2');
  if (specialtyEmergencyFeature2 && t.specialtyEmergencyFeature2) specialtyEmergencyFeature2.textContent = t.specialtyEmergencyFeature2;
  
  const specialtyEmergencyLink = document.getElementById('specialtyEmergencyLink');
  if (specialtyEmergencyLink && t.specialtyEmergencyLink) specialtyEmergencyLink.textContent = t.specialtyEmergencyLink;
  
  // Update footer elements
  const footerClinicTitle = document.getElementById('footerClinicTitle');
  if (footerClinicTitle && t.footerClinicTitle) footerClinicTitle.textContent = t.footerClinicTitle;
  
  const footerAbout = document.getElementById('footerAbout');
  if (footerAbout && t.footerAbout) footerAbout.textContent = t.footerAbout;
  
  const footerContact = document.getElementById('footerContact');
  if (footerContact && t.footerContact) footerContact.textContent = t.footerContact;
  
  const footerEvents = document.getElementById('footerEvents');
  if (footerEvents && t.footerEvents) footerEvents.textContent = t.footerEvents;
  
  const footerNews = document.getElementById('footerNews');
  if (footerNews && t.footerNews) footerNews.textContent = t.footerNews;
  
  const footerServicesTitle = document.getElementById('footerServicesTitle');
  if (footerServicesTitle && t.footerServicesTitle) footerServicesTitle.textContent = t.footerServicesTitle;
  
  const footerCareers = document.getElementById('footerCareers');
  if (footerCareers && t.footerCareers) footerCareers.textContent = t.footerCareers;
  
  const footerFAQ = document.getElementById('footerFAQ');
  if (footerFAQ && t.footerFAQ) footerFAQ.textContent = t.footerFAQ;
  
  const footerEmergency24 = document.getElementById('footerEmergency24');
  if (footerEmergency24 && t.footerEmergency24) footerEmergency24.textContent = t.footerEmergency24;
  
  const footerLaboratory = document.getElementById('footerLaboratory');
  if (footerLaboratory && t.footerLaboratory) footerLaboratory.textContent = t.footerLaboratory;
  
  const footerSpecialtiesTitle = document.getElementById('footerSpecialtiesTitle');
  if (footerSpecialtiesTitle && t.footerSpecialtiesTitle) footerSpecialtiesTitle.textContent = t.footerSpecialtiesTitle;
  
  const footerGynecology = document.getElementById('footerGynecology');
  if (footerGynecology && t.footerGynecology) footerGynecology.textContent = t.footerGynecology;
  
  const footerPediatrics = document.getElementById('footerPediatrics');
  if (footerPediatrics && t.footerPediatrics) footerPediatrics.textContent = t.footerPediatrics;
  
  const footerObstetrics = document.getElementById('footerObstetrics');
  if (footerObstetrics && t.footerObstetrics) footerObstetrics.textContent = t.footerObstetrics;
  
  const footerBookAppointment = document.getElementById('footerBookAppointment');
  if (footerBookAppointment && t.footerBookAppointment) footerBookAppointment.textContent = t.footerBookAppointment;
  
  const footerHealthTitle = document.getElementById('footerHealthTitle');
  if (footerHealthTitle && t.footerHealthTitle) footerHealthTitle.textContent = t.footerHealthTitle;
  
  const footerSocialTitle = document.getElementById('footerSocialTitle');
  if (footerSocialTitle && t.footerSocialTitle) footerSocialTitle.textContent = t.footerSocialTitle;
  
  const footerAddressLine1 = document.getElementById('footerAddressLine1');
  if (footerAddressLine1 && t.footerAddressLine1) footerAddressLine1.textContent = t.footerAddressLine1;
  
  const footerAddressLine2 = document.getElementById('footerAddressLine2');
  if (footerAddressLine2 && t.footerAddressLine2) footerAddressLine2.textContent = t.footerAddressLine2;
  
  const footerCopyright = document.getElementById('footerCopyright');
  if (footerCopyright && t.footerCopyright) footerCopyright.innerHTML = t.footerCopyright;
  
  const footerTerms = document.getElementById('footerTerms');
  if (footerTerms && t.footerTerms) footerTerms.textContent = t.footerTerms;
  
  const footerSitemap = document.getElementById('footerSitemap');
  if (footerSitemap && t.footerSitemap) footerSitemap.textContent = t.footerSitemap;
  
  const footerPrivacy = document.getElementById('footerPrivacy');
  if (footerPrivacy && t.footerPrivacy) footerPrivacy.textContent = t.footerPrivacy;
  
  const footerRateUs = document.getElementById('footerRateUs');
  if (footerRateUs && t.footerRateUs) footerRateUs.textContent = t.footerRateUs;
  
  const footerReportVuln = document.getElementById('footerReportVuln');
  if (footerReportVuln && t.footerReportVuln) footerReportVuln.textContent = t.footerReportVuln;
  
  // Update hero info title explicitly
  const heroInfoTitleEl = document.getElementById('heroInfoTitle');
  if (heroInfoTitleEl && t.heroInfoTitle) heroInfoTitleEl.textContent = t.heroInfoTitle;
  
  // Update login/signup buttons
  const btnLogin = document.getElementById('btn-login');
  if (btnLogin && t.btnLogin) {
    const loginText = btnLogin.querySelector('.auth-btn-text');
    if (loginText) loginText.textContent = t.btnLogin;
  }
  
  const btnSignup = document.getElementById('btn-signup');
  if (btnSignup && t.btnSignup) {
    const signupText = btnSignup.querySelector('.auth-btn-text');
    if (signupText) signupText.textContent = t.btnSignup;
  }
  
  // Update help section button
  const helpFindBtn = document.getElementById('helpFindBtn');
  if (helpFindBtn && t.helpFindDoctor) {
    const btnText = helpFindBtn.querySelector('span') || helpFindBtn.childNodes[helpFindBtn.childNodes.length - 1];
    if (btnText && btnText.nodeType === Node.TEXT_NODE) {
      btnText.textContent = t.helpFindDoctor;
    } else if (btnText && btnText.tagName) {
      btnText.textContent = t.helpFindDoctor;
    } else {
      // Fallback: update the text after the icon
      const iconEl = helpFindBtn.querySelector('i');
      if (iconEl && iconEl.nextSibling) {
        iconEl.nextSibling.textContent = t.helpFindDoctor;
      }
    }
  }
  
  // Update help section elements
  const helpIam = document.getElementById('helpIam');
  if (helpIam && t.helpIam) helpIam.textContent = t.helpIam;
  
  const helpPatient = document.getElementById('helpPatient');
  if (helpPatient && t.helpPatient) helpPatient.textContent = t.helpPatient;
  
  const helpVisitor = document.getElementById('helpVisitor');
  if (helpVisitor && t.helpVisitor) helpVisitor.textContent = t.helpVisitor;
  
  const helpHealthcareProfessional = document.getElementById('helpHealthcareProfessional');
  if (helpHealthcareProfessional && t.helpHealthcareProfessional) helpHealthcareProfessional.textContent = t.helpHealthcareProfessional;
  
  const helpLookingFor = document.getElementById('helpLookingFor');
  if (helpLookingFor && t.helpLookingFor) helpLookingFor.textContent = t.helpLookingFor;
  
  const helpGetHelp = document.getElementById('helpGetHelp');
  if (helpGetHelp && t.helpGetHelp) helpGetHelp.textContent = t.helpGetHelp;

  // If Arabic is active, reorder the patient-type buttons so their visual order matches RTL expectations
  try {
    const patientTypeGroup = document.querySelector('.patient-type-group');
    if (patientTypeGroup) {
      if (lang === 'ar') {
        // reverse children order to present labels right-to-left
        const children = Array.from(patientTypeGroup.children).reverse();
        children.forEach(ch => patientTypeGroup.appendChild(ch));
      } else {
        // attempt to restore original order: patient, visitor, healthcare
        const patient = patientTypeGroup.querySelector('[for="patient"]') || patientTypeGroup.querySelector('#patient') || null;
        const visitor = patientTypeGroup.querySelector('[for="visitor"]') || patientTypeGroup.querySelector('#visitor') || null;
        const healthcare = patientTypeGroup.querySelector('[for="healthcare"]') || patientTypeGroup.querySelector('#healthcare') || null;
        // If we can find the elements by their labels, append in canonical order
        if (patient && visitor && healthcare) {
          // parent may contain inputs and labels; append in order patient input+label, visitor input+label, healthcare input+label
          const nodes = Array.from(patientTypeGroup.childNodes);
          // simple approach: collect nodes by searching for label[for=..] and inputs
          const patientLabel = patientTypeGroup.querySelector('label[for="patient"]');
          const visitorLabel = patientTypeGroup.querySelector('label[for="visitor"]');
          const healthcareLabel = patientTypeGroup.querySelector('label[for="healthcare"]');
          const patientInput = patientTypeGroup.querySelector('input#patient');
          const visitorInput = patientTypeGroup.querySelector('input#visitor');
          const healthcareInput = patientTypeGroup.querySelector('input#healthcare');
          // Append in canonical order if labels exist
          if (patientInput && patientLabel) patientTypeGroup.appendChild(patientInput);
          if (patientLabel) patientTypeGroup.appendChild(patientLabel);
          if (visitorInput && visitorLabel) patientTypeGroup.appendChild(visitorInput);
          if (visitorLabel) patientTypeGroup.appendChild(visitorLabel);
          if (healthcareInput && healthcareLabel) patientTypeGroup.appendChild(healthcareInput);
          if (healthcareLabel) patientTypeGroup.appendChild(healthcareLabel);
        }
      }
    }
  } catch (err) {
    // Non-fatal; ordering best-effort
    console.log('Could not reorder patient-type buttons:', err);
  }
  
  // Update dropdown menu items in help section
  const dropdownItems = document.querySelectorAll('.looking-for-menu .dropdown-item');
  dropdownItems.forEach(item => {
    const value = item.getAttribute('data-value');
    const icon = item.querySelector('i');
    
    switch(value) {
      case 'doctor':
        if (t.helpFindDoctor && icon && icon.nextSibling) {
          icon.nextSibling.textContent = t.helpFindDoctor;
        }
        break;
      case 'appointment':
        if (t.helpBookAppointment && icon && icon.nextSibling) {
          icon.nextSibling.textContent = t.helpBookAppointment;
        }
        break;
      case 'services':
        if (t.helpFindServices && icon && icon.nextSibling) {
          icon.nextSibling.textContent = t.helpFindServices;
        }
        break;
      case 'emergency':
        if (t.conditionEmergencyCare && icon && icon.nextSibling) {
          icon.nextSibling.textContent = t.conditionEmergencyCare;
        }
        break;
      case 'contact':
        if (t.helpContactUs && icon && icon.nextSibling) {
          icon.nextSibling.textContent = t.helpContactUs;
        }
        break;
    }
  });
  
  // Alternative approach: Update by specific selectors if the above doesn't work
  const findDoctorItem = document.querySelector('.looking-for-menu [data-value="doctor"]');
  if (findDoctorItem && t.helpFindDoctor) {
    const textNode = findDoctorItem.childNodes[findDoctorItem.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = t.helpFindDoctor;
    }
  }
  
  const bookAppointmentItem = document.querySelector('.looking-for-menu [data-value="appointment"]');
  if (bookAppointmentItem && t.helpBookAppointment) {
    const textNode = bookAppointmentItem.childNodes[bookAppointmentItem.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = t.helpBookAppointment;
    }
  }
  
  const findServicesItem = document.querySelector('.looking-for-menu [data-value="services"]');
  if (findServicesItem && t.helpFindServices) {
    const textNode = findServicesItem.childNodes[findServicesItem.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = t.helpFindServices;
    }
  }
  
  const emergencyCareItem = document.querySelector('.looking-for-menu [data-value="emergency"]');
  if (emergencyCareItem && t.conditionEmergencyCare) {
    const textNode = emergencyCareItem.childNodes[emergencyCareItem.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = t.conditionEmergencyCare;
    }
  }
  
  const contactUsItem = document.querySelector('.looking-for-menu [data-value="contact"]');
  if (contactUsItem && t.helpContactUs) {
    const textNode = contactUsItem.childNodes[contactUsItem.childNodes.length - 1];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = t.helpContactUs;
    }
  }
  
  // Update "opens in a new tab" screen reader text
  const screenReaderTexts = document.querySelectorAll('.cmp-link__screen-reader-only');
  screenReaderTexts.forEach(element => {
    if (element.textContent.trim().toLowerCase().includes('opens in a new tab') || 
        element.textContent.trim().toLowerCase().includes('s\'ouvre dans un nouvel onglet') ||
        element.textContent.trim().includes('يفتح في علامة تبويب جديدة')) {
      element.textContent = t.opensInNewTab;
    }
  });
  
  // Also check for any elements with "opens in a new tab" text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.children.length === 0 && element.textContent.trim() === 'opens in a new tab') {
      element.textContent = t.opensInNewTab;
    }
  });
  
  // Update signup modal form elements
  const signupModalTitle = document.querySelector('#signupModal .modal-title');
  if (signupModalTitle && t.signupModalTitle) signupModalTitle.textContent = t.signupModalTitle;
  
  const signupModalSubtitle = document.querySelector('#signupModal .modal-subtitle');
  if (signupModalSubtitle && t.signupModalSubtitle) signupModalSubtitle.textContent = t.signupModalSubtitle;
  
  // Update form section titles
  const personalInfoTitle = document.querySelector('#signupModal .personal-info-title');
  if (personalInfoTitle && t.personalInfoTitle) personalInfoTitle.textContent = t.personalInfoTitle;
  
  const contactInfoTitle = document.querySelector('#signupModal .contact-info-title');
  if (contactInfoTitle && t.contactInfoTitle) contactInfoTitle.textContent = t.contactInfoTitle;
  
  const medicalInfoTitle = document.querySelector('#signupModal .medical-info-title');
  if (medicalInfoTitle && t.medicalInfoTitle) medicalInfoTitle.textContent = t.medicalInfoTitle;
  
  const securityTitle = document.querySelector('#signupModal .security-title');
  if (securityTitle && t.securityTitle) securityTitle.textContent = t.securityTitle;
  
  // Update form labels and placeholders
  const firstNameLabel = document.querySelector('#signupModal label[for="firstName"]');
  if (firstNameLabel && t.firstName) firstNameLabel.textContent = t.firstName;
  
  const lastNameLabel = document.querySelector('#signupModal label[for="lastName"]');
  if (lastNameLabel && t.lastName) lastNameLabel.textContent = t.lastName;
  
  const birthDateLabel = document.querySelector('#signupModal label[for="birthDate"]');
  if (birthDateLabel && t.birthDate) birthDateLabel.textContent = t.birthDate;
  
  const genderLabel = document.querySelector('#signupModal label[for="gender"]');
  if (genderLabel && t.gender) genderLabel.textContent = t.gender;
  
  const emailLabel = document.querySelector('#signupModal label[for="email"]');
  if (emailLabel && t.email) emailLabel.textContent = t.email;
  
  const phoneLabel = document.querySelector('#signupModal label[for="phone"]');
  if (phoneLabel && t.phoneNumber) phoneLabel.textContent = t.phoneNumber;
  
  const addressLabel = document.querySelector('#signupModal label[for="address"]');
  if (addressLabel && t.address) addressLabel.textContent = t.address;
  
  const bloodTypeLabel = document.querySelector('#signupModal label[for="bloodType"]');
  if (bloodTypeLabel && t.bloodType) bloodTypeLabel.textContent = t.bloodType;
  
  const allergiesLabel = document.querySelector('#signupModal label[for="allergies"]');
  if (allergiesLabel && t.allergies) allergiesLabel.textContent = t.allergies;
  
  const passwordLabel = document.querySelector('#signupModal label[for="signup-password"]');
  if (passwordLabel && t.password) passwordLabel.textContent = t.password;
  
  const confirmPasswordLabel = document.querySelector('#signupModal label[for="confirmPassword"]');
  if (confirmPasswordLabel && t.confirmPassword) confirmPasswordLabel.textContent = t.confirmPassword;
  
  // Update password requirements text
  const passwordRequirements = document.querySelector('#signupModal .password-requirements');
  if (passwordRequirements && t.passwordRequirements) passwordRequirements.textContent = t.passwordRequirements;
  
  // Update password strength text
  const passwordStrengthText = document.querySelector('#signupModal #passwordStrengthText');
  if (passwordStrengthText && t.passwordStrength) passwordStrengthText.textContent = t.passwordStrength;
  
  // Update checkbox labels
  const agreeTermsLabel = document.querySelector('#signupModal label[for="agreeTerms"]');
  if (agreeTermsLabel && t.agreeTerms) agreeTermsLabel.textContent = t.agreeTerms;
  
  const subscribeNewsletterLabel = document.querySelector('#signupModal label[for="newsletter"]');
  if (subscribeNewsletterLabel && t.subscribeNewsletter) subscribeNewsletterLabel.textContent = t.subscribeNewsletter;
  
  // Update "already have account" text
  const alreadyHaveAccount = document.querySelector('#signupModal .already-have-account');
  if (alreadyHaveAccount && t.alreadyHaveAccount) alreadyHaveAccount.textContent = t.alreadyHaveAccount;
  
  const loginLink = document.querySelector('#signupModal .login-link');
  if (loginLink && t.loginLink) loginLink.textContent = t.loginLink;
  
  // Update login modal elements
  const loginModalTitle = document.querySelector('#loginModal .modal-title');
  if (loginModalTitle && t.loginModalTitle) loginModalTitle.textContent = t.loginModalTitle;
  
  const loginModalSubtitle = document.querySelector('#loginModal .modal-subtitle');
  if (loginModalSubtitle && t.loginModalSubtitle) loginModalSubtitle.textContent = t.loginModalSubtitle;
  
  // Update login form labels
  const loginEmailLabel = document.querySelector('#loginModal label[for="email"]');
  if (loginEmailLabel && t.loginEmail) loginEmailLabel.textContent = t.loginEmail;
  
  const loginPasswordLabel = document.querySelector('#loginModal label[for="password"]');
  if (loginPasswordLabel && t.loginPassword) loginPasswordLabel.textContent = t.loginPassword;
  
  // Update login form elements
  const rememberMeLabel = document.querySelector('#loginModal label[for="rememberMe"]');
  if (rememberMeLabel && t.rememberMe) rememberMeLabel.textContent = t.rememberMe;
  
  const forgotPasswordLink = document.querySelector('#loginModal .forgot-password');
  if (forgotPasswordLink && t.forgotPassword) forgotPasswordLink.textContent = t.forgotPassword;
  
  const loginButtonEl = document.querySelector('#loginModal .btn-primary .login-btn-text');
  if (loginButtonEl && t.loginButton) loginButtonEl.textContent = t.loginButton;
  
  // Update social login buttons
  const googleLoginBtn = document.querySelector('#loginModal .google-login');
  if (googleLoginBtn && t.loginWithGoogle) {
    const googleText = googleLoginBtn.querySelector('.btn-text');
    if (googleText) googleText.textContent = t.loginWithGoogle;
  }
  
  const facebookLoginBtn = document.querySelector('#loginModal .facebook-login');
  if (facebookLoginBtn && t.loginWithFacebook) {
    const facebookText = facebookLoginBtn.querySelector('.btn-text');
    if (facebookText) facebookText.textContent = t.loginWithFacebook;
  }
  
  // Update OR divider
  const orDivider = document.querySelector('#loginModal .or-divider');
  if (orDivider && t.orDivider) orDivider.textContent = t.orDivider;
  
  // Update "no account" text
  const noAccountText = document.querySelector('#loginModal .no-account');
  if (noAccountText && t.noAccount) noAccountText.textContent = t.noAccount;
  
  const signupLinkEl = document.querySelector('#loginModal .signup-link');
  if (signupLinkEl && t.signupLink) signupLinkEl.textContent = t.signupLink;
  
  // Update modal buttons
  const closeButtons = document.querySelectorAll('.modal .btn-close, .modal .close-btn');
  closeButtons.forEach(btn => {
    if (btn.textContent && t.close) btn.textContent = t.close;
    if (btn.title && t.close) btn.title = t.close;
    if (btn.getAttribute('aria-label') && t.close) btn.setAttribute('aria-label', t.close);
  });
  
  // Update submit buttons
  const signupSubmitBtn = document.querySelector('#signupModal .btn-primary:not(.close-btn)');
  if (signupSubmitBtn && t.signupButton) {
    const btnText = signupSubmitBtn.querySelector('.btn-text') || signupSubmitBtn;
    btnText.textContent = t.signupButton;
  }
  
  // Update input placeholders
  const emailInputs = document.querySelectorAll('#loginModal input[type="email"], #signupModal input[type="email"]');
  emailInputs.forEach(input => {
    if (t.email) input.placeholder = t.email;
  });
  
  const passwordInputs = document.querySelectorAll('#loginModal input[type="password"], #signupModal input[type="password"]');
  passwordInputs.forEach(input => {
    if (input.id === 'password' && t.loginPassword) input.placeholder = t.loginPassword;
    if (input.id === 'signup-password' && t.password) input.placeholder = t.password;
    if (input.id === 'signup-confirm-password' && t.confirmPassword) input.placeholder = t.confirmPassword;
  });
  
  // Update form validation messages
  const requiredFields = document.querySelectorAll('.modal .required');
  requiredFields.forEach(field => {
    if (t.required) field.textContent = t.required;
  });
  
  const optionalFields = document.querySelectorAll('.modal .optional');
  optionalFields.forEach(field => {
    if (t.optional) field.textContent = t.optional;
  });
  
  // Update gender options
  const genderSelect = document.querySelector('#signupModal select[name="gender"]');
  if (genderSelect) {
    const maleOption = genderSelect.querySelector('option[value="male"]');
    if (maleOption && t.male) maleOption.textContent = t.male;
    
    const femaleOption = genderSelect.querySelector('option[value="female"]');
    if (femaleOption && t.female) femaleOption.textContent = t.female;
    
    const otherOption = genderSelect.querySelector('option[value="other"]');
    if (otherOption && t.other) otherOption.textContent = t.other;
  }
  
  // Update blood type select
  const bloodTypeSelect = document.querySelector('#signupModal select[name="bloodType"]');
  if (bloodTypeSelect) {
    const defaultOption = bloodTypeSelect.querySelector('option[value=""]');
    if (defaultOption && t.selectBloodType) defaultOption.textContent = t.selectBloodType;
  }
  
  // Update password strength indicators
  const passwordStrengthIndicators = document.querySelectorAll('.password-strength-indicator');
  passwordStrengthIndicators.forEach(indicator => {
    const strengthText = indicator.textContent.toLowerCase();
    if (strengthText.includes('weak') && t.weakPassword) indicator.textContent = t.weakPassword;
    if (strengthText.includes('fair') && t.fairPassword) indicator.textContent = t.fairPassword;
    if (strengthText.includes('good') && t.goodPassword) indicator.textContent = t.goodPassword;
    if (strengthText.includes('strong') && t.strongPassword) indicator.textContent = t.strongPassword;
  });
  
  // Update all modal elements with data-i18n attributes
  const modalElements = document.querySelectorAll('[data-i18n]');
  modalElements.forEach(element => {
    const i18nKey = element.getAttribute('data-i18n');
    
    // Handle attribute translations like [placeholder], [aria-label], [title]
    if (i18nKey.startsWith('[') && i18nKey.includes(']')) {
      const match = i18nKey.match(/\[([^\]]+)\](.+)/);
      if (match) {
        const attribute = match[1];
        const key = match[2];
        const translationValue = getNestedTranslation(t, key);
        if (translationValue) {
          element.setAttribute(attribute, translationValue);
        }
      }
    } else {
      // Handle regular text content translations
      const translationValue = getNestedTranslation(t, i18nKey);
      if (translationValue) {
        element.textContent = translationValue;
      }
    }
  });
  
  // Additional specific modal element updates
  const loginModalTitleEl = document.querySelector('#loginModalLabel');
  if (loginModalTitleEl && t.modalLoginTitle) loginModalTitleEl.textContent = t.modalLoginTitle;
  
  const loginModalSubtitleEl = document.querySelector('#loginModal .opacity-90');
  if (loginModalSubtitleEl && t.modalLoginSubtitle) loginModalSubtitleEl.textContent = t.modalLoginSubtitle;
  
  const loginWelcome = document.querySelector('#loginModal .card-title');
  if (loginWelcome && t.modalLoginWelcome) loginWelcome.textContent = t.modalLoginWelcome;
  
  const hospitalNameEl = document.querySelector('#loginModal .card-text');
  if (hospitalNameEl && t.hospitalName) hospitalNameEl.textContent = t.hospitalName;
  
  // Update signup modal elements
  const signupModalTitleEl = document.querySelector('#signupModalLabel');
  if (signupModalTitleEl && t.modalSignupTitle) signupModalTitleEl.textContent = t.modalSignupTitle;
  
  const signupWelcomeEl = document.querySelector('#signupModal .text-muted');
  if (signupWelcomeEl && t.modalSignupWelcome) signupWelcomeEl.textContent = t.modalSignupWelcome;
  
  // Update form section headers
  const personalInfoHeader = document.querySelector('#signupModal h6');
  if (personalInfoHeader && t.formPersonalInfo) personalInfoHeader.textContent = t.formPersonalInfo;
  
  // Update all form labels, placeholders, and validation messages
  const formLabels = document.querySelectorAll('#loginModal label, #signupModal label');
  formLabels.forEach(label => {
    const forAttr = label.getAttribute('for');
    const spanElement = label.querySelector('span');
    
    if (spanElement) {
      const currentText = spanElement.textContent.trim();
      // Map current text to translation keys
      if (currentText.includes('البريد الإلكتروني') || currentText.includes('Email') && t.formEmail) {
        spanElement.textContent = t.formEmail;
      }
      if (currentText.includes('كلمة المرور') || currentText.includes('Password') && t.formPassword) {
        spanElement.textContent = t.formPassword;
      }
      if (currentText.includes('الاسم الأول') || currentText.includes('First Name') && t.formFirstName) {
        spanElement.textContent = t.formFirstName;
      }
      // Add more mappings as needed
    }
  });
  
  // Update input placeholders
  const inputs = document.querySelectorAll('#loginModal input, #signupModal input');
  inputs.forEach(input => {
    const id = input.id;
    if (id === 'email' && t.emailPlaceholder) input.placeholder = t.emailPlaceholder;
    if (id === 'password' && t.passwordPlaceholder) input.placeholder = t.passwordPlaceholder;
    if (id === 'signup-firstname' && t.firstNamePlaceholder) input.placeholder = t.firstNamePlaceholder;
    if (id === 'signup-lastname' && t.lastNamePlaceholder) input.placeholder = t.lastNamePlaceholder;
    if (id === 'signup-email' && t.emailPlaceholder) input.placeholder = t.emailPlaceholder;
    if (id === 'signup-phone' && t.phonePlaceholder) input.placeholder = t.phonePlaceholder;
    if (id === 'signup-address' && t.addressPlaceholder) input.placeholder = t.addressPlaceholder;
    if (id === 'signup-allergies' && t.allergiesPlaceholder) input.placeholder = t.allergiesPlaceholder;
    if (id === 'signup-password' && t.signupPasswordPlaceholder) input.placeholder = t.signupPasswordPlaceholder;
    if (id === 'signup-confirm-password' && t.confirmPasswordPlaceholder) input.placeholder = t.confirmPasswordPlaceholder;
  });
  
  // Update validation messages
  const validationMessages = document.querySelectorAll('.invalid-feedback, .valid-feedback');
  validationMessages.forEach(msg => {
    const text = msg.textContent.trim();
    if (text.includes('بريد إلكتروني صحيح') && t.validationEmailInvalid) {
      msg.textContent = t.validationEmailInvalid;
    }
    // Add more validation message mappings
  });

  // direction and lang for Arabic
  const isRTL = lang === 'ar';
  document.body.classList.toggle('rtl', isRTL);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

// Helper to strip HTML tags when setting attributes
function stripTags(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// Helper to get nested translation values
function getNestedTranslation(translations, key) {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return null;
    }
  }
  
  return typeof value === 'string' ? value : null;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', async function(e) {
    e.preventDefault();
    const lang = this.getAttribute('data-lang');
    await setLanguage(lang);
    try { localStorage.setItem('lang', lang); } catch (_) {}
  });
});

// Hero diaporama/slideshow effect (transform-based, RTL)
// Images: remote URLs (preloaded to avoid flicker). To use local files, replace URLs with local paths.
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
let slidesContainer = null;

// Preload images to avoid flicker when switching large remote images
function preloadHeroImages(urls, cb) {
  let loaded = 0;
  const imgs = [];
  if (!urls || !urls.length) return cb && cb(imgs);
  urls.forEach((u, i) => {
    const img = new Image();
    img.src = u;
    img.onload = img.onerror = () => {
      loaded++;
      imgs[i] = img;
      if (loaded === urls.length && typeof cb === 'function') cb(imgs);
    };
  });
}

function buildHeroSlides() {
  if (!heroSection) return;
  // remove existing slides if present
  const existing = heroSection.querySelector('.hero-slides');
  if (existing) existing.remove();

  slidesContainer = document.createElement('div');
  slidesContainer.className = 'hero-slides';

  heroImages.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.style.backgroundImage = `url('${src}')`;
    slidesContainer.appendChild(slide);
  });

  // Insert slides behind the overlay content so hero text stays visible
  heroSection.insertBefore(slidesContainer, heroSection.firstChild);
}

function setHeroPosition(idx) {
  if (!slidesContainer) return;
  // clamp index
  const count = heroImages.length;
  heroIndex = ((idx % count) + count) % count;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    // If reduced motion requested, simply set background-image on heroSection as fallback
    const src = heroImages[heroIndex];
    if (heroSection) heroSection.style.backgroundImage = `url('${src}')`;
  } else {
    slidesContainer.style.transform = `translateX(${ -heroIndex * 100 }%)`;
  }
  updateActiveIndicator(heroIndex);
}

function showNextHeroImage() {
  setHeroPosition(heroIndex + 1);
}

function showPrevHeroImage() {
  setHeroPosition(heroIndex - 1);
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) heroInterval = setInterval(showNextHeroImage, 4000);
}

function createHeroIndicators() {
  const container = document.getElementById(heroIndicatorsContainerId);
  if (!container) return;
  container.innerHTML = '';
  heroImages.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'hero-dot';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.addEventListener('click', () => {
      setHeroPosition(i);
      resetHeroInterval();
    });
    container.appendChild(btn);
  });
  updateActiveIndicator(heroIndex);
}

function updateActiveIndicator(idx) {
  const container = document.getElementById(heroIndicatorsContainerId);
  if (!container) return;
  const dots = Array.from(container.children);
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === idx);
    d.setAttribute('aria-current', i === idx ? 'true' : 'false');
  });
}

// Arrow handlers (use optional chaining in case elements are missing)
document.getElementById('hero-arrow-right')?.addEventListener('click', () => { showNextHeroImage(); resetHeroInterval(); });
document.getElementById('hero-arrow-left')?.addEventListener('click', () => { showPrevHeroImage(); resetHeroInterval(); });

// Pause autoplay while hovering/focusing the hero
function attachHeroHoverPause(el) {
  if (!el) return;
  el.addEventListener('mouseenter', () => clearInterval(heroInterval));
  el.addEventListener('focusin', () => clearInterval(heroInterval));
  el.addEventListener('mouseleave', () => resetHeroInterval());
  el.addEventListener('focusout', () => resetHeroInterval());
}

// Add touch / swipe support for mobile
function attachSwipeSupport(el) {
  if (!el || !slidesContainer) return;
  let startX = 0;
  let deltaX = 0;
  let touching = false;

  el.addEventListener('touchstart', (e) => {
    clearInterval(heroInterval);
    touching = true;
    startX = e.touches[0].clientX;
    deltaX = 0;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (!touching) return;
    deltaX = e.touches[0].clientX - startX;
    // Move slides proportionally for direct feedback
    const width = el.clientWidth || window.innerWidth;
    const percent = deltaX / width * 100;
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = `translateX(${ -heroIndex * 100 + percent }%)`;
  }, { passive: true });

  el.addEventListener('touchend', (e) => {
    touching = false;
    slidesContainer.style.transition = '';
    const threshold = 40; // px
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setHeroPosition(heroIndex + 1);
      } else {
        setHeroPosition(heroIndex - 1);
      }
    } else {
      // snap back
      setHeroPosition(heroIndex);
    }
    resetHeroInterval();
  });
}

// Initialize the hero: preload images, build slides, indicators and start autoplay
document.addEventListener('DOMContentLoaded', () => {
  // initialize translations too (existing call elsewhere may already do this)
  try { initTranslations(); } catch (e) { /* ignore */ }

  if (!heroSection || !heroImages || !heroImages.length) return;
  preloadHeroImages(heroImages, () => {
    buildHeroSlides();
    createHeroIndicators();
    setHeroPosition(0);
    attachHeroHoverPause(heroSection);
    attachSwipeSupport(heroSection);
    // ensure transitionend keeps index in sync if animations finish
    slidesContainer.addEventListener('transitionend', () => {
      updateActiveIndicator(heroIndex);
    });
    resetHeroInterval();
  });
});

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.classList.remove('show');
    setTimeout(() => {
      if (!backToTopButton.classList.contains('show')) {
        backToTopButton.style.display = 'none';
      }
    }, 300);
  }
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Event listeners for back to top
if (backToTopButton) {
  window.addEventListener('scroll', toggleBackToTop);
  backToTopButton.addEventListener('click', scrollToTop);
}

// Initialize back to top button state
toggleBackToTop();

// Let Us Help Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Patient type selector functionality
  const patientTypeButtons = document.querySelectorAll('input[name="patientType"]');
  const lookingForBtn = document.querySelector('.looking-for-btn');
  const lookingForMenu = document.querySelector('.looking-for-menu');
  const helpSubmitBtn = document.querySelector('.help-submit-btn');
  
  // Update looking for options based on patient type
  patientTypeButtons.forEach(button => {
    button.addEventListener('change', function() {
      const patientType = this.id;
      updateLookingForOptions(patientType);
    });
  });
  
  function updateLookingForOptions(patientType) {
    const menuItems = {
      patient: [
        { icon: 'fas fa-user-md', text: 'Find a Doctor', value: 'doctor' },
        { icon: 'fas fa-calendar-check', text: 'Book Appointment', value: 'appointment' },
        { icon: 'fas fa-hospital', text: 'Find Services', value: 'services' },
        { icon: 'fas fa-heartbeat', text: 'Emergency Care', value: 'emergency' },
        { icon: 'fas fa-phone', text: 'Contact Us', value: 'contact' }
      ],
      visitor: [
        { icon: 'fas fa-map-marker-alt', text: 'Get Directions', value: 'directions' },
        { icon: 'fas fa-clock', text: 'Visiting Hours', value: 'hours' },
        { icon: 'fas fa-parking', text: 'Parking Info', value: 'parking' },
        { icon: 'fas fa-phone', text: 'Contact Us', value: 'contact' },
        { icon: 'fas fa-info-circle', text: 'General Info', value: 'info' }
      ],
      healthcare: [
        { icon: 'fas fa-user-tie', text: 'Professional Services', value: 'professional' },
        { icon: 'fas fa-graduation-cap', text: 'Education & Training', value: 'education' },
        { icon: 'fas fa-handshake', text: 'Partnerships', value: 'partnerships' },
        { icon: 'fas fa-phone', text: 'Contact Us', value: 'contact' },
        { icon: 'fas fa-briefcase', text: 'Career Opportunities', value: 'careers' }
      ]
    };
    
    const items = menuItems[patientType] || menuItems.patient;

    // Update dropdown menu (compact)
    if (lookingForMenu) {
      lookingForMenu.innerHTML = items.map(item => 
        `<li><a class="dropdown-item" href="#" data-value="${item.value}">
          <i class="${item.icon} me-2"></i>${item.text}
        </a></li>`
      ).join('');

      // Update button text to first option
      if (lookingForBtn && items[0]) {
        lookingForBtn.innerHTML = `<i class="${items[0].icon} me-2"></i>${items[0].text}`;
        lookingForBtn.setAttribute('data-value', items[0].value);
      }

      // Add click handlers to new menu items
      lookingForMenu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const value = this.getAttribute('data-value');
          const text = this.textContent.trim();
          const icon = this.querySelector('i') ? this.querySelector('i').className : '';

          if (lookingForBtn) {
            lookingForBtn.innerHTML = `<i class="${icon} me-2"></i>${text}`;
            lookingForBtn.setAttribute('data-value', value);
          }
        });
      });
    }

    // helpOptionsGrid was removed from the DOM per user request; dynamic rendering skipped.
  }

  // Use event delegation on the patient-type group so it works across language switches
  const patientTypeGroup = document.querySelector('.patient-type-group');
  if (patientTypeGroup) {
    patientTypeGroup.addEventListener('click', function(e) {
      const label = e.target.closest && e.target.closest('.patient-type-btn');
      if (!label) return;
      // Find the associated input (by for attribute)
      const forAttr = label.getAttribute('for');
      if (forAttr) {
        const input = document.getElementById(forAttr);
        if (input) {
          input.checked = true;
          // Update the options grid for the selected patient type
          try { updateLookingForOptions(forAttr); } catch (err) { /* ignore */ }
        }
      }
    });
  }
  
  // Help submit button functionality
  if (helpSubmitBtn) {
    helpSubmitBtn.addEventListener('click', function() {
      const selectedPatientType = document.querySelector('input[name="patientType"]:checked')?.id || 'patient';
      const selectedService = lookingForBtn?.getAttribute('data-value') || 'doctor';
      
      // Show loading state
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
      this.disabled = true;
      
      // Simulate processing
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
        
        // Show success message or redirect
        showHelpResult(selectedPatientType, selectedService);
      }, 1500);
    });
  }
  
  function showHelpResult(patientType, service) {
    // Create and show result modal or redirect to appropriate page
    const resultMessages = {
      doctor: 'Redirecting you to our doctor directory...',
      appointment: 'Opening appointment booking system...',
      services: 'Loading our services directory...',
      emergency: 'Connecting you to emergency services...',
      contact: 'Opening contact information...',
      directions: 'Loading directions to our facility...',
      hours: 'Displaying visiting hours...',
      parking: 'Showing parking information...',
      info: 'Loading general information...',
      professional: 'Accessing professional services...',
      education: 'Opening education portal...',
      partnerships: 'Loading partnership information...',
      careers: 'Redirecting to career opportunities...'
    };
    
    const message = resultMessages[service] || 'Processing your request...';
    
    // Simple alert for demo - in production, this would redirect or show a proper modal
    alert(`Thank you! ${message}\n\nPatient Type: ${patientType}\nService: ${service}`);
  }
  
  // Initialize with default patient type
  updateLookingForOptions('patient');
});

// News card hover effects
document.addEventListener('DOMContentLoaded', function() {
  const newsCards = document.querySelectorAll('.news-card');
  
  newsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Condition tags interaction
document.addEventListener('DOMContentLoaded', function() {
  const conditionTags = document.querySelectorAll('.condition-tag');
  
  conditionTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const condition = this.textContent.trim();
      
      // Add clicked effect
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // In production, this would search for the condition
      console.log(`Searching for: ${condition}`);
      
      // Show search result (demo)
      setTimeout(() => {
        alert(`Searching for information about: ${condition}`);
      }, 300);
    });
  });
});

// Enhanced Login & Signup Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Password toggle functionality
  function setupPasswordToggle(toggleId, inputId, iconId) {
    const toggleBtn = document.getElementById(toggleId);
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    
    if (toggleBtn && passwordInput && eyeIcon) {
      toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        if (type === 'text') {
          eyeIcon.classList.remove('fa-eye');
          eyeIcon.classList.add('fa-eye-slash');
        } else {
          eyeIcon.classList.remove('fa-eye-slash');
          eyeIcon.classList.add('fa-eye');
        }
      });
    }
  }
  
  // Setup password toggles
  setupPasswordToggle('togglePassword', 'password', 'eyeIcon');
  setupPasswordToggle('toggleSignupPassword', 'signup-password', 'signupEyeIcon');
  
  // Password strength checker
  const signupPassword = document.getElementById('signup-password');
  const passwordStrength = document.getElementById('passwordStrength');
  const passwordStrengthText = document.getElementById('passwordStrengthText');
  
  if (signupPassword && passwordStrength && passwordStrengthText) {
    signupPassword.addEventListener('input', function() {
      const password = this.value;
      const strength = calculatePasswordStrength(password);
      
      // Remove all strength classes
      passwordStrength.classList.remove('weak', 'fair', 'good', 'strong');
      
      // Add appropriate class and update text
      if (password.length === 0) {
        passwordStrength.style.width = '0%';
        passwordStrengthText.textContent = 'قوة كلمة المرور';
        passwordStrength.className = 'progress-bar password-strength-bar';
      } else if (strength < 2) {
        passwordStrength.classList.add('weak');
        passwordStrengthText.textContent = 'ضعيفة';
      } else if (strength < 3) {
        passwordStrength.classList.add('fair');
        passwordStrengthText.textContent = 'متوسطة';
      } else if (strength < 4) {
        passwordStrength.classList.add('good');
        passwordStrengthText.textContent = 'جيدة';
      } else {
        passwordStrength.classList.add('strong');
        passwordStrengthText.textContent = 'قوية جداً';
      }
    });
  }
  
  // Password strength calculation
  function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
  }
  
  // Enhanced Bootstrap Login Form validation and submission
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm) {
    // Real-time validation for Bootstrap
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Email validation
    emailInput.addEventListener('input', function() {
      if (validateEmail(this.value)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
      }
    });
    
    // Password validation
    passwordInput.addEventListener('input', function() {
      if (this.value.length >= 6) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
      }
    });
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value;
      const password = passwordInput.value;
      
      // Bootstrap validation
      if (loginForm.checkValidity() && validateEmail(email) && password.length >= 6) {
        // Show enhanced loading state
        const submitBtn = this.querySelector('.btn-primary');
        const btnText = submitBtn.querySelector('.login-btn-text');
        const spinner = submitBtn.querySelector('.spinner-border');
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'جاري تسجيل الدخول...';
        spinner.classList.remove('d-none');
        
        // Simulate login process with enhanced feedback
        setTimeout(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          btnText.textContent = 'تسجيل الدخول';
          spinner.classList.add('d-none');
          
          // Close modal with animation
          const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
          modal.hide();
          
          // Show enhanced success alert
          showEnhancedAlert('تم تسجيل الدخول بنجاح!', 'success', 'مرحباً بعودتك إلى المؤسسة الاستشفائية');
        }, 2500);
      } else {
        // Show validation errors
        loginForm.classList.add('was-validated');
        
        // Shake animation for invalid form
        const modal = document.querySelector('#loginModal .modal-content');
        modal.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          modal.style.animation = '';
        }, 500);
      }
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(signupForm);
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      
      // Password match validation
      if (password !== confirmPassword) {
        document.getElementById('signup-confirm-password').setCustomValidity('كلمات المرور غير متطابقة');
      } else {
        document.getElementById('signup-confirm-password').setCustomValidity('');
      }
      
      if (signupForm.checkValidity()) {
        // Show loading state
        const submitBtn = document.querySelector('#signupModal .btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري إنشاء الحساب...';
        submitBtn.disabled = true;
        
        // Update progress bar
        updateSignupProgress(100);
        
        // Simulate signup process
        setTimeout(() => {
          submitBtn.classList.remove('btn-loading');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          // Close modal and show success
          const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
          modal.hide();
          
          showAlert('تم إنشاء الحساب بنجاح! مرحباً بك في عائلتنا الطبية.', 'success');
          
          // Reset form and progress
          signupForm.reset();
          updateSignupProgress(0);
        }, 3000);
      } else {
        signupForm.classList.add('was-validated');
      }
    });
    
    // Update progress as user fills form
    const requiredInputs = signupForm.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('input', updateFormProgress);
      input.addEventListener('change', updateFormProgress);
    });
  }
     
  // Helper functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function updateFormProgress() {
    const requiredInputs = document.querySelectorAll('#signupForm input[required], #signupForm select[required]');
    let filledInputs = 0;
    
    requiredInputs.forEach(input => {
      if (input.value.trim() !== '') {
        filledInputs++;
      }
    });
    
    const progress = (filledInputs / requiredInputs.length) * 100;
    updateSignupProgress(progress);
  }
  
  function updateSignupProgress(percentage) {
    const progressBar = document.getElementById('signupProgress');
    if (progressBar) {
      progressBar.style.width = percentage + '%';
    }
  }
  
  function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
  
  function showEnhancedAlert(title, type, subtitle = '') {
    // Create enhanced alert with Bootstrap components
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed shadow-lg border-0`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 350px; border-radius: 15px;';
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    const bgGradient = type === 'success' ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' : 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
    
    alertDiv.style.background = bgGradient;
    alertDiv.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="me-3">
          <i class="${icon} fs-3 text-${type === 'success' ? 'success' : 'danger'}"></i>
        </div>
        <div class="flex-grow-1">
          <h6 class="alert-heading mb-1 fw-bold">${title}</h6>
          ${subtitle ? `<small class="text-muted">${subtitle}</small>` : ''}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
      </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Add entrance animation
    alertDiv.style.animation = 'slideInRight 0.5s ease-out';
    
    // Auto remove after 6 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.remove();
          }
        }, 500);
      }
    }, 6000);
  }
  
  // Enhanced Auth Button Interactions
  const loginBtn = document.getElementById('btn-login');
  const signupBtn = document.getElementById('btn-signup');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }
  
  if (signupBtn) {
    signupBtn.addEventListener('click', function() {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }
  
  // Modal event listeners for RTL support
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  
  if (loginModal) {
    loginModal.addEventListener('shown.bs.modal', function() {
      // Focus on email input when modal opens
      document.getElementById('email').focus();
      
      // Add entrance animation to modal content
      const modalContent = this.querySelector('.modal-content');
      modalContent.style.animation = 'modalSlideIn 0.4s ease-out';
    });
    
    loginModal.addEventListener('hide.bs.modal', function() {
      // Reset login form
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.classList.remove('was-validated');
        loginForm.reset();
      }
    });
  }
  
  if (signupModal) {
    signupModal.addEventListener('shown.bs.modal', function() {
      // Focus on first name input when modal opens
      document.getElementById('signup-firstname').focus();
      
      // Add entrance animation to modal content
      const modalContent = this.querySelector('.modal-content');
      modalContent.style.animation = 'modalSlideIn 0.4s ease-out';
    });
    
    signupModal.addEventListener('hidden.bs.modal', function() {
      // Reset form when modal closes
      const signupForm = document.getElementById('signupForm');
      if (signupForm) {
        signupForm.classList.remove('was-validated');
        signupForm.reset();
        updateSignupProgress(0);
      }
    });
  }
});

// Specialty card interactions
document.addEventListener('DOMContentLoaded', function() {
  const specialtyCards = document.querySelectorAll('.specialty-card');
  
  specialtyCards.forEach(card => {
    const icon = card.querySelector('.specialty-icon');
    
    card.addEventListener('mouseenter', function() {
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
    
    // Specialty link click handler
    const specialtyLink = card.querySelector('.specialty-link');
    if (specialtyLink) {
      specialtyLink.addEventListener('click', function(e) {
        e.preventDefault();
        const specialtyName = card.querySelector('.specialty-name').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 150);
        
        // In production, this would navigate to specialty page
        setTimeout(() => {
          alert(`Loading information about: ${specialtyName}`);
        }, 300);
      });
    }
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === 'javascript:void(0)') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Smooth scrolling enhancement for sticky navigation
document.addEventListener('DOMContentLoaded', function() {
  // Enhance anchor link scrolling to account for sticky headers
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === 'javascript:void(0)') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Calculate offset for sticky headers
        const navbar = document.getElementById('main-navbar');
        const subMenu = document.getElementById('sub-menu');
        let offset = 0;
        
        if (navbar && navbar.classList.contains('sticky')) {
          offset += navbar.offsetHeight;
        }
        if (subMenu && subMenu.classList.contains('sticky')) {
          offset += subMenu.offsetHeight;
        }
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add entrance animations to sections when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all major sections
  const sections = document.querySelectorAll('.let-us-help-section, .recent-news-section, .searched-conditions-section, .featured-specialties-section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// Dynamic Sticky Navigation System
document.addEventListener('DOMContentLoaded', function() {
  const mainHeader = document.getElementById('main-header');
  const navbar = document.getElementById('main-navbar');
  const subMenu = document.getElementById('sub-menu');
  const body = document.body;
  
  let headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
  let navbarHeight = navbar ? navbar.offsetHeight : 0;
  let subMenuHeight = subMenu ? subMenu.offsetHeight : 0;
  
  let lastScrollTop = 0;
  let isNavbarSticky = false;
  let isSubMenuSticky = false;
  let scrollDirection = 'down';
  
  function updateStickyNavigation() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction
    if (scrollTop > lastScrollTop) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    
    // Header sticky behavior - hide when scrolling down past header
    if (scrollTop > headerHeight) {
      if (!mainHeader.classList.contains('sticky')) {
        mainHeader.classList.add('sticky');
      }
      
      // Show header when scrolling up
      if (scrollDirection === 'up') {
        mainHeader.classList.add('show');
      } else {
        mainHeader.classList.remove('show');
      }
    } else {
      mainHeader.classList.remove('sticky', 'show');
    }
    
    // Navbar sticky behavior
    const navbarTriggerPoint = headerHeight + (navbarHeight / 2);
    
    if (scrollTop > navbarTriggerPoint) {
      if (!isNavbarSticky) {
        navbar.classList.add('sticky');
        body.classList.add('navbar-sticky');
        isNavbarSticky = true;
      }
      
      // Compact navbar on extensive scrolling
      if (scrollTop > navbarTriggerPoint + 200) {
        navbar.classList.add('compact');
        body.classList.add('compact');
      } else {
        navbar.classList.remove('compact');
        body.classList.remove('compact');
      }
      
    } else {
      navbar.classList.remove('sticky', 'compact');
      body.classList.remove('navbar-sticky', 'compact');
      isNavbarSticky = false;
    }
    
    // Sub-menu sticky behavior
    const subMenuTriggerPoint = headerHeight + navbarHeight + (subMenuHeight / 2);
    
    if (scrollTop > subMenuTriggerPoint && isNavbarSticky) {
      if (!isSubMenuSticky) {
        subMenu.classList.add('sticky');
        body.classList.add('submenu-sticky');
        isSubMenuSticky = true;
      }
      
      // Show submenu when scrolling up or when near top sections
      if (scrollDirection === 'up' || scrollTop < subMenuTriggerPoint + 300) {
        subMenu.classList.add('show');
      } else {
        subMenu.classList.remove('show');
      }
      
    } else {
      subMenu.classList.remove('sticky', 'show');
      body.classList.remove('submenu-sticky');
      isSubMenuSticky = false;
    }
    
    // Update scroll progress indicator
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / documentHeight;
      scrollIndicator.style.transform = `scaleX(${Math.min(scrollProgress, 1)})`;
    }
    
    lastScrollTop = scrollTop;
  }
  
  // Throttled scroll event
  let ticking = false;
  
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateStickyNavigation();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
    navbarHeight = navbar ? navbar.offsetHeight : 0;
    subMenuHeight = subMenu ? subMenu.offsetHeight : 0;
  });
  
  // Initial call
  updateStickyNavigation();
});

// Enhanced anchor link scrolling for sticky navigation
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === 'javascript:void(0)') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Calculate offset for sticky headers
        const navbar = document.getElementById('main-navbar');
        const subMenu = document.getElementById('sub-menu');
        let offset = 0;
        
        if (navbar && navbar.classList.contains('sticky')) {
          offset += navbar.offsetHeight;
        }
        if (subMenu && subMenu.classList.contains('sticky')) {
          offset += subMenu.offsetHeight;
        }
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
