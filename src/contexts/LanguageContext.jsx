import { createContext, useContext, useState } from 'react';

export const translations = {
  en: {
    langCode: 'en-IN',
    name: 'English',
    highSpeech: "Urgent! High risk detected. Please go to the hospital immediately.",
    mediumSpeech: "Medium risk. Please visit a doctor within 24 hours.",
    lowSpeech: "Low risk. Routine care recommended.",
    highTitle: "URGENT - HOSPITAL NOW",
    mediumTitle: "Visit within 24 hours",
    lowTitle: "Routine Care",
    highMessage: "Immediate medical attention required. A referral letter has been generated.",
    mediumMessage: "Consult a doctor soon. Please monitor symptoms closely.",
    lowMessage: "No immediate danger detected. Continue regular checkups.",
    viewReferral: "View Referral Letter",
    nearestHospital: "Nearest Hospital",
    backToDashboard: "Return to Dashboard"
  },
  ta: {
    langCode: 'ta-IN',
    name: 'தமிழ்',
    highSpeech: "அதிக ஆபத்து! உடனே மருத்துவமனைக்கு செல்லுங்கள்",
    mediumSpeech: "மிதமான ஆபத்து. 24 மணி நேரத்திற்குள் மருத்துவரை சந்திக்கவும்",
    lowSpeech: "குறைந்த ஆபத்து. வழக்கமான பரிசோதனை போதுமானது",
    highTitle: "அவசரம் - உடனே மருத்துவமனை",
    mediumTitle: "24 மணி நேரத்தில் மருத்துவரை சந்திக்கவும்",
    lowTitle: "வழக்கமான பராமரிப்பு",
    highMessage: "உடனடியாக மருத்துவ கவனிப்பு தேவை. பரிந்துரை கடிதம் உருவாக்கப்பட்டுள்ளது.",
    mediumMessage: "விரைவில் மருத்துவரை அணுகவும். அறிகுறிகளை கண்காணிக்கவும்.",
    lowMessage: "உடனடி ஆபத்து இல்லை. வழக்கமான பரிசோதனைகளை தொடரவும்.",
    viewReferral: "பரிந்துரை கடிதம்",
    nearestHospital: "அருகிலுள்ள மருத்துவமனை",
    backToDashboard: "டாஷ்போர்டுக்கு திரும்பு"
  },
  hi: {
    langCode: 'hi-IN',
    name: 'हिन्दी',
    highSpeech: "उच्च जोखिम! तुरंत अस्पताल जाएं",
    mediumSpeech: "मध्यम जोखिम। 24 घंटे के भीतर डॉक्टर से मिलें",
    lowSpeech: "कम जोखिम। नियमित जांच जारी रखें",
    highTitle: "आपातकाल - अभी अस्पताल जाएं",
    mediumTitle: "24 घंटे में डॉक्टर से मिलें",
    lowTitle: "नियमित देखभाल",
    highMessage: "तत्काल चिकित्सा ध्यान देने की आवश्यकता है। रेफरल पत्र तैयार कर दिया गया है।",
    mediumMessage: "जल्द ही डॉक्टर से संपर्क करें। लक्षणों पर नज़र रखें।",
    lowMessage: "कोई तत्काल खतरा नहीं है। नियमित जांच जारी रखें।",
    viewReferral: "रेफरल पत्र",
    nearestHospital: "नजदीकी अस्पताल",
    backToDashboard: "डैशबोर्ड पर लौटें"
  },
  te: {
    langCode: 'te-IN',
    name: 'తెలుగు',
    highSpeech: "అధిక ప్రమాదం! వెంటనే ఆసుపత్రికి వెళ్లండి",
    mediumSpeech: "మధ్యస్థ ప్రమాదం. 24 గంటల్లో వైద్యుడిని సంప్రదించండి",
    lowSpeech: "తక్కువ ప్రమాదం. సాధారణ తనిఖీలు కొనసాగించండి",
    highTitle: "అత్యవసరం - వెంటనే ఆసుపత్రి",
    mediumTitle: "24 గంటల్లో వైద్యుడిని కలవండి",
    lowTitle: "సాధారణ సంరక్షణ",
    highMessage: "వెంటనే వైద్య సహాయం అవసరం. రెఫరల్ లేఖ రూపొందించబడింది.",
    mediumMessage: "వెంటనే వైద్యుడిని సంప్రదించండి. లక్షణాలను పర్యవేక్షించండి.",
    lowMessage: "తక్షణ ప్రమాదం లేదు. సాధారణ తనిఖీలను కొనసాగించండి.",
    viewReferral: "రెఫరల్ లేఖ చూడండి",
    nearestHospital: "దగ్గరి ఆసుపత్రి",
    backToDashboard: "డ్యాష్బోర్డుకు తిరిగి వెళ్ళు"
  }
};

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
