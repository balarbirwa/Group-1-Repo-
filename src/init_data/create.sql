-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY, 
--     username VARCHAR(50) NOT NULL,
-- 	-- username VARCHAR(50) PRIMARY KEY,
-- 	password CHAR(255) NOT NULL,
--     firstName VARCHAR(50),-- NOT NULL, 
--     lastName VARCHAR(50),-- NOT NULL, 
--     isManager BOOLEAN, 
--     manager_id SMALLINT
--     -- password VARCHAR(256)
-- );

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	username VARCHAR(50) PRIMARY KEY,
	password CHAR(60) NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	isManager BOOLEAN,
	manager_id SMALLINT
);

-- DROP TABLE IF EXISTS projects CASCADE;
-- CREATE TABLE projects (
--     project_id SERIAL PRIMARY KEY, 
--     projectName VARCHAR(50), 
--     description VARCHAR(500), 
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- DROP TABLE IF EXISTS users_to_projects CASCADE;
-- CREATE TABLE users_to_projects (
--     FOREIGN KEY (user_id) REFERENCES users(user_id),
--     FOREIGN KEY (project_id) REFERENCES projects(project_id)
-- );
