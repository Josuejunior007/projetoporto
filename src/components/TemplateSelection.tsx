// TemplateSelection.tsx (modificado)
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const selectedArchitecture = location.state?.selectedArchitecture

  const handleBack = () => {
    navigate('/criar-servico/criacao-servico', { state: { selectedArchitecture } })
  }

  const handleUseTemplate = () => {
    if (!selectedTemplate) {
      alert('Por favor, selecione um template')
      return
    }

    const template = templates.find(t => t.id === selectedTemplate)
    navigate('/criar-servico/configuracao-template', { 
      state: { 
        selectedArchitecture,
        selectedTemplate: template
      } 
    })
  }

  const templates = [
    {
      id: 1,
      name: 'API de Autenticação',
      description: 'Template completo para sistema de autenticação JWT'
    },
    {
      id: 2,
      name: 'CRUD Básico',
      description: 'Template para operações básicas de Create, Read, Update, Delete'
    },
    {
      id: 3,
      name: 'Microserviço',
      description: 'Estrutura para desenvolvimento de microserviços'
    }
  ]

  return (
    <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '32px' }}>
      <div className="navigation">
        <div className="nav-title">Selecionar Template</div>
        <div className="nav-steps">
          <span className="step">Dashboard</span>
          <span>›</span>
          <span className="step">Arquitetura</span>
          <span>›</span>
          <span className="step">Criação</span>
          <span>›</span>
          <span className="step active">Template</span>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Escolha um Template</div>
      </div>

      <div className="template-grid">
        {templates.map(template => (
          <div 
            key={template.id} 
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="template-name">{template.name}</div>
            <div className="template-description">{template.description}</div>
          </div>
        ))}
      </div>

      <div className="divider"></div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={handleBack}>
          ← Voltar
        </button>
        <button className="btn btn-primary" onClick={handleUseTemplate}>
          Usar Template
        </button>
      </div>
    </div>
  )
}

export default TemplateSelection  