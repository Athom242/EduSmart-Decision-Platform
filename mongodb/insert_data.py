"""
insert_data.py — Source 4 : MongoDB (Journaux de l'application mobile)

Objectif :
    Lire le fichier events.jsonl généré par generate_data.py et insérer
    les documents dans MongoDB, en tolérant les anomalies volontaires.

"""
import os
import json
from datetime import datetime

from pymongo import MongoClient
from pymongo.errors import BulkWriteError

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


# Connexion
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "edusmart_mongo")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "events")

INPUT_FILE = "data/events.jsonl"

BATCH_SIZE = 5000

CLEAN_TIMESTAMP_FORMAT = "%Y-%m-%d %H:%M:%S"


def get_collection():
    client = MongoClient(MONGO_URI)
    return client[DB_NAME][COLLECTION_NAME]


def try_parse_timestamp(value):
    """
    - Si value est déjà autre chose qu'une string (improbable ici), renvoie tel quel.
    - Essaie de parser value avec CLEAN_TIMESTAMP_FORMAT.
      - Si ça réussit : renvoie l'objet datetime (device un vrai type BSON date).
      - Si ça échoue (format DD/MM/YYYY, ISO, ou autre anomalie) : renvoie
        value tel quel (string), volontairement, pour préserver l'anomalie.
    """
    if not isinstance(value, str):
        return value
    try:
        return datetime.strptime(value, CLEAN_TIMESTAMP_FORMAT)
    except (ValueError, TypeError):
        return value


def load_documents(path):
    """
    - Ouvre le fichier .jsonl ligne par ligne (attention au volume : ne
      charge pas tout en mémoire d'un coup si tu peux l'éviter, ou fais-le
      simplement si ta machine le permet pour 300k lignes).
    - Pour chaque ligne : json.loads(), puis si "timestamp" est présent,
      remplace-le par try_parse_timestamp(doc["timestamp"]).
    - yield (ou retourne une liste de) documents prêts à insérer.
    """
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            doc = json.loads(line)
            if "timestamp" in doc:
                doc["timestamp"] = try_parse_timestamp(doc["timestamp"])
            yield doc


def insert_in_batches(collection, documents):
    """
    - Découpe `documents` en paquets de BATCH_SIZE.
    - Pour chaque paquet, appelle collection.insert_many(batch, ordered=False).
    - Attrape BulkWriteError : récupère le nombre d'échecs
      (exception.details["writeErrors"]) sans interrompre le programme.
    - Cumule : total inséré, total échoué.
    """
    inserted_total = 0
    failed_total = 0
    batch = []

    def flush_batch(batch_to_insert):
        nonlocal inserted_total, failed_total
        if not batch_to_insert:
            return
        try:
            result = collection.insert_many(batch_to_insert, ordered=False)
            inserted_total += len(result.inserted_ids)
        except BulkWriteError as exc:
            errors = []
            if exc.details and "writeErrors" in exc.details:
                errors = exc.details["writeErrors"]
            failed = len(errors)
            failed_total += failed
            inserted_total += len(batch_to_insert) - failed

    for doc in documents:
        batch.append(doc)
        if len(batch) >= BATCH_SIZE:
            flush_batch(batch)
            batch = []

    if batch:
        flush_batch(batch)

    return inserted_total, failed_total


def sample_first_lines(input_path, output_path, num_lines=100):
    """
    Récupère les N premières lignes du fichier d'entrée et les sauvegarde
    dans un fichier d'échantillon.
    """
    with open(input_path, "r", encoding="utf-8") as infile, \
         open(output_path, "w", encoding="utf-8") as outfile:
        for i, line in enumerate(infile):
            if i >= num_lines:
                break
            outfile.write(line)
    print(f"Échantillon de {num_lines} lignes sauvegardé dans {output_path}")


def main():
    collection = get_collection()
    documents = load_documents(INPUT_FILE)
    inserted, failed = insert_in_batches(collection, documents)

    print(f"Documents insérés : {inserted}")
    print(f"Documents rejetés : {failed}")
    print(f"Total en base : {collection.count_documents({})}")


if __name__ == "__main__":
    main()
    # Récupérer un échantillon des 100 premières lignes
    # sample_first_lines(INPUT_FILE, "data/sample.jsonl", 100)