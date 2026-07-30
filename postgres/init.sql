-- ======================================
-- EduSmart Academic Database
-- PostgreSQL
-- ======================================


CREATE TABLE IF NOT EXISTS students (

    id SERIAL PRIMARY KEY,

    first_name VARCHAR(100),

    last_name VARCHAR(100),

    email VARCHAR(150) UNIQUE,

    birth_date DATE,

    gender VARCHAR(20),

    department VARCHAR(100),

    level VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS departments (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    description TEXT
);



CREATE TABLE IF NOT EXISTS enrollments (

    id SERIAL PRIMARY KEY,

    student_id INTEGER,

    department_id INTEGER,

    academic_year VARCHAR(20),

    enrollment_date DATE,

    FOREIGN KEY(student_id)
        REFERENCES students(id),

    FOREIGN KEY(department_id)
        REFERENCES departments(id)
);



CREATE TABLE IF NOT EXISTS payments (

    id SERIAL PRIMARY KEY,

    student_id INTEGER,

    amount DECIMAL(10,2),

    payment_date DATE,

    status VARCHAR(50),

    FOREIGN KEY(student_id)
        REFERENCES students(id)
);



-- Données tests

INSERT INTO departments(name, description)
VALUES

('Computer Science','Informatique'),
('Data Engineering','Data et IA'),
('Business','Gestion')

ON CONFLICT DO NOTHING;