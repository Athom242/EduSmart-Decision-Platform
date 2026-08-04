#!/bin/bash
# entrypoint.sh — Pipeline complet Source 4 (MongoDB)
#
# Enchaîne dans l'ordre :
#   1. create_source.py  -> création base/collection + index
#   2. generate_data.py  -> génération du fichier events.jsonl
#   3. insert_data.py    -> insertion en base + échantillon

set -e  # arrête le script au premier échec

echo "=== [1/3] Création de la base et des index ==="
python create_source.py

# echo "=== [2/3] Génération du dataset ==="
# python generate_data.py

echo "=== [3/3] Insertion en base MongoDB ==="
python insert_data.py

echo "=== Pipeline terminé avec succès ==="
