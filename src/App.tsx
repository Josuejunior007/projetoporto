// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProjectProvider } from './context/ProjectContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import PainelDev from './pages/PainelDev'
import ArchitectureSelection from './components/ArchitectureSelection'
import ServiceCreation from './components/ServiceCreation'
import ApiCreation from './components/ApiCreation'
import TemplateSelection from './components/TemplateSelection'
import TemplateConfiguration from './components/TemplateConfiguration'
import ServiceManager from './components/ServiceManager'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import ForgotPasswordScreen from './components/ForgotPasswordScreen'
import EditProfileScreen from './components/EditProfileScreen'
import Header from './components/Header'
import './index.css'
import './components/Components.css'
import type { JSX } from 'react'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {user && <Header />}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/cadastro" element={<RegisterScreen />} />
          <Route path="/esqueci-senha" element={<ForgotPasswordScreen />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <PainelDev />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/criar-servico/arquitetura" 
            element={
              <ProtectedRoute>
                <ArchitectureSelection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/criar-servico/criacao-servico" 
            element={
              <ProtectedRoute>
                <ServiceCreation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/criar-servico/criacao-api" 
            element={
              <ProtectedRoute>
                <ApiCreation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/criar-servico/selecao-template" 
            element={
              <ProtectedRoute>
                <TemplateSelection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/criar-servico/configuracao-template" 
            element={
              <ProtectedRoute>
                <TemplateConfiguration />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gerenciar-servico/:projectId" 
            element={
              <ProtectedRoute>
                <ServiceManager />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/editar-perfil" 
            element={
              <ProtectedRoute>
                <EditProfileScreen />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </AuthProvider>
  )
}

export default App