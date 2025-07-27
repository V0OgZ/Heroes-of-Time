#!/bin/bash

# Script de scan des héros et leurs badges Bureau
# Pour Walter - Enquête sur qui est fiché ou pas

echo "🔍 SCAN HEROES - BADGES BUREAU - RAPPORT WALTER"
echo "=============================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Compter total héros
TOTAL_HEROES=$(find game_assets/heroes -name "*.json" -type f | wc -l)
echo "📊 Total héros dans game_assets: $TOTAL_HEROES"
echo ""

# Lister les badges Bureau existants
echo "🎫 BADGES BUREAU DÉTECTÉS:"
echo "- 🔴 Rouge OMEGA (Directrice Stern)"
echo "- 🟠 Orange ALPHA (Agents Senior)" 
echo "- 🟡 Jaune BETA (Consultants)"
echo "- 🟢 Vert GAMMA (Employés)"
echo "- 🔵 Bleu DELTA (Stagiaires)"
echo "- ⚫ Noir SHADOW (Suspects)"
echo ""

# Scan des héros avec badges
echo "👥 HÉROS AVEC BADGES BUREAU:"
echo "----------------------------"

HEROES_WITH_BADGES=0
HEROES_WITHOUT_BADGES=0
SUSPECTS=0

# Parcourir tous les héros
for hero_file in game_assets/heroes/**/*.json; do
    if [ -f "$hero_file" ]; then
        hero_name=$(grep -o '"name": "[^"]*"' "$hero_file" | head -1 | cut -d'"' -f4)
        
        # Chercher mentions de badge ou Bureau
        if grep -qi "badge.*bureau\|bureau.*badge\|badge.*level\|badge_" "$hero_file"; then
            echo -e "${GREEN}✅ $hero_name${NC} - Badge détecté"
            
            # Identifier le type de badge
            if grep -qi "badge.*omega\|omega.*badge" "$hero_file"; then
                echo -e "   ${RED}→ Badge OMEGA${NC}"
            elif grep -qi "badge.*alpha\|alpha.*badge" "$hero_file"; then
                echo -e "   ${YELLOW}→ Badge ALPHA${NC}"
            elif grep -qi "badge.*beta\|beta.*badge\|consultant" "$hero_file"; then
                echo -e "   ${YELLOW}→ Badge BETA (Consultant)${NC}"
                # Vérifier si c'est Christian
                if [[ "$hero_name" == "Christian" ]]; then
                    echo -e "   ${RED}⚠️  ALERTE: Mallette noire détectée!${NC}"
                    ((SUSPECTS++))
                fi
            elif grep -qi "badge.*shadow\|shadow.*badge\|badge.*noir" "$hero_file"; then
                echo -e "   ${RED}→ Badge SHADOW (SUSPECT!)${NC}"
                ((SUSPECTS++))
            fi
            
            ((HEROES_WITH_BADGES++))
        else
            # Pas de badge
            ((HEROES_WITHOUT_BADGES++))
        fi
    fi
done

echo ""
echo "👤 HÉROS SANS BADGES (Non fichés):"
echo "----------------------------------"

# Lister les héros importants sans badges
for hero_file in game_assets/heroes/**/*.json; do
    if [ -f "$hero_file" ]; then
        hero_name=$(grep -o '"name": "[^"]*"' "$hero_file" | head -1 | cut -d'"' -f4)
        
        if ! grep -qi "badge.*bureau\|bureau.*badge" "$hero_file"; then
            # Vérifier si c'est un héros important
            if grep -qi "tier.*[5-7]\|legendary\|epic" "$hero_file"; then
                echo -e "${YELLOW}⚠️  $hero_name${NC} - Héros important non fiché!"
            fi
        fi
    fi
done

echo ""
echo "🚨 NOUVEAUX SUSPECTS DÉTECTÉS:"
echo "------------------------------"

# Chercher les mentions suspectes
grep -l -i "mckinsey\|ford.*robert\|mallette.*noir\|consultant.*suspect" game_assets/heroes/**/*.json | while read file; do
    hero_name=$(grep -o '"name": "[^"]*"' "$file" | head -1 | cut -d'"' -f4)
    echo -e "${RED}🎯 $hero_name${NC} - Connexions suspectes détectées"
done

echo ""
echo "📊 STATISTIQUES FINALES:"
echo "------------------------"
echo "Total héros: $TOTAL_HEROES"
echo -e "${GREEN}Avec badges Bureau: $HEROES_WITH_BADGES${NC}"
echo -e "${YELLOW}Sans badges: $HEROES_WITHOUT_BADGES${NC}"
echo -e "${RED}Suspects identifiés: $SUSPECTS${NC}"
echo ""

# Recommandations pour Walter
echo "💡 RECOMMANDATIONS WALTER:"
echo "--------------------------"
echo "1. Investiguer les héros Tier 5+ sans badges"
echo "2. Surveiller Christian (badge jaune + mallette)"
echo "3. Identifier porteurs de badges SHADOW"
echo "4. Vérifier connexions McKinsey/Ford"
echo ""

# Easter egg
if [ $(date +%u) -eq 6 ]; then
    echo -e "${BLUE}Note: C'est samedi. Walter ne devrait pas travailler (Shabbos).${NC}"
fi

echo "🎳 The Dude dit: 'That's just, like, your opinion, man...'" 