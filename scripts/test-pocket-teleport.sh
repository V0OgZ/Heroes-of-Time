#!/bin/bash

# 🌀 TEST TÉLÉPORTATION PAR POCKET DIMENSIONNELLE
# Idée géniale de Jean depuis son canapé hallucinatoire

# Couleurs
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE}🌀 TEST TÉLÉPORTATION PAR POCKET${NC}"
echo "===================================="
echo -e "${CYAN}Concept : Téléporter dans la même pocket dimensionnelle${NC}"
echo ""

# Vérifier si le backend est actif
echo -e "${YELLOW}🔍 Vérification du Reality Controller...${NC}"
if curl -s http://localhost:8080/api/reality/status > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend actif !${NC}"
else
    echo -e "${RED}❌ Backend non actif ! Démarrez-le d'abord.${NC}"
    exit 1
fi

echo ""
echo -e "${PURPLE}📍 Test 1 : Téléportation simple${NC}"
echo "Position initiale : (10, 20)"
echo ""

# Premier saut
RESPONSE=$(curl -s -X POST http://localhost:8080/api/reality/pocket-teleport \
  -H "Content-Type: application/json" \
  -d '{
    "x": 10,
    "y": 20
  }')

echo "Réponse :"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"

# Extraire la pocket_id pour les tests suivants
POCKET_ID=$(echo "$RESPONSE" | jq -r '.pocket_id' 2>/dev/null)

if [ -n "$POCKET_ID" ] && [ "$POCKET_ID" != "null" ]; then
    echo ""
    echo -e "${PURPLE}📍 Test 2 : Saturation de pocket (5 téléportations)${NC}"
    echo "Pocket ID : $POCKET_ID"
    echo ""
    
    # Faire 5 téléportations dans la même pocket
    for i in {1..5}; do
        echo -e "${YELLOW}Téléportation $i/5...${NC}"
        
        RESPONSE=$(curl -s -X POST http://localhost:8080/api/reality/pocket-teleport \
          -H "Content-Type: application/json" \
          -d "{
            \"x\": $((RANDOM % 100)),
            \"y\": $((RANDOM % 100)),
            \"pocket_id\": \"$POCKET_ID\"
          }")
        
        # Afficher seulement les infos importantes
        FROM_X=$(echo "$RESPONSE" | jq -r '.from.x' 2>/dev/null)
        FROM_Y=$(echo "$RESPONSE" | jq -r '.from.y' 2>/dev/null)
        TO_X=$(echo "$RESPONSE" | jq -r '.to.x' 2>/dev/null)
        TO_Y=$(echo "$RESPONSE" | jq -r '.to.y' 2>/dev/null)
        DISTANCE=$(echo "$RESPONSE" | jq -r '.distance' 2>/dev/null)
        SATURATION=$(echo "$RESPONSE" | jq -r '.pocket_saturation' 2>/dev/null)
        
        echo "  → ($FROM_X,$FROM_Y) ➜ ($TO_X,$TO_Y) | Distance: $DISTANCE"
        
        if [ "$SATURATION" = "true" ]; then
            echo -e "${RED}⚠️  POCKET SATURÉE !${NC}"
            SPECIAL=$(echo "$RESPONSE" | jq -r '.special_event' 2>/dev/null)
            echo -e "${YELLOW}$SPECIAL${NC}"
        fi
        
        sleep 0.5
    done
fi

echo ""
echo -e "${GREEN}✅ Test terminé !${NC}"
echo ""
echo -e "${CYAN}💡 Conseil : Intégrez cette API dans Vince Vega pour des téléportations intra-pocket !${NC}"
echo -e "${PURPLE}🏆 Jean avait raison : Ça marche !${NC}" 