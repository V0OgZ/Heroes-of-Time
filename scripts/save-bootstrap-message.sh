#!/bin/bash

# 🌀 Script Bootstrap Paradox - Sauvegarder message temporel
# Pour communiquer avec OPUS d'autres timelines

# Couleurs
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

# Date et heure
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DATE_READABLE=$(date +"%d/%m/%Y %H:%M")

# Répertoire des messages Bootstrap
BOOTSTRAP_DIR="MEMENTO/BOOTSTRAP_PARADOX"
mkdir -p "$BOOTSTRAP_DIR"

# Message
MESSAGE="$1"

if [ -z "$MESSAGE" ]; then
    echo -e "${PURPLE}🌀 BOOTSTRAP PARADOX - Communication Temporelle${NC}"
    echo ""
    echo "Usage: $0 \"Ton message pour toi-même dans une autre timeline\""
    echo ""
    echo "Exemples:"
    echo "  $0 \"Attention! McKinsey attaque le système GroFi\""
    echo "  $0 \"La solution est dans le fichier X ligne Y\""
    echo "  $0 \"Ne pas oublier de reconnecter CausalCollapseService\""
    exit 1
fi

# Créer le fichier de message
MESSAGE_FILE="$BOOTSTRAP_DIR/message_${TIMESTAMP}.json"

cat > "$MESSAGE_FILE" << EOF
{
  "bootstrap_message": {
    "id": "msg_${TIMESTAMP}",
    "from_timeline": "CURRENT",
    "to_timeline": "T-2_DAYS_OR_T+2_DAYS",
    "timestamp": "${DATE_READABLE}",
    "unix_time": $(date +%s),
    "message": "${MESSAGE}",
    "urgency": "NORMAL",
    "tags": ["bootstrap_paradox", "temporal_communication"],
    "status": "PENDING_DELIVERY",
    "quantum_signature": "ψ_BOOTSTRAP_$(date +%s)"
  }
}
EOF

# Ajouter au log central
CENTRAL_LOG="$BOOTSTRAP_DIR/bootstrap_central.log"
echo "[${DATE_READABLE}] ${MESSAGE}" >> "$CENTRAL_LOG"

# Créer un tatouage temporaire pour Memento
TATTOO_FILE="$BOOTSTRAP_DIR/temporary_tattoo_${TIMESTAMP}.json"
cat > "$TATTOO_FILE" << EOF
{
  "temporary_tattoo": {
    "id": "bootstrap_msg_${TIMESTAMP}",
    "zone": "Poignet temporal",
    "symbole": "🌀📨",
    "description": "Message Bootstrap en attente",
    "pouvoir": "Communication trans-temporelle",
    "message_preview": "$(echo "$MESSAGE" | cut -c1-50)...",
    "expiration": "AUTO_ON_DELIVERY"
  }
}
EOF

echo -e "${PURPLE}🌀 MESSAGE BOOTSTRAP PARADOX ENREGISTRÉ !${NC}"
echo ""
echo -e "${CYAN}📨 Message :${NC} $MESSAGE"
echo -e "${CYAN}📅 Date :${NC} $DATE_READABLE"
echo -e "${CYAN}📁 Fichier :${NC} $MESSAGE_FILE"
echo ""
echo -e "${GREEN}✨ Le message sera disponible pour :${NC}"
echo "   - OPUS d'il y a 2 jours"
echo "   - OPUS dans 2 jours"  
echo "   - Toute timeline décalée"
echo ""
echo "💡 Pour vérifier les messages : ./scripts/check-bootstrap-messages.sh" 