import os
import tarfile

SEED_ARCHIVE = os.getenv("SEED_ARCHIVE", "data/events.tar.gz")
OUTPUT_DIR = "data"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "events.jsonl")


def extract():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    if os.path.exists(OUTPUT_FILE):
        print(f"'{OUTPUT_FILE}' existe déjà. Extraction ignorée.")
        return

    if not os.path.exists(SEED_ARCHIVE):
        raise FileNotFoundError(
            f"Archive introuvable : '{SEED_ARCHIVE}'. "
            "Vérifie qu'elle est bien copiée dans l'image ou montée dans le conteneur."
        )

    print(f"Extraction de '{SEED_ARCHIVE}' vers '{OUTPUT_DIR}/'...")
    with tarfile.open(SEED_ARCHIVE, "r:gz") as tar:
        tar.extractall(OUTPUT_DIR)

    if not os.path.exists(OUTPUT_FILE):
        raise FileNotFoundError(
            f"L'extraction n'a pas produit '{OUTPUT_FILE}'. "
            "Vérifie le nom du fichier à l'intérieur de l'archive "
            "(il doit s'appeler exactement 'events.jsonl')."
        )

    print(f"Extraction terminée : '{OUTPUT_FILE}' prêt.")


if __name__ == "__main__":
    extract()