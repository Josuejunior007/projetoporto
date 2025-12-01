// src/components/RegisterScreen.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (register(name, email, password)) {
      navigate('/');
    } else {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="card" style={{ maxWidth: '400px' }}>
          <div className="navigation">
            <div className="nav-title">Cadastro</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome Completo:</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="form-group">
              <label className="form-label">Confirme a Senha:</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Cadastrar
            </button>
          </form>

          <div className="divider"></div>

          <div style={{ textAlign: 'center' }}>
            <p>
              Já possui uma conta? <Link to="/login">Faça login aqui!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}