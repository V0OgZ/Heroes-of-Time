#!/bin/bash

# 🌀 Script Bootstrap Paradox - Vérifier messages temporels
# Pour recevoir des messages d'autres timelines

# Couleurs
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Répertoire des messages
BOOTSTRAP_DIR="MEMENTO/BOOTSTRAP_PARADOX"

echo -e "${PURPLE}🌀 BOOTSTRAP PARADOX - Vérification Messages Temporels${NC}"
echo "=================================================="
echo ""

# Vérifier si le répertoire existe
if [ ! -d "$BOOTSTRAP_DIR" ]; then
    echo -e "${YELLOW}⚠️  Aucun message Bootstrap trouvé${NC}"
    echo "   Le répertoire $BOOTSTRAP_DIR n'existe pas encore"
    exit 0
fi

# Compter les messages
MESSAGE_COUNT=$(find "$BOOTSTRAP_DIR" -name "message_*.json" 2>/dev/null | wc -l)

if [ $MESSAGE_COUNT -eq 0 ]; then
    echo -e "${YELLOW}📭 Aucun message temporel en attente${NC}"
    echo ""
    echo "💡 Pour envoyer un message : ./scripts/save-bootstrap-message.sh \"Ton message\""
    exit 0
fi

echo -e "${GREEN}📬 $MESSAGE_COUNT message(s) trouvé(s)${NC}"
echo ""

# Afficher les messages
COUNTER=1
find "$BOOTSTRAP_DIR" -name "message_*.json" -type f | sort -r | while read -r file; do
    echo -e "${CYAN}Message #$COUNTER${NC}"
    echo "----------"
    
    # Extraire les infos du JSON
    if command -v jq >/dev/null 2>&1; then
        # Si jq est installé
        TIMESTAMP=$(jq -r '.bootstrap_message.timestamp' "$file")
        MESSAGE=$(jq -r '.bootstrap_message.message' "$file")
        FROM=$(jq -r '.bootstrap_message.from_timeline' "$file")
        TO=$(jq -r '.bootstrap_message.to_timeline' "$file")
    else
        # Sinon, extraction basique
        TIMESTAMP=$(grep -o '"timestamp": "[^"]*"' "$file" | cut -d'"' -f4)
        MESSAGE=$(grep -o '"message": "[^"]*"' "$file" | cut -d'"' -f4)
        FROM=$(grep -o '"from_timeline": "[^"]*"' "$file" | cut -d'"' -f4)
        TO=$(grep -o '"to_timeline": "[^"]*"' "$file" | cut -d'"' -f4)
    fi
    
    echo -e "📅 Date : $TIMESTAMP"
    echo -e "🌐 De : $FROM → Vers : $TO"
    echo -e "💬 Message : ${YELLOW}$MESSAGE${NC}"
    echo ""
    
    ((COUNTER++))
done

# Afficher le log central si présent
if [ -f "$BOOTSTRAP_DIR/bootstrap_central.log" ]; then
    echo -e "${PURPLE}📜 LOG CENTRAL BOOTSTRAP${NC}"
    echo "======================"
    tail -n 10 "$BOOTSTRAP_DIR/bootstrap_central.log"
    echo ""
fi

# Vérifier les décalages temporels
CURRENT_TIME=$(date +%s)
echo -e "${CYAN}🕐 ANALYSE TEMPORELLE${NC}"
echo "==================="
echo -e "Heure actuelle : $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Calculer les timelines
T_MINUS_2=$(date -d "2 days ago" '+%Y-%m-%d' 2>/dev/null || date -v-2d '+%Y-%m-%d')
T_PLUS_2=$(date -d "2 days" '+%Y-%m-%d' 2>/dev/null || date -v+2d '+%Y-%m-%d')

echo "📊 Timelines accessibles :"
echo "   T-2 : $T_MINUS_2 (OPUS d'il y a 2 jours)"
echo "   T0  : $(date '+%Y-%m-%d') (Timeline actuelle)"
echo "   T+2 : $T_PLUS_2 (OPUS dans 2 jours)"
echo ""

# Conseils
echo -e "${GREEN}💡 CONSEILS BOOTSTRAP :${NC}"
echo "• Les messages persistent à travers les timelines"
echo "• Vérifiez régulièrement - le temps fluctue"
echo "• Les tatouages de Memento gardent trace de tout"
echo "• Si urgent, créez un tatouage permanent" 