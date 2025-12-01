// src/components/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Se um email for encontrado, um link de redefinição foi enviado para ${email}.`);
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="card" style={{ maxWidth: '400px' }}>
          <div className="navigation">
            <div className="nav-title">Redefinir Senha</div>
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

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Enviar Link de Redefinição
            </button>
          </form>

          <div className="divider"></div>

          <div style={{ textAlign: 'center' }}>
            <p>
              Lembrou da senha? <Link to="/login">Faça login aqui!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}