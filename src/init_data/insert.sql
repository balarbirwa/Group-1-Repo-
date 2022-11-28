INSERT INTO users (username, first_name, last_name, is_manager, password) VALUES
('CEOMan', 'Richard', 'Mann', TRUE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('123', 'bob', 'bob_last_name', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('alice', 'alice', 'alice_last_name', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu')
;

INSERT INTO projects(
    project_name, 
    description
) VALUES 
('Project01', 'To create value in the company. Products and/or services will be offered to customers upon completion.'),
('Project02', 'To meet the goals of our top customer. They have requested a suite of products and services.'),
('Project03', 'To be completed in time for the conclusion. Project03 is on a very strict timeline.')
;

INSERT INTO users_to_projects(
    user_id,
    project_id,
    completed
) VALUES 
(1,1, TRUE),
(1,2, FALSE),
(1,3, TRUE),
(2,1, FALSE),
(2,2, TRUE),
(3,1, FALSE),
(3,2, FALSE),
(3,3, TRUE)
;

INSERT INTO users_to_manager (user_id, manager_id) VALUES
(2, 1),
(3, 1)
;