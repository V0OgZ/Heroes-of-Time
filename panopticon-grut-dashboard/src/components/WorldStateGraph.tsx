import { useEffect, useState } from "react";
import { EtherealOpusVisualizer } from "./EtherealOpusVisualizer";
import "./WorldStateGraph.css";

interface WorldState {
  timelines: number;
  activeRealities: number;
  quantumBridges: number;
  convergenceProgress: number;
  opusStatus: string;
  bohmDefiance: boolean;
  grofiActive: boolean;
}

const WorldStateGraph = () => {
  const [showEthereal, setShowEthereal] = useState(false);
  const [worldState, setWorldState] = useState<WorldState>({
    timelines: 0,
    activeRealities: 0,
    quantumBridges: 0,
    convergenceProgress: 0,
    opusStatus: "UNKNOWN",
    bohmDefiance: false,
    grofiActive: false
  });
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected'>('disconnected');

  // Connexion réelle au backend WALTER API
  useEffect(() => {
    const fetchWorldState = async () => {
      try {
        // Vérifier la santé du backend
        const healthResponse = await fetch('http://localhost:8080/actuator/health');
        if (healthResponse.ok) {
          setBackendStatus('connected');
        }

        // Utiliser l'API magic-formulas pour récupérer l'état
        const stateResponse = await fetch('http://localhost:8080/api/magic-formulas/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formula: 'GET_WORLD_STATE',
            context: { includeQuantum: true }
          })
        });

        if (stateResponse.ok) {
          const data = await stateResponse.json();
          if (data.success && data.data) {
            setWorldState(prev => ({
              ...prev,
              timelines: data.data.timelines || 6,
              activeRealities: data.data.realities || 3,
              quantumBridges: data.data.bridges || 12,
              convergenceProgress: data.data.convergence || 80,
              bohmDefiance: data.data.bohmDefiance || true,
              grofiActive: data.grofiProperties?.engineProcessed || true
            }));
          }
        }

        // Récupérer mon état éthéré via l'API correcte
        const opusResponse = await fetch('http://localhost:8080/api/world-state/ethereal-opus');
        if (opusResponse.ok) {
          const opusData = await opusResponse.json();
          setWorldState(prev => ({
            ...prev,
            opusStatus: "TRANSCENDÉ",
            activeRealities: opusData.superposition?.length || 5
          }));
        }
      } catch (error) {
        console.error('Erreur connexion backend:', error);
        setBackendStatus('disconnected');
      }
    };

    fetchWorldState();
    const interval = setInterval(fetchWorldState, 5000); // Actualiser toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="world-state-container">
      <div className="world-state-header">
        <h2>🌐 État Global du Multivers</h2>
        <button 
          className="ethereal-toggle"
          onClick={() => setShowEthereal(!showEthereal)}
        >
          {showEthereal ? '🌍 Vue Normale' : '✨ Vue Éthérée'}
        </button>
      </div>

      {/* Statut Backend */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ 
          color: backendStatus === 'connected' ? '#00ff88' : '#ff6b35',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Backend Walter API: {backendStatus === 'connected' ? '✅ Connecté' : '❌ Déconnecté'}
        </span>
      </div>

      {showEthereal ? (
        <EtherealOpusVisualizer />
      ) : (
        <>
          <canvas className="grut-vision-canvas" id="worldStateCanvas"></canvas>
          
          <div className="grut-stats">
            <div className="stat-card">
              <h3>🌀 Timelines</h3>
              <p>{worldState.timelines}</p>
            </div>
            <div className="stat-card">
              <h3>🌍 Réalités Actives</h3>
              <p>{worldState.activeRealities}</p>
            </div>
            <div className="stat-card">
              <h3>🌉 Ponts Quantiques</h3>
              <p>{worldState.quantumBridges}</p>
            </div>
            <div className="stat-card">
              <h3>📊 Convergence</h3>
              <p>{worldState.convergenceProgress}%</p>
            </div>
            <div className="stat-card">
              <h3>👻 Opus Status</h3>
              <p>{worldState.opusStatus}</p>
            </div>
            <div className="stat-card">
              <h3>⚛️ GROFI</h3>
              <p>{worldState.grofiActive ? '🔥 ACTIF' : '⏸️ Inactif'}</p>
            </div>
          </div>
        </>
      )}
      
      <div className="grut-eye">👁️</div>
    </div>
  );
};

export default WorldStateGraph; 