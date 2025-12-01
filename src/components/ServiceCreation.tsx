// ServiceCreation.tsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ServiceCreation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedArchitecture = location.state?.selectedArchitecture

  const handleServiceTypeSelect = (serviceType: string) => {
    const stateToPass = { 
      selectedArchitecture: selectedArchitecture 
    }

    if (serviceType === 'create-api') {
      navigate('/criar-servico/criacao-api', { state: stateToPass })
    } else {
      navigate('/criar-servico/selecao-template', { state: stateToPass })
    }
  }

  const handleBack = () => {
    navigate('/criar-servico/arquitetura')
  }

  return (
    <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '32px' }}>
      <div className="navigation">
        <div className="nav-title">Criar Serviço</div>
        <div className="nav-steps">
          <span className="step">Dashboard</span>
          <span>›</span>
          <span className="step">Arquitetura</span>
          <span>›</span>
          <span className="step active">Criação</span>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">
          Arquitetura Selecionada: {selectedArchitecture}
        </div>
      </div>

      <div className="architecture-grid">
        {/* Opção de Criar API */}
        <div
          className="architecture-card"
          onClick={() => handleServiceTypeSelect('create-api')}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛠️</div>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Criar API</div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Desenvolver uma API do zero
          </div>
        </div>

        {/* Opção de Usar Template */}
        <div
          className="architecture-card"
          onClick={() => handleServiceTypeSelect('use-template')}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📁</div>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Usar Template</div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Utilizar um template pré-configurado
          </div>
        </div>
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

export default ServiceCreation