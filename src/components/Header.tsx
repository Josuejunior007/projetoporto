// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px 32px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        DevFlow
      </div>
      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span>Olá, {user.name}!</span>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Painel Dev</Link>
        <Link to="/editar-perfil" style={{ color: 'white', textDecoration: 'none' }}>Editar Perfil</Link>
        <button 
          className="btn btn-outline" 
          onClick={handleLogout}
          style={{ 
            color: 'white', 
            borderColor: 'white',
            padding: '8px 16px'
          }}
        >
          Sair
        </button>
      </nav>
    </header>
  );
}