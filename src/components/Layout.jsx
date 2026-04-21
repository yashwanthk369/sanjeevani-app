import { Outlet, useNavigate } from 'react-router-dom';
import { Activity, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage, translations } from '../contexts/LanguageContext';

export default function Layout() {
  const { currentUser, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--color-neon-cyan)]/30 bg-[var(--color-cyber-dark)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-[var(--color-neon-cyan)] h-10 w-10 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-blue-500 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
              SANJEEVANI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[var(--color-cyber-dark)] border border-[var(--color-neon-cyan)]/50 rounded px-3 py-1.5">
              <Globe size={18} className="text-[var(--color-neon-cyan)]" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-gray-200 outline-none cursor-pointer"
              >
                {Object.keys(translations).map(code => (
                  <option key={code} value={code} className="bg-[var(--color-cyber-dark)] text-white">
                    {translations[code].name}
                  </option>
                ))}
              </select>
            </div>
            {currentUser && (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded border border-[var(--color-cyber-red)] text-[var(--color-cyber-red)] hover:bg-[var(--color-cyber-red)]/10 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
