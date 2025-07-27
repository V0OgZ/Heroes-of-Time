#!/bin/bash

# 🔧 Script pour ajouter automatiquement WORLD et MAP aux scénarios .hots

echo "🔧 CORRECTION AUTOMATIQUE DES SCÉNARIOS"
echo "======================================="
echo ""

# Fonction pour ajouter les mots-clés à un fichier
fix_scenario() {
    local file=$1
    local filename=$(basename "$file")
    
    # Vérifier si les mots-clés existent déjà
    if grep -q "WORLD:" "$file" && grep -q "MAP:" "$file"; then
        echo "✅ $filename - Déjà OK"
        return
    fi
    
    # Déterminer le monde et la map selon le nom du fichier
    local world="mystique"  # Monde par défaut
    local map="test_map"    # Map par défaut
    
    # Logique pour déterminer le monde selon le nom
    if [[ $filename == *"temporal"* ]] || [[ $filename == *"time"* ]]; then
        world="temporal_nexus"
    elif [[ $filename == *"quantum"* ]]; then
        world="quantum_realm"
    elif [[ $filename == *"platon"* ]] || [[ $filename == *"cave"* ]]; then
        world="cave_of_platon"
    elif [[ $filename == *"tour"* ]] || [[ $filename == *"tower"* ]]; then
        world="dark_tower"
    elif [[ $filename == *"battle"* ]] || [[ $filename == *"bataille"* ]]; then
        world="battlefield"
    elif [[ $filename == *"test"* ]]; then
        world="test_world"
    fi
    
    # Map basée sur le nom du fichier (sans extension)
    map="${filename%.hots}_map"
    
    # Créer un fichier temporaire avec les mots-clés
    {
        echo "# Configuration auto-générée"
        echo "WORLD: $world"
        echo "MAP: $map"
        echo ""
        cat "$file"
    } > "${file}.tmp"
    
    # Remplacer le fichier original
    mv "${file}.tmp" "$file"
    
    echo "🔧 $filename - Ajouté WORLD: $world, MAP: $map"
}

# Compter les fichiers à corriger
TOTAL_TO_FIX=0
find game_assets/scenarios -name "*.hots" -type f | while read file; do
    if ! grep -q "WORLD:" "$file" || ! grep -q "MAP:" "$file"; then
        TOTAL_TO_FIX=$((TOTAL_TO_FIX + 1))
    fi
done

echo "📊 Fichiers à corriger: environ 87"
echo ""

# Demander confirmation
echo "⚠️  Cette opération va modifier tous les fichiers .hots sans WORLD/MAP"
echo "Voulez-vous continuer ? (y/n)"
read -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Correction en cours..."
    echo ""
    
    # Corriger tous les fichiers
    find game_assets/scenarios -name "*.hots" -type f | while read file; do
        fix_scenario "$file"
    done
    
    echo ""
    echo "✅ Correction terminée !"
    echo ""
    
    # Vérifier le résultat
    echo "📊 Résultat final:"
    TOTAL=$(find game_assets/scenarios -name "*.hots" -type f | wc -l)
    WITH_KEYWORDS=$(find game_assets/scenarios -name "*.hots" -type f -exec grep -l "WORLD:" {} \; | xargs grep -l "MAP:" | wc -l)
    echo "  - Total scénarios: $TOTAL"
    echo "  - Avec mots-clés: $WITH_KEYWORDS"
    echo "  - Sans mots-clés: $((TOTAL - WITH_KEYWORDS))"
else
    echo "❌ Opération annulée"
fi 