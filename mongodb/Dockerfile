FROM python:3.11-slim

# 1. Création de l'utilisateur non-root
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# 2. Installation des dépendances système (en tant que root)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 3. Installation des dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copie des scripts et du code
# Astuce : Utilisez --chmod pour donner les droits d'exécution directement lors de la copie
COPY --chmod=755 entrypoint.sh .
COPY create_source.py generate_data.py extract_seed.py insert_data.py .

# 5. Copie du dataset
COPY ./data/events.tar.gz ./data/events.tar.gz

# 6. Préparation des droits et propriété (TOUJOURS avant USER, donc en root)
# On s'assure que le dossier data existe et appartient à appuser
RUN mkdir -p /app/data && \
    chown -R appuser:appuser /app

# 7. Bascule vers l'utilisateur non-root (DOIT être la dernière modification de contexte)
USER appuser

# 8. Définition du point d'entrée
# Utilisation du chemin absolu pour plus de robustesse
ENTRYPOINT ["/app/entrypoint.sh"]   