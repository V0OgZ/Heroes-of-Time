/**
 * Interface de Combat Hexagonale
 * Heroes of Time - Combat Tactique
 */

class CombatInterface {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.gridWidth = 8;
        this.gridHeight = 6;
        this.hexSize = 50;
        this.currentTurn = 'player';
        this.selectedUnit = null;
        this.possibleMoves = [];
        this.possibleAttacks = [];
        this.units = [];
        this.turnOrder = [];
        this.currentTurnIndex = 0;
        this.combatLog = [];
        
        this.init();
    }

    init() {
        this.createCombatLayout();
        this.createHexGrid();
        this.setupEventListeners();
        this.initializeUnits();
        this.startCombat();
    }

    createCombatLayout() {
        this.container.innerHTML = `
            <div class="combat-interface">
                <div class="combat-header">
                    <h2>⚔️ Combat Tactique</h2>
                    <div class="turn-indicator">
                        Tour: <span id="currentTurn">Joueur</span>
                    </div>
                </div>
                
                <div class="combat-main">
                    <div class="battlefield-container">
                        <canvas id="combatCanvas" width="600" height="400"></canvas>
                        <div class="hex-overlay" id="hexOverlay"></div>
                    </div>
                    
                    <div class="combat-sidebar">
                        <div class="unit-info" id="unitInfo">
                            <h3>Unité Sélectionnée</h3>
                            <div id="unitDetails">Aucune unité sélectionnée</div>
                        </div>
                        
                        <div class="turn-order" id="turnOrder">
                            <h3>Ordre d'Initiative</h3>
                            <div id="turnOrderList"></div>
                        </div>
                        
                        <div class="combat-actions">
                            <button class="action-btn" id="moveBtn" onclick="combatInterface.setMode('move')">
                                🦶 Déplacer
                            </button>
                            <button class="action-btn" id="attackBtn" onclick="combatInterface.setMode('attack')">
                                ⚔️ Attaquer
                            </button>
                            <button class="action-btn" id="defendBtn" onclick="combatInterface.defend()">
                                🛡️ Défendre
                            </button>
                            <button class="action-btn" id="endTurnBtn" onclick="combatInterface.endTurn()">
                                ⏭️ Fin du Tour
                            </button>
                        </div>
                        
                        <div class="combat-log" id="combatLog">
                            <h3>Journal de Combat</h3>
                            <div id="logContent"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('combatCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.hexOverlay = document.getElementById('hexOverlay');
    }

    createHexGrid() {
        // Calcul des dimensions hexagonales
        const hexHeight = Math.sqrt(3) * this.hexSize;
        const hexWidth = 2 * this.hexSize;
        const vertDist = hexHeight * 3/4;
        
        this.hexGrid = [];
        
        for (let row = 0; row < this.gridHeight; row++) {
            this.hexGrid[row] = [];
            for (let col = 0; col < this.gridWidth; col++) {
                const offsetX = row % 2 === 0 ? 0 : hexWidth / 2;
                const x = col * hexWidth + offsetX + hexWidth;
                const y = row * vertDist + hexHeight;
                
                this.hexGrid[row][col] = {
                    x: x,
                    y: y,
                    row: row,
                    col: col,
                    terrain: this.getRandomTerrain(),
                    unit: null,
                    highlighted: false,
                    attackHighlight: false
                };
            }
        }
        
        this.drawGrid();
    }

    getRandomTerrain() {
        const terrains = ['grass', 'forest', 'hill', 'water'];
        const weights = [60, 20, 15, 5];
        const random = Math.random() * 100;
        let sum = 0;
        
        for (let i = 0; i < terrains.length; i++) {
            sum += weights[i];
            if (random < sum) return terrains[i];
        }
        return 'grass';
    }

    drawGrid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner chaque hexagone
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                const hex = this.hexGrid[row][col];
                this.drawHex(hex);
            }
        }
        
        // Dessiner les unités
        this.units.forEach(unit => {
            if (unit.hp > 0) {
                this.drawUnit(unit);
            }
        });
    }

    drawHex(hex) {
        const { x, y } = hex;
        
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + this.hexSize * Math.cos(angle);
            const hy = y + this.hexSize * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(hx, hy);
            } else {
                this.ctx.lineTo(hx, hy);
            }
        }
        this.ctx.closePath();
        
        // Couleur selon le terrain
        const terrainColors = {
            grass: '#4a7c59',
            forest: '#2d5016',
            hill: '#8b7355',
            water: '#4682b4'
        };
        
        this.ctx.fillStyle = terrainColors[hex.terrain] || '#4a7c59';
        
        if (hex.highlighted) {
            this.ctx.fillStyle = 'rgba(100, 200, 100, 0.5)';
        }
        if (hex.attackHighlight) {
            this.ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
        }
        
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawUnit(unit) {
        const hex = this.hexGrid[unit.row][unit.col];
        if (!hex) return;
        
        const { x, y } = hex;
        
        // Cercle pour l'unité
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.hexSize * 0.6, 0, Math.PI * 2);
        this.ctx.fillStyle = unit.team === 'player' ? '#4169e1' : '#dc143c';
        this.ctx.fill();
        this.ctx.strokeStyle = unit === this.selectedUnit ? '#ffd700' : '#000';
        this.ctx.lineWidth = unit === this.selectedUnit ? 4 : 2;
        this.ctx.stroke();
        
        // Icône de l'unité
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(unit.icon, x, y);
        
        // Barre de vie
        const barWidth = this.hexSize;
        const barHeight = 6;
        const barY = y + this.hexSize * 0.7;
        
        // Fond de la barre
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(x - barWidth/2, barY, barWidth, barHeight);
        
        // Vie actuelle
        const hpPercent = unit.hp / unit.maxHp;
        this.ctx.fillStyle = hpPercent > 0.5 ? '#4caf50' : hpPercent > 0.25 ? '#ff9800' : '#f44336';
        this.ctx.fillRect(x - barWidth/2, barY, barWidth * hpPercent, barHeight);
    }

    initializeUnits() {
        // Unités du joueur
        this.units.push(
            {
                id: 'hero1',
                name: 'Chevalier',
                icon: '⚔️',
                team: 'player',
                row: 2,
                col: 1,
                hp: 100,
                maxHp: 100,
                attack: 25,
                defense: 15,
                speed: 3,
                range: 1,
                moved: false,
                acted: false
            },
            {
                id: 'hero2',
                name: 'Archer',
                icon: '🏹',
                team: 'player',
                row: 3,
                col: 1,
                hp: 80,
                maxHp: 80,
                attack: 20,
                defense: 10,
                speed: 4,
                range: 3,
                moved: false,
                acted: false
            },
            {
                id: 'hero3',
                name: 'Mage',
                icon: '🧙',
                team: 'player',
                row: 4,
                col: 0,
                hp: 60,
                maxHp: 60,
                attack: 30,
                defense: 5,
                speed: 2,
                range: 2,
                moved: false,
                acted: false
            }
        );
        
        // Unités ennemies
        this.units.push(
            {
                id: 'enemy1',
                name: 'Gobelin',
                icon: '👺',
                team: 'enemy',
                row: 2,
                col: 6,
                hp: 50,
                maxHp: 50,
                attack: 15,
                defense: 5,
                speed: 4,
                range: 1,
                moved: false,
                acted: false
            },
            {
                id: 'enemy2',
                name: 'Orc',
                icon: '👹',
                team: 'enemy',
                row: 3,
                col: 6,
                hp: 80,
                maxHp: 80,
                attack: 20,
                defense: 10,
                speed: 3,
                range: 1,
                moved: false,
                acted: false
            },
            {
                id: 'enemy3',
                name: 'Troll',
                icon: '🧟',
                team: 'enemy',
                row: 4,
                col: 7,
                hp: 120,
                maxHp: 120,
                attack: 25,
                defense: 20,
                speed: 2,
                range: 1,
                moved: false,
                acted: false
            }
        );
        
        // Placer les unités sur la grille
        this.units.forEach(unit => {
            if (this.hexGrid[unit.row] && this.hexGrid[unit.row][unit.col]) {
                this.hexGrid[unit.row][unit.col].unit = unit;
            }
        });
        
        // Calculer l'ordre d'initiative
        this.calculateTurnOrder();
    }

    calculateTurnOrder() {
        this.turnOrder = [...this.units]
            .filter(unit => unit.hp > 0)
            .sort((a, b) => b.speed - a.speed);
        this.updateTurnOrderDisplay();
    }

    updateTurnOrderDisplay() {
        const turnOrderList = document.getElementById('turnOrderList');
        turnOrderList.innerHTML = this.turnOrder.map((unit, index) => `
            <div class="turn-order-item ${index === this.currentTurnIndex ? 'active' : ''}">
                <span class="unit-icon">${unit.icon}</span>
                <span class="unit-name">${unit.name}</span>
                <span class="unit-speed">Vit: ${unit.speed}</span>
            </div>
        `).join('');
    }

    startCombat() {
        this.addLog('⚔️ Combat commencé !', 'info');
        this.nextTurn();
    }

    nextTurn() {
        if (this.turnOrder.length === 0) return;
        
        const currentUnit = this.turnOrder[this.currentTurnIndex];
        this.selectUnit(currentUnit);
        
        // Réinitialiser les actions
        currentUnit.moved = false;
        currentUnit.acted = false;
        
        this.updateTurnIndicator(currentUnit);
        
        // Si c'est un ennemi, jouer automatiquement
        if (currentUnit.team === 'enemy') {
            setTimeout(() => this.playAITurn(currentUnit), 1000);
        }
        
        this.updateActionButtons();
    }

    updateTurnIndicator(unit) {
        document.getElementById('currentTurn').textContent = 
            `${unit.team === 'player' ? 'Joueur' : 'Ennemi'} - ${unit.name}`;
    }

    selectUnit(unit) {
        this.selectedUnit = unit;
        this.clearHighlights();
        this.updateUnitInfo();
        this.drawGrid();
    }

    updateUnitInfo() {
        const unitDetails = document.getElementById('unitDetails');
        if (this.selectedUnit) {
            unitDetails.innerHTML = `
                <div class="unit-stats">
                    <div>${this.selectedUnit.icon} ${this.selectedUnit.name}</div>
                    <div>HP: ${this.selectedUnit.hp}/${this.selectedUnit.maxHp}</div>
                    <div>ATK: ${this.selectedUnit.attack}</div>
                    <div>DEF: ${this.selectedUnit.defense}</div>
                    <div>VIT: ${this.selectedUnit.speed}</div>
                    <div>Portée: ${this.selectedUnit.range}</div>
                </div>
            `;
        } else {
            unitDetails.innerHTML = 'Aucune unité sélectionnée';
        }
    }

    setMode(mode) {
        this.mode = mode;
        this.clearHighlights();
        
        if (!this.selectedUnit || this.selectedUnit.team !== 'player') return;
        
        if (mode === 'move' && !this.selectedUnit.moved) {
            this.showMovementRange();
        } else if (mode === 'attack' && !this.selectedUnit.acted) {
            this.showAttackRange();
        }
        
        this.drawGrid();
    }

    showMovementRange() {
        const unit = this.selectedUnit;
        if (!unit) return;
        
        const visited = new Set();
        const queue = [{row: unit.row, col: unit.col, distance: 0}];
        
        while (queue.length > 0) {
            const {row, col, distance} = queue.shift();
            const key = `${row},${col}`;
            
            if (visited.has(key) || distance > unit.speed) continue;
            visited.add(key);
            
            if (this.isValidHex(row, col) && !this.hexGrid[row][col].unit) {
                this.hexGrid[row][col].highlighted = true;
            }
            
            // Ajouter les hexagones adjacents
            this.getAdjacentHexes(row, col).forEach(({row: r, col: c}) => {
                if (this.isValidHex(r, c) && this.canMoveThrough(r, c)) {
                    queue.push({row: r, col: c, distance: distance + 1});
                }
            });
        }
    }

    showAttackRange() {
        const unit = this.selectedUnit;
        if (!unit) return;
        
        const range = unit.range;
        
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                const distance = this.getHexDistance(unit.row, unit.col, row, col);
                if (distance <= range && distance > 0) {
                    const hex = this.hexGrid[row][col];
                    if (hex.unit && hex.unit.team !== unit.team) {
                        hex.attackHighlight = true;
                    }
                }
            }
        }
    }

    getAdjacentHexes(row, col) {
        const adjacents = [];
        const offsets = row % 2 === 0 ?
            [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]] :
            [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];
        
        offsets.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            if (this.isValidHex(newRow, newCol)) {
                adjacents.push({row: newRow, col: newCol});
            }
        });
        
        return adjacents;
    }

    getHexDistance(r1, c1, r2, c2) {
        const x1 = c1 - (r1 - (r1 & 1)) / 2;
        const z1 = r1;
        const y1 = -x1 - z1;
        
        const x2 = c2 - (r2 - (r2 & 1)) / 2;
        const z2 = r2;
        const y2 = -x2 - z2;
        
        return (Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2)) / 2;
    }

    isValidHex(row, col) {
        return row >= 0 && row < this.gridHeight && col >= 0 && col < this.gridWidth;
    }

    canMoveThrough(row, col) {
        const hex = this.hexGrid[row][col];
        return hex && hex.terrain !== 'water' && !hex.unit;
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasHover(e));
    }

    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const hex = this.getHexAtPoint(x, y);
        if (!hex) return;
        
        if (this.mode === 'move' && hex.highlighted) {
            this.moveUnit(this.selectedUnit, hex.row, hex.col);
        } else if (this.mode === 'attack' && hex.attackHighlight && hex.unit) {
            this.attackUnit(this.selectedUnit, hex.unit);
        } else if (hex.unit && hex.unit.team === 'player') {
            this.selectUnit(hex.unit);
        }
    }

    handleCanvasHover(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const hex = this.getHexAtPoint(x, y);
        this.canvas.style.cursor = hex && (hex.highlighted || hex.attackHighlight || hex.unit) ? 
            'pointer' : 'default';
    }

    getHexAtPoint(x, y) {
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                const hex = this.hexGrid[row][col];
                if (this.isPointInHex(x, y, hex.x, hex.y)) {
                    return hex;
                }
            }
        }
        return null;
    }

    isPointInHex(px, py, hx, hy) {
        const dx = Math.abs(px - hx);
        const dy = Math.abs(py - hy);
        return dx < this.hexSize && dy < this.hexSize * Math.sqrt(3)/2;
    }

    moveUnit(unit, toRow, toCol) {
        if (!unit || unit.moved) return;
        
        const fromHex = this.hexGrid[unit.row][unit.col];
        const toHex = this.hexGrid[toRow][toCol];
        
        if (!fromHex || !toHex || toHex.unit) return;
        
        // Animation de déplacement
        this.animateMovement(unit, unit.row, unit.col, toRow, toCol, () => {
            fromHex.unit = null;
            toHex.unit = unit;
            unit.row = toRow;
            unit.col = toCol;
            unit.moved = true;
            
            this.addLog(`${unit.icon} ${unit.name} se déplace`, 'move');
            this.clearHighlights();
            this.drawGrid();
            this.updateActionButtons();
        });
    }

    animateMovement(unit, fromRow, fromCol, toRow, toCol, callback) {
        const fromHex = this.hexGrid[fromRow][fromCol];
        const toHex = this.hexGrid[toRow][toCol];
        const frames = 20;
        let frame = 0;
        
        const animate = () => {
            frame++;
            const progress = frame / frames;
            
            // Interpolation linéaire
            unit.displayX = fromHex.x + (toHex.x - fromHex.x) * progress;
            unit.displayY = fromHex.y + (toHex.y - fromHex.y) * progress;
            
            this.drawGrid();
            
            if (frame < frames) {
                requestAnimationFrame(animate);
            } else {
                unit.displayX = null;
                unit.displayY = null;
                callback();
            }
        };
        
        animate();
    }

    attackUnit(attacker, defender) {
        if (!attacker || !defender || attacker.acted) return;
        
        const damage = Math.max(1, attacker.attack - defender.defense);
        defender.hp = Math.max(0, defender.hp - damage);
        
        attacker.acted = true;
        
        this.addLog(`${attacker.icon} ${attacker.name} attaque ${defender.icon} ${defender.name} pour ${damage} dégâts!`, 'attack');
        
        // Animation d'attaque
        this.animateAttack(attacker, defender, () => {
            if (defender.hp <= 0) {
                this.removeUnit(defender);
                this.addLog(`${defender.icon} ${defender.name} est vaincu!`, 'defeat');
            }
            
            this.clearHighlights();
            this.drawGrid();
            this.updateActionButtons();
            this.checkVictoryConditions();
        });
    }

    animateAttack(attacker, defender, callback) {
        const attackerHex = this.hexGrid[attacker.row][attacker.col];
        const defenderHex = this.hexGrid[defender.row][defender.col];
        
        // Flash rouge sur le défenseur
        const originalColor = this.ctx.fillStyle;
        let flashes = 3;
        
        const flash = () => {
            flashes--;
            defenderHex.flashColor = flashes % 2 === 0 ? 'rgba(255,0,0,0.5)' : null;
            this.drawGrid();
            
            if (flashes > 0) {
                setTimeout(flash, 100);
            } else {
                defenderHex.flashColor = null;
                callback();
            }
        };
        
        flash();
    }

    defend() {
        if (!this.selectedUnit || this.selectedUnit.team !== 'player') return;
        
        this.selectedUnit.defense += 5; // Bonus temporaire
        this.selectedUnit.acted = true;
        this.selectedUnit.moved = true;
        
        this.addLog(`${this.selectedUnit.icon} ${this.selectedUnit.name} se met en défense`, 'defend');
        this.updateActionButtons();
    }

    removeUnit(unit) {
        const hex = this.hexGrid[unit.row][unit.col];
        if (hex) hex.unit = null;
        
        const index = this.units.indexOf(unit);
        if (index > -1) this.units.splice(index, 1);
        
        this.calculateTurnOrder();
    }

    playAITurn(unit) {
        // IA simple : se rapprocher et attaquer
        const targets = this.units.filter(u => u.team === 'player' && u.hp > 0);
        if (targets.length === 0) return;
        
        // Trouver la cible la plus proche
        let closestTarget = null;
        let minDistance = Infinity;
        
        targets.forEach(target => {
            const distance = this.getHexDistance(unit.row, unit.col, target.row, target.col);
            if (distance < minDistance) {
                minDistance = distance;
                closestTarget = target;
            }
        });
        
        // Vérifier si on peut attaquer
        if (minDistance <= unit.range) {
            this.attackUnit(unit, closestTarget);
            setTimeout(() => this.endTurn(), 1000);
        } else {
            // Se déplacer vers la cible
            this.moveAIUnit(unit, closestTarget);
            setTimeout(() => {
                // Vérifier à nouveau si on peut attaquer après le déplacement
                const newDistance = this.getHexDistance(unit.row, unit.col, closestTarget.row, closestTarget.col);
                if (newDistance <= unit.range && !unit.acted) {
                    this.attackUnit(unit, closestTarget);
                    setTimeout(() => this.endTurn(), 1000);
                } else {
                    this.endTurn();
                }
            }, 1000);
        }
    }

    moveAIUnit(unit, target) {
        const possibleMoves = [];
        
        // Trouver tous les mouvements possibles
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                const distance = this.getHexDistance(unit.row, unit.col, row, col);
                if (distance <= unit.speed && this.canMoveThrough(row, col)) {
                    possibleMoves.push({row, col});
                }
            }
        }
        
        // Choisir le mouvement qui nous rapproche le plus de la cible
        let bestMove = null;
        let minDistance = this.getHexDistance(unit.row, unit.col, target.row, target.col);
        
        possibleMoves.forEach(move => {
            const distance = this.getHexDistance(move.row, move.col, target.row, target.col);
            if (distance < minDistance) {
                minDistance = distance;
                bestMove = move;
            }
        });
        
        if (bestMove) {
            this.moveUnit(unit, bestMove.row, bestMove.col);
        }
    }

    endTurn() {
        this.clearHighlights();
        this.mode = null;
        
        // Passer au prochain dans l'ordre d'initiative
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        
        // Si on a fait le tour complet, recalculer l'ordre
        if (this.currentTurnIndex === 0) {
            this.calculateTurnOrder();
            this.addLog('--- Nouveau Round ---', 'info');
        }
        
        this.drawGrid();
        this.nextTurn();
    }

    updateActionButtons() {
        const unit = this.selectedUnit;
        const isPlayerTurn = unit && unit.team === 'player';
        
        document.getElementById('moveBtn').disabled = !isPlayerTurn || unit.moved;
        document.getElementById('attackBtn').disabled = !isPlayerTurn || unit.acted;
        document.getElementById('defendBtn').disabled = !isPlayerTurn || unit.acted;
        document.getElementById('endTurnBtn').disabled = !isPlayerTurn;
    }

    clearHighlights() {
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                this.hexGrid[row][col].highlighted = false;
                this.hexGrid[row][col].attackHighlight = false;
            }
        }
    }

    checkVictoryConditions() {
        const playerUnits = this.units.filter(u => u.team === 'player' && u.hp > 0);
        const enemyUnits = this.units.filter(u => u.team === 'enemy' && u.hp > 0);
        
        if (playerUnits.length === 0) {
            this.endCombat('defeat');
        } else if (enemyUnits.length === 0) {
            this.endCombat('victory');
        }
    }

    endCombat(result) {
        if (result === 'victory') {
            this.addLog('🎉 Victoire! Vous avez gagné le combat!', 'victory');
            alert('Victoire! Vous avez gagné le combat!');
        } else {
            this.addLog('💀 Défaite... Vous avez perdu le combat.', 'defeat');
            alert('Défaite... Vous avez perdu le combat.');
        }
    }

    addLog(message, type = 'info') {
        const logContent = document.getElementById('logContent');
        const entry = document.createElement('div');
        entry.className = `log-entry log-${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
        
        // Limiter le nombre de logs
        while (logContent.children.length > 50) {
            logContent.removeChild(logContent.firstChild);
        }
    }
}

// Styles CSS intégrés
const combatStyles = `
<style>
.combat-interface {
    font-family: 'Georgia', serif;
    color: #333;
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
}

.combat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background: #333;
    color: white;
    border-radius: 5px;
}

.combat-main {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
}

.battlefield-container {
    position: relative;
    background: #2a2a2a;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

#combatCanvas {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}

.combat-sidebar {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.unit-info, .turn-order, .combat-log {
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.unit-info h3, .turn-order h3, .combat-log h3 {
    margin-top: 0;
    color: #333;
    border-bottom: 2px solid #4169e1;
    padding-bottom: 5px;
}

.unit-stats {
    display: grid;
    gap: 5px;
    font-size: 14px;
}

.unit-stats div {
    padding: 3px 0;
}

.turn-order-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px;
    margin: 5px 0;
    background: #f0f0f0;
    border-radius: 5px;
    transition: all 0.3s;
}

.turn-order-item.active {
    background: #4169e1;
    color: white;
    transform: scale(1.05);
}

.unit-icon {
    font-size: 20px;
}

.unit-speed {
    margin-left: auto;
    font-size: 12px;
    opacity: 0.7;
}

.combat-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.action-btn {
    padding: 10px;
    background: #4169e1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
}

.action-btn:hover:not(:disabled) {
    background: #5179f1;
    transform: translateY(-2px);
}

.action-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}

.combat-log {
    max-height: 200px;
    overflow-y: auto;
}

#logContent {
    font-size: 12px;
    font-family: 'Courier New', monospace;
}

.log-entry {
    padding: 2px 0;
    border-bottom: 1px solid #eee;
}

.log-move { color: #4169e1; }
.log-attack { color: #dc143c; }
.log-defend { color: #228b22; }
.log-defeat { color: #8b0000; }
.log-victory { color: #ffd700; font-weight: bold; }
.log-info { color: #666; }
</style>
`;

// Export pour utilisation
export default CombatInterface; 