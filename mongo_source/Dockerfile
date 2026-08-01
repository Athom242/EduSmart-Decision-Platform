FROM python:3.11-slim

# Utilisateur non-root pour l'exécution du conteneur
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Dépendances système minimales (curl utile pour du debug réseau si besoin)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installation des dépendances Python (couche mise en cache séparément du code)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code source
COPY create_source.py generate_data.py insert_data.py entrypoint.sh ./

# Dossier de sortie des données, appartenant à l'utilisateur non-root
RUN mkdir -p /app/data && \
    chmod +x entrypoint.sh && \
    chown -R appuser:appuser /app

USER appuser

ENTRYPOINT ["./entrypoint.sh"]