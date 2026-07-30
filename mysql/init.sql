-- ======================================
-- EduSmart Learning Database
-- MySQL
-- ======================================


CREATE TABLE IF NOT EXISTS courses (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(150),

    description TEXT,

    teacher VARCHAR(100)

);



CREATE TABLE IF NOT EXISTS modules (

    id INT AUTO_INCREMENT PRIMARY KEY,

    course_id INT,

    name VARCHAR(150),

    FOREIGN KEY(course_id)
        REFERENCES courses(id)

);



CREATE TABLE IF NOT EXISTS quizzes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    module_id INT,

    title VARCHAR(150),

    max_score INT,


    FOREIGN KEY(module_id)
        REFERENCES modules(id)

);



CREATE TABLE IF NOT EXISTS grades (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    quiz_id INT,

    score FLOAT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



CREATE TABLE IF NOT EXISTS learning_activity (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    course_id INT,

    connection_time INT,

    progress FLOAT,

    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



INSERT INTO courses(title,description,teacher)

VALUES

(
'Introduction Data Engineering',
'ETL, Docker, Data Pipeline',
'Admin'
),

(
'Python Data',
'Pandas et analyse',
'Admin'
);