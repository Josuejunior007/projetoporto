// ArchitectureSelection.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ArchitectureSelection: React.FC = () => {
  const navigate = useNavigate()
  const [selectedArchitecture, setSelectedArchitecture] = useState<string | null>(null)

  const handleArchitectureSelect = (architecture: string) => {
    setSelectedArchitecture(architecture)
    // Navega após um pequeno delay para dar feedback visual
    setTimeout(() => {
      navigate('/criar-servico/criacao-servico', { 
        state: { selectedArchitecture: architecture } 
      })
    }, 300)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '32px' }}>
      <div className="navigation">
        <div className="nav-title">Selecionar Arquitetura</div>
        <div className="nav-steps">
          <span className="step">Dashboard</span>
          <span>›</span>
          <span className="step active">Arquitetura</span>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Escolha o tipo de arquitetura</div>
      </div>

      <div className="architecture-grid">
        {['Mobile', 'Gateway', 'API', 'Web'].map(arch => (
          <div
            key={arch}
            className={`architecture-card ${selectedArchitecture === arch ? 'selected' : ''}`}
            onClick={() => handleArchitectureSelect(arch)}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              {arch === 'Mobile' && '📱'}
              {arch === 'Gateway' && '🌐'}
              {arch === 'API' && '⚙️'}
              {arch === 'Web' && '💻'}
            </div>
            <div style={{ fontWeight: '600' }}>{arch}</div>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={handleBack}>
          ← Voltar
        </button>
      </div>
    </div>
  )
}

export default ArchitectureSelection