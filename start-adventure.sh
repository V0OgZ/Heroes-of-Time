#!/bin/bash

# 🕰️ Heroes of Time - Start Adventure
# Script de lancement principal

echo "🕰️ HEROES OF TIME - L'Archive Vivante"
echo "====================================="
echo ""
echo "Redirection vers le menu principal..."
echo ""

# Lancer le menu principal
./hots

# Si hots n'existe pas ou erreur
if [ $? -ne 0 ]; then
    echo "❌ Erreur : Le script './hots' n'a pas pu être lancé."
    echo ""
    echo "Alternatives :"
    echo "  • ./hots start     - Lance tous les services"
    echo "  • ./hots morgana   - Lance l'interface Morgana (port 3000)"
    echo "  • ./hots help      - Affiche l'aide"
    exit 1
fi 