import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function NewPatient() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weeks: '',
    village: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      await addDoc(collection(db, 'patients'), {
        ...formData,
        age: Number(formData.age),
        weeks: Number(formData.weeks),
        ashaId: currentUser.uid,
        risk: 'LOW', // Default risk
        createdAt: serverTimestamp()
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Failed to register patient.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card-glow">
        <h2 className="text-[var(--color-neon-cyan)] mb-8">Register New Patient</h2>
        
        {error && <div className="bg-[var(--color-cyber-red)]/20 text-[var(--color-cyber-red)] border border-[var(--color-cyber-red)] p-3 rounded mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Patient Name</label>
              <input
                type="text"
                name="name"
                className="input-neon"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
              <input
                type="number"
                name="age"
                className="input-neon"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pregnancy (Weeks)</label>
              <input
                type="number"
                name="weeks"
                className="input-neon"
                value={formData.weeks}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Village</label>
              <input
                type="text"
                name="village"
                className="input-neon"
                value={formData.village}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="btn-neon w-full">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-neon-solid w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Registering...' : 'Register Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
