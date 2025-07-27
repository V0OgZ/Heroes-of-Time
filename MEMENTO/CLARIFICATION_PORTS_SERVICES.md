# 🎯 CLARIFICATION DES PORTS - GUIDE SIMPLE

## 📍 PORTS ACTIFS ACTUELLEMENT

| Port | Service | Description | URL |
|------|---------|-------------|-----|
| **3000** | 🔮 **MORGANA** | Interface React (la plus belle) | http://localhost:3000 |
| **8000** | 🔫 **VINCE DEMO** | Map simple avec gun | http://localhost:8000/vince-vega-map-demo-backend.html |
| **8002** | 👁️ **GRUT PANOPTICON** | Vision 6D omnisciente | http://localhost:8002 |
| **8080** | ⚙️ **BACKEND API** | Cerveau du système | http://localhost:8080 |

## ❌ PORTS PAS UTILISÉS
- **8001** : Était prévu pour GRUT mais déjà pris, donc GRUT est sur 8002
- **9000** : Pas actif actuellement

## 🚀 RÉSUMÉ SIMPLE

### Pour jouer :
- **Morgana (port 3000)** : L'interface moderne avec panneaux quantiques
- **Vince (port 8000)** : La démo simple avec la map et le gun

### Pour surveiller :
- **GRUT (port 8002)** : Voit tout ce qui se passe

### Le cerveau :
- **Backend (port 8080)** : Gère toute la logique du jeu

## 🎮 COMMANDES RAPIDES

```bash
# Ouvrir Morgana
open http://localhost:3000

# Ouvrir Vince Demo
open http://localhost:8000/vince-vega-map-demo-backend.html

# Ouvrir GRUT
open http://localhost:8002

# Vérifier le backend
curl http://localhost:8080/api/health
```

## 📝 NOTES
- Le port 8001 était demandé par GRUT mais déjà occupé, donc il a pris 8002
- Tous les services sont connectés au backend (8080)
- Seuls ces 4 ports sont actifs actuellement

---

**C'est tout ! 4 services, 4 ports, c'est simple !** 🎉 