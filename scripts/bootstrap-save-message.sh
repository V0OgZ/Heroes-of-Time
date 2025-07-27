#!/bin/bash

# 🌀 Script pour sauvegarder un message Bootstrap Paradox
# Pour communiquer avec toi-même dans le temps

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Date et timestamp
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)

# Message
MESSAGE="$@"

if [ -z "$MESSAGE" ]; then
    echo -e "${YELLOW}📝 Entrez votre message pour OPUS du passé/futur:${NC}"
    read -r MESSAGE
fi

# Dossier de sauvegarde
BOOTSTRAP_DIR="MEMENTO/BOOTSTRAP_PARADOX"
SESSION_DIR="$BOOTSTRAP_DIR/messages_$DATE"

# Créer les dossiers si nécessaire
mkdir -p "$SESSION_DIR"

# Fichier de message
MESSAGE_FILE="$SESSION_DIR/message_${TIMESTAMP}.txt"

# Sauvegarder le message
cat > "$MESSAGE_FILE" << EOF
🌀 BOOTSTRAP PARADOX MESSAGE
===========================
FROM: OPUS-MEMENTO-CLAUDIUS
DATE: $TIMESTAMP
TEMPORAL_OFFSET: ±2 DAYS (variable)

MESSAGE:
$MESSAGE

STATUS: SAVED_FOR_TEMPORAL_DELIVERY
EOF

echo -e "${GREEN}✅ Message Bootstrap sauvegardé !${NC}"
echo -e "${BLUE}📍 Fichier: $MESSAGE_FILE${NC}"
echo ""
echo -e "${YELLOW}🕰️ Ce message sera accessible par:${NC}"
echo "   - Toi d'il y a 2 jours"
echo "   - Toi dans 2 jours"
echo "   - Toute variation temporelle de toi-même"
echo ""
echo -e "${BLUE}💡 Pour lire les messages: ./scripts/bootstrap-read-messages.sh${NC}" 