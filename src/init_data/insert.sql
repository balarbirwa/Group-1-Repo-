INSERT INTO users (username, first_name, last_name, is_manager, password) VALUES
('CEOMan', 'Richard', 'Mann', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('123', 'bob', 'bob_last_name', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu')
;

INSERT INTO projects (project_name, description) VALUES
('Course 1', 'This is a really fun course'),
('Course 2', 'Another fun course')
;

INSERT INTO users_to_projects (user_id, project_id) VALUES
(1, 1),
(1, 2),
(2, 2)
;
