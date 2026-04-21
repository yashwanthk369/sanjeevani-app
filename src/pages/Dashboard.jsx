import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, User, Calendar, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      if (!currentUser) return;
      
      try {
        const q = query(
          collection(db, 'patients'),
          where('ashaId', '==', currentUser.uid),
          // orderBy requires a composite index if combining with where. For simplicity, let's just fetch all and sort on client if needed, or omit order. Let's omit orderBy to avoid missing index errors for now.
        );
        
        const querySnapshot = await getDocs(q);
        const patientsData = [];
        querySnapshot.forEach((doc) => {
          patientsData.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by creation date locally (descending)
        patientsData.sort((a, b) => {
          const aTime = a.createdAt?.toMillis() || 0;
          const bTime = b.createdAt?.toMillis() || 0;
          return bTime - aTime;
        });

        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [currentUser]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-[var(--color-neon-cyan)]">ASHA Dashboard</h2>
        <Link to="/new-patient" className="btn-neon-solid flex items-center gap-2">
          <PlusCircle size={24} />
          Register Patient
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="glass-card-glow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-cyber-dark)] p-3 rounded-full border border-[var(--color-neon-cyan)]">
                  <User className="text-[var(--color-neon-cyan)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{patient.name}</h3>
                  <p className="text-sm text-gray-400">{patient.village}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                patient.risk === 'HIGH' ? 'bg-[var(--color-cyber-red)]/20 text-[var(--color-cyber-red)] border-[var(--color-cyber-red)]' : 
                patient.risk === 'MEDIUM' ? 'bg-[var(--color-cyber-yellow)]/20 text-[var(--color-cyber-yellow)] border-[var(--color-cyber-yellow)]' : 
                'bg-[var(--color-cyber-green)]/20 text-[var(--color-cyber-green)] border-[var(--color-cyber-green)]'
              }`}>
                {patient.risk} RISK
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={18} />
                <span>{patient.weeks} Weeks Pregnant</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Activity size={18} />
                <span>Age: {patient.age}</span>
              </div>
            </div>

            <Link to={`/assessment/${patient.id}`} className="btn-neon block text-center w-full">
              New Assessment
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
