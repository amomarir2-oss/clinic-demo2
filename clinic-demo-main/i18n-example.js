// Example i18next implementation for the hospital website
// This shows how to initialize and use i18next with the translation keys we've added

// Import i18next (you would need to install these packages)
// npm install i18next i18next-browser-languagedetector

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  fr: {
    translation: {
      "nav": {
        "home": "Accueil",
        "presentation": "Présentation",
        "healthcare_services": "Offre de soins",
        "book_appointment": "Demander un rendez-vous",
        "toggle_navigation": "Basculer la navigation"
      },
      "common": {
        "page_title": "Clinique Pasteur - Soins Spécialisés Mère-Enfant",
        "hospital_name": "Clinique Pasteur",
        "hospital_short": "Clinique Pasteur",
        "hospital_subtitle": "Soins Spécialisés • Algérie",
        "close": "Fermer",
        "back_to_top": "Retour en haut"
      },
      "hero": {
        "discover_specialties": "Découvrez nos spécialités",
        "clinic_description": "La Clinique Pasteur propose une gamme complète de soins médicaux et chirurgicaux adaptés à tous les besoins.",
        "learn_more": "En savoir plus",
        "previous": "Précédent",
        "next": "Suivant"
      },
      "help": {
        "title": "Laissez-nous vous aider",
        "subtitle": "Dites-nous simplement qui vous êtes et ce que vous voulez faire ci-dessous.",
        "i_am": "Je suis un(e)",
        "patient": "Patient(e)",
        "visitor": "Visiteur",
        "healthcare_professional": "Professionnel de santé",
        "looking_for": "à la recherche de",
        "find_doctor": "Trouver un médecin",
        "book_appointment": "Prendre rendez-vous",
        "find_services": "Trouver des services",
        "get_directions": "Obtenir des directions",
        "contact_us": "Nous contacter",
        "get_help": "Obtenir de l'aide"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "presentation": "About Us",
        "healthcare_services": "Healthcare Services",
        "book_appointment": "Book Appointment",
        "toggle_navigation": "Toggle navigation"
      },
      "common": {
        "page_title": "Pasteur Clinic - Specialized Mother & Child Care",
        "hospital_name": "Pasteur Clinic",
        "hospital_short": "Pasteur Clinic",
        "hospital_subtitle": "Specialized Care • Algeria",
        "close": "Close",
        "back_to_top": "Back to top"
      },
      "hero": {
        "discover_specialties": "Discover our specialties",
        "clinic_description": "Pasteur Clinic offers a complete range of medical and surgical care adapted to all needs.",
        "learn_more": "Learn more",
        "previous": "Previous",
        "next": "Next"
      },
      "help": {
        "title": "Let Us Help",
        "subtitle": "Simply tell us who you are and what you want to do below.",
        "i_am": "I'm a",
        "patient": "Patient",
        "visitor": "Visitor",
        "healthcare_professional": "Healthcare Professional",
        "looking_for": "looking for",
        "find_doctor": "Find a Doctor",
        "book_appointment": "Book Appointment",
        "find_services": "Find Services",
        "get_directions": "Get Directions",
        "contact_us": "Contact Us",
        "get_help": "Get Help"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "presentation": "من نحن",
        "healthcare_services": "الخدمات الطبية",
        "book_appointment": "حجز موعد",
        "toggle_navigation": "تبديل التنقل"
      },
      "common": {
        "page_title": "المؤسسة الاستشفائية المتخصصة للأم والطفل",
        "hospital_name": "المؤسسة الاستشفائية المتخصصة للأم والطفل",
        "hospital_short": "المؤسسة الاستشفائية المتخصصة",
        "hospital_subtitle": "للأم والطفل • الجزائر",
        "close": "إغلاق",
        "back_to_top": "العودة إلى الأعلى"
      },
      "hero": {
        "discover_specialties": "اكتشف تخصصاتنا",
        "clinic_description": "تقدم المؤسسة الاستشفائية مجموعة كاملة من الرعاية الطبية والجراحية المتكيفة مع جميع الاحتياجات.",
        "learn_more": "اعرف المزيد",
        "previous": "السابق",
        "next": "التالي"
      },
      "help": {
        "title": "دعنا نساعدك",
        "subtitle": "أخبرنا ببساطة من أنت وماذا تريد أن تفعل أدناه.",
        "i_am": "أنا",
        "patient": "مريض",
        "visitor": "زائر",
        "healthcare_professional": "مهني صحي",
        "looking_for": "أبحث عن",
        "find_doctor": "العثور على طبيب",
        "book_appointment": "حجز موعد",
        "find_services": "العثور على الخدمات",
        "get_directions": "الحصول على الاتجاهات",
        "contact_us": "اتصل بنا",
        "get_help": "احصل على المساعدة"
      }
    }
  }
};

// Initialize i18next
i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: true,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    }
  });

// Function to update all elements with data-i18n attributes
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    // Handle attribute translations like [title]key or [placeholder]key
    if (key.startsWith('[') && key.includes(']')) {
      const matches = key.match(/\[([^\]]+)\](.+)/);
      if (matches) {
        const attribute = matches[1];
        const translationKey = matches[2];
        element.setAttribute(attribute, i18next.t(translationKey));
      }
    } else {
      // Handle text content translation
      element.textContent = i18next.t(key);
    }
  });
  
  // Update document title
  document.title = i18next.t('common.page_title');
  
  // Update HTML lang attribute
  document.documentElement.lang = i18next.language;
}

// Language switching function
function changeLanguage(lng) {
  i18next.changeLanguage(lng, (err, t) => {
    if (err) return console.log('Something went wrong loading', err);
    updateContent();
  });
}

// Initialize content when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  
  // Add event listeners to language buttons
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = button.getAttribute('data-lang');
      changeLanguage(lang);
      
      // Update language selector display
      const flag = button.querySelector('.flag').textContent;
      const name = button.querySelector('.lang-name').textContent;
      document.getElementById('main-flag').textContent = flag;
      document.getElementById('main-lang-label').textContent = name;
    });
  });
});

// Export functions for use in other scripts
export { changeLanguage, updateContent };
