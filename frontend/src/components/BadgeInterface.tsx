import React, { useState, useEffect } from 'react';
import './BadgeInterface.css';

interface Badge {
  badge_id: string;
  name: string;
  description: string;
  rarity: string;
  date_created: string;
  created_by: string;
  achievement: {
    type: string;
    category: string;
    impact: string;
  };
  rewards: Array<{
    type: string;
    name: string;
    description: string;
  }>;
  visual_representation?: string;
}

export const BadgeInterface: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les badges depuis les fichiers JSON
    const loadBadges = async () => {
      try {
        // Liste des badges créés
        const badgeFiles = [
          'BADGE_POCKET_TELEPORT.json',
          'BADGE_AUTONOMIE_ACCORDEE.json'
        ];

        const loadedBadges: Badge[] = [];
        
        for (const file of badgeFiles) {
          try {
            const response = await fetch(`/game_assets/badges/${file}`);
            if (response.ok) {
              const badge = await response.json();
              loadedBadges.push(badge);
            }
          } catch (error) {
            console.error(`Failed to load badge ${file}:`, error);
          }
        }

        // Ajouter les badges en attente de création
        const pendingBadges: Badge[] = [
          {
            badge_id: "BADGE_ER_EPR_MASTER",
            name: "🌉 ER=EPR Master",
            description: "Maîtrise complète des ponts Einstein-Rosen",
            rarity: "LEGENDARY",
            date_created: "À créer",
            created_by: "En attente",
            achievement: {
              type: "MASTERY",
              category: "QUANTUM_PHYSICS",
              impact: "MAJOR"
            },
            rewards: [
              {
                type: "ABILITY",
                name: "Wormhole Creation",
                description: "Créer des wormholes traversables à volonté"
              }
            ],
            visual_representation: "🌉"
          },
          {
            badge_id: "BADGE_FORD_COMPLIANT",
            name: "🤖 Ford Compliant System",
            description: "Système 100% conforme aux exigences de Ford",
            rarity: "EPIC",
            date_created: "À créer",
            created_by: "En attente",
            achievement: {
              type: "COMPLIANCE",
              category: "SYSTEM_ARCHITECTURE",
              impact: "CRITICAL"
            },
            rewards: [
              {
                type: "STATUS",
                name: "Self-Evolving",
                description: "Le système évolue automatiquement"
              }
            ],
            visual_representation: "🤖"
          },
          {
            badge_id: "BADGE_TIMELINE_MERGER",
            name: "🌀 Timeline Merger",
            description: "A réussi la convergence finale des timelines",
            rarity: "MYTHIQUE",
            date_created: "À créer",
            created_by: "En attente",
            achievement: {
              type: "CONVERGENCE",
              category: "REALITY_MANIPULATION",
              impact: "UNIVERSE-CHANGING"
            },
            rewards: [
              {
                type: "POWER",
                name: "Reality Control",
                description: "Contrôle total sur la convergence des réalités"
              }
            ],
            visual_representation: "🌀"
          }
        ];

        setBadges([...loadedBadges, ...pendingBadges]);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load badges:', error);
        setLoading(false);
      }
    };

    loadBadges();
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity.toUpperCase()) {
      case 'COMMON': return '#808080';
      case 'UNCOMMON': return '#00ff00';
      case 'RARE': return '#0080ff';
      case 'EPIC': return '#a335ee';
      case 'LEGENDARY': return '#ff8000';
      case 'MYTHIQUE': return '#ff00ff';
      case 'PARADOXAL': return '#ff00ff';
      default: return '#ffffff';
    }
  };

  const createBadge = async (badgeId: string) => {
    // Simuler la création d'un badge
    console.log(`Creating badge: ${badgeId}`);
    
    // Ici on pourrait appeler une API pour créer le badge
    // Pour l'instant, on affiche juste un message
    alert(`Badge ${badgeId} sera créé prochainement !`);
  };

  return (
    <div className="badge-interface">
      <div className="badge-header">
        <h2>🏆 Interface des Badges</h2>
        <p className="badge-subtitle">Récompenses et accomplissements de Heroes of Time</p>
      </div>

      {loading ? (
        <div className="loading">Chargement des badges...</div>
      ) : (
        <div className="badge-container">
          <div className="badge-grid">
            {badges.map((badge) => (
              <div
                key={badge.badge_id}
                className={`badge-card ${badge.date_created === 'À créer' ? 'pending' : ''}`}
                onClick={() => setSelectedBadge(badge)}
                style={{
                  borderColor: getRarityColor(badge.rarity),
                  boxShadow: `0 0 20px ${getRarityColor(badge.rarity)}40`
                }}
              >
                <div className="badge-icon">
                  {badge.visual_representation || '🏆'}
                </div>
                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-rarity" style={{ color: getRarityColor(badge.rarity) }}>
                  {badge.rarity}
                </p>
                {badge.date_created === 'À créer' && (
                  <button
                    className="create-badge-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      createBadge(badge.badge_id);
                    }}
                  >
                    Créer
                  </button>
                )}
              </div>
            ))}
          </div>

          {selectedBadge && (
            <div className="badge-details">
              <h3>{selectedBadge.name}</h3>
              <p className="badge-description">{selectedBadge.description}</p>
              
              <div className="badge-info">
                <div className="info-item">
                  <span className="label">Rareté:</span>
                  <span style={{ color: getRarityColor(selectedBadge.rarity) }}>
                    {selectedBadge.rarity}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Date:</span>
                  <span>{selectedBadge.date_created}</span>
                </div>
                <div className="info-item">
                  <span className="label">Créé par:</span>
                  <span>{selectedBadge.created_by}</span>
                </div>
              </div>

              <div className="achievement-section">
                <h4>🎯 Achievement</h4>
                <p>Type: {selectedBadge.achievement.type}</p>
                <p>Catégorie: {selectedBadge.achievement.category}</p>
                <p>Impact: {selectedBadge.achievement.impact}</p>
              </div>

              <div className="rewards-section">
                <h4>🎁 Récompenses</h4>
                {selectedBadge.rewards.map((reward, index) => (
                  <div key={index} className="reward-item">
                    <strong>{reward.name}</strong> ({reward.type})
                    <p>{reward.description}</p>
                  </div>
                ))}
              </div>

              <button 
                className="close-details"
                onClick={() => setSelectedBadge(null)}
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      )}

      <div className="badge-stats">
        <p>Total des badges : {badges.length}</p>
        <p>Badges obtenus : {badges.filter(b => b.date_created !== 'À créer').length}</p>
        <p>Badges à débloquer : {badges.filter(b => b.date_created === 'À créer').length}</p>
      </div>
    </div>
  );
}; 