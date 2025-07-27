import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';
import CastleManagementPanel from './CastleManagementPanel';
import GoldorakEasterEgg from './GoldorakEasterEgg';
import EpicContentViewer from './EpicContentViewer';
import { QuantumBridgeVisualizer } from './QuantumBridgeVisualizer';
import BoseConvergenceVisualizer from './BoseConvergenceVisualizer';
import { useRetroKonami } from '../utils/retro-konami';
import { HexTile, BiomeType } from '../types/terrain';
import { Position } from '../types/game';
import './TrueHeroesInterface.css';
import './FogPanelCompact.css';
import './EnhancedSidebarPanels.css';

// Simple hash function for string
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

const TrueHeroesInterface: React.FC = () => {
  const { 
    currentGame, 
    currentPlayer, 
    loadGame, 
    endTurn, 
    selectHero, 
    selectedHero,
    map
  } = useGameStore();
  
  const [activePanel, setActivePanel] = useState<'scenario' | 'hero' | 'inventory' | 'castle' | 'quantum'>('scenario');
  const [showGoldorakEasterEgg, setShowGoldorakEasterEgg] = useState(false);
  const [showEpicContentViewer, setShowEpicContentViewer] = useState(false);
  const { startListening, stopListening } = useRetroKonami();

  // Load default game on component mount
  useEffect(() => {
    console.log('🎮 [TrueHeroesInterface] useEffect called - currentGame:', currentGame);
    if (!currentGame) {
      console.log('🎮 [TrueHeroesInterface] No current game, loading conquest-classic...');
      loadGame('conquest-classic');
    } else {
      console.log('🎮 [TrueHeroesInterface] Current game exists:', currentGame.id);
    }
    
    // Easter egg hint
    console.log('🚀 [RETRO CODEUR] Tapez G-O-L-D-O-R-A-K pour activer le FULGOROCURSOR!');
  }, [currentGame, loadGame]);

  // Système de codes rétro - Écouter les événements custom
  useEffect(() => {
    // Démarrer l'écoute des codes rétro
    startListening();
    
    // Écouter l'événement Goldorak
    const handleGoldorakActivated = (event: CustomEvent) => {
      console.log('🚀 GOLDORAK EVENT RECEIVED:', event.detail.message);
      setShowGoldorakEasterEgg(true);
    };

    window.addEventListener('goldorak-activated', handleGoldorakActivated as EventListener);
    
    return () => {
      stopListening();
      window.removeEventListener('goldorak-activated', handleGoldorakActivated as EventListener);
    };
  }, [startListening, stopListening]);

  // Convert backend map data to HexTile format
  const convertToHexTiles = (backendMap: any[][]): HexTile[] => {
    const hexTiles: HexTile[] = [];
    
    if (!backendMap || !Array.isArray(backendMap)) return hexTiles;
    
    for (let row = 0; row < backendMap.length; row++) {
      for (let col = 0; col < backendMap[row].length; col++) {
        const tile = backendMap[row][col];
        if (tile) {
          // Convert backend terrain types to BiomeType
          let biome: BiomeType = 'grass';
          switch (tile.terrain?.toLowerCase()) {
            case 'water': biome = 'water'; break;
            case 'forest': biome = 'forest'; break;
            case 'mountain': biome = 'mountain'; break;
            case 'desert': biome = 'desert'; break;
            case 'swamp': biome = 'swamp'; break;
            case 'snow': biome = 'snow'; break;
            default: biome = 'grass'; break;
          }
          
          // Convert row/col to hex coordinates (odd-q vertical layout)
          const q = col;
          const r = row - Math.floor(col / 2);
          
          hexTiles.push({
            q,
            r,
            biome,
            elevation: tile.elevation || Math.random() * 100,
            humidity: tile.humidity || Math.random() * 100,
            riverFlowDir: tile.riverFlowDir,
            naturalBarrier: tile.naturalBarrier || false
          });
        }
      }
    }
    
    console.log('🗺️ [TrueHeroesInterface] Converted', hexTiles.length, 'tiles to hex format');
    return hexTiles;
  };

  const hexTiles = convertToHexTiles(map);

  const handleTileClick = (position: Position) => {
    console.log('🎯 Tile clicked:', position);
    // Handle tile selection logic here
  };

  const handleTileHover = (tile: HexTile | null) => {
    console.log('🖱️ Hex tile hovered:', tile);
    // Handle tile hover logic here
  };

  const handleEndTurn = async () => {
    try {
      await endTurn();
      console.log('Turn ended successfully');
    } catch (error) {
      console.error('Error ending turn:', error);
    }
  };

  // Loading state - SIMPLIFIÉ pour éviter le blocage
  if (isLoading && !currentGame) {
    return (
      <div className="true-heroes-interface loading">
        <div className="loading-content">
          <h2>🎮 Heroes of Time</h2>
          <p>Interface Temporal Engine ready!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="true-heroes-interface">
      {/* Header */}
      <div className="interface-header game-header">
        <div className="header-left">
          <h1>🎮 Heroes of Time ⚔️</h1>
          <div className="game-info">
            <span>Turn: {currentGame?.turn || 1}</span>
            <span>Player: {currentPlayer?.name || 'Unknown'}</span>
            <span>Map: {hexTiles.length} tiles</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="control-buttons">
            <button 
              className={`control-btn ${activePanel === 'scenario' ? 'active' : ''}`}
              onClick={() => setActivePanel('scenario')}
              title="Scenario Info"
            >
              📋
            </button>
            <button 
              className={`control-btn ${activePanel === 'hero' ? 'active' : ''}`}
              onClick={() => setActivePanel('hero')}
              title="Hero Management"
            >
              ⚔️
            </button>
            <button 
              className={`control-btn ${activePanel === 'inventory' ? 'active' : ''}`}
              onClick={() => setActivePanel('inventory')}
              title="Inventory"
            >
              🎒
            </button>
            <button 
              className={`control-btn ${activePanel === 'castle' ? 'active' : ''}`}
              onClick={() => setActivePanel('castle')}
              title="Castle Management"
            >
              🏰
            </button>
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className="control-btn"
            onClick={() => setShowEpicContentViewer(true)}
            title="Epic Content - Heroes & Creatures"
          >
            🧟
          </button>
          <button 
            className="end-turn-btn"
            onClick={handleEndTurn}
            title="End Turn"
          >
            ⭐
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="interface-content">
        {/* Left Panel - Game Map */}
        <div className="left-panel">
          <ModernGameRenderer
            width={900}
            height={700}
            onTileClick={handleTileClick}
          />
        </div>
      </div>
    </div>
  );

        {/* Right Panel - Dynamic Content */}
        <div className="right-panel">
          {activePanel === 'scenario' && (
            <div className="panel-content">
              <h2>🏔️ Terrain System</h2>
              <div className="scenario-info">
                <h3>{currentGame?.scenario || 'Conquest Classic'}</h3>
                <p>🎯 <strong>Nouveau système de terrain hexagonal avancé</strong></p>
                <div className="scenario-stats">
                  <div>🗺️ Tiles: {hexTiles.length}</div>
                                      <div>🎲 Seed: {currentGame?.id ? hashCode(currentGame.id) : 12345}</div>
                  <div>🌍 Biomes: {new Set(hexTiles.map(t => t.biome)).size}</div>
                  <div>🏰 Players: {currentGame?.players?.length || 4}</div>
                </div>
                <div className="terrain-legend">
                  <h4>🌈 Biomes disponibles:</h4>
                  <div className="biome-list">
                    {Array.from(new Set(hexTiles.map(t => t.biome))).map(biome => (
                      <div key={biome} className="biome-item">
                        {biome === 'forest' && '🌲'} 
                        {biome === 'water' && '🌊'} 
                        {biome === 'mountain' && '⛰️'} 
                        {biome === 'desert' && '🏜️'} 
                        {biome === 'grass' && '🌱'} 
                        {biome === 'swamp' && '🐸'} 
                        {biome === 'snow' && '❄️'} 
                        {biome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'hero' && (
            <div className="panel-content">
              <h2>Hero Management</h2>
              <div className="hero-list">
                {currentPlayer?.heroes?.map((hero: any) => (
                  <div 
                    key={hero.id} 
                    className={`hero-card ${selectedHero?.id === hero.id ? 'selected' : ''}`}
                    onClick={() => handleHeroSelect(hero)}
                  >
                    <div className="hero-avatar">👤</div>
                    <div className="hero-info">
                      <h4>{hero.name}</h4>
                      <p>Level {hero.level}</p>
                      <p>Class: {hero.class}</p>
                    </div>
                  </div>
                )) || <p>No heroes available</p>}
              </div>
            </div>
          )}

          {activePanel === 'inventory' && (
            <div className="panel-content">
              <h2>Inventory</h2>
              <div className="inventory-grid">
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
              </div>
            </div>
          )}

          {activePanel === 'castle' && (
            <div className="panel-content">
              <CastleManagementPanel 
                gameId={currentGame?.id || ''}
                playerId={currentPlayer?.id || ''}
                onClose={() => setActivePanel('scenario')}
              />
            </div>
          )}
        </div>

        {/* Right side - Enhanced Sidebar */}
        <div className="right-sidebar">
          <div className="sidebar-header">
            <div className="game-info">
              <span className="turn-counter">Turn {currentGame?.turn || 1}</span>
              <span className="resources">💰 {currentPlayer?.resources?.gold || 1500}</span>
            </div>
            <div className="sidebar-controls">
              <button 
                className={`sidebar-tab ${activePanel === 'scenario' ? 'active' : ''}`}
                onClick={() => setActivePanel('scenario')}
                title="Scenario"
              >
                🏔️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'fog' ? 'active' : ''}`}
                onClick={() => setActivePanel('fog')}
                title="Brouillard de Causalité"
              >
                🌫️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'hero' ? 'active' : ''}`}
                onClick={() => setActivePanel('hero')}
                title="Hero"
              >
                ⚔️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'castle' ? 'active' : ''}`}
                onClick={() => setActivePanel('castle')}
                title="Castle"
              >
                🏰
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'inventory' ? 'active' : ''}`}
                onClick={() => setActivePanel('inventory')}
                title="Inventory"
              >
                🎒
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'script' ? 'active' : ''}`}
                onClick={() => setActivePanel('script')}
                title="Script Editor"
              >
                🧪
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'epic' ? 'active' : ''}`}
                onClick={() => setActivePanel('epic')}
                title="Epic Content"
              >
                🌟
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'quantum' ? 'active' : ''}`}
                onClick={() => setActivePanel('quantum')}
                title="Quantum Convergence"
              >
                🌀
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            {activePanel === 'scenario' && (
              <div className="panel-content scenario-panel">
                <div className="panel-header">
                  <h3>🏔️ Scenario</h3>
                </div>
                <div className="scenario-info">
                  <h4>{currentGame?.scenario || 'Conquest Classic'}</h4>
                  <p>Welcome to Heroes of Time!</p>
                  
                  {/* Sélecteur de mode terrain */}
                  <TerrainModeSelector 
                    currentMode={terrainMode}
                    onModeChange={setTerrainMode}
                    disabled={isLoading}
                  />
                  
                  <div className="scenario-stats">
                    <div>Turn: {currentGame?.turn || 1}</div>
                    <div>Player: {currentPlayer?.name || 'Player 1'}</div>
                    <div>Heroes: {mockHeroes.length}</div>
                    <div>Gold: {currentPlayer?.resources?.gold || 1500}</div>
                  </div>
                  
                  {/* Contrôles du jeu */}
                  <div className="game-controls">
                    <button 
                      className="end-turn-btn"
                      onClick={handleEndTurn}
                      disabled={isLoading}
                    >
                      ⭐ End Turn
                    </button>
                    <button 
                      className="test-mode-btn"
                      onClick={() => setTestMode(!testMode)}
                    >
                      🔧 Test Mode
                    </button>
                  </div>

                  {/* Goldorak Easter Egg */}
                  <div className="easter-egg-section">
                    <button
                      className="goldorak-btn"
                      onClick={() => setShowGoldorakEasterEgg(true)}
                    >
                      🚀 Goldorak Easter Egg
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BROUILLARD DE CAUSALITÉ ULTRA-DISCRET */}
            {activePanel === 'fog' && (
              <div className="panel-content fog-panel-compact">
                <div className="panel-header-mini">
                  <h4>🌫️ Causalité</h4>
                </div>
                <div className="fog-ultra-compact">
                  {/* Barre de Timeline Minimaliste */}
                  <div className="timeline-mini">
                    <div className="timeline-bar-mini">
                      <div className="timeline-progress-mini" style={{width: '67%'}}></div>
                    </div>
                    <div className="timeline-text-mini">T67 🎯</div>
                  </div>

                  {/* Zones Super Compactes */}
                  <div className="zones-ultra-mini">
                    <div className="zone-dot zone-clear" title="Claire: 72%">●</div>
                    <div className="zone-dot zone-shadow" title="Ombre: 15%">●</div>
                    <div className="zone-dot zone-fog" title="Brouillard: 10%">●</div>
                    <div className="zone-dot zone-void" title="Vide: 3%">●</div>
                  </div>

                  {/* Indicateurs Ultra-Compacts */}
                  <div className="indicators-mini">
                    <div className="mini-stat" title="Visibilité">👁️72%</div>
                    <div className="mini-stat" title="Stabilité">⚡85%</div>
                  </div>
                </div>
              </div>
            )}
            
            {activePanel === 'hero' && (
              <div className="panel-content hero-panel">
                <div className="panel-header">
                  <h3>⚔️ Heroes</h3>
                </div>
                <div className="heroes-list">
                  {mockHeroes.map((hero) => (
                    <EnhancedHeroDisplay
                      key={hero.id}
                      hero={hero}
                      isSelected={selectedHero?.id === hero.id}
                      onSelect={(hero: any) => console.log('Hero selected:', hero)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {activePanel === 'castle' && (
              <div className="panel-content castle-panel">
                <div className="panel-header">
                  <h3>🏰 Castle</h3>
                </div>
                <div className="enhanced-panel">
                  <h4>Castle Management</h4>
                  <div className="castle-stats">
                    <div>📊 Population: 2,450</div>
                    <div>🏭 Buildings: 12</div>
                    <div>⚔️ Garrison: 500</div>
                    <div>🛡️ Defense: 85%</div>
                  </div>
                  <div className="castle-actions">
                    <button className="action-btn">Build Structure</button>
                    <button className="action-btn">Recruit Army</button>
                    <button className="action-btn">Manage Resources</button>
                  </div>
                </div>
              </div>
            )}
            
            {activePanel === 'inventory' && (
              <div className="panel-content inventory-panel">
                <div className="panel-header">
                  <h3>🎒 Inventory</h3>
                </div>
                <div className="enhanced-panel">
                  <h4>Hero Equipment</h4>
                  <div className="equipment-grid">
                    <div className="equipment-slot">
                      <div className="slot-icon">⚔️</div>
                      <div className="slot-name">Weapon</div>
                      <div className="slot-item">Sword of Valor</div>
                    </div>
                    <div className="equipment-slot">
                      <div className="slot-icon">🛡️</div>
                      <div className="slot-name">Shield</div>
                      <div className="slot-item">Shield of Protection</div>
                    </div>
                    <div className="equipment-slot">
                      <div className="slot-icon">👑</div>
                      <div className="slot-name">Helmet</div>
                      <div className="slot-item">Crown of Wisdom</div>
                    </div>
                    <div className="equipment-slot">
                      <div className="slot-icon">💍</div>
                      <div className="slot-name">Ring</div>
                      <div className="slot-item">Ring of Power</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCRIPT EDITOR INTÉGRÉ */}
            {activePanel === 'script' && (
              <div className="panel-content script-panel">
                <div className="panel-header">
                  <h3>🧪 Script Editor</h3>
                </div>
                <div className="script-editor-container">
                  <div className="script-editor-toolbar">
                    <button className="script-btn" onClick={() => setScriptContent(SCRIPT_TEMPLATES.hero)}>New Hero</button>
                    <button className="script-btn" onClick={() => setScriptContent(SCRIPT_TEMPLATES.castle)}>New Castle</button>
                    <button className="script-btn" onClick={() => setScriptContent(SCRIPT_TEMPLATES.combat)}>Combat</button>
                    <button className="script-btn" onClick={() => executeScript()}>▶️ Run</button>
                    <button className="script-btn" onClick={() => setScriptResults('')}>🗑️ Clear</button>
                  </div>
                  <textarea 
                    className="script-textarea"
                    placeholder="Enter your Heroes of Time script here..."
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                  />
                  {scriptResults && (
                    <div className="script-results">
                      <h4>📋 Results:</h4>
                      <pre>{scriptResults}</pre>
                    </div>
                  )}
                  <div className="script-help">
                    <h4>⚡ Available Commands:</h4>
                    <div className="command-list">
                      <div className="command-item">
                        <strong>createHero(name, class, level)</strong> - Create a new hero
                      </div>
                      <div className="command-item">
                        <strong>moveHero(heroId, x, y)</strong> - Move hero to position
                      </div>
                      <div className="command-item">
                        <strong>buildCastle(x, y, type)</strong> - Build castle at position
                      </div>
                      <div className="command-item">
                        <strong>recruitUnit(castleId, unitType, count)</strong> - Recruit units
                      </div>
                      <div className="command-item">
                        <strong>endTurn()</strong> - End current player turn
                      </div>
                      <div className="command-item">
                        <strong>getGameState()</strong> - Get current game state
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EPIC CONTENT INTÉGRÉ */}
            {activePanel === 'epic' && (
              <div className="panel-content epic-panel">
                <div className="panel-header">
                  <h3>🌟 Epic Content - Game Assets</h3>
                </div>
                <div className="enhanced-panel">
                  <h4>Assets Restaurés par Memento</h4>
                  <div className="scenario-stats epic-stats">
                    <div>🦸 Héros: Arthur, Anna, Morgana...</div>
                    <div>🐉 Créatures: Dragons, Quantum beings...</div>
                    <div>🏰 Bâtiments: Châteaux, Forteresses...</div>
                    <div>⚔️ Artefacts: Armes, Armures, Anneaux...</div>
                  </div>
                  <div className="epic-actions">
                    <button 
                      className="action-btn epic-viewer-btn"
                      onClick={() => setShowEpicContentViewer(true)}
                    >
                      🔍 Ouvrir Visualisateur d'Assets
                    </button>
                    <p style={{ fontSize: '12px', color: '#ccc', marginTop: '10px' }}>
                      ✅ Chargement direct depuis game_assets/<br/>
                      📊 {mockEpicContent.length} objets épiques disponibles
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* QUANTUM CONVERGENCE PANEL */}
            {activePanel === 'quantum' && (
              <div className="panel-content quantum-panel">
                <div className="panel-header">
                  <h3>🌀 Quantum Convergence</h3>
                </div>
                <div className="quantum-content">
                  <BoseConvergenceVisualizer />
                  <div style={{ marginTop: '20px' }}>
                    <QuantumBridgeVisualizer />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Epic Content Viewer */}
      <EpicContentViewer 
        isVisible={showEpicContentViewer} 
        onClose={() => setShowEpicContentViewer(false)} 
      />

      {/* 🚀 GOLDORAK EASTER EGG - Tapez G-O-L-D-O-R-A-K pour l'activer! */}
      <GoldorakEasterEgg 
        isActive={showGoldorakEasterEgg} 
        onClose={() => setShowGoldorakEasterEgg(false)} 
      />
    </div>
  );
};

export default TrueHeroesInterface; 