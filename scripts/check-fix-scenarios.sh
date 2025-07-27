#!/bin/bash

# 🎮 Script de vérification et correction des scénarios .hots
# Vérifie que tous les scénarios ont les mots-clés requis

echo "🔍 VÉRIFICATION DES SCÉNARIOS HEROES OF TIME"
echo "==========================================="
echo ""

# Compter les scénarios
TOTAL=$(find game_assets/scenarios -name "*.hots" -type f | wc -l)
echo "📊 Total scénarios trouvés: $TOTAL"
echo ""

# Vérifier les scénarios sans mots-clés
echo "❌ Scénarios SANS mots-clés requis:"
echo "-----------------------------------"
MISSING=0
find game_assets/scenarios -name "*.hots" -type f | while read file; do
    if ! grep -q "WORLD:" "$file" || ! grep -q "MAP:" "$file"; then
        echo "  ⚠️  $(basename $file)"
        MISSING=$((MISSING + 1))
    fi
done

echo ""
echo "✅ Scénarios AVEC mots-clés complets:"
echo "------------------------------------"
find game_assets/scenarios -name "*.hots" -type f | while read file; do
    if grep -q "WORLD:" "$file" && grep -q "MAP:" "$file"; then
        WORLD=$(grep "WORLD:" "$file" | head -1 | cut -d: -f2 | xargs)
        MAP=$(grep "MAP:" "$file" | head -1 | cut -d: -f2 | xargs)
        echo "  ✓ $(basename $file) -> World: $WORLD, Map: $MAP"
    fi
done

echo ""
echo "🎮 MODES DE JEU DISPONIBLES:"
echo "============================"
echo ""

# Vérifier les services
echo "📡 État des services:"
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "  ✅ Backend Spring Boot: ACTIF (port 8080)"
else
    echo "  ❌ Backend Spring Boot: INACTIF"
fi

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "  ✅ Frontend React (Morgana): ACTIF (port 3000)"
else
    echo "  ⚠️  Frontend React (Morgana): INACTIF"
fi

if curl -s http://localhost:8002 > /dev/null 2>&1; then
    echo "  ✅ Panopticon GRUT: ACTIF (port 8002)"
else
    echo "  ⚠️  Panopticon GRUT: INACTIF"
fi

echo ""
echo "🎯 Modes de jeu supportés:"
echo "  1️⃣  DEMO - Scénarios prédéfinis (conquest-classic, mystique)"
echo "  2️⃣  AVENTURE - Mode histoire avec scénarios .hots"
echo "  3️⃣  MULTIJOUEUR - Sessions temps réel (WebSocket)"
echo "  4️⃣  IA - Ennemis contrôlés par AIService"

echo ""
echo "📋 Pour corriger les scénarios manquants:"
echo "  - Ajouter WORLD: [nom_du_monde]"
echo "  - Ajouter MAP: [nom_de_la_carte]"
echo "  - Optionnel: MODE: [adventure|battle|exploration]"

echo ""
echo "🚀 Pour lancer tout le système:"
echo "  ./hots start    # Lance tous les services"
echo "  ./hots morgana  # Lance Morgana sur port 3000"
echo "  ./hots grut     # Lance Panopticon GRUT" 