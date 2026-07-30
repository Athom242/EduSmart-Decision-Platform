# EduSmart-Decision-Platform
Professional Data Engineering platform for integrating, processing and analyzing educational data from PostgreSQL, MySQL, CSV, JSON and Redis using Docker, ETL pipelines and Business Intelligence dashboards.

# 🎓 EduSmart Decision Platform

<p align="center">
  <img src="docs/assets/edusmart-logo.png" width="180">
</p>

<h3 align="center">
Plateforme Data Engineering intelligente pour l'analyse décisionnelle des systèmes éducatifs
</h3>


<p align="center">

![Python](https://img.shields.io/badge/Python-3.12-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Redis](https://img.shields.io/badge/Redis-Realtime-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![ETL](https://img.shields.io/badge/Data-Engineering-orange)

</p>


# 📌 Présentation du projet

**EduSmart Decision Platform** est une plateforme décisionnelle conçue pour centraliser, transformer et exploiter les données issues d'un écosystème éducatif moderne.

Dans un environnement réel, les entreprises disposent généralement de plusieurs applications indépendantes :

- application académique ;
- plateforme e-learning ;
- application mobile ;
- système RH ;
- services temps réel.

Ces systèmes produisent des données hétérogènes stockées dans différentes technologies.

EduSmart propose une architecture permettant de :

- connecter plusieurs sources de données ;
- automatiser leur extraction ;
- nettoyer et transformer les informations ;
- centraliser les données dans une plateforme décisionnelle ;
- produire des indicateurs permettant une meilleure prise de décision.


---

# 🎯 Vision du projet

L'objectif à long terme est de construire une véritable **Data Platform éducative** capable d'aider :

- les universités ;
- les écoles privées ;
- les centres de formation ;
- les organismes éducatifs ;

à exploiter leurs données afin d'améliorer :

- la réussite des étudiants ;
- la qualité pédagogique ;
- la gestion administrative ;
- l'expérience utilisateur.


---

# 🏗️ Architecture globale


```
                        Utilisateurs

                            |

                    EduSmart Platform

                            |

                    Backend API

                            |

     ------------------------------------------------

     PostgreSQL     MySQL       CSV       JSON      Redis

     Academic     Learning      RH      Mobile    Temps réel


     ------------------------------------------------

                            |

                         ETL Pipeline

                            |

                    Data Warehouse

                            |

                 Dashboard Décisionnel

                            |

                    Intelligence Artificielle

```


---

# 🧩 Sources de données


## Source 1 — PostgreSQL

### Gestion académique

Base :

```
edusmart_academic
```


Données :

- étudiants
- filières
- classes
- inscriptions
- paiements


Rôle :

Représenter le système administratif principal.


---

## Source 2 — MySQL

### Plateforme pédagogique


Base :

```
edusmart_learning
```


Données :

- modules
- cours
- quiz
- notes
- progression
- temps de connexion


Rôle :

Analyser l'activité pédagogique.


---

## Source 3 — CSV

### Ressources humaines


Fichiers :

```
enseignants.csv

salaires.csv

departements.csv

absences.csv
```


Rôle :

Intégrer des données provenant de fichiers externes.


---

## Source 4 — JSON / MongoDB

### Logs application mobile


Exemple :

```json
{
 "student_id":145,
 "event":"Quiz Started",
 "device":"Android",
 "city":"Dakar",
 "timestamp":"2026-08-05T09:45:11"
}
```


Rôle :

Analyser les comportements utilisateurs.


---

# Source 5 — Redis

## Plateforme temps réel


Redis est utilisé pour stocker les informations générées en permanence par les applications.


Exemples :

- utilisateurs connectés ;
- sessions actives ;
- progression instantanée ;
- derniers cours consultés ;
- notifications.


Exemple :

```
session:145
```


Structure :

```json
{
"student_id":145,
"status":"online",
"last_course":25,
"last_activity":"2026-08-05 09:41"
}
```


---

# 🐳 Architecture Docker


Toute la plateforme fonctionne dans un environnement conteneurisé.


```
EduSmart Platform


├── frontend
│
├── backend
│
├── redis
│
├── postgres
│
├── mysql
│
├── mongodb
│
├── etl
│
├── warehouse
│
└── dashboard

```


Avantages :

- environnement reproductible ;
- isolation des services ;
- déploiement simplifié ;
- architecture proche de la production.


---

# 🛠️ Stack technique


## Frontend

Technologies :

- React
- TypeScript
- Tailwind CSS


Responsabilités :

- interface utilisateur ;
- dashboards ;
- visualisation des données.


---

## Backend

Technologies :

- Python
- FastAPI


Responsabilités :

- API REST ;
- communication avec les bases ;
- orchestration des traitements.


---

## Data Engineering


Technologies :

- Python
- Pandas
- Faker
- SQLAlchemy


Responsabilités :

- génération des données ;
- extraction ;
- transformation ;
- chargement.


---

## Bases de données


| Technologie | Utilisation |
|-|-|
| PostgreSQL | Données académiques |
| MySQL | Données pédagogiques |
| MongoDB | Logs mobiles |
| Redis | Temps réel |
| PostgreSQL Warehouse | Analyse décisionnelle |


---

# 🔄 Pipeline ETL


Le pipeline suit trois étapes :


## 1. Extraction


Récupération depuis :

- bases SQL ;
- fichiers CSV ;
- documents JSON ;
- Redis.


---

## 2. Transformation


Traitements :

- nettoyage ;
- validation ;
- normalisation ;
- enrichissement ;
- gestion des anomalies.


---

## 3. Chargement


Chargement dans :

```
Data Warehouse
```


pour permettre :

- reporting ;
- analyse ;
- dashboard.


---

# 👥 Organisation de l'équipe


## Architecture principale

Responsable :

- architecture globale ;
- Docker ;
- plateforme ;
- intégration.


---

## Répartition des sources


| Responsable | Mission |
|-|-|
| Membre 1 | PostgreSQL |
| Membre 2 | MySQL |
| Membre 3 | CSV RH |
| Membre 4 | JSON/MongoDB |
| Membre 5 | Redis + Architecture plateforme |


---

# 🌿 Gestion Git


Workflow utilisé :


```
main

|

develop

|

feature/*
```


Branches :

```
feature/frontend

feature/backend

feature/postgres

feature/mysql

feature/csv

feature/mongodb

feature/redis
```


Règles :

- aucun développement direct sur main ;
- chaque fonctionnalité possède sa branche ;
- validation avant fusion ;
- documentation obligatoire.


---

# 🚀 Installation


## Prérequis


Installer :

- Docker
- Docker Compose
- Git
- Python


---

## Cloner le projet


```bash
git clone https://github.com/<username>/EduSmart-Decision-Platform.git

cd EduSmart-Decision-Platform
```


---

## Lancer la plateforme


```bash
docker compose up -d
```


---

## Vérifier les services


```bash
docker ps
```


---

# 🔴 Module Redis


Connexion :


```bash
docker exec -it edusmart-redis redis-cli
```


Test :

```redis
PING
```


Réponse :

```
PONG
```


Structures utilisées :


| Clé | Type | Usage |
|-|-|-|
| session:{id} | HASH | Session utilisateur |
| progress:{id}:{course} | HASH | Progression |
| recent_courses:{id} | LIST | Historique |
| notifications:{id} | LIST | Alertes |


---

# 🧪 Qualité des données


Les données générées contiennent volontairement :

- valeurs nulles ;
- doublons ;
- erreurs de format ;
- incohérences ;
- données orphelines.


Objectif :

Reproduire un environnement réel d'entreprise.


---

# 📊 Fonctionnalités futures


## Intelligence artificielle


Possibilités :

- prédiction d'abandon ;
- recommandation de formation ;
- analyse automatique des performances ;
- assistant décisionnel.


---

## Temps réel


Grâce à Redis :

- monitoring des étudiants ;
- alertes instantanées ;
- suivi des activités.


---

## Cloud


Evolution possible :

```
Docker

↓

AWS / Azure / GCP

↓

Kubernetes

↓

Production
```


---

# 🌍 Impact potentiel


EduSmart peut devenir une solution permettant aux établissements éducatifs de :

- mieux comprendre leurs étudiants ;
- améliorer leurs programmes ;
- optimiser leurs ressources ;
- prendre des décisions basées sur les données.


---

# 📜 Licence


MIT License


---

# 👨‍💻 Projet


**EduSmart Decision Platform**

Projet orienté :

- Data Engineering
- Software Architecture
- Cloud Computing
- Business Intelligence
- Artificial Intelligence
