// ProjectContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Definindo o formato do Projeto
// ProjectContext.tsx
export type Project = {
  id: string | number;
  nome: string;
  tipo: string;
  descricao?: string;
  arquitetura?: string;
  tipoApi?: string;
  bancoDados?: string;
  template?: string;
  modificado: string;
};

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string | number) => void; // Nova função para deletar
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  // Inicia com array vazio
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('myProjects');
    return saved ? JSON.parse(saved) : []; // Array vazio se não houver dados
  });

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('myProjects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  // Função para deletar projeto
  const deleteProject = (id: string | number) => {
    setProjects((prev) => prev.filter(project => project.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects deve ser usado dentro de um ProjectProvider');
  }
  return context;
}