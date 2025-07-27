#!/bin/bash

# 🧪 Script de test pour tous les nouveaux scénarios
# Par Memento l'Archive Vivante

echo "🎮 TEST DE TOUS LES NOUVEAUX SCÉNARIOS"
echo "======================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Compteurs
TOTAL=0
SUCCESS=0
FAILED=0

# Fonction de test d'un scénario
test_scenario() {
    local file=$1
    local name=$2
    
    echo -e "${BLUE}📋 Test: $name${NC}"
    echo "   Fichier: $file"
    
    ((TOTAL++))
    
    # Vérifier que le fichier existe
    if [ ! -f "$file" ]; then
        echo -e "   ${RED}❌ ERREUR: Fichier non trouvé${NC}"
        ((FAILED++))
        return
    fi
    
    # Vérifier la syntaxe basique HOTS
    if grep -q "^## Configuration" "$file" && \
       grep -q "MAP_SIZE" "$file" && \
       grep -q "ψ[0-9]\+:" "$file"; then
        echo -e "   ${GREEN}✅ Syntaxe HOTS valide${NC}"
        
        # Compter les états quantiques
        local psi_count=$(grep -c "ψ[0-9]\+:" "$file")
        echo -e "   📊 États quantiques: $psi_count"
        
        # Vérifier les conditions de victoire
        if grep -q "VICTORY_CONDITION" "$file"; then
            echo -e "   ${GREEN}✅ Conditions de victoire définies${NC}"
        else
            echo -e "   ${YELLOW}⚠️  Pas de conditions de victoire${NC}"
        fi
        
        ((SUCCESS++))
    else
        echo -e "   ${RED}❌ ERREUR: Structure HOTS invalide${NC}"
        ((FAILED++))
    fi
    
    echo ""
}

# Tester les scénarios story mode
echo -e "${YELLOW}🎯 SCÉNARIOS STORY MODE${NC}"
echo "======================"
echo ""

test_scenario "scenarios/opus_awakening.hots" "Chapitre 1: Le Réveil d'OPUS"
test_scenario "scenarios/lamp_of_platon.hots" "Chapitre 2: La Lampe de Platon"
test_scenario "scenarios/interstice_exploration.hots" "Chapitre 3: L'Interstice"
test_scenario "scenarios/fourth_wall_battle.hots" "Chapitre 4: Bataille du 4ème Mur"
test_scenario "scenarios/final_convergence.hots" "Chapitre 6: Convergence Finale"

# Tester les scénarios épiques
echo -e "${YELLOW}🌟 SCÉNARIOS ÉPIQUES${NC}"
echo "==================="
echo ""

test_scenario "scenarios/episode_2_monde_vivant.hots" "Episode 2: Le Monde Vivant"
test_scenario "scenarios/grut_investigation_conspiracy.hots" "Investigation GRUT"
test_scenario "scenarios/bataille_finale_pistolet_vince.hots" "Bataille Finale Vince"
test_scenario "scenarios/initiation_laboratoire_quantique.hots" "Initiation Quantique"
test_scenario "scenarios/memento_archive_vivante.hots" "Memento Archive Vivante"

# Tester aussi Le Bureau
echo -e "${YELLOW}🏢 SCÉNARIOS EXISTANTS${NC}"
echo "====================="
echo ""

test_scenario "scenarios/le_bureau_investigation.hots" "Le Bureau Investigation"
test_scenario "game_assets/scenarios/hots/chapter_5_dark_tower.hots" "Chapitre 5: Tour Sombre"

# Résumé
echo ""
echo "======================================"
echo -e "${YELLOW}📊 RÉSUMÉ DES TESTS${NC}"
echo "======================================"
echo -e "Total testé    : ${TOTAL}"
echo -e "Réussis       : ${GREEN}${SUCCESS}${NC}"
echo -e "Échoués       : ${RED}${FAILED}${NC}"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 TOUS LES TESTS SONT PASSÉS !${NC}"
else
    echo ""
    echo -e "${RED}⚠️  Certains tests ont échoué${NC}"
fi

# Vérifier la cohérence avec StoryModeController
echo ""
echo -e "${YELLOW}🔍 VÉRIFICATION COHÉRENCE BACKEND${NC}"
echo "================================="

if [ -f "backend/src/main/java/com/example/demo/controller/StoryModeController.java" ]; then
    echo "Scénarios référencés dans StoryModeController :"
    grep -o '"[^"]*\.hots"' backend/src/main/java/com/example/demo/controller/StoryModeController.java | sort | uniq
else
    echo -e "${RED}❌ StoryModeController non trouvé${NC}"
fi

echo ""
echo "✨ Test terminé !" 