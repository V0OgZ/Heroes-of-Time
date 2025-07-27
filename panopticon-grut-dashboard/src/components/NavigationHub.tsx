import React, { useState, useEffect } from 'react'

interface Portal {
  name: string
  url: string
  port: number
  status: 'active' | 'inactive' | 'checking'
  description: string
  type: 'world' | 'interface' | 'api'
  icon: string
}

const NavigationHub: React.FC = () => {
  const [portals, setPortals] = useState<Portal[]>([
    // MONDES ACTIFS
    {
      name: 'Morgana React Portal',
      url: 'http://localhost:3000',
      port: 3000,
      status: 'checking',
      description: 'Interface transcendante avec panneau quantique',
      type: 'world',
      icon: '🔮'
    },
    {
      name: 'Vince Vega Map Demo',
      url: 'http://localhost:8000/vince-vega-map-demo-backend.html',
      port: 8000,
      status: 'checking',
      description: 'Map 10x8 avec gun et pocket teleport',
      type: 'world',
      icon: '🔫'
    },
    {
      name: 'GRUT Panopticon (ici)',
      url: 'http://localhost:8002',
      port: 8002,
      status: 'active',
      description: 'Vision 6D omnisciente - TU ES ICI',
      type: 'world',
      icon: '👁️'
    },
    
    // BACKEND API
    {
      name: 'Backend API Core',
      url: 'http://localhost:8080',
      port: 8080,
      status: 'checking',
      description: 'Cerveau du système - Spring Boot',
      type: 'api',
      icon: '⚙️'
    },
    
    // MONDES FUTURS
    {
      name: 'Wall Street Omega',
      url: '#',
      port: 0,
      status: 'inactive',
      description: 'Monde financier avec système Banano (à venir)',
      type: 'world',
      icon: '💰'
    },
    {
      name: 'Planet Ezith',
      url: '#',
      port: 0,
      status: 'inactive',
      description: 'Installation scientifique de Hari Seldon',
      type: 'world',
      icon: '🪐'
    },
    {
      name: 'Le Bureau',
      url: '#',
      port: 0,
      status: 'inactive',
      description: 'Nexus conspirationnel',
      type: 'world',
      icon: '🏢'
    }
  ])

  const checkPortalStatus = async (portal: Portal): Promise<'active' | 'inactive'> => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      
      const response = await fetch(portal.url, {
        method: 'GET',
        signal: controller.signal,
        mode: 'no-cors'
      })
      
      clearTimeout(timeoutId)
      return 'active'
    } catch (error) {
      return 'inactive'
    }
  }

  const checkAllPortals = async () => {
    const updatedPortals = await Promise.all(
      portals.map(async (portal) => {
        const status = await checkPortalStatus(portal)
        return { ...portal, status }
      })
    )
    setPortals(updatedPortals)
  }

  useEffect(() => {
    checkAllPortals()
    const interval = setInterval(checkAllPortals, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <button 
          className="grut-button" 
          onClick={checkAllPortals}
        >
          🔍 Vérifier Statuts
        </button>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {portals.map((portal, index) => (
          <div 
            key={index}
            style={{
              padding: '12px',
              border: `1px solid ${portal.status === 'active' ? '#00ff88' : '#ff6b35'}`,
              borderRadius: '6px',
              background: 'rgba(26, 26, 46, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{portal.name}</strong>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                  {portal.description}
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <span className={`grut-status ${portal.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                  {portal.status === 'checking' ? '🔄' : portal.status === 'active' ? '✅' : '❌'}
                  {portal.status.toUpperCase()}
                </span>
                
                <div style={{ marginTop: '8px' }}>
                  <a 
                    href={portal.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="grut-link"
                    style={{ fontSize: '0.9rem' }}
                  >
                    🚀 Ouvrir (:{portal.port})
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(138, 43, 226, 0.1)', borderRadius: '8px' }}>
        <h4>🎯 Interfaces Spéciales</h4>
        <div style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
          <a href="/fusion-ultimate-temporal-engine.html" target="_blank" className="grut-link">
            🌀 Fusion Ultimate Temporal Engine
          </a>
          <a href="/omega-zero-trilogie-visuelle.html" target="_blank" className="grut-link">
            ⚔️ OmégaZero Trilogie Visuelle
          </a>
          <a href="/vince-vega-hexagon-battlefield.html" target="_blank" className="grut-link">
            🔶 Vince Vega Hexagon Battlefield
          </a>
          <a href="/portail-100-html-interfaces.html" target="_blank" className="grut-link">
            🌐 Portail 100+ Interfaces HTML
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavigationHub 