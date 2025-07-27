#!/bin/bash

# 🌌 TEST DU PRINCIPE ER=EPR DE LEONARD SUSSKIND
# Test du moteur quantique causal avec ponts Einstein-Rosen

# Couleurs
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${PURPLE}🌌 TEST ER=EPR - Ponts Einstein-Rosen via Intrication Quantique${NC}"
echo "============================================================"
echo -e "${CYAN}Principe de Susskind : ER = EPR${NC}"
echo ""

# Vérifier que le backend est actif
echo -e "${YELLOW}🔍 Vérification du backend...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend actif sur port 8080${NC}"
else
    echo -e "${RED}❌ Backend non actif ! Lancez d'abord ./hots start${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📡 Test 1 : Création d'un pont ER spatial${NC}"
echo "Création d'un pont entre Arthur et le Château..."

# Créer un pont ER spatial
RESPONSE=$(curl -s -X POST http://localhost:8080/api/quantum/er-bridge \
  -H "Content-Type: application/json" \
  -d '{
    "entity1": "hero_arthur",
    "entity2": "castle_camelot",
    "bridgeType": "SPATIAL"
  }')

echo "Réponse : $RESPONSE"
echo ""

# Extraire l'ID du pont (basique, sans jq)
BRIDGE_ID="ER_hero_arthur_TO_castle_camelot"

echo -e "${BLUE}🚀 Test 2 : Traversée du pont ER${NC}"
echo "Arthur traverse le pont vers Camelot..."

# Traverser le pont
TRAVERSE_RESPONSE=$(curl -s -X POST http://localhost:8080/api/quantum/er-bridge/traverse \
  -H "Content-Type: application/json" \
  -d '{
    "bridgeId": "'$BRIDGE_ID'",
    "entityId": "hero_arthur",
    "direction": "FORWARD"
  }')

echo "Résultat traversée : $TRAVERSE_RESPONSE"
echo ""

echo -e "${BLUE}📊 Test 3 : Vérification de la stabilité${NC}"
echo "Calcul de la stabilité du pont..."

# Vérifier la stabilité
STABILITY_RESPONSE=$(curl -s -X GET http://localhost:8080/api/quantum/er-bridge/$BRIDGE_ID/stability)

echo "Stabilité : $STABILITY_RESPONSE"
echo ""

echo -e "${BLUE}🌀 Test 4 : Pont temporel (voyage dans le temps)${NC}"
echo "Création d'un pont temporel pour Merlin..."

# Créer un pont temporel
TEMPORAL_RESPONSE=$(curl -s -X POST http://localhost:8080/api/quantum/er-bridge \
  -H "Content-Type: application/json" \
  -d '{
    "entity1": "hero_merlin",
    "entity2": "timeline_future",
    "bridgeType": "TEMPORAL"
  }')

echo "Pont temporel : $TEMPORAL_RESPONSE"
echo ""

echo -e "${GREEN}✨ Tests ER=EPR terminés !${NC}"
echo -e "${PURPLE}🛋️ Jean-Grofignon : 'Les trous de ver quantiques, c'est comme des portails Minecraft mais en mieux !'${NC}" 