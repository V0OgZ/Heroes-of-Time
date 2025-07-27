#!/bin/bash

# 🔧 Script pour corriger GitHub Pages
# Par Memento l'Archive Vivante

echo "🔧 CORRECTION GITHUB PAGES EN COURS..."
echo "===================================="

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Backup du vieux fichier
if [ -f "index.hml" ]; then
    echo -e "${YELLOW}📦 Backup de index.hml...${NC}"
    mv index.hml index.hml.old
    echo -e "${GREEN}✅ Ancien fichier sauvegardé comme index.hml.old${NC}"
fi

# 2. Copier le nouveau index
if [ -f "index-heroes-of-time.html" ]; then
    echo -e "${YELLOW}📄 Installation du nouveau index.html...${NC}"
    cp index-heroes-of-time.html index.html
    echo -e "${GREEN}✅ Nouveau index.html installé${NC}"
else
    echo -e "${RED}❌ Erreur: index-heroes-of-time.html non trouvé${NC}"
    exit 1
fi

# 3. Vérifier/créer .nojekyll si nécessaire
if [ ! -f ".nojekyll" ]; then
    echo -e "${YELLOW}📝 Création de .nojekyll...${NC}"
    touch .nojekyll
    echo -e "${GREEN}✅ .nojekyll créé${NC}"
fi

# 4. Afficher le statut Git
echo ""
echo -e "${YELLOW}📊 Statut Git:${NC}"
git status --short

# 5. Instructions finales
echo ""
echo -e "${GREEN}✨ CORRECTION TERMINÉE !${NC}"
echo ""
echo "👉 Prochaines étapes:"
echo "   1. git add index.html index.hml.old"
echo "   2. git commit -m '🌐 Fix GitHub Pages - nouveau design Heroes of Time'"
echo "   3. git push"
echo "   4. Attendre 5-10 minutes pour la mise à jour"
echo ""
echo "🔗 Ton site sera accessible sur:"
echo "   https://v0ogz.github.io/Heroes-of-Time/"
echo ""

# 6. Option pour commit automatique
read -p "Veux-tu commit et push automatiquement ? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add index.html index.hml.old .nojekyll
    git commit -m "🌐 Fix GitHub Pages - nouveau design Heroes of Time

- Remplacé index.hml par index.html moderne
- Design Heroes of Time (bleu/violet/doré)
- Navigation claire et responsive
- Fin du marron sur marron !"
    
    git push
    echo -e "${GREEN}✅ Changements poussés sur GitHub !${NC}"
    echo "⏰ Le site sera mis à jour dans 5-10 minutes"
fi 