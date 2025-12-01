// src/pages/PainelDev.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'

export default function PainelDev() {
  const navigate = useNavigate()
  const { projects } = useProjects() 
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(project => 
    project.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateService = () => {
    navigate('/criar-servico/arquitetura')
  }

  const handleManageService = (projectId: string | number) => {
    navigate(`/gerenciar-servico/${projectId}`)
  }

  return (
    <div className="card card-large">
      <div className="navigation">
        <div className="nav-title">Painel Dev</div>
        <div className="nav-steps">
          <span className="step active">Meus Projetos ({filteredProjects.length})</span>
        </div>
      </div>

      <div className="search-box">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar serviços..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-icon">🔍</div>
      </div>

      <div className="service-grid">
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum serviço ainda.</p>
            <button className="btn btn-primary" onClick={handleCreateService}>
              Criar o primeiro serviço
            </button>
          </div>
        ) : (
          filteredProjects.map(project => (
            <div key={project.id} className="service-card">
              <div className="service-header">
                <div>
                  <div className="service-name">{project.nome}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="service-type">{project.tipo}</span>
                    {project.arquitetura && (
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        ({project.arquitetura})
                      </span>
                    )}
                    {project.tipoApi && (
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#667eea',
                        background: '#f0f4ff',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {project.tipoApi}
                      </span>
                    )}
                    {project.bancoDados && (
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#10b981',
                        background: '#f0fdf4',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {project.bancoDados}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleManageService(project.id)}
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  Gerenciar
                </button>
              </div>
              <div className="service-details">
                {project.descricao && (
                  <div style={{
                    fontSize: '13px', 
                    color: '#888', 
                    marginBottom: '8px'
                  }}>
                    {project.descricao}
                  </div>
                )}
                <span>Modificado em: {project.modificado}</span>
                {project.template && (
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#8b5cf6',
                    background: '#faf5ff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginLeft: '8px'
                  }}>
                    Template: {project.template}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={handleCreateService}>
          + Criar Novo Serviço
        </button>
      </div>
    </div>
  )
}