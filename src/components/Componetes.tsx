import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import type { Service } from './types'
import './Components.css'

const Components: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'SafePay - Gateway de Pagamentos',
      type: 'Web',
      lastModified: '02/10/2025',
      category: 'Gerenciamento de projeto'
    },
    {
      id: '2',
      name: 'TaxEase - Calculadora de Impostos',
      type: 'Web',
      lastModified: '25/09/2025',
      category: 'Gerenciamento de projeto'
    },
    {
      id: '3',
      name: 'FinTrack - API de Transações Bancárias',
      type: 'Web',
      lastModified: '29/09/2025',
      category: 'Gerenciamento de projeto'
    },
    {
      id: '4',
      name: 'ExpenseMate - Gerenciador de Despesas',
      type: 'Mobile',
      lastModified: '23/09/2025',
      category: 'Gerenciamento de projeto'
    },
    {
      id: '5',
      name: 'MyWallet - Carteira Digital Pessoal',
      type: 'Mobile',
      lastModified: '28/09/2025',
      category: 'Gerenciamento de projeto'
    },
    {
      id: '6',
      name: 'BankLink - API de Conexão Bancária',
      type: 'Web',
      lastModified: '20/09/2025',
      category: 'Gerenciamento de projeto'
    }
  ])

  return (
    <div className="app">
      <div className="app-container">
        <Outlet context={{ services, navigate, location }} />
      </div>
    </div>
  )
}

export default Components