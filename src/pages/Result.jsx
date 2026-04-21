import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertOctagon, AlertTriangle, CheckCircle, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { riskLevel = 'LOW', symptoms = '' } = location.state || {};
  const { t } = useLanguage();

  useEffect(() => {
    // Read out the result using Web Speech API
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const msg = new SpeechSynthesisUtterance();
      msg.lang = t.langCode;
      
      if (riskLevel === 'HIGH') {
        msg.text = t.highSpeech;
      } else if (riskLevel === 'MEDIUM') {
        msg.text = t.mediumSpeech;
      } else {
        msg.text = t.lowSpeech;
      }
      
      // Add a slight delay to ensure the voice loads correctly in some browsers
      setTimeout(() => {
        window.speechSynthesis.speak(msg);
      }, 100);
    }
  }, [riskLevel, t]);

  const config = {
    HIGH: {
      color: 'var(--color-cyber-red)',
      bgClass: 'bg-[var(--color-cyber-red)]/10',
      borderClass: 'border-[var(--color-cyber-red)]',
      textClass: 'text-[var(--color-cyber-red)]',
      icon: <AlertOctagon size={80} className="text-[var(--color-cyber-red)] animate-pulse" />,
      title: t.highTitle,
      message: t.highMessage,
    },
    MEDIUM: {
      color: 'var(--color-cyber-yellow)',
      bgClass: 'bg-[var(--color-cyber-yellow)]/10',
      borderClass: 'border-[var(--color-cyber-yellow)]',
      textClass: 'text-[var(--color-cyber-yellow)]',
      icon: <AlertTriangle size={80} className="text-[var(--color-cyber-yellow)] animate-pulse" />,
      title: t.mediumTitle,
      message: t.mediumMessage,
    },
    LOW: {
      color: 'var(--color-cyber-green)',
      bgClass: 'bg-[var(--color-cyber-green)]/10',
      borderClass: 'border-[var(--color-cyber-green)]',
      textClass: 'text-[var(--color-cyber-green)]',
      icon: <CheckCircle size={80} className="text-[var(--color-cyber-green)]" />,
      title: t.lowTitle,
      message: t.lowMessage,
    }
  };

  const currentConfig = config[riskLevel];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div 
        className={`glass-card max-w-3xl w-full text-center border-4 ${currentConfig.borderClass} ${currentConfig.bgClass} shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
        style={{ boxShadow: `0 0 30px ${currentConfig.color}` }}
      >
        <div className="flex justify-center mb-6">
          {currentConfig.icon}
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${currentConfig.textClass}`}>
          {currentConfig.title}
        </h1>
        
        <p className="text-2xl mb-10 text-white/90">
          {currentConfig.message}
        </p>

        {riskLevel === 'HIGH' && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-[var(--color-cyber-red)] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:bg-red-700 transition-colors text-xl">
              <FileText size={24} />
              {t.viewReferral}
            </button>
            <button className="bg-white text-[var(--color-cyber-dark)] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors text-xl">
              <MapPin size={24} />
              {t.nearestHospital}
            </button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/20">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-gray-300 hover:text-white underline text-xl"
          >
            {t.backToDashboard}
          </button> 
        </div>
      </div>
    </div>
  );
}
