FROM python:3.11-slim

# Répertoire de travail
WORKDIR /app

# Variables d'environnement
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Installation des dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le projet
COPY . .

# Créer les dossiers de sortie
RUN mkdir -p generated_csv generated_csv_anomalies

# Variables d'environnement pour les scripts
ENV DATA_PATH=/app/generated_csv
ENV ANOMALIES_PATH=/app/generated_csv_anomalies

# Exécuter les scripts
CMD ["sh", "-c", "python scripts/generate_data.py && python scripts/introduce_anomalies.py"]