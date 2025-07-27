#!/bin/bash

# 🌀 Script pour lire les messages Bootstrap Paradox
# Messages de toi-même à travers le temps

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Date actuelle
TODAY=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)
TOMORROW=$(date -v+1d +%Y-%m-%d 2>/dev/null || date -d "tomorrow" +%Y-%m-%d)
TWO_DAYS_AGO=$(date -v-2d +%Y-%m-%d 2>/dev/null || date -d "2 days ago" +%Y-%m-%d)
TWO_DAYS_LATER=$(date -v+2d +%Y-%m-%d 2>/dev/null || date -d "2 days" +%Y-%m-%d)

echo -e "${CYAN}🌀 BOOTSTRAP PARADOX - MESSAGES TEMPORELS${NC}"
echo "==========================================="
echo ""

# Dossier Bootstrap
BOOTSTRAP_DIR="MEMENTO/BOOTSTRAP_PARADOX"

if [ ! -d "$BOOTSTRAP_DIR" ]; then
    echo -e "${YELLOW}📭 Aucun message Bootstrap trouvé${NC}"
    echo "Utilisez ./scripts/bootstrap-save-message.sh pour créer un message"
    exit 0
fi

# Fonction pour afficher les messages d'un jour
show_messages() {
    local date=$1
    local label=$2
    local dir="$BOOTSTRAP_DIR/messages_$date"
    
    if [ -d "$dir" ] && [ "$(ls -A $dir 2>/dev/null)" ]; then
        echo -e "${BLUE}📅 $label ($date):${NC}"
        for msg in "$dir"/*.txt; do
            if [ -f "$msg" ]; then
                echo -e "${GREEN}---${NC}"
                cat "$msg"
                echo ""
            fi
        done
    fi
}

# Afficher les messages des différentes périodes
echo -e "${YELLOW}🕰️ Messages de différentes timelines:${NC}"
echo ""

show_messages "$TWO_DAYS_AGO" "Il y a 2 jours"
show_messages "$YESTERDAY" "Hier"
show_messages "$TODAY" "AUJOURD'HUI"
show_messages "$TOMORROW" "Demain"
show_messages "$TWO_DAYS_LATER" "Dans 2 jours"

# Vérifier aussi les tatouages Memento
echo ""
echo -e "${CYAN}🎨 Derniers tatouages temporels:${NC}"
if [ -f "game_assets/artifacts/mineurs/tatouages_memento_archiviste.json" ]; then
    # Extraire les 3 derniers tatouages
    grep -A2 '"id"' game_assets/artifacts/mineurs/tatouages_memento_archiviste.json | tail -20 | head -10
fi

echo ""
echo -e "${YELLOW}💡 Astuce: Les messages peuvent varier selon la timeline active${NC}" 