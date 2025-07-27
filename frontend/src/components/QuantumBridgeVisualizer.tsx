import React, { useEffect, useState, useRef } from 'react';
import './QuantumBridgeVisualizer.css';

interface ERBridge {
  id: string;
  particleA: string;
  particleB: string;
  stability: number;
  wormholeRadius: number;
  entanglementStrength: number;
  traversable: boolean;
  creationTime: number;
}

export const QuantumBridgeVisualizer: React.FC = () => {
  const [bridges, setBridges] = useState<ERBridge[]>([]);
  const [selectedBridge, setSelectedBridge] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Fetch bridges from backend
  useEffect(() => {
    const fetchBridges = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/quantum-bridge/list');
        if (response.ok) {
          const data = await response.json();
          setBridges(data.bridges || []);
        }
      } catch (error) {
        console.error('Failed to fetch ER bridges:', error);
      }
    };

    fetchBridges();
    const interval = setInterval(fetchBridges, 2000); // Update every 2s

    return () => clearInterval(interval);
  }, []);

  // Animate wormholes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(138, 43, 226, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each bridge as a wormhole
      bridges.forEach((bridge, index) => {
        const x = (index + 1) * (canvas.width / (bridges.length + 1));
        const y = canvas.height / 2;
        
        // Wormhole effect
        ctx.save();
        ctx.translate(x, y);
        
        // Outer ring (pulsing)
        const pulseScale = 1 + Math.sin(time * 0.002 + index) * 0.1;
        ctx.beginPath();
        ctx.arc(0, 0, 40 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = bridge.traversable ? '#00ff88' : '#ff4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Inner spiral
        ctx.beginPath();
        for (let i = 0; i < 100; i++) {
          const angle = i * 0.1 + time * 0.001;
          const radius = i * 0.3;
          const spiralX = Math.cos(angle) * radius;
          const spiralY = Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(spiralX, spiralY);
          } else {
            ctx.lineTo(spiralX, spiralY);
          }
        }
        ctx.strokeStyle = `rgba(138, 43, 226, ${bridge.stability / 100})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
        
        // Draw labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(bridge.particleA, x, y - 60);
        ctx.fillText('↔', x, y);
        ctx.fillText(bridge.particleB, x, y + 70);
      });

      time += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bridges]);

  const createNewBridge = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/quantum-bridge/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity1: `Hero_${Math.random().toString(36).substr(2, 5)}`,
          entity2: `Location_${Math.random().toString(36).substr(2, 5)}`,
          bridgeType: 'SPATIAL'
        })
      });
      
      if (response.ok) {
        const newBridge = await response.json();
        console.log('New ER bridge created:', newBridge);
      }
    } catch (error) {
      console.error('Failed to create bridge:', error);
    }
  };

  const vinceQuantumShot = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/quantum-bridge/vince-quantum-shot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shooterId: 'vince_vega',
          targetId: `Enemy_${Math.random().toString(36).substr(2, 5)}`
        })
      });
      
      if (response.ok) {
        console.log('🔫 Vince quantum shot fired!');
      }
    } catch (error) {
      console.error('Failed to fire quantum shot:', error);
    }
  };

  return (
    <div className="quantum-bridge-visualizer">
      <div className="quantum-header">
        <h2>🌌 ER=EPR Quantum Bridges</h2>
        <span className="susskind-quote">"Entanglement is the fabric of spacetime" - L. Susskind</span>
      </div>

      <canvas 
        ref={canvasRef}
        width={800}
        height={300}
        className="wormhole-canvas"
      />

      <div className="bridge-list">
        {bridges.map((bridge) => (
          <div 
            key={bridge.id}
            className={`bridge-card ${selectedBridge === bridge.id ? 'selected' : ''}`}
            onClick={() => setSelectedBridge(bridge.id)}
          >
            <div className="bridge-header">
              <span className="bridge-icon">🌉</span>
              <span className="bridge-particles">
                {bridge.particleA} ↔️ {bridge.particleB}
              </span>
            </div>
            <div className="bridge-stats">
              <div className="stat">
                <span className="stat-label">Stability:</span>
                <span className="stat-value">{bridge.stability.toFixed(1)}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Entanglement:</span>
                <span className="stat-value">{(bridge.entanglementStrength * 100).toFixed(0)}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Traversable:</span>
                <span className={`stat-value ${bridge.traversable ? 'traversable' : 'blocked'}`}>
                  {bridge.traversable ? '✅' : '❌'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="quantum-controls">
        <button 
          className="quantum-btn create-bridge"
          onClick={createNewBridge}
        >
          🌀 Create ER Bridge
        </button>
        <button 
          className="quantum-btn vince-shot"
          onClick={vinceQuantumShot}
        >
          🔫 Vince Quantum Shot
        </button>
      </div>

      <div className="quantum-info">
        <h3>🔬 ER=EPR Principle</h3>
        <p>
          Einstein-Rosen bridges (wormholes) ARE Einstein-Podolsky-Rosen entanglement.
          When two entities are quantumly entangled, they create a traversable wormhole
          in spacetime, allowing instant connection across any distance.
        </p>
        <p className="ford-note">
          Ford Requirement: All bridges must be self-triggering and evolve autonomously.
        </p>
      </div>
    </div>
  );
}; 