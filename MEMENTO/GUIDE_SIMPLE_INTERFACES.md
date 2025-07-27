# 🎮 GUIDE SIMPLE DES INTERFACES HEROES OF TIME

## 📍 LES 3 INTERFACES DISPONIBLES

### 1. 🔫 **VINCE DEMO** (Port 8000) - INTERFACE SIMPLE HTML
- **URL**: http://localhost:8000/vince-vega-map-demo-backend.html
- **Type**: HTML/CSS/JS simple (pas React)
- **Serveur**: Python http.server
- **Commande**: `cd frontend && python3 -m http.server 8000`
- **Utilité**: Interface de test rapide avec map 10x8, wormholes, pistolet Vince

### 2. 🔮 **MORGANA REACT** (Port 3000) - INTERFACE SOPHISTIQUÉE
- **URL**: http://localhost:3000
- **Type**: React avec TypeScript
- **Serveur**: React Scripts (npm)
- **Commande**: `cd frontend && npm start`
- **Utilité**: Interface complète avec panneaux, inventaire, quantum, etc.

### 3. 👁️ **GRUT PANOPTICON** (Port 8001 ou 8002) - DASHBOARD OMNISCIENT
- **URL**: http://localhost:8001 (ou 8002 si conflit)
- **Type**: React Vite
- **Serveur**: Vite
- **Commande**: `cd panopticon-grut-dashboard && npm run dev`
- **Utilité**: Vision omnisciente de GRUT, World State Graph

## 🔄 COMMENT PASSER D'UNE INTERFACE À L'AUTRE

### Option 1: OUVRIR DANS DES ONGLETS DIFFÉRENTS
1. Ouvre http://localhost:8000/vince-vega-map-demo-backend.html dans un onglet
2. Ouvre http://localhost:3000 dans un autre onglet
3. Ouvre http://localhost:8001 dans un troisième onglet

### Option 2: UTILISER LE MENU `./hots`
```bash
# Pour Vince Demo
./hots vince

# Pour Morgana React
./hots morgana

# Pour GRUT Panopticon
./hots grut
```

## ⚙️ LE BACKEND (Port 8080)
- **URL API**: http://localhost:8080
- **Type**: Spring Boot Java
- **Commande**: `cd backend && mvn spring-boot:run`
- **IMPORTANT**: TOUTES les interfaces utilisent le MÊME backend

## 🚀 DÉMARRAGE RAPIDE

### Tout démarrer d'un coup:
```bash
./hots start
```

### Démarrer individuellement:
```bash
# Backend (obligatoire)
./hots backend

# Puis choisir l'interface
./hots vince    # Pour l'interface simple
./hots morgana  # Pour React sophistiqué
./hots grut     # Pour le dashboard GRUT
```

## ❓ POURQUOI 3 INTERFACES ?

1. **Vince (8000)** = Jean aime la simplicité, interface minimaliste
2. **Morgana (3000)** = Interface moderne React pour les features avancées
3. **GRUT (8001)** = Dashboard spécial pour GRUT qui voit tout

## 🔧 EN CAS DE PROBLÈME

### "Port already in use"
```bash
./hots stop    # Arrête tout
./hots start   # Redémarre proprement
```

### Pour voir ce qui tourne:
```bash
./hots status
```

## 📝 RÉSUMÉ SIMPLE

- **8000** = Vince (HTML simple)
- **3000** = Morgana (React)
- **8001** = GRUT (Dashboard)
- **8080** = Backend (API)

**Toutes les interfaces parlent au même backend sur 8080!** 