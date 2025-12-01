import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import type { Service } from './types'

interface OutletContext {
  services: Service[]
  navigate: ReturnType<typeof useNavigate>
}

const Dashboard: React.FC = () => {
  const { services, navigate } = useOutletContext<OutletContext>()

  const handleCreateService = () => {
    navigate('/criar-servico/arquitetura')
  }

  return (
    <div className="card" style={{ width: '100%', maxWidth: '1200px', padding: '32px' }}>
      <div className="navigation">
        <div className="nav-title">Meus Serviços</div>
        <div className="nav-steps">
          <span className="step active">Dashboard</span>
        </div>
      </div>

      <div className="search-box">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar serviços..."
        />
        <div className="search-icon">🔍</div>
      </div>

      <div className="service-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <div>
                <div className="service-name">{service.name}</div>
                <span className="service-type">{service.type}</span>
              </div>
            </div>
            <div className="service-details">
              <span>Modificado em: {service.lastModified}</span>
              <span className="service-category">{service.category}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={handleCreateService}>
          + Criar Novo Serviço
        </button>
      </div>
    </div>
  )
}

export default Dashboard