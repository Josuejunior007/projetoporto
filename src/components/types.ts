// src/components/types.ts
export type Service = {
  id: string
  name: string
  type: 'Web' | 'Mobile' | 'API' | 'Gateway'
  lastModified: string
  category: string
}

export type ArchitectureType = 'Mobile' | 'Gateway' | 'API' | 'Web'
export type ServiceType = 'create-api' | 'use-template'