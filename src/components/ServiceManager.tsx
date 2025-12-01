// src/components/ServiceManager.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import './Components.css';

export default function ServiceManager() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  
  const [project, setProject] = useState<any>(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceURL] = useState("https://api.example.com/v1");

  const [metrics] = useState({
    requests: Math.floor(Math.random() * 1000) + 500,
    latency: Math.floor(Math.random() * 200) + 50,
    errorRate: (Math.random() * 10).toFixed(2),
    version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    status: Math.random() > 0.1 ? 'Online' : 'Offline'
  });

  useEffect(() => {
    if (projectId) {
      const foundProject = projects.find(p => p.id.toString() === projectId);
      if (foundProject) {
        setProject(foundProject);
        setServiceName(foundProject.nome);
      }
    }
  }, [projectId, projects]);

  function handleBackClick() {
    navigate(-1);
  }

  function handleRename() {
    const newName = prompt("Digite o novo nome do serviço:", serviceName);

    if (newName !== null && newName.trim() !== "") {
      setServiceName(newName);
    }
  }

  function handleCopyURL() {
    navigator.clipboard.writeText(serviceURL)
      .then(() => alert("URL copiada!"))
      .catch(() => alert("Erro ao copiar a URL."));
  }

  if (!project) {
    return (
      <div className="app">
        <div className="app-container">
          <div className="card">
            <div className="navigation">
              <div className="nav-title">Serviço não encontrado</div>
            </div>
            <button className="btn btn-secondary" onClick={handleBackClick}>
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        <div className="card" style={{ maxWidth: '1100px', height: '85vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
            <button
              onClick={handleBackClick}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "26px",
                lineHeight: "26px",
                padding: "5px",
              }}
            >
              ←
            </button>

            <h1 style={{ margin: 0 }}>Gerenciamento de Serviço</h1>
          </div>

          <div style={{ flex: 1 }}>
            <p>
              <strong>Serviço:</strong> {serviceName}{" "}
              <button onClick={handleRename} style={{ color: "#0066ff", background: "none", border: "none", cursor: "pointer" }}>
                Alterar nome
              </button>
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: metrics.status === 'Online' ? "green" : "red", fontWeight: "bold" }}>
                ● {metrics.status}
              </span>
            </p>

            <p><strong>Versão:</strong> {metrics.version}</p>

            <p>
              <strong>URL:</strong> {serviceURL}{" "}
              <button onClick={handleCopyURL} style={{ color: "#0066ff", background: "none", border: "none", cursor: "pointer" }}>
                Copiar URL
              </button>
            </p>

            <p><strong>Tipo:</strong> {project.tipo}</p>
            {project.arquitetura && <p><strong>Arquitetura:</strong> {project.arquitetura}</p>}
            {project.tipoApi && <p><strong>Tipo de API:</strong> {project.tipoApi}</p>}
            {project.bancoDados && <p><strong>Banco de Dados:</strong> {project.bancoDados}</p>}
            {project.template && <p><strong>Template:</strong> {project.template}</p>}
            {project.descricao && <p><strong>Descrição:</strong> {project.descricao}</p>}

            <p><strong>Endpoints:</strong></p>
            <ul style={{ marginTop: "-5px" }}>
              <li>/auth/login</li>
              <li>/payments/create</li>
              <li>/users/profile</li>
              <li>/data/query</li>
            </ul>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: "15px" }}>Métricas:</h2>

            <div style={{ display: "flex", gap: "20px", height: "100%" }}>
              <div
                style={{
                  flex: 1,
                  background: "#f7f7f7",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h3>Número de Requisições</h3>
                <div style={{ 
                  height: "140px", 
                  background: "#dce6ff", 
                  borderRadius: "8px",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {metrics.requests}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "#f7f7f7",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h3>Latência Média (ms)</h3>
                <div style={{ 
                  height: "140px", 
                  background: "#ffe5c8", 
                  borderRadius: "8px",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {metrics.latency}ms
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "#f7f7f7",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h3>Taxa de Erros (%)</h3>
                <div style={{ 
                  height: "140px", 
                  background: "#ffc8c8", 
                  borderRadius: "8px",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {metrics.errorRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}