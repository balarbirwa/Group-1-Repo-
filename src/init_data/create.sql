DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) UNIQUE,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    is_manager BOOLEAN, 
    manager_id int,
    password VARCHAR(256)
);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY, 
    project_name VARCHAR(50), 
    description VARCHAR(500)
);

DROP TABLE IF EXISTS users_to_projects;
CREATE TABLE users_to_projects(
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    project_id INTEGER NOT NULL REFERENCES projects(project_id),
    completed BOOLEAN
);

DROP TABLE IF EXISTS users_to_manager;
CREATE TABLE users_to_manager (
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    manager_id INTEGER NOT NULL REFERENCES users(user_id)
);