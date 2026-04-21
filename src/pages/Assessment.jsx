import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mic, AlertTriangle } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const COMMON_SYMPTOMS = [
  "Severe headache",
  "Swelling in feet",
  "Blurry vision",
  "Bleeding",
  "Baby not moving"
];

export default function Assessment() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual Web Speech API here
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setSymptoms(prev => prev + (prev ? ', ' : '') + 'Severe headache');
      }, 3000);
    }
  };

  const handleQuickSelect = (symptom) => {
    setSymptoms(prev => {
      const current = prev.trim();
      if (current.includes(symptom)) return prev;
      return current ? `${current}, ${symptom}` : symptom;
    });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate API call to Gemini
    setTimeout(async () => {
      
      const lowerSymptoms = symptoms.toLowerCase();
      let riskLevel = 'LOW';
      
      if (
        lowerSymptoms.includes('severe') || 
        lowerSymptoms.includes('bleeding') || 
        lowerSymptoms.includes('headache') || 
        lowerSymptoms.includes('blurry')
      ) {
        riskLevel = 'HIGH';
      } else if (
        lowerSymptoms.includes('fever') || 
        lowerSymptoms.includes('pain') || 
        lowerSymptoms.includes('vomiting')
      ) {
        riskLevel = 'MEDIUM';
      }

      try {
        if (patientId) {
          const patientRef = doc(db, 'patients', patientId);
          await updateDoc(patientRef, { risk: riskLevel });
        }
      } catch (error) {
        console.error("Error updating patient risk: ", error);
      }

      setIsAnalyzing(false);
      navigate('/result', { state: { riskLevel, symptoms } });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="glass-card-glow border-[var(--color-neon-cyan)]/50">
        <h2 className="text-[var(--color-neon-cyan)] mb-6 text-center">New Assessment</h2>
        
        <form onSubmit={handleAnalyze} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-4">
              Enter Symptoms or Observations
            </label>
            <div className="relative">
              <textarea
                className="input-neon min-h-[150px] pb-12 text-xl"
                placeholder="Type symptoms here or use voice recording..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleRecording}
                className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-300 ${
                  isRecording 
                    ? 'bg-[var(--color-cyber-red)] text-white animate-pulse shadow-[0_0_15px_rgba(255,0,60,0.5)]' 
                    : 'bg-[var(--color-cyber-dark)] text-[var(--color-neon-cyan)] border border-[var(--color-neon-cyan)]'
                }`}
              >
                <Mic size={24} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Quick Select Common Symptoms</label>
            <div className="flex flex-wrap gap-3">
              {COMMON_SYMPTOMS.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleQuickSelect(symptom)}
                  className="px-4 py-2 rounded-full border border-[var(--color-neon-cyan)]/50 bg-[var(--color-cyber-dark)]/50 text-sm hover:bg-[var(--color-neon-cyan)] hover:text-[var(--color-cyber-dark)] transition-colors"
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isAnalyzing || !symptoms.trim()}
            className="btn-neon-solid w-full text-2xl py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <span className="animate-pulse">Analyzing with AI...</span>
            ) : (
              <>
                <AlertTriangle size={28} />
                Analyze Risk Level
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
