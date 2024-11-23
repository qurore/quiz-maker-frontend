import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from 'components/Admin/AdminLogin';
import AdminDashboard from 'components/Admin/AdminDashboard';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('adminAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <AdminLogin onLogin={handleLogin} />;
}

export default Admin; 