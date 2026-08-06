"""
==============================================================
 BASE : edusmart_learning (MySQL)
 SCRIPT DE GÉNÉRATION ET D'INSERTION DES DONNÉES
==============================================================

Ce script génère des données réalistes (avec Faker) pour les 6 tables
de la plateforme pédagogique, et introduit volontairement des anomalies
décrites dans le cahier des charges (catégories hétérogènes, doublons,
progressions > 100%, connexions incomplètes, etc.).

Dépendances :
    pip install faker mysql-connector-python

Utilisation :
    python generate_data.py
"""

import random
import uuid
from datetime import datetime, timedelta

import mysql.connector
from faker import Faker

fake = Faker("fr_FR")
random.seed(42)  # reproductibilité (peut être retiré si besoin)

# ==============================================================
# CONFIGURATION - VOLUMES
# ==============================================================

DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "edusmart_learning",
    "auth_plugin": "mysql_native_password",
    "connection_timeout": 10,
    "use_pure": True,
}

NB_MODULES = 500
NB_COURS = 2000
NB_QUIZ = 5000
NB_NOTES = 500_000
NB_ETUDIANTS = 15000          # pool LMS-00001 -> LMS-15000
NB_PROGRESSION = 40000        # plusieurs dizaines de milliers
NB_CONNEXIONS = 50000         # plusieurs dizaines de milliers

BATCH_SIZE = 5000

# ==============================================================
# CONFIGURATION - TAUX D'ANOMALIES
# ==============================================================

TAUX_MODULE_INACTIF = 0.08
TAUX_NOM_MODULE_SALE = 0.06          # espaces/casse incohérente dans le nom

TAUX_TITRE_COURS_DUPLIQUE = 0.03

TAUX_QUIZ_DUREE_INCOHERENTE = 0.05

TAUX_NOTE_SCORE_SUP_100 = 0.03
TAUX_NOTE_TENTATIVE_NEGATIVE = 0.02

TAUX_PROGRESSION_MODULE_INEXISTANT = 0.02
TAUX_PROGRESSION_SUP_100 = 0.05
TAUX_PROGRESSION_NEGATIVE = 0.03
TAUX_PROGRESSION_DERNIER_COURS_NULL = 0.15
TAUX_PROGRESSION_DERNIER_COURS_INVALIDE = 0.03

TAUX_CONNEXION_SANS_DECONNEXION = 0.10
TAUX_CONNEXION_DUREE_NEGATIVE = 0.05
TAUX_CONNEXION_IP_INVALIDE = 0.05
TAUX_CONNEXION_IP_NULL = 0.05
TAUX_CONNEXION_APPAREIL_NULL = 0.05

# Variantes volontairement hétérogènes (catégories, niveaux, appareils, statuts)
CATEGORIES_VARIANTES = [
    "Développement", "développement", "DEVELOPPEMENT",
    "Data", "DATA", "data science", "Data Science",
    "Intelligence Artificielle", "IA", "ia",
    "Cybersécurité", "cybersecurite", "Cybersecurite",
    "Réseaux", "réseaux",
    "Web", "web", "WEB",
    "Design", "design",
    "Marketing Digital", "marketing digital",
]

NIVEAUX_VARIANTES = [
    "Débutant", "débutant", "DEBUTANT",
    "Intermédiaire", "intermediaire", "Intermédiaire ",
    "Avancé", "avancé", "AVANCE",
]

TYPES_COURS = ["Vidéo", "PDF", "TP", "Projet"]
STATUTS_COURS = ["PUBLIE", "BROUILLON", "ARCHIVE"]

APPAREILS_VARIANTES = [
    "Mobile", "mobile", "MOBILE",
    "PC", "pc", "Pc",
    "Tablette", "tablette",
    "Téléphone", "telephone",
]
NAVIGATEURS = ["Chrome", "Firefox", "Safari", "Edge", "Opera"]

IP_INVALIDES = [
    "999.999.999.999", "192.168.1", "not_an_ip",
    "10.0.0.256", "::ffff:zzz", "192.168.1.1.1",
]


def new_uuid():
    return str(uuid.uuid4())


def student_code(n):
    return f"LMS-{n:05d}"


def nom_module_sale(nom):
    """Introduit une incohérence dans le nom du module (casse/espaces)."""
    variante = random.choice([
        nom.upper(),
        nom.lower(),
        f"  {nom}  ",
        nom.replace("e", "é", 1) if "e" in nom else nom,
    ])
    return variante


def adresse_ip_aleatoire():
    return fake.ipv4()


# ==============================================================
# GÉNÉRATION : MODULES
# ==============================================================

def generer_modules():
    modules = []
    domaines_noms = [
        "Bases de données", "Python avancé", "Machine Learning",
        "Développement Web", "Cloud Computing", "Cybersécurité réseau",
        "Data Visualisation", "DevOps", "React & Front-end",
        "Administration Système", "Marketing Digital", "UX Design",
        "Statistiques appliquées", "Deep Learning", "Blockchain",
    ]

    for i in range(1, NB_MODULES + 1):
        nom = f"{random.choice(domaines_noms)} - Module {i}"
        if random.random() < TAUX_NOM_MODULE_SALE:
            nom = nom_module_sale(nom)

        modules.append({
            "id_module": new_uuid(),
            "code_module": f"MOD-{i:03d}",
            "nom_module": nom,
            "categorie": random.choice(CATEGORIES_VARIANTES),
            "niveau": random.choice(NIVEAUX_VARIANTES),
            "duree_heures": random.randint(5, 120),
            "actif": random.random() > TAUX_MODULE_INACTIF,
        })
    return modules


# ==============================================================
# GÉNÉRATION : COURS
# ==============================================================

def generer_cours(modules):
    cours = []
    titres_deja_utilises = []

    for i in range(NB_COURS):
        module = random.choice(modules)

        if titres_deja_utilises and random.random() < TAUX_TITRE_COURS_DUPLIQUE:
            titre = random.choice(titres_deja_utilises)
        else:
            titre = f"{fake.catch_phrase()} - {random.choice(TYPES_COURS)}"
            titres_deja_utilises.append(titre)

        cours.append({
            "id_cours": new_uuid(),
            "id_module": module["id_module"],
            "titre": titre,
            "ordre": random.randint(1, 20),
            "duree_minutes": random.randint(5, 180),
            "type_cours": random.choice(TYPES_COURS),
            "statut": random.choice(STATUTS_COURS),
        })
    return cours


# ==============================================================
# GÉNÉRATION : QUIZ
# ==============================================================

def generer_quiz(cours):
    quiz = []
    for i in range(NB_QUIZ):
        c = random.choice(cours)

        if random.random() < TAUX_QUIZ_DUREE_INCOHERENTE:
            duree = random.choice([-15, 0, 9999, -1])
        else:
            duree = random.randint(5, 90)

        quiz.append({
            "id_quiz": new_uuid(),
            "id_cours": c["id_cours"],
            "titre": f"Quiz - {fake.word().capitalize()} #{i+1}",
            "nb_questions": random.randint(5, 40),
            "score_max": random.choice([20.00, 100.00]),
            "duree_minutes": duree,
        })
    return quiz


# ==============================================================
# GÉNÉRATION : NOTES
# ==============================================================

def generer_notes(quiz):
    notes = []
    for i in range(NB_NOTES):
        q = random.choice(quiz)
        score_max = float(q["score_max"]) if q["score_max"] else 100.0

        if random.random() < TAUX_NOTE_SCORE_SUP_100:
            score = round(random.uniform(score_max + 1, score_max * 1.5), 2)
        else:
            score = round(random.uniform(0, score_max), 2)

        if random.random() < TAUX_NOTE_TENTATIVE_NEGATIVE:
            tentative = random.choice([-1, -2, 0])
        else:
            tentative = random.randint(1, 4)

        date_passage = fake.date_time_between(start_date="-2y", end_date="now")

        notes.append((
            new_uuid(),
            q["id_quiz"],
            student_code(random.randint(1, NB_ETUDIANTS)),
            date_passage,
            score,
            tentative,
            score >= (score_max * 0.5),
        ))
    return notes


# ==============================================================
# GÉNÉRATION : PROGRESSION
# ==============================================================

def generer_progression(modules, cours):
    progression = []
    # Une seule ligne par (étudiant, module) sauf anomalies volontaires -> on
    # tire des couples aléatoires (student, module) sans forcer l'unicité stricte
    # pour rester proche d'un jeu de données réel généré à volume.
    for i in range(NB_PROGRESSION):
        student = student_code(random.randint(1, NB_ETUDIANTS))

        if random.random() < TAUX_PROGRESSION_MODULE_INEXISTANT:
            id_module = new_uuid()  # module inexistant volontairement
        else:
            id_module = random.choice(modules)["id_module"]

        r = random.random()
        if r < TAUX_PROGRESSION_SUP_100:
            pourcentage = round(random.uniform(100.01, 150.0), 2)
        elif r < TAUX_PROGRESSION_SUP_100 + TAUX_PROGRESSION_NEGATIVE:
            pourcentage = round(random.uniform(-50.0, -0.01), 2)
        else:
            pourcentage = round(random.uniform(0, 100), 2)

        r2 = random.random()
        if r2 < TAUX_PROGRESSION_DERNIER_COURS_NULL:
            dernier_cours = None
        elif r2 < TAUX_PROGRESSION_DERNIER_COURS_NULL + TAUX_PROGRESSION_DERNIER_COURS_INVALIDE:
            dernier_cours = new_uuid()  # cours inexistant
        else:
            dernier_cours = random.choice(cours)["id_cours"]

        date_maj = fake.date_time_between(start_date="-1y", end_date="now")

        progression.append((
            new_uuid(),
            student,
            id_module,
            pourcentage,
            dernier_cours,
            date_maj,
        ))
    return progression


# ==============================================================
# GÉNÉRATION : TEMPS_CONNEXION
# ==============================================================

def generer_temps_connexion():
    connexions = []
    for i in range(NB_CONNEXIONS):
        student = student_code(random.randint(1, NB_ETUDIANTS))
        date_connexion = fake.date_time_between(start_date="-1y", end_date="now")

        sans_deconnexion = random.random() < TAUX_CONNEXION_SANS_DECONNEXION
        if sans_deconnexion:
            date_deconnexion = None
            duree_minutes = None
        else:
            duree_reelle = random.randint(1, 180)
            date_deconnexion = date_connexion + timedelta(minutes=duree_reelle)
            if random.random() < TAUX_CONNEXION_DUREE_NEGATIVE:
                duree_minutes = -abs(random.randint(1, 60))
            else:
                duree_minutes = duree_reelle

        if random.random() < TAUX_CONNEXION_APPAREIL_NULL:
            appareil = None
        else:
            appareil = random.choice(APPAREILS_VARIANTES)

        navigateur = random.choice(NAVIGATEURS) if random.random() > 0.05 else None

        r_ip = random.random()
        if r_ip < TAUX_CONNEXION_IP_NULL:
            adresse_ip = None
        elif r_ip < TAUX_CONNEXION_IP_NULL + TAUX_CONNEXION_IP_INVALIDE:
            adresse_ip = random.choice(IP_INVALIDES)
        else:
            adresse_ip = adresse_ip_aleatoire()

        connexions.append((
            new_uuid(),
            student,
            date_connexion,
            date_deconnexion,
            duree_minutes,
            appareil,
            navigateur,
            adresse_ip,
        ))
    return connexions


# ==============================================================
# INSERTION EN BASE
# ==============================================================

def insert_batch(cursor, query, data, label):
    total = len(data)
    for start in range(0, total, BATCH_SIZE):
        batch = data[start:start + BATCH_SIZE]
        cursor.executemany(query, batch)
        print(f"  -> {label} : {min(start + BATCH_SIZE, total)}/{total} insérés")


def main():
    print("Connexion à la base edusmart_learning...")
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    print("Génération des modules...")
    modules = generer_modules()
    q_modules = """
        INSERT INTO modules
        (id_module, code_module, nom_module, categorie, niveau, duree_heures, actif)
        VALUES (%(id_module)s, %(code_module)s, %(nom_module)s, %(categorie)s,
                %(niveau)s, %(duree_heures)s, %(actif)s)
    """
    insert_batch(cursor, q_modules, modules, "modules")
    conn.commit()

    print("Génération des cours...")
    cours = generer_cours(modules)
    q_cours = """
        INSERT INTO cours
        (id_cours, id_module, titre, ordre, duree_minutes, type_cours, statut)
        VALUES (%(id_cours)s, %(id_module)s, %(titre)s, %(ordre)s,
                %(duree_minutes)s, %(type_cours)s, %(statut)s)
    """
    insert_batch(cursor, q_cours, cours, "cours")
    conn.commit()

    print("Génération des quiz...")
    quiz = generer_quiz(cours)
    q_quiz = """
        INSERT INTO quiz
        (id_quiz, id_cours, titre, nb_questions, score_max, duree_minutes)
        VALUES (%(id_quiz)s, %(id_cours)s, %(titre)s, %(nb_questions)s,
                %(score_max)s, %(duree_minutes)s)
    """
    insert_batch(cursor, q_quiz, quiz, "quiz")
    conn.commit()

    print("Génération des notes (peut prendre quelques minutes)...")
    notes = generer_notes(quiz)
    q_notes = """
        INSERT INTO notes
        (id_note, id_quiz, student_code, date_passage, score, tentative, valide)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    insert_batch(cursor, q_notes, notes, "notes")
    conn.commit()

    print("Génération de la progression...")
    progression = generer_progression(modules, cours)
    q_progression = """
        INSERT INTO progression
        (id_progression, student_code, id_module, pourcentage, dernier_cours, date_maj)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    insert_batch(cursor, q_progression, progression, "progression")
    conn.commit()

    print("Génération des connexions...")
    connexions = generer_temps_connexion()
    q_connexions = """
        INSERT INTO temps_connexion
        (id_connexion, student_code, date_connexion, date_deconnexion,
         duree_minutes, appareil, navigateur, adresse_ip)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    insert_batch(cursor, q_connexions, connexions, "temps_connexion")
    conn.commit()

    cursor.close()
    conn.close()
    print("Terminé : toutes les données ont été insérées avec succès.")


if __name__ == "__main__":
    main()