#!/bin/bash

echo "🔧 Correction des conflits Git dans hots..."

# Sauvegarder l'original
cp hots hots.backup.conflict

# Supprimer les marqueurs de conflit
sed -i '' '/<<<<<<< HEAD/d' hots
sed -i '' '/=======/d' hots
sed -i '' '/>>>>>>> main/d' hots

echo "✅ Conflits Git supprimés !"
echo "📝 Backup créé : hots.backup.conflict" 