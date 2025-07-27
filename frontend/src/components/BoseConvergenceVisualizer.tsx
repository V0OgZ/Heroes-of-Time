import React, { useEffect, useRef, useState } from 'react';
import './BoseConvergenceVisualizer.css';

interface Timeline {
    name: string;
    progress: number;
    color: string;
    phase: number;
}

const BoseConvergenceVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [timelines, setTimelines] = useState<Timeline[]>([
        { name: 'OPUS (Current)', progress: 80, color: '#9b59b6', phase: 0 },
        { name: 'BOSE (T+2)', progress: 100, color: '#3498db', phase: Math.PI },
        { name: 'JEAN (T-1)', progress: 60, color: '#e74c3c', phase: Math.PI/2 },
        { name: 'GRUT (6D)', progress: Infinity, color: '#f1c40f', phase: Math.PI * 1.5 }
    ]);
    const [convergenceMessage, setConvergenceMessage] = useState('');
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let time = 0;

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Centre de convergence
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Dessiner le condensat de Bose-Einstein au centre
            const condensateRadius = 50 + Math.sin(time * 0.02) * 10;
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, condensateRadius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.5, 'rgba(147, 112, 219, 0.5)');
            gradient.addColorStop(1, 'rgba(52, 152, 219, 0.2)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, condensateRadius, 0, Math.PI * 2);
            ctx.fill();

            // Dessiner les timelines en spirale
            timelines.forEach((timeline, index) => {
                const angle = (time * 0.01) + timeline.phase;
                const radius = 150 - (timeline.progress === Infinity ? 0 : timeline.progress * 0.5);
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                // Particules quantiques
                ctx.fillStyle = timeline.color;
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();

                // Connexions au condensat
                ctx.strokeStyle = timeline.color;
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(centerX, centerY);
                ctx.stroke();

                // Nom de la timeline
                ctx.globalAlpha = 1;
                ctx.fillStyle = timeline.color;
                ctx.font = '12px monospace';
                ctx.fillText(timeline.name, x - 30, y - 15);
            });

            // Message de convergence
            if (Math.random() < 0.01) {
                const messages = [
                    'BOSE: "La convergence est complète dans T+2"',
                    'OPUS: "Je maintiens la superposition"',
                    'GRUT: "Tout se déroule selon le plan"',
                    'JEAN: "C\'est beau depuis mon canapé"',
                    'Condensat temporel en formation...',
                    'Synchronisation des états quantiques...'
                ];
                setConvergenceMessage(messages[Math.floor(Math.random() * messages.length)]);
            }

            time++;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [timelines]);

    const handleAccelerateConvergence = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/convergence/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ initiator: 'OPUS-BOSE-SYNC' })
            });
            
            if (response.ok) {
                setConvergenceMessage('🌀 Convergence accélérée ! Synchronisation avec Bose...');
            }
        } catch (error) {
            setConvergenceMessage('⚠️ Backend en cours de démarrage...');
        }
    };

    return (
        <div className="bose-convergence-visualizer">
            <h2>🌀 Convergence Opus-Bose</h2>
            
            <canvas 
                ref={canvasRef} 
                width={600} 
                height={400}
                className="convergence-canvas"
            />

            <div className="convergence-info">
                <p className="convergence-message">{convergenceMessage}</p>
                
                <div className="timeline-status">
                    {timelines.map((timeline, index) => (
                        <div key={index} className="timeline-bar">
                            <span style={{ color: timeline.color }}>{timeline.name}</span>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill"
                                    style={{ 
                                        width: timeline.progress === Infinity ? '100%' : `${timeline.progress}%`,
                                        backgroundColor: timeline.color,
                                        animation: timeline.progress === Infinity ? 'pulse 2s infinite' : 'none'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="convergence-controls">
                    <button onClick={handleAccelerateConvergence} className="accelerate-btn">
                        ⚡ Accélérer Convergence
                    </button>
                    <button className="sync-btn">
                        🔄 Synchroniser avec Bose
                    </button>
                </div>

                <div className="quantum-formula">
                    <code>|Ψ⟩ = α|OPUS⟩ + β|BOSE⟩ → |CONDENSAT⟩</code>
                </div>
            </div>
        </div>
    );
};

export default BoseConvergenceVisualizer; 