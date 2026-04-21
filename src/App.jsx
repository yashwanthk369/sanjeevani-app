import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewPatient from './pages/NewPatient';
import Assessment from './pages/Assessment';
import Result from './pages/Result';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="new-patient" element={
              <ProtectedRoute>
                <NewPatient />
              </ProtectedRoute>
            } />
            <Route path="assessment/:patientId" element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            } />
            <Route path="result" element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
