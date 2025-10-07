// Login Modal Logic
document.addEventListener('DOMContentLoaded', function() {
  function activateLoginAndDarkMode() {
    const loginModal = document.getElementById('loginModal');
    const btnInscription = document.getElementById('btn-inscription');
    const btnConnexion = document.getElementById('btn-connexion');
    const btnLogin = document.getElementById('btn-login');
    const btnSignup = document.getElementById('btn-signup');
    const closeLoginModal = document.getElementById('closeLoginModal');

    function showLogin() {
      if (!loginModal) return;
      document.getElementById('modal-title').textContent = 'Login';
      document.getElementById('login-fields').style.display = 'block';
      document.getElementById('signup-fields').style.display = 'none';
      loginModal.style.display = 'block';
    }
    function showSignup() {
      if (!loginModal) return;
      document.getElementById('modal-title').textContent = 'Créer un compte';
      document.getElementById('login-fields').style.display = 'none';
      document.getElementById('signup-fields').style.display = 'block';
      loginModal.style.display = 'block';
    }
    function closeLogin() {
      if (!loginModal) return;
      loginModal.style.display = 'none';
    }
    if (btnInscription) btnInscription.onclick = showSignup;
    if (btnSignup) btnSignup.onclick = showSignup;
    if (btnConnexion) btnConnexion.onclick = showLogin;
    if (btnLogin) btnLogin.onclick = showLogin;
    if (closeLoginModal) closeLoginModal.onclick = closeLogin;
    window.onclick = function(event) {
      if (event.target === loginModal) {
        closeLogin();
      }
    };
  }
  activateLoginAndDarkMode();
});

// Additional UI features requested
document.addEventListener('DOMContentLoaded', function(){
  // Loader hide after small delay
  const loader = document.getElementById('page-loader');
  setTimeout(()=>{ if(loader) loader.style.display='none'; }, 700);

  // Welcome modal once per session
  const welcome = document.getElementById('welcomeModal');
  const welcomeClose = document.getElementById('welcome-close');
  const welcomeNo = document.getElementById('welcome-no-thanks');
  try{
    if(!localStorage.getItem('welcome_shown')){
      setTimeout(()=>{ if(welcome) welcome.style.display='flex'; }, 900);
      localStorage.setItem('welcome_shown','1');
    } else { if(welcome) welcome.style.display='none'; }
  }catch(e){}
  if(welcomeClose) welcomeClose.onclick = ()=> welcome.style.display='none';
  if(welcomeNo) welcomeNo.onclick = ()=> welcome.style.display='none';

  // Back to top button
  const back = document.createElement('button'); back.id='backToTop'; back.innerHTML='<i class="fa fa-chevron-up"></i>';
  document.body.appendChild(back);
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>300) back.classList.add('show'); else back.classList.remove('show');
  });

  // Sticky transparent navbar -> colored on scroll
  const nav = document.querySelector('.navbar');
  function checkNav(){ if(!nav) return; if(window.scrollY>80) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
  checkNav(); window.addEventListener('scroll', checkNav);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.12});
  reveals.forEach(r=>revealObserver.observe(r));

  // Typing effect for hero title
  const typedEl = document.querySelector('#hero-title');
  if(typedEl){
    const full = typedEl.textContent.trim();
    typedEl.textContent='';
    typedEl.classList.add('typed');
    let i=0; function type(){ if(i<=full.length){ typedEl.textContent = full.slice(0,i); i++; setTimeout(type, 50); } else { typedEl.classList.remove('typed'); } }
    setTimeout(type,700);
  }

  // Counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach(c=>{
    const io = new IntersectionObserver((entries, o)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const el=en.target; const to = parseInt(el.getAttribute('data-to')||'0',10); let v=0; const dur=1400; const step=Math.max(1,Math.floor(to/(dur/24)));
          const t = setInterval(()=>{ v+=step; if(v>=to){ v=to; el.textContent=to; clearInterval(t);} else el.textContent=v; }, 24);
          o.unobserve(el);
        }
      })
    },{threshold:0.3});
    io.observe(c);
  });

  // Parallax simple
  const pars = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY; pars.forEach(p=>{ const speed = parseFloat(p.getAttribute('data-speed')||'0.25'); p.style.transform = `translateY(${y*speed}px)`; });
  });

  // Fixed booking button
  const book = document.createElement('a'); book.className='fixed-book btn-gradient btn-gradient-glow'; book.href='booking.html'; book.innerHTML='<i class="fa fa-calendar-check"></i><span class="ms-1">احجز موعدًا</span>';
  document.body.appendChild(book);

  // Chat widget (small)
  const chat = document.createElement('div'); chat.className='chat-widget'; chat.innerHTML=`<div class="chat-header"><div>دردشة سريعة</div><button id="chat-close" class="btn btn-sm btn-light">×</button></div><div class="chat-body">مرحبًا! كيف يمكننا مساعدتك؟</div><div class="chat-input"><input placeholder="اكتب رسالة..." class="form-control chat-msg"><button class="btn btn-gradient send-chat">إرسال</button></div>`;
  document.body.appendChild(chat);
  document.getElementById('chat-close').addEventListener('click', ()=> chat.style.display='none');
  chat.querySelector('.send-chat').addEventListener('click', ()=>{ const v=chat.querySelector('.chat-msg').value||'شكراً لتواصلك'; chat.querySelector('.chat-body').innerHTML += `<div style="margin-top:8px;background:#f6f6f6;padding:8px;border-radius:8px">${v}</div>`; chat.querySelector('.chat-msg').value=''; });

  // Contact form success toast
  const contactForm = document.querySelector('#contact-section form');
  if(contactForm){ contactForm.addEventListener('submit', function(e){ e.preventDefault(); showToast('تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.'); contactForm.reset(); }); }

  function showToast(msg){ let t = document.querySelector('.toast-success'); if(!t){ t=document.createElement('div'); t.className='toast-success'; document.body.appendChild(t);} t.textContent=msg; t.style.display='block'; setTimeout(()=>{ t.style.display='none'; }, 3800); }

  // Persist dark mode (toggle already exists earlier) - ensure saved
  const toggle = document.getElementById('toggle-dark');
  if(toggle){ if(localStorage.getItem('dark')==='1') document.body.classList.add('dark-mode'); toggle.addEventListener('click', ()=>{ const is = document.body.classList.toggle('dark-mode'); try{ localStorage.setItem('dark', is? '1':'0'); }catch(e){} }); }

});

// Simple auto-carousel for doctors listing if present
document.addEventListener('DOMContentLoaded', function(){
  const docWrap = document.querySelector('.doctors-grid');
  if(docWrap){ let idx=0; setInterval(()=>{ const cards = docWrap.querySelectorAll('.doctor-card'); if(!cards.length) return; cards.forEach(c=>c.style.display='none'); cards[idx%cards.length].style.display='block'; idx++; }, 3000); }
});


const translations = {
  fr: {
    siteTitle: "Clinique Pasteur",
    siteBrand: "Clinique Pasteur Audin — Mère & Fils Claudin, Alger",
    menuAccueil: "Accueil",
    menuAccueil1: "Accueil 1",
    menuAccueil2: "Accueil 2",
    menuPresentation: "Présentation",
    menuHistoire: "Notre histoire",
    menuEquipe: "Équipe",
    menuSoins: "Offre de soins",
    menuConsultations: "Consultations",
    menuChirurgie: "Chirurgie",
    menuUrgences: "Urgences",
    menuLaboratoire: "Laboratoire",
    menuActualite: "Actualité",
    menuNouvelles: "Nouvelles",
    menuEvenements: "Événements",
    menuContact: "Contact",
    menuFormulaire: "Formulaire",
    menuLocalisation: "Localisation",
    menuRDV: "<i class='fa fa-calendar-check'></i> Demander un rendez-vous",
    btnLogin: "<i class='fa fa-sign-in-alt'></i> Connexion",
    btnSignup: "<i class='fa fa-user-plus'></i> Inscription",
    heroTitle: "Bienvenue à la Clinique Pasteur",
    heroDesc: "Des soins modernes avec une touche humaine",
    heroBtn: "Prendre rendez-vous",
    servicesTitle: "Nos Services",
    serviceConsult: "Consultations",
    serviceConsultDesc: "Consultations médicales spécialisées pour tous les âges.",
    serviceEmergency: "Urgences",
    serviceEmergencyDesc: "Service d'urgence disponible 24h/24 et 7j/7.",
    serviceLab: "Laboratoire",
    serviceLabDesc: "Analyses médicales et biologiques rapides et fiables.",
    doctorsTitle: "Notre Équipe Médicale",
    doctor1Name: "Dr. Ahmed Benali",
    doctor1Specialty: "Cardiologue",
    doctor2Name: "Dr. Sara Bouzid",
    doctor2Specialty: "Pédiatre",
    doctor3Name: "Dr. Yacine Khelifa",
    doctor3Specialty: "Chirurgien",
    contactTitle: "Contactez-nous",
    contactName: "Votre nom",
    contactEmail: "Votre email",
    contactMessage: "Votre message",
    contactSend: "Envoyer",
    footerText: "&copy; 2025 Clinique Pasteur. Tous droits réservés.",
    searchInput: "Recherche...",
    subServices: "Services",
    subSpecialties: "Spécialités",
    subContact: "Contact",
    heroInfoTitle: "Découvrez nos spécialités",
    heroInfoText: "La Clinique Pasteur propose une gamme complète de soins médicaux et chirurgicaux adaptés à tous les besoins.",
    heroInfoMore: "En savoir plus"
    ,titleSearch: "Rechercher"
    ,titleLanguages: "Langues"
    ,titleBtnLogin: "Connexion"
    ,titleBtnSignup: "Inscription"
    ,titleToggleDark: "Mode sombre / clair"
    ,heroArrowLeftAria: "Précédent"
    ,heroArrowRightAria: "Suivant"
  },
  en: {
    siteTitle: "Pasteur Clinic",
    siteBrand: "Pasteur Clinic Audin — Mother & Son Claudin, Algiers",
    menuAccueil: "Home",
    menuAccueil1: "Home 1",
    menuAccueil2: "Home 2",
    menuPresentation: "About",
    menuHistoire: "Our Story",
    menuEquipe: "Team",
    menuSoins: "Care Services",
    menuConsultations: "Consultations",
    menuChirurgie: "Surgery",
    menuUrgences: "Emergency",
    menuLaboratoire: "Laboratory",
    menuActualite: "News",
    menuNouvelles: "News",
    menuEvenements: "Events",
    menuContact: "Contact",
    menuFormulaire: "Form",
    menuLocalisation: "Location",
    menuRDV: "<i class='fa fa-calendar-check'></i> Book an appointment",
    btnLogin: "<i class='fa fa-sign-in-alt'></i> Login",
    btnSignup: "<i class='fa fa-user-plus'></i> Sign up",
    heroTitle: "Welcome to Pasteur Clinic",
    heroDesc: "Modern care with a human touch",
    heroBtn: "Book an appointment",
    servicesTitle: "Our Services",
    serviceConsult: "Consultations",
    serviceConsultDesc: "Specialized medical consultations for all ages.",
    serviceEmergency: "Emergency",
    serviceEmergencyDesc: "Emergency service available 24/7.",
    serviceLab: "Laboratory",
    serviceLabDesc: "Fast and reliable medical and biological analyses.",
    doctorsTitle: "Our Medical Team",
    doctor1Name: "Dr. Ahmed Benali",
    doctor1Specialty: "Cardiologist",
    doctor2Name: "Dr. Sara Bouzid",
    doctor2Specialty: "Pediatrician",
    doctor3Name: "Dr. Yacine Khelifa",
    doctor3Specialty: "Surgeon",
    contactTitle: "Contact Us",
    contactName: "Your name",
    contactEmail: "Your email",
    contactMessage: "Your message",
    contactSend: "Send",
    footerText: "&copy; 2025 Pasteur Clinic. All rights reserved.",
    searchInput: "Search...",
    subServices: "Services",
    subSpecialties: "Specialties",
    subContact: "Contact",
    heroInfoTitle: "Explore our specialties",
    heroInfoText: "Pasteur Clinic offers a full range of medical and surgical care for all needs.",
    heroInfoMore: "Learn more"
    ,titleSearch: "Search"
    ,titleLanguages: "Languages"
    ,titleBtnLogin: "Login"
    ,titleBtnSignup: "Sign up"
    ,titleToggleDark: "Dark / Light mode"
    ,heroArrowLeftAria: "Previous"
    ,heroArrowRightAria: "Next"
  },
  ar: {
    siteTitle:"المؤسسة الاستشفائية المتخصصة للأم و الطفل للجزائر",
    siteBrand:"مستشفى الأم و الطفل",
    menuAccueil: "الرئيسية",
    menuAccueil1: "الرئيسية 1",
    menuAccueil2: "الرئيسية 2",
    menuPresentation: "من نحن",
    menuHistoire: "قصتنا",
    menuEquipe: "الفريق",
    menuSoins: "خدمات الرعاية",
    menuConsultations: "استشارات",
    menuChirurgie: "جراحة",
    menuUrgences: "طوارئ",
    menuLaboratoire: "مختبر",
    menuActualite: "الأخبار",
    menuNouvelles: "الأخبار",
    menuEvenements: "الفعاليات",
    menuContact: "اتصل بنا",
    menuFormulaire: "نموذج التواصل",
    menuLocalisation: "الموقع",
    menuRDV: "<i class='fa fa-calendar-check'></i> طلب موعد",
    btnLogin: "<i class='fa fa-sign-in-alt'></i> تسجيل الدخول",
    btnSignup: "<i class='fa fa-user-plus'></i> إنشاء حساب",
    heroTitle: "مرحبًا بكم في عيادة باستور",
    heroDesc: "رعاية حديثة بلمسة إنسانية",
    heroBtn: "احجز موعدًا",
    servicesTitle: "خدماتنا",
    serviceConsult: "استشارات",
    serviceConsultDesc: "استشارات طبية متخصصة لجميع الأعمار.",
    serviceEmergency: "طوارئ",
    serviceEmergencyDesc: "خدمة الطوارئ متوفرة 24/7.",
    serviceLab: "مختبر",
    serviceLabDesc: "تحاليل طبية وبيولوجية سريعة وموثوقة.",
    doctorsTitle: "فريقنا الطبي",
    doctor1Name: "د. أحمد بن علي",
    doctor1Specialty: "طبيب قلب",
    doctor2Name: "د. سارة بوزيد",
    doctor2Specialty: "طبيبة أطفال",
    doctor3Name: "د. ياسين خليفة",
    doctor3Specialty: "جراح",
    contactTitle: "تواصل معنا",
    contactName: "اسمك",
    contactEmail: "بريدك الإلكتروني",
    contactMessage: "رسالتك",
    contactSend: "إرسال",
    footerText: "&copy; 2025 عيادة باستور. جميع الحقوق محفوظة.",
    searchInput: "بحث...",
    subServices: "الخدمات",
    subSpecialties: "التخصصات",
    subContact: "اتصال",
    heroInfoTitle: "اكتشف تخصصاتنا",
    heroInfoText: "توفر عيادة باستور مجموعة كاملة من الرعاية الطبية والجراحية لتناسب جميع الاحتياجات.",
    heroInfoMore: "اعرف المزيد"
    ,titleSearch: "بحث"
    ,titleLanguages: "اللغات"
    ,titleBtnLogin: "تسجيل الدخول"
    ,titleBtnSignup: "إنشاء حساب"
    ,titleToggleDark: "وضع داكن / فاتح"
    ,heroArrowLeftAria: "السابق"
    ,heroArrowRightAria: "التالي"
  }
};

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
// Gallery Grid Animation

// Navigation logic: الانتقال لصفحة فارغة عند الضغط على أي زر ما عدا تسجيل الدخول/إنشاء حساب
document.addEventListener('DOMContentLoaded', function() {
  // ...existing code...
  function goToBlankPage() {
  // إزالة الهيدر وإنشاء زر العودة في الأعلى يسار الصفحة
  document.body.innerHTML = '';
  const backBtn = document.createElement('button');
  backBtn.textContent = 'عودة إلى الرئيسية';
  backBtn.style.position = 'fixed';
  backBtn.style.top = '24px';
  backBtn.style.left = '32px';
  backBtn.style.zIndex = '9999';
  backBtn.style.background = '#e24d6a';
  backBtn.style.color = '#fff';
  backBtn.style.fontSize = '1.1rem';
  backBtn.style.padding = '12px 28px';
  backBtn.style.border = 'none';
  backBtn.style.borderRadius = '8px';
  backBtn.style.boxShadow = '0 2px 8px rgba(226,77,106,0.12)';
  backBtn.style.cursor = 'pointer';
  backBtn.style.fontWeight = '600';
  backBtn.style.letterSpacing = '1px';
  backBtn.style.transition = 'background 0.2s';
  backBtn.onmouseover = function() { backBtn.style.background = '#c8234a'; };
  backBtn.onmouseout = function() { backBtn.style.background = '#e24d6a'; };
  backBtn.onclick = function() { restoreHomePage(); };
  document.body.appendChild(backBtn);
  // باقي الصفحة فارغ
  }
  // استثناء زر تسجيل الدخول/إنشاء حساب
  // مراقبة الأزرار وتفعيل الخدمة دائماً
  // حفظ محتوى الصفحة الأصلية
  const originalBody = document.body.innerHTML;
  // زر Accueil في الهيدر يعيد الصفحة الأصلية دائماً
  function restoreHomePage() {
    document.body.innerHTML = originalBody;
    setTimeout(() => {
      activateLoginAndDarkMode();
      if (typeof window.initAccueilLogic === 'function') window.initAccueilLogic();
    }, 50);
  }
  window.initAccueilLogic = function() {
    const accueilBtn = document.getElementById('menu-accueil');
    if (accueilBtn) {
      accueilBtn.addEventListener('click', function(e) {
        e.preventDefault();
        restoreHomePage();
      });
    }
  };
  window.initAccueilLogic();
});
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

function setHeroImage(idx, direction = 'next') {
  if (!heroSection) return;
  // Remove old slides with smooth transition
  const oldSlides = heroSection.querySelectorAll('.hero-img-slide');
  oldSlides.forEach(s => {
    s.style.transition = 'transform 0.8s cubic-bezier(.77,0,.18,1)';
    s.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
    setTimeout(() => {
      s.remove();
    }, 800);
  });
  // Create new slide
  const slide = document.createElement('div');
  slide.className = 'hero-img-slide active';
  slide.style.backgroundImage = `url('${heroImages[idx]}')`;
  slide.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
  heroSection.appendChild(slide);
  setTimeout(() => {
    slide.style.transition = 'transform 0.8s cubic-bezier(.77,0,.18,1)';
    slide.style.transform = 'translateX(0)';
  }, 10);
  updateActiveIndicator(idx);
}

function showNextHeroImage() {
  const prevIndex = heroIndex;
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroImage(heroIndex, 'next');
}
function showPrevHeroImage() {
  const prevIndex = heroIndex;
  heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
  setHeroImage(heroIndex, 'prev');
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
      const direction = i > heroIndex ? 'next' : 'prev';
      heroIndex = i;
      setHeroImage(heroIndex, direction);
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

document.addEventListener('DOMContentLoaded', function() {
  // زر الوضع الليلي/النهاري
  const toggleDark = document.getElementById("toggle-dark");
  if (toggleDark) {
    // إضافة صورة داخل الزر عند التحويم
    if (!toggleDark.querySelector('.dark-hover-img')) {
      const img = document.createElement('img');
      img.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
      img.className = 'dark-hover-img';
      toggleDark.appendChild(img);
    }
    toggleDark.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
      const icon = toggleDark.querySelector("i");
      if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    });
  }
  // زر Accueil: فقط منع الحدث الافتراضي بدون أي تغيير في الصفحة
  var accueilBtn = document.getElementById('accueilDropdown');
  if (accueilBtn) {
    accueilBtn.onclick = function(e) {
      e.preventDefault(); // لا يفعل أي شيء عند الضغط
      return false;
    };
  }
  // زر Accueil (يمكنك إضافة منطق خاص به هنا إذا رغبت)
});

