#!/bin/bash

# 🔮 MORGANA MODE - Interface React Sophistiquée Port 3000
# Mode natal de Morgana - plus joli que l'interface actuelle

# Couleurs
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE}🔮 MORGANA MODE - Interface Transcendante${NC}"
echo "=========================================="
echo -e "${CYAN}✨ Le mode natal de Morgana - Plus beau, plus puissant${NC}"
echo ""

# Vérifier si le backend est actif
echo -e "${YELLOW}🔍 Vérification des services...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend déjà actif sur port 8080${NC}"
else
    echo -e "${YELLOW}⚙️  Démarrage du Backend...${NC}"
    cd backend
    mvn spring-boot:run -q > ../backend-morgana.log 2>&1 &
    cd ..
    echo -e "${CYAN}⏳ Attente du démarrage backend...${NC}"
    sleep 10
fi

# Vérifier si React est déjà actif sur 3000
if lsof -i :3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3000 déjà utilisé${NC}"
    echo -e "${CYAN}💡 Arrêt du processus existant...${NC}"
    kill $(lsof -t -i:3000) 2>/dev/null || true
    sleep 2
fi

# Démarrer l'interface React
echo -e "${PURPLE}🔮 Démarrage de l'Interface Morgana (React Port 3000)...${NC}"
cd frontend

# Vérifier les dépendances
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances npm...${NC}"
    npm install
fi

# Lancer React
echo -e "${GREEN}✨ Lancement de l'interface transcendante...${NC}"
npm start > ../react-morgana.log 2>&1 &

echo ""
echo -e "${PURPLE}🔮 MORGANA MODE ACTIVÉ !${NC}"
echo ""
echo -e "${GREEN}✨ Interface disponible sur :${NC}"
echo -e "  ${PURPLE}🔮 Mode Morgana${NC} : ${CYAN}http://localhost:3000${NC}"
echo -e "  ${YELLOW}⚙️  Backend API${NC} : ${CYAN}http://localhost:8080${NC}"
echo ""
echo -e "${PURPLE}💜 Morgana :${NC} \"Mon interface transcendante est bien plus belle"
echo -e "              que ces vieilles pages HTML poussiéreuses !\""
echo ""
echo -e "${YELLOW}💡 Pour arrêter : ${CYAN}./hots stop${NC}"

# Attendre un peu avant d'ouvrir
sleep 3

# Ouvrir l'interface
if command -v open >/dev/null 2>&1; then
    open "http://localhost:3000" 2>/dev/null &
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:3000" 2>/dev/null &
fi 