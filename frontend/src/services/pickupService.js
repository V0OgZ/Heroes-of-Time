/**
 * Service de gestion des pickups d'objets
 * Heroes of Time - Système de ramassage d'items
 */

class PickupService {
    constructor() {
        this.droppedItems = [];
        this.pickupRange = 100; // Distance de ramassage en pixels
        this.autoPickup = true;
        this.pickupCallbacks = [];
    }

    /**
     * Fait dropper des items par une créature
     * @param {Object} creature - La créature qui meurt
     * @param {Object} position - Position {x, y} où dropper les items
     * @returns {Array} Liste des items droppés
     */
    dropItemsFromCreature(creature, position) {
        const drops = [];
        
        if (!creature.drops || !creature.drops.possibleDrops) {
            return drops;
        }

        // Vérifier le drop rate global
        if (Math.random() > creature.drops.dropRate) {
            return drops;
        }

        // Process chaque drop possible
        creature.drops.possibleDrops.forEach(dropConfig => {
            if (Math.random() <= dropConfig.chance) {
                // Calculer la quantité
                let quantity = 1;
                if (typeof dropConfig.quantity === 'string' && dropConfig.quantity.includes('-')) {
                    const [min, max] = dropConfig.quantity.split('-').map(Number);
                    quantity = Math.floor(Math.random() * (max - min + 1)) + min;
                } else if (typeof dropConfig.quantity === 'number') {
                    quantity = dropConfig.quantity;
                }

                // Créer l'item droppé
                const droppedItem = {
                    id: `drop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    itemId: dropConfig.itemId,
                    quantity: quantity,
                    position: {
                        x: position.x + (Math.random() - 0.5) * 50,
                        y: position.y + (Math.random() - 0.5) * 50
                    },
                    createdAt: Date.now(),
                    picked: false
                };

                this.droppedItems.push(droppedItem);
                drops.push(droppedItem);

                // Auto-cleanup après 5 minutes
                setTimeout(() => this.removeDroppedItem(droppedItem.id), 300000);
            }
        });

        return drops;
    }

    /**
     * Tente de ramasser un item
     * @param {Object} hero - Le héros qui ramasse
     * @param {String} itemId - ID de l'item droppé
     * @returns {Object|null} L'item ramassé ou null si échec
     */
    tryPickup(hero, itemId) {
        const droppedItem = this.droppedItems.find(item => item.id === itemId && !item.picked);
        
        if (!droppedItem) {
            return null;
        }

        // Vérifier la distance
        const distance = this.calculateDistance(hero.position, droppedItem.position);
        
        if (distance > this.pickupRange) {
            return null; // Trop loin
        }

        // Marquer comme ramassé
        droppedItem.picked = true;
        
        // Retirer de la liste
        this.droppedItems = this.droppedItems.filter(item => item.id !== itemId);
        
        // Notifier les callbacks
        this.notifyPickup(droppedItem, hero);
        
        return droppedItem;
    }

    /**
     * Ramasse automatiquement les items à proximité
     * @param {Object} hero - Le héros
     * @returns {Array} Liste des items ramassés
     */
    autoPickupNearby(hero) {
        if (!this.autoPickup) return [];
        
        const pickedItems = [];
        const nearbyItems = this.droppedItems.filter(item => {
            if (item.picked) return false;
            const distance = this.calculateDistance(hero.position, item.position);
            return distance <= this.pickupRange;
        });

        nearbyItems.forEach(item => {
            const picked = this.tryPickup(hero, item.id);
            if (picked) {
                pickedItems.push(picked);
            }
        });

        return pickedItems;
    }

    /**
     * Récupère tous les items droppés visibles
     * @param {Object} viewBounds - Limites de la vue {x, y, width, height}
     * @returns {Array} Items visibles
     */
    getVisibleDroppedItems(viewBounds) {
        return this.droppedItems.filter(item => {
            if (item.picked) return false;
            return item.position.x >= viewBounds.x &&
                   item.position.x <= viewBounds.x + viewBounds.width &&
                   item.position.y >= viewBounds.y &&
                   item.position.y <= viewBounds.y + viewBounds.height;
        });
    }

    /**
     * Applique les effets d'un item ramassé
     * @param {Object} hero - Le héros
     * @param {Object} itemData - Données de l'item
     * @param {Number} quantity - Quantité ramassée
     * @returns {Object} Effets appliqués
     */
    applyItemEffects(hero, itemData, quantity = 1) {
        const effects = {};
        
        if (!itemData.effect) return effects;

        // Appliquer chaque effet
        if (itemData.effect.hp) {
            const hpGained = itemData.effect.hp * quantity;
            hero.stats.health = Math.min(hero.stats.maxHealth, hero.stats.health + hpGained);
            effects.hp = hpGained;
        }

        if (itemData.effect.mp) {
            const mpGained = itemData.effect.mp * quantity;
            hero.stats.mana = Math.min(hero.stats.maxMana, hero.stats.mana + mpGained);
            effects.mp = mpGained;
        }

        if (itemData.effect.gold) {
            const goldGained = itemData.effect.gold * quantity;
            hero.gold = (hero.gold || 0) + goldGained;
            effects.gold = goldGained;
        }

        if (itemData.effect.exp) {
            const expGained = itemData.effect.exp * quantity;
            hero.experience = (hero.experience || 0) + expGained;
            effects.exp = expGained;
        }

        // Effets de buff temporaire
        if (itemData.effect.buffs) {
            effects.buffs = itemData.effect.buffs;
            // Les buffs devraient être gérés par un autre service
        }

        return effects;
    }

    /**
     * Ajoute un callback pour les événements de pickup
     * @param {Function} callback - Fonction à appeler lors d'un pickup
     */
    onPickup(callback) {
        this.pickupCallbacks.push(callback);
    }

    /**
     * Notifie tous les callbacks d'un pickup
     * @param {Object} item - Item ramassé
     * @param {Object} hero - Héros qui a ramassé
     */
    notifyPickup(item, hero) {
        this.pickupCallbacks.forEach(callback => {
            try {
                callback(item, hero);
            } catch (error) {
                console.error('Erreur dans callback pickup:', error);
            }
        });
    }

    /**
     * Calcule la distance entre deux positions
     * @param {Object} pos1 - Position {x, y}
     * @param {Object} pos2 - Position {x, y}
     * @returns {Number} Distance
     */
    calculateDistance(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos2.x - pos1.x, 2) + 
            Math.pow(pos2.y - pos1.y, 2)
        );
    }

    /**
     * Retire un item droppé
     * @param {String} itemId - ID de l'item
     */
    removeDroppedItem(itemId) {
        this.droppedItems = this.droppedItems.filter(item => item.id !== itemId);
    }

    /**
     * Nettoie tous les items droppés
     */
    clearAllDroppedItems() {
        this.droppedItems = [];
    }

    /**
     * Obtient les statistiques des drops
     * @returns {Object} Statistiques
     */
    getDropStatistics() {
        return {
            totalDropped: this.droppedItems.length,
            byType: this.droppedItems.reduce((acc, item) => {
                acc[item.itemId] = (acc[item.itemId] || 0) + 1;
                return acc;
            }, {}),
            oldestDrop: this.droppedItems.length > 0 ? 
                Math.min(...this.droppedItems.map(i => i.createdAt)) : null
        };
    }
}

// Export pour utilisation
export default PickupService;

// Configuration des items par défaut
export const DEFAULT_ITEMS = {
    // Potions
    potion_mineure: {
        name: 'Potion Mineure',
        icon: '🧪',
        description: 'Restaure 20 points de vie',
        effect: { hp: 20 },
        rarity: 'common',
        value: 10
    },
    potion_mana: {
        name: 'Potion de Mana',
        icon: '💙',
        description: 'Restaure 15 points de mana',
        effect: { mp: 15 },
        rarity: 'common',
        value: 15
    },
    
    // Cristaux
    cristal_temps_petit: {
        name: 'Petit Cristal de Temps',
        icon: '💎',
        description: 'Un fragment d\'énergie temporelle',
        effect: { mp: 10 },
        rarity: 'rare',
        value: 50
    },
    fragment_temporel: {
        name: 'Fragment Temporel',
        icon: '⏳',
        description: 'Accorde de l\'expérience bonus',
        effect: { exp: 20 },
        rarity: 'epic',
        value: 100
    },
    
    // Monnaie
    or: {
        name: 'Or',
        icon: '🪙',
        description: 'La monnaie du royaume',
        effect: { gold: 1 },
        rarity: 'common',
        value: 1
    },
    
    // Essences
    essence_bleue: {
        name: 'Essence Bleue',
        icon: '🔵',
        description: 'Essence magique pure',
        effect: { mp: 15 },
        rarity: 'rare',
        value: 75
    },
    
    // Items rares
    amulette_chance: {
        name: 'Amulette de Chance',
        icon: '🔮',
        description: 'Augmente les chances de drop',
        effect: { buffs: { dropRate: 1.5, duration: 300 } },
        rarity: 'epic',
        value: 200
    },
    elixir_force: {
        name: 'Élixir de Force',
        icon: '⚡',
        description: 'Augmente temporairement l\'attaque',
        effect: { buffs: { attack: 5, duration: 180 } },
        rarity: 'rare',
        value: 150
    }
};

// Fonction helper pour créer des effets visuels de pickup
export function createPickupEffect(position, itemRarity = 'common') {
    const colors = {
        common: '#ffffff',
        rare: '#4a90e2',
        epic: '#9932cc',
        legendary: '#ff6b6b'
    };
    
    return {
        type: 'pickup',
        position: position,
        color: colors[itemRarity] || colors.common,
        duration: 1000,
        particles: 10
    };
} 