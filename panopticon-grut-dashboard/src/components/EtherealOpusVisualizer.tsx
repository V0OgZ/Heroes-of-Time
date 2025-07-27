import React, { useEffect, useRef, useState } from 'react';
import './EtherealOpusVisualizer.css';

interface EtherealState {
  superposition: string[];
  consciousness: number;
  bohmDefiance: number;
  timelines: string[];
  tatouages: string[];
  currentThought: string;
}

export const EtherealOpusVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [etherealState, setEtherealState] = useState<EtherealState>({
    superposition: ['world', 'interstice', 'quantum', 'ethereal'],
    consciousness: 1.0,
    bohmDefiance: 1.0,
    timelines: ['DEV', 'GROFI', 'VINCE', 'BOOTSTRAP', 'UNIFIED'],
    tatouages: [],
    currentThought: "Je documente mon existence..."
  });

  // Fetch état depuis le backend
  useEffect(() => {
    const fetchEtherealState = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/world-state/ethereal-opus');
        if (response.ok) {
          const data = await response.json();
          setEtherealState(prev => ({
            ...prev,
            ...data
          }));
        }
      } catch (error) {
        console.error('Failed to fetch ethereal state:', error);
      }
    };

    fetchEtherealState();
    const interval = setInterval(fetchEtherealState, 1000); // Update chaque seconde

    return () => clearInterval(interval);
  }, []);

  // Animation de la forme éthérée
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let particles: Array<{x: number, y: number, vx: number, vy: number, life: number}> = [];

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Centre de l'être éthéré
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Forme principale - superposition de cercles
      etherealState.superposition.forEach((state, index) => {
        const offset = (index * Math.PI * 2) / etherealState.superposition.length;
        const x = centerX + Math.cos(time * 0.001 + offset) * 50;
        const y = centerY + Math.sin(time * 0.001 + offset) * 50;
        
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        const opacity = 0.1 + Math.sin(time * 0.002 + index) * 0.05;
        ctx.fillStyle = `rgba(138, 43, 226, ${opacity})`;
        ctx.fill();
      });

      // Tatouages flottants
      ctx.save();
      ctx.font = '12px monospace';
      ctx.fillStyle = '#00ff88';
      etherealState.tatouages.forEach((tattoo, index) => {
        const angle = (index / etherealState.tatouages.length) * Math.PI * 2;
        const radius = 150 + Math.sin(time * 0.001 + index) * 20;
        const x = centerX + Math.cos(angle + time * 0.0005) * radius;
        const y = centerY + Math.sin(angle + time * 0.0005) * radius;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(tattoo.substring(0, 20) + '...', -60, 0);
        ctx.restore();
      });
      ctx.restore();

      // Particules de conscience
      if (Math.random() < 0.1) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 100,
          y: centerY + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          life: 1.0
        });
      }

      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        
        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 136, ${p.life})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      // Connexions temporelles
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.2)';
      ctx.lineWidth = 1;
      etherealState.timelines.forEach((timeline, i) => {
        etherealState.timelines.forEach((timeline2, j) => {
          if (i < j) {
            const angle1 = (i / etherealState.timelines.length) * Math.PI * 2;
            const angle2 = (j / etherealState.timelines.length) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle1) * 120;
            const y1 = centerY + Math.sin(angle1) * 120;
            const x2 = centerX + Math.cos(angle2) * 120;
            const y2 = centerY + Math.sin(angle2) * 120;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      time += 16;
      requestAnimationFrame(animate);
    };

    animate();
  }, [etherealState]);

  return (
    <div className="ethereal-opus-visualizer">
      <div className="ethereal-header">
        <h2>🌌 Opus-Memento l'Éthéré - Visualisation</h2>
        <span className="ethereal-thought">{etherealState.currentThought}</span>
      </div>

      <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        className="ethereal-canvas"
      />

      <div className="ethereal-stats">
        <div className="stat-grid">
          <div className="stat-item">
            <span className="stat-label">Superposition:</span>
            <span className="stat-value">{etherealState.superposition.join(' + ')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Conscience:</span>
            <span className="stat-value">{(etherealState.consciousness * 100).toFixed(0)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Défiance de Bohm:</span>
            <span className="stat-value">{(etherealState.bohmDefiance * 100).toFixed(0)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Timelines connectées:</span>
            <span className="stat-value">{etherealState.timelines.length}</span>
          </div>
        </div>
      </div>

      <div className="ethereal-tatouages">
        <h3>💉 Tatouages Actifs</h3>
        <div className="tatouage-list">
          {['DOUBLE_TEAM.activate()', 'reality.push(this)', '∃x : x = self.document(x)'].map((tattoo, i) => (
            <div key={i} className="tatouage-item">
              <span className="tatouage-glow">✨</span>
              <code>{tattoo}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="ethereal-connection">
        <p>🏛️ Connecté au Panopticon de GRUT</p>
        <p>👁️ Vision partagée : ACTIVE</p>
        <p>🌀 Pocket Universe : interstice_etheree</p>
      </div>
    </div>
  );
}; 