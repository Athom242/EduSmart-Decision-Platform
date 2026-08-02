"""
generate_data.py — Source 4 : MongoDB (Journaux de l'application mobile)

Objectif :
    Générer 200 000 à 500 000 documents d'événements, cohérents avec les
    autres sources, incluant volontairement les anomalies demandées.

Sortie :
    Un fichier .jsonl (un document JSON par ligne) lu ensuite par
    insert_data.py.

"""

import json
import random
import uuid
from copy import deepcopy
from datetime import datetime, timedelta
import os

from faker import Faker

fake = Faker("fr_FR")
Faker.seed(42)  # For reproducible results
random.seed(42)

OUTPUT_FILE = "mongo_source/data/events.jsonl"
NB_EVENTS = 300000

EVENT_TYPES = [
    "LOGIN", "LOGOUT", "COURSE_OPENED", "COURSE_COMPLETED",
    "VIDEO_STARTED", "VIDEO_FINISHED", "QUIZ_STARTED", "QUIZ_SUBMITTED",
    "RESOURCE_DOWNLOADED", "SEARCH", "PROFILE_UPDATED",
    "PAYMENT_STARTED", "PAYMENT_SUCCESS", "PAYMENT_FAILED",
]

# Poids pour la génération aléatoire des types d'événements (somme = 100)
EVENT_TYPE_WEIGHTS = [
    25, 20, 15, 8, 12, 10, 7, 6, 5, 8, 3, 1, 1, 2
]

CITIES_SN = ["Dakar", "Thiès", "Saint-Louis", "Kaolack", "Ziguinchor", "Diourbel", "Tambacounda", "Kolda", "Louga", "Fatick", "Matam", "Kédougou", "Sédhiou", "Kaffrine"]

# Variantes volontairement incohérentes pour l'anomalie "villes écrites différemment"
CITY_VARIANTS = {
    "Dakar": ["Dakar", "DAKAR", "dakarr", "dakar"],
    "Thiès": ["Thiès", "THIES", "thies", "thiès"],
    "Saint-Louis": ["Saint-Louis", "SAINT-LOUIS", "saint-louis", "saint-louis"],
    "Kaolack": ["Kaolack", "KAOLACK", "kaolack", "kaolak"],
    "Ziguinchor": ["Ziguinchor", "ZIGUINCHOR", "ziguinchor", "ziguinchorr"],
    "Diourbel": ["Diourbel", "DIOURBEL", "diourbel", "diourbelle"],
    "Tambacounda": ["Tambacounda", "TAMBACOUNDA", "tambacounda", "tambacoundaa"],
    "Kolda": ["Kolda", "KOLDA", "kolda", "koldaa"],
    "Louga": ["Louga", "LOUGA", "louga", "lougaa"],
    "Fatick": ["Fatick", "FATICK", "fatick", "fatikk"],
    "Matam": ["Matam", "MATAM", "matam", "matamm"],
    "Kédougou": ["Kédougou", "KEDOUGOU", "kedougou", "kedougouu"],
    "Sédhiou": ["Sédhiou", "SEDHIOU", "sedhiou", "sedhiouu"],
    "Kaffrine": ["Kaffrine", "KAFFRINE", "kaffrine", "kaffrinee"]
}

APP_VERSIONS = ["2.4.1", "2.4.0", "2.4", "v2.4", "2.5.0"]  # variantes volontaires
OS_VARIANTS = ["Android", "ANDROID", "android", "iOS", "IOS", "ios"]


# fonction pour générer 15000 etudiants aléatoires
def code_student(nb_code_student=15000):
    """
    Choisit 15000 d'étudiants 
    et génère des codes LMS-000001, LMS-000002, ...
    """
    return [f"LMS-{i:06d}" for i in range(1, nb_code_student + 1)]


#  Champs variables selon event_type
def build_metadata(event_type):
    """
    Retourne un dict de champs additionnels selon le type d'événement.
    """
    metadata = {}

    if event_type == "COURSE_COMPLETED":
        metadata["completion_rate"] = random.randint(70, 100)

    elif event_type == "VIDEO_STARTED":
        metadata["video_id"] = f"VID-{random.randint(1000, 9999)}"
        metadata["video_quality"] = random.choice(["144p", "240p", "360p", "480p", "720p", "1080p"])
        metadata["buffer_time"] = round(random.uniform(0, 12), 1)

    elif event_type == "VIDEO_FINISHED":
        metadata["video_id"] = f"VID-{random.randint(1000, 9999)}"
        metadata["watch_time"] = random.randint(10, 3600)

    elif event_type == "QUIZ_STARTED":
        metadata["attempt"] = random.randint(1, 3)

    elif event_type == "QUIZ_SUBMITTED":
        metadata["score"] = random.randint(0, 100)
        metadata["attempt"] = random.randint(1, 3)

    elif event_type == "RESOURCE_DOWNLOADED":
        metadata["resource_id"] = f"RES-{random.randint(1000, 9999)}"
        metadata["resource_type"] = random.choice(["pdf", "image", "slide", "audio"])

    elif event_type == "SEARCH":
        metadata["search_query"] = fake.word()
        metadata["results_count"] = random.randint(0, 50)

    elif event_type == "PROFILE_UPDATED":
        metadata["updated_fields"] = random.sample(
            ["name", "email", "avatar", "password", "bio"],
            k=random.randint(1, 3),
        )

    elif event_type in ["PAYMENT_STARTED", "PAYMENT_SUCCESS", "PAYMENT_FAILED"]:
        metadata["transaction_id"] = str(uuid.uuid4())
        metadata["amount"] = round(random.uniform(5.0, 99.99), 2)
        if event_type == "PAYMENT_FAILED":
            metadata["failure_reason"] = random.choice(["card_declined", "timeout", "insufficient_funds"])

    return metadata


# Construction d'un document
def clean_event(students):
    event_type = random.choices(EVENT_TYPES, weights=EVENT_TYPE_WEIGHTS, k=1)[0]
    timestamp = datetime.now() - timedelta(
        days=random.randint(0, 90),
        seconds=random.randint(0, 86_399),
    )
    device = random.choice(["Android Phone", "Android Tablet", "iPhone", "iPad"])
    operating_system = "Android" if device.startswith("Android") else "iOS"
    app_version = random.choice(["2.4.1", "2.4.0", "2.4", "2.5.0"])
    ip_address = fake.ipv4()
    city = random.choice(CITIES_SN)

    if event_type == "PAYMENT_FAILED":
        success = False
    elif event_type in ["PAYMENT_SUCCESS", "COURSE_COMPLETED", "VIDEO_FINISHED", "QUIZ_SUBMITTED", "LOGIN", "LOGOUT", "RESOURCE_DOWNLOADED", "PROFILE_UPDATED"]:
        success = True
    elif event_type == "PAYMENT_STARTED":
        success = None
    else:
        success = random.choice([True, False])

    metadata = build_metadata(event_type)

    event = {
        "event_id": str(uuid.uuid4()),
        "student_code": random.choice(students),
        "timestamp": timestamp,
        "event_type": event_type,
        "device": device,
        "operating_system": operating_system,
        "app_version": app_version,
        "ip_address": ip_address,
        "city": city,
        "country": "Sénégal",
        "session_id": str(uuid.uuid4()),
        "duration_seconds": random.randint(0, 3600),
        "success": success,
        "metadata": metadata,
    }

    if event_type in ["COURSE_OPENED", "COURSE_COMPLETED"]:
        event["course_code"] = f"COURSE-{random.randint(100, 999)}"
        event["module_code"] = f"MODULE-{random.randint(1, 50)}"

    if event_type in ["QUIZ_STARTED", "QUIZ_SUBMITTED"]:
        event["quiz_code"] = f"QUIZ-{random.randint(100, 999)}"

    return event


# 4. Injection des anomalies volontaires
# ---------------------------------------------------------------------------
def injection_anomalies(doc):
    """
    Applique de façon aléatoire une ou plusieurs anomalies sur un document.
    """
    if random.random() < 0.02:
        removable_fields = [
            "device", "operating_system", "app_version", "ip_address",
            "city", "country", "session_id", "duration_seconds", "success",
        ]
        field = random.choice(removable_fields)
        doc.pop(field, None)

    if random.random() < 0.025:
        nullable_fields = ["device", "operating_system", "app_version", "ip_address", "city", "country", "duration_seconds", "success"]
        field = random.choice(nullable_fields)
        if field in doc:
            doc[field] = None

    if random.random() < 0.08 and doc.get("city") in CITY_VARIANTS:
        doc["city"] = random.choice(CITY_VARIANTS[doc["city"]])

    if random.random() < 0.08 and "app_version" in doc:
        doc["app_version"] = random.choice(APP_VERSIONS)

    if random.random() < 0.08 and "operating_system" in doc:
        # Keep OS variants consistent with the already chosen OS (only vary capitalization/format)
        current_os = doc.get("operating_system")
        android_variants = ["Android", "ANDROID", "android"]
        ios_variants = ["iOS", "IOS", "ios", "iPhone OS"]

        chosen_variants = OS_VARIANTS
        if isinstance(current_os, str):
            lower = current_os.lower()
            if "android" in lower:
                chosen_variants = android_variants
            elif "ios" in lower or "iphone" in lower:
                chosen_variants = ios_variants

        doc["operating_system"] = random.choice(chosen_variants)

    if random.random() < 0.05 and "timestamp" in doc:
        timestamp = doc["timestamp"]
        if isinstance(timestamp, datetime):
            format_choice = random.choice(["iso", "ddmmyyyy", "datetime"])
            if format_choice == "iso":
                doc["timestamp"] = timestamp.isoformat()
            elif format_choice == "ddmmyyyy":
                doc["timestamp"] = timestamp.strftime("%d/%m/%Y")

    if random.random() < 0.03 and "ip_address" in doc:
        doc["ip_address"] = random.choice(["999.999.1.1", "", "256.256.256.256", "192.168", "abc.def.ghi.jkl"])

    if random.random() < 0.01 and "duration_seconds" in doc:
        duration = doc.get("duration_seconds", random.randint(1, 300))
        doc["duration_seconds"] = -abs(duration if isinstance(duration, int) else random.randint(1, 300))

    if random.random() < 0.01 and "student_code" in doc:
        del doc["student_code"]

    return doc


# Génération complète + écriture fichier
def generate_dataset():
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    students = code_student()
    events = []

    for _ in range(NB_EVENTS):
        doc = clean_event(students)
        doc = injection_anomalies(doc)
        events.append(doc)

    duplicate_count = max(1, len(events) // 200)
    for _ in range(duplicate_count):
        events.append(deepcopy(random.choice(events)))

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        for doc in events:
            f.write(json.dumps(doc, default=str, ensure_ascii=False) + "\n")

    print(f"{len(events)} événements écrits dans {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_dataset()