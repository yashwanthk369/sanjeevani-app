import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass-card-glow w-full max-w-md">
        <h2 className="text-center mb-8 text-[var(--color-neon-cyan)]">ASHA Login</h2>
        
        {error && <div className="bg-[var(--color-cyber-red)]/20 text-[var(--color-cyber-red)] border border-[var(--color-cyber-red)] p-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="asha@example.com"
              className="input-neon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-neon"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button disabled={loading} type="submit" className="btn-neon-solid w-full text-xl mt-4">
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          Need an account? <Link to="/register" className="text-[var(--color-neon-cyan)] hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
