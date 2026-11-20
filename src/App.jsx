import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center p-4 font-sans">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
            <span className="material-symbols-outlined text-amber-500 text-[44px] mb-2 block">warning</span>
            <h2 className="text-base font-bold text-slate-800">Recuperando Vista</h2>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Se detectó un reinicio de renderizado. Haz clic en el botón para reanudar la interfaz.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-[#1C6E8C] text-white rounded-xl text-xs font-semibold hover:bg-[#154F66] transition-colors cursor-pointer"
            >
              Reanudar Sistema
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('superadmin'); // 'superadmin' | 'owner' | 'auditor' | 'responsable_sspa'
  const [userEmail, setUserEmail] = useState('admin@sasisopa.com');

  const getEmailForRole = (role) => {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return 'admin@sasisopa.com';
      case 'owner':
        return 'owner@sasisopa.com';
      case 'auditor':
        return 'auditor@sasisopa.com';
      case 'responsable_sspa':
      case 'responsablesspa':
      default:
        return 'responsablesspa@sasisopa.com';
    }
  };

  const handleLogin = (role, email) => {
    const activeRole = role || 'responsable_sspa';
    const activeEmail = email || getEmailForRole(activeRole);
    setUserRole(activeRole);
    setUserEmail(activeEmail);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ErrorBoundary>
      <Dashboard 
        userRole={userRole} 
        userEmail={userEmail}
        onLogout={handleLogout} 
        onSwitchRole={(role) => {
          setUserRole(role);
          setUserEmail(getEmailForRole(role));
        }}
      />
    </ErrorBoundary>
  );
}

