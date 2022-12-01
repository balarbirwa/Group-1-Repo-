INSERT INTO users (username, first_name, last_name, is_manager, password) VALUES
('Sara', 'Sara', 'Collins', TRUE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('test', 'Bob', 'Andersson', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu'),
('Alice', 'Alice', 'Baker', FALSE, '$2b$10$I75WivfjbJCFZc0phyDM9Ot/awMxsqk9cE9iPyNh1ODsWolzUKWiu')
;

INSERT INTO projects(
    project_name, 
    description
) VALUES 
('Sentiment analysis for product rating', 'This project aims to develop a sentiment analysis system for product rating. It is an e-commerce web application. 
The main goal of this sentiment analysis system is to understand the hidden sentiments of customers in feedback and comments and analyze 
their product rating patterns. '),
('Android task monitoring', 'This project is exclusively designed to simplify 
the tracking and monitoring of day-to-day activities of busy modern life. We are so busy in our daily lives right now that 
it becomes impossible to keep track of our daily events, meetings, and appointments.'),
('Fingerprint-based ATM system', 'This project is a desktop application that uses the fingerprint of users for authentication. 
Since each individual has a unique fingerprint, this method of using fingerprint as a means of authentication to access your ATM 
is safer and more secure than using an ATM card. Users need not carry their ATM cards with them at all times they can use their fingerprint to access ATM services. ')
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