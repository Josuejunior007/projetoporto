// ApiCreation.tsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'

const ApiCreation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addProject } = useProjects()

  const selectedArchitecture = location.state?.selectedArchitecture || 'API'

  // Estados para os inputs
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tipoApi, setTipoApi] = useState('')
  const [bancoDados, setBancoDados] = useState('')

  const handleBack = () => {
    navigate('/criar-servico/criacao-servico', { state: { selectedArchitecture } })
  }

  const handleFinish = () => {
    if (!nome) {
      alert('Por favor, dê um nome para a API')
      return
    }

    // No handleFinish do ApiCreation.tsx, certifique-se de incluir:
    const novoProjeto = {
      id: Date.now().toString(),
      nome: nome,
      tipo: 'API',
      descricao: descricao,
      arquitetura: selectedArchitecture,
      tipoApi: tipoApi, // ← Garantir que está sendo salvo
      bancoDados: bancoDados, // ← Garantir que está sendo salvo
      modificado: new Date().toLocaleDateString('pt-BR')
    };
    
    addProject(novoProjeto)
    navigate('/')
  }

  return (
    <div className="card" style={{ 
      width: '100%', 
      maxWidth: '800px', 
      padding: '32px',
      margin: '0 auto'
    }}>
      <div className="navigation">
        <div className="nav-title">Criar API</div>
        <div className="nav-steps">
          <span className="step">Dashboard</span>
          <span>›</span>
          <span className="step">Arquitetura</span>
          <span>›</span>
          <span className="step">Criação</span>
          <span>›</span>
          <span className="step active">API</span>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Configurar Nova API ({selectedArchitecture})</div>
      </div>

      <div className="form-group">
        <label className="form-label">Nome da API</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Digite o nome da API" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Descrição</label>
        <textarea 
          className="form-input" 
          placeholder="Descreva a funcionalidade da API"
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tipo de API</label>
        <select 
          className="form-select"
          value={tipoApi}
          onChange={(e) => setTipoApi(e.target.value)}
        >
          <option value="">Selecione o tipo</option>
          <option value="rest">REST API</option>
          <option value="graphql">GraphQL</option>
          <option value="grpc">gRPC</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Banco de Dados</label>
        <select 
          className="form-select"
          value={bancoDados}
          onChange={(e) => setBancoDados(e.target.value)}
        >
          <option value="">Selecione o banco</option>
          <option value="mysql">MySQL</option>
          <option value="postgres">PostgreSQL</option>
          <option value="mongodb">MongoDB</option>
          <option value="sqlite">SQLite</option>
          <option value="sqlserver">SQL Server</option>
          <option value="oracle">Oracle</option>
        </select>
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

export default ApiCreation