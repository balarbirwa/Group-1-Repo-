DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL, 
    lastname VARCHAR(50) NOT NULL, 
    ismanager BOOLEAN, 
    manager_id int,
    password VARCHAR(256)
);

--DROP TABLE IF EXISTS projects;
--CREATE TABLE projects(
--    project_id SERIAL PRIMARY KEY, 
--    projectName VARCHAR(50), 
--    description VARCHAR(500), 
--    FOREIGN KEY (user_id) REFERENCES users(user_id)
--);

--DROP TABLE IF EXISTS users_to_projects;
--CREATE TABLE users_to_projects(
--    FOREIGN KEY (user_id) REFERENCES users(user_id),
--    FOREIGN KEY (project_id) REFERENCES projects(project_id)
--);