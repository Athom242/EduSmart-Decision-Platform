-- ==============================================
-- BASE : edusmart_learning_final
-- SCRIPT DE CRÉATION DES TABLES (MySQL)
-- ==============================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS temps_connexion;
DROP TABLE IF EXISTS progression;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS cours;
DROP TABLE IF EXISTS modules;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Table modules (500)
CREATE TABLE modules (
    id_module CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    code_module VARCHAR(20) UNIQUE NOT NULL,
    nom_module VARCHAR(150) NOT NULL,
    categorie VARCHAR(100) NOT NULL,
    niveau VARCHAR(30) NOT NULL,
    duree_heures INTEGER,
    actif BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table cours (2000)
CREATE TABLE cours (
    id_cours CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    id_module CHAR(36) NOT NULL,
    titre VARCHAR(200) NOT NULL,
    ordre INTEGER,
    duree_minutes INTEGER,
    type_cours VARCHAR(30) NOT NULL,
    statut VARCHAR(20) DEFAULT 'PUBLIE',
    FOREIGN KEY (id_module) REFERENCES modules(id_module) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table quiz (5000)
CREATE TABLE quiz (
    id_quiz CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    id_cours CHAR(36) NOT NULL,
    titre VARCHAR(150) NOT NULL,
    nb_questions INTEGER,
    score_max NUMERIC(5,2),
    duree_minutes INTEGER,
    FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table notes (500 000)
CREATE TABLE notes (
    id_note CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    id_quiz CHAR(36) NOT NULL,
    student_code VARCHAR(30) NOT NULL,
    date_passage TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    score NUMERIC(5,2),
    tentative INTEGER DEFAULT 1,
    valide BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table progression
CREATE TABLE progression (
    id_progression CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    student_code VARCHAR(30) NOT NULL,
    id_module CHAR(36) NOT NULL,
    pourcentage NUMERIC(5,2),
    dernier_cours CHAR(36) NULL,
    date_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- PAS de FK sur id_module ni sur dernier_cours (volontairement omises pour incohérence)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Table temps_connexion
CREATE TABLE temps_connexion (
    id_connexion CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    student_code VARCHAR(30) NOT NULL,
    date_connexion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_deconnexion TIMESTAMP NULL,
    duree_minutes INTEGER,
    appareil VARCHAR(50),
    navigateur VARCHAR(50),
    adresse_ip VARCHAR(45)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Index pour performances
CREATE INDEX idx_cours_module ON cours(id_module);
CREATE INDEX idx_quiz_cours ON quiz(id_cours);
CREATE INDEX idx_notes_quiz ON notes(id_quiz);
CREATE INDEX idx_notes_student ON notes(student_code);
CREATE INDEX idx_progression_student ON progression(student_code);
CREATE INDEX idx_connexion_student ON temps_connexion(student_code);
CREATE INDEX idx_connexion_date ON temps_connexion(date_connexion);