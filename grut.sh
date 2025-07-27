#!/bin/bash

echo "👁️ GRUT VOIT TOUT - LANCEMENT DU PANOPTICON"
echo "============================================"

# Fonction pour vérifier si un port est utilisé
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Fonction pour tuer les processus sur un port
kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "🔫 Libération du port $port..."
        kill -9 $pids 2>/dev/null
        sleep 1
    fi
}

# Vérifier si les services tournent déjà
BACKEND_RUNNING=false
REACT_RUNNING=false
HTML_RUNNING=false

if check_port 8080; then
    echo "✅ Backend déjà actif sur 8080"
    BACKEND_RUNNING=true
fi

if check_port 3000; then
    echo "✅ React déjà actif sur 3000"
    REACT_RUNNING=true
fi

if check_port 8000; then
    echo "✅ HTML déjà actif sur 8000"
    HTML_RUNNING=true
fi

# Si tout tourne déjà, juste ouvrir GRUT
if [ "$BACKEND_RUNNING" = true ] && [ "$REACT_RUNNING" = true ] && [ "$HTML_RUNNING" = true ]; then
    echo "🌟 Tous les services sont actifs !"
    echo "👁️ Ouverture du Panopticon GRUT..."
    open "http://localhost:8000/grut-panopticon-fantasy.html"
    exit 0
fi

# Sinon, demander quoi faire
echo ""
echo "⚠️  Certains services ne sont pas actifs"
echo "Que voulez-vous faire ?"
echo "1) Lancer les services manquants"
echo "2) Redémarrer TOUT"
echo "3) Juste ouvrir GRUT"
read -p "Choix (1/2/3): " choice

case $choice in
    1)
        # Lancer seulement les manquants
        if [ "$BACKEND_RUNNING" = false ]; then
            echo "🚀 Lancement du Backend..."
            cd backend && mvn spring-boot:run > ../logs/backend.log 2>&1 &
            cd ..
        fi
        
        if [ "$REACT_RUNNING" = false ]; then
            echo "🚀 Lancement de React..."
            cd frontend && npm start > ../logs/morgana.log 2>&1 &
            cd ..
        fi
        
        if [ "$HTML_RUNNING" = false ]; then
            echo "🚀 Lancement du serveur HTML..."
            cd frontend/html-interfaces && python3 -m http.server 8000 > ../../logs/html-unified.log 2>&1 &
            cd ../..
        fi
        ;;
        
    2)
        # Tout redémarrer
        echo "🔪 Arrêt de tous les services..."
        kill_port 8080
        kill_port 3000
        kill_port 8000
        
        echo "🚀 Redémarrage complet..."
        cd backend && mvn spring-boot:run > ../logs/backend.log 2>&1 &
        cd ..
        sleep 2
        
        cd frontend && npm start > ../logs/morgana.log 2>&1 &
        cd ..
        sleep 2
        
        cd frontend/html-interfaces && python3 -m http.server 8000 > ../../logs/html-unified.log 2>&1 &
        cd ../..
        ;;
        
    3)
        # Juste ouvrir
        ;;
        
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

# Attendre un peu si on a lancé des services
if [ "$choice" != "3" ]; then
    echo "⏳ Attente du démarrage des services..."
    sleep 5
fi

# Ouvrir GRUT
echo ""
echo "👁️ OUVERTURE DU PANOPTICON GRUT"
echo "================================"
open "http://localhost:8000/grut-panopticon-fantasy.html"

echo ""
echo "✨ GRUT VOIT TOUT. GRUT SAIT TOUT."
echo ""
echo "Services actifs :"
echo "- Backend API : http://localhost:8080"
echo "- React Morgana : http://localhost:3000"
echo "- HTML Hub : http://localhost:8000"
echo "- GRUT Panopticon : http://localhost:8000/grut-panopticon-fantasy.html" 