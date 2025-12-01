// src/components/LoginScreen.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="card" style={{ maxWidth: '400px' }}>
          <div className="navigation">
            <div className="nav-title">Login</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha:</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Entrar
            </button>
          </form>

          <div className="divider"></div>

          <div style={{ textAlign: 'center' }}>
            <p>
              <Link to="/cadastro">Cadastrar-se!</Link>
            </p>
            <p>
              <Link to="/esqueci-senha">Esqueceu sua senha?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}