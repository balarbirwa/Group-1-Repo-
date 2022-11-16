INSERT INTO users (username, first_name, last_name, is_manager, password) VALUES
('CEOMan', 'Richard', 'Mann', TRUE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('123', 'bob', 'bob_last_name', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('alice', 'alice', 'alice_last_name', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu')
('Employee1', 'Firstname', 'Lastname', TRUE, 'password')
;

INSERT INTO projects (
    projectName,
    description) VALUES
('Project 1', 'The first project'),
('Project 2', 'The second project')
=======
('JSmith', 'John', 'Smith', FALSE, 1, '$2y$10$QrWprImnjMNlzB7N4PU9wur7pK5qWjCBv39eYD8b/PAAGIIjLjE8m'),
('StanMan', 'Stanley', 'Stanford', FALSE, 1, '$2y$10$fho1vqSftKQrlbu0PrR/4.gRwo/OZDsm.ibnt02xMkVDZ/2v4I80G')
;

INSERT INTO projects (project_name, description) VALUES
('Course 1', 'This is a really fun course'),
('Course 2', 'Another fun course')
;

INSERT INTO projects(
    projectName, 
    description, 
    user_id
) VALUES 
('Project01', 'To create value in the company. Products and/or services will be offered to customers upon completion.',1),
('Project02', 'To meet the goals of our top customer. They have requested a suite of products and services.',1),
('Project03', 'To be completed in time for the conclusion. Project03 is on a very strict timeline.',1)
;


INSERT INTO users_to_projects (user_id, project_id, completed) VALUES
(2, 1, TRUE),
(2, 2, FALSE),
(3, 2, TRUE)
;

INSERT INTO users_to_projects(
    user_id,
    project_id
) VALUES 
(1,3),
(1,4),
(1,5),
(2,3),
(2,4),
(3,3),
(3,4),
(3,5)
;

INSERT INTO users_to_manager (user_id, manager_id) VALUES
(2, 1),
(3, 1)
;