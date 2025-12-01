// src/components/EditProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    bio: user?.bio || '',
    photoPreview: user?.photo || null,
    message: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value, message: '' }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfile(prev => ({ 
        ...prev, 
        photoPreview: photoURL,
        message: 'Foto selecionada. Clique em Salvar para atualizar.'
      }));
    }
  };

  const handleSave = () => {
    const { name, email, bio, photoPreview } = profile;
    updateProfile({ 
      name, 
      email, 
      bio, 
      photo: photoPreview || undefined // Garante que não enviamos null
    });
    setProfile(prev => ({ ...prev, message: 'Perfil salvo com sucesso!' }));
  };

  const handleClear = () => {
    setProfile({
      name: '',
      email: '',
      password: '',
      bio: '',
      photoPreview: null,
      message: 'Dados do formulário limpos.'
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="card" style={{ maxWidth: '600px' }}>
          <div className="navigation">
            <div className="nav-title">Editar Perfil</div>
            <div className="nav-steps">
              <span className="step active">Perfil</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Digite seu nome"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Digite seu e-mail"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nova Senha (opcional):</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Digite sua nova senha"
              value={profile.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Biografia:</label>
            <textarea
              id="bio"
              className="form-input"
              placeholder="Fale um pouco sobre você..."
              value={profile.bio}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Foto de Perfil:</label>
            <input
              type="file"
              id="photo"
              className="form-input"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {profile.photoPreview && (
              <img
                src={profile.photoPreview}
                className="preview"
                alt="Prévia da foto"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginTop: '10px',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>

          <div className="divider"></div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handleBack}>
              ← Voltar
            </button>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={handleClear}>
                Limpar Dados
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Salvar Perfil
              </button>
            </div>
          </div>

          {profile.message && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: profile.message.includes('sucesso') ? '#d4edda' : '#f8d7da',
              color: profile.message.includes('sucesso') ? '#155724' : '#721c24',
              textAlign: 'center'
            }}>
              {profile.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}