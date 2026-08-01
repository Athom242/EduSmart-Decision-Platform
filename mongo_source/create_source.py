"""
create_source.py — Source 4 : MongoDB (Journaux de l'application mobile)

Objectif :
    Mettre en place la base et la collection MongoDB destinées à recevoir
    les événements de l'application mobile EduSmart.
"""

import os
from pymongo import MongoClient, ASCENDING

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Connexion à la base de données MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "edusmart_mongo")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "events")

def get_database():
    client = MongoClient(MONGO_URI)
    return client[DB_NAME]


def create_collection(db):
    """
    - Vérifie si la collection existe déjà (db.list_collection_names()).
    - Si elle n'existe pas, crée-la avec create_collection().
    - Si elle existe déjà, décide : la recréer (drop puis create) ou
      simplement la réutiliser.
    """
    if COLLECTION_NAME in db.list_collection_names():
        print(f"La collection '{COLLECTION_NAME}' existe déjà. Réutilisation.")
        return

    db.create_collection(COLLECTION_NAME)
    print(f"Collection '{COLLECTION_NAME}' créée sans validation.")

# Creation des index pour optimiser les requêtes
def create_indexes(db):
    """
    Création des index pour supporter les requêtes analytiques tout en tolérant
    les anomalies volontairement introduites (documents incomplets, valeurs nulles,
    formatages incohérents, doublons, données invalides).
    """
    collection = db[COLLECTION_NAME]
    
    # Index simples pour les requetes analytiques
    collection.create_index([("student_code", ASCENDING)])
    collection.create_index([("timestamp", ASCENDING)])
    collection.create_index([("event_type", ASCENDING)])
    collection.create_index([("session_id", ASCENDING)])
    
    # Index composé pour requetes combinant student_code et timestamp
    collection.create_index([("student_code", ASCENDING), ("timestamp", ASCENDING)])
    
    # Index compose pour : "evenements par type et date"
    collection.create_index([("event_type", ASCENDING), ("timestamp", ASCENDING)])
    
    # Index sur device et operating_system
    collection.create_index([("device", ASCENDING)])
    collection.create_index([("operating_system", ASCENDING)])
    
    # Index sur city
    collection.create_index([("city", ASCENDING)])
    
    # Index sur app_version
    collection.create_index([("app_version", ASCENDING)])
    
    # Index sur ip_address
    collection.create_index([("ip_address", ASCENDING)])
    
    # Index sur duration_seconds
    collection.create_index([("duration_seconds", ASCENDING)])
    
    # Index sur success pour filtrer les événements réussis/échoués
    collection.create_index([("success", ASCENDING)])
    
    print(f"Indexes créés sur la collection '{COLLECTION_NAME}' (tolérant les anomalies)")


# Point d'entrée du script
def main():
    db = get_database()
    create_collection(db)
    create_indexes(db)

    # résumé de contrôle
    indexes = db[COLLECTION_NAME].index_information()
    count = db[COLLECTION_NAME].count_documents({})
    print(f"Base '{DB_NAME}' et collection '{COLLECTION_NAME}' prêtes.")
    print(f"Collection '{COLLECTION_NAME}' contient {count} documents.")
    print(f"Indexs présents : {list(indexes.keys())}")


if __name__ == "__main__":
    main()