# 🎮 GUIDE D'INTÉGRATION : L'INTERSTICE FINANCIER

## Vue d'ensemble

Ce guide explique comment intégrer le système économique parallèle de la Banano™, le personnage Vince, le monde Wall Street Omega et l'entité McKinsey dans Heroes of Time and Magic.

## 1. Architecture technique

### Système économique parallèle

```python
# Pseudo-code pour le système Banano
class BananoSystem:
    def __init__(self):
        self.hidden_inventory = {}  # Séparé de l'inventaire normal
        self.max_carry = 42
        self.volatility = 0.3
        
    def detect_bananos(self, player):
        # Seuls certains personnages peuvent voir les Bananos
        if player.has_trait("economic_vision") or player.near_entity("vince"):
            return self.hidden_inventory.get(player.id, [])
        return []
```

### Intégration dans le moteur existant

1. **Inventaire caché** : Créer un système d'inventaire parallèle non visible dans l'UI standard
2. **Détection conditionnelle** : Implémenter des conditions pour voir/interagir avec les Bananos
3. **Économie volatile** : Système de prix dynamiques basé sur des événements aléatoires

## 2. Implémentation de Vince

### Spawn et comportement

```json
{
  "spawn_triggers": [
    "player_finds_first_banano",
    "economic_anomaly_detected",
    "wall_street_omega_proximity"
  ],
  "ai_behavior": {
    "type": "erratic_trader",
    "dialogue_style": "financial_jargon",
    "movement": "hyperactive",
    "special": "can_phase_between_worlds"
  }
}
```

### Système de dialogue dynamique

Vince doit avoir des dialogues qui :
- Référencent des métriques économiques aléatoires
- Changent selon la "volatilité" actuelle
- Proposent des "deals" impossibles

## 3. Wall Street Omega - Monde fractal

### Génération procédurale

```python
class WallStreetOmega:
    def generate_zone(self):
        # Architecture qui change selon le marché
        if self.market_status == "bull":
            return self.generate_ascending_towers()
        elif self.market_status == "bear":
            return self.generate_collapsing_structures()
        else:
            return self.generate_chaos_architecture()
```

### Événements temporels

- **15h47 Crash** : Timer global qui déclenche des changements physiques
- **Margin Calls** : Système d'interruption aléatoire avec mini-jeu de dialogue
- **IPO Fantômes** : Opportunités d'investissement générées procéduralement

## 4. Mécaniques de gameplay

### Utilisation des Bananos

1. **Activation mentale** : Pas de bouton d'utilisation direct, activation contextuelle
2. **Effets imprévisibles** : Table d'effets aléatoires avec biais vers le chaos
3. **Corruption possible** : Les Bananos peuvent "muter" dans l'inventaire

### Combat économique

```python
class EconomicCombat:
    def calculate_damage(self, attacker, defender):
        base_damage = attacker.attack
        
        # La volatilité affecte les dégâts
        volatility_modifier = random.uniform(0.5, 2.0) * self.current_volatility
        
        # Les Bananos peuvent inverser les dégâts
        if attacker.has_banano() and random.random() < 0.1:
            return -base_damage * volatility_modifier  # Soigne au lieu de blesser
            
        return base_damage * volatility_modifier
```

## 5. Intégration de McKinsey

### Système d'audit permanent

```python
class McKinseyAudit:
    def __init__(self):
        self.metrics = {
            "combat_efficiency": 0,
            "resource_optimization": 0,
            "narrative_compliance": 0,
            "profit_generation": 0
        }
        
    def evaluate_player_action(self, action):
        # McKinsey juge TOUT
        efficiency = self.calculate_efficiency(action)
        if efficiency < 0.7:
            self.trigger_optimization_event()
```

### Manifestations

1. **Consultants PNJ** : Apparition aléatoire, donnent des "conseils" dangereux
2. **Restructuration de zone** : McKinsey peut "optimiser" une zone, la rendant plus efficace mais moins fun
3. **Backdoor access** : Certains joueurs peuvent trouver le badge McKinsey

## 6. Quêtes et progression

### Ligne de quête principale : "Le Dividende Cosmique"

1. **Acte 1** : Découverte de la première Banano
2. **Acte 2** : Rencontre avec Vince, apprentissage du système
3. **Acte 3** : Accès à Wall Street Omega
4. **Acte 4** : Confrontation avec l'influence de McKinsey
5. **Acte 5** : Choix final - Devenir Créditeur Universel ou détruire le système

### Quêtes secondaires

- **"Portfolio Diversifié"** : Collecter tous les types de Bananos
- **"Hostile Takeover"** : Conquérir une Tour Algorithmique
- **"Due Diligence"** : Enquêter sur la vraie nature de McKinsey
- **"Exit Strategy"** : Trouver toutes les sorties de Wall Street Omega

## 7. Équilibrage

### Risques et récompenses

- **Risques** : Corruption, perte d'identité, dettes interdimensionnelles
- **Récompenses** : Accès à du contenu unique, pouvoirs économiques, fins alternatives

### Limitation des abus

- Maximum 42 Bananos (au-delà = conséquences)
- Cooldowns sur les utilisations
- Effets négatifs aléatoires pour équilibrer

## 8. Interface utilisateur

### Indicateurs cachés

- **Compteur de Bananos** : Visible uniquement dans certaines conditions
- **Indicateur de volatilité** : Affecte subtilement l'UI
- **Alertes McKinsey** : Messages cryptiques occasionnels

### Easter eggs

- Konami code dans Wall Street Omega = vision du "vrai" marché
- Nommer son personnage "Satoshi" = dialogue spécial avec Vince
- Atteindre -999999 d'or = achievement "Trop Gros Pour Échouer"

## 9. Considérations techniques

### Performance

- Wall Street Omega doit être une instance séparée (trop de calculs)
- Limiter les entités économiques actives simultanément
- Système de LOD pour les gratte-ciels infinis

### Sauvegarde

- Les Bananos doivent être sauvegardées séparément (anti-cheat)
- État de Wall Street Omega persistant entre sessions
- Métriques McKinsey globales (affectent tous les joueurs)

## 10. Futur contenu

### Extensions possibles

1. **"The Goldman Patch"** : Nouveau boss dragon doré
2. **"Crypto Winter"** : Événement saisonnier où les Bananos gèlent
3. **"The Lehman Legacy"** : Donjon dans les ruines de Wall Street Alpha
4. **"McKinsey Ascension"** : Permettre aux joueurs de devenir Consultants

### Intégration multijoueur

- Marché de Bananos entre joueurs
- Raids sur Wall Street Omega
- Guildes de traders
- Guerres économiques entre factions

## Notes finales

Ce système est conçu pour :
- Ajouter une couche de méta-jeu complexe
- Commenter satiriquement sur l'économie réelle
- Créer des moments de chaos contrôlé
- Récompenser l'exploration et l'expérimentation

⚠️ **Rappel** : Ce système DOIT rester optionnel. Les joueurs peuvent totalement ignorer les Bananos et finir le jeu normalement. C'est pour les fous qui veulent aller plus loin.

*"Dans l'Interstice Financier, la seule règle est qu'il n'y a pas de règles. Sauf celles de McKinsey. Et on ne connaît pas les règles de McKinsey."*