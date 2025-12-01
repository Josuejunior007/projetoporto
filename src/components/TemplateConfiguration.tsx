// TemplateConfiguration.tsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'

const TemplateConfiguration: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addProject } = useProjects()

  const selectedArchitecture = location.state?.selectedArchitecture
  const selectedTemplate = location.state?.selectedTemplate

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  const handleBack = () => {
    navigate('/criar-servico/selecao-template', { state: { selectedArchitecture } })
  }

  const handleFinish = () => {
    if (!nome) {
      alert('Por favor, dê um nome para o projeto')
      return
    }

    // No handleFinish do TemplateConfiguration.tsx, certifique-se de incluir:
    const novoProjeto = {
      id: Date.now().toString(),
      nome: nome,
      tipo: 'Template',
      descricao: descricao,
      arquitetura: selectedArchitecture,
      template: selectedTemplate?.name, // ← Garantir que está sendo salvo
      modificado: new Date().toLocaleDateString('pt-BR')
    };

    addProject(novoProjeto)
    navigate('/') // Volta para o PainelDev
  }

  return (
    <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '32px' }}>
      <div className="navigation">
        <div className="nav-title">Configurar Template</div>
        <div className="nav-steps">
          <span className="step">Dashboard</span>
          <span>›</span>
          <span className="step">Arquitetura</span>
          <span>›</span>
          <span className="step">Criação</span>
          <span>›</span>
          <span className="step">Template</span>
          <span>›</span>
          <span className="step active">Configuração</span>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">
          Configurar Template - {selectedTemplate?.name}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
          {selectedTemplate?.description}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Nome do Projeto</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Digite o nome do projeto" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Descrição</label>
        <textarea 
          className="form-input" 
          placeholder="Descreva a funcionalidade do projeto"
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="divider"></div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={handleBack}>
          ← Voltar
        </button>
        <button className="btn btn-primary" onClick={handleFinish}>
          Finalizar e Criar ✓
        </button>
      </div>
    </div>
  )
}

export default TemplateConfiguration