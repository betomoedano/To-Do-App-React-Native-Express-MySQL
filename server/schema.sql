CREATE DATABASE todo_app;

USE todo_app;

-- Modify email to be not null
-- ALTER TABLE users MODIFY COLUMN email VARCHAR(255) NOT NULL;

-- Delete column
-- ALTER TABLE users DROP COLUMN last_name;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

-- Add colums
-- ALTER TABLE users ADD COLUMN last_name VARCHAR(255);

-- Add foreign key 
-- ALTER TABLE todos ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);

--The ON DELETE CASCADE clause ensures that all todos belonging to a user will be automatically deleted when the user is deleted from the users table.
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE shared_todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_id INT,
  shared_with_id INT,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Share todo 
-- Assuming that the todo you want to share has an id of 1
INSERT INTO shared_todos (todo_id, user_id)
VALUES (16, 2);

-- Insert two users into the users table
INSERT INTO users (name, email, password) VALUES ('Beto', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Alberto', 'user2@example.com', 'password2');

-- Insert todos into the todos table, associated with the first user
INSERT INTO todos (title, user_id) 
VALUES 
("🏃‍♀️ Go for a morning run 🌄", 1),
("💻 Work on project presentation 💼", 1),
("🛒 Go grocery shopping 🛍️", 1),
("📚 Read 30 pages of book 📖", 1),
("🚴‍♂️ Ride bike to the park 🌳", 1),
("🍲 Cook dinner for family 🍴", 1),
("💆‍♂️ Practice yoga 🧘‍♂️", 1),
("🎧 Listen to a podcast 🎤", 1),
("🧹 Clean the house 🧼", 1),
("🛌 Get 8 hours of sleep 💤", 1);


-- share todo 1 of user 1 with user 2
INSERT INTO shared_todos (todo_id, user_id, shared_with_id) VALUES (1, 1, 2);

-- delete todo
DELETE FROM todos WHERE id = 1;

-- delete all todos
DELETE FROM todos;

-- delete database
DROP DATABASE todo_app;

-- Get todos of user 2, using a join
-- Get the shared todos for user 2
SELECT todos.* -- Select all columns from the todos table
FROM todos 
JOIN shared_todos ON todos.id = shared_todos.todo_id -- Join with the shared_todos table using the todo_id
WHERE shared_todos.user_id = 2; -- Filter only the shared todos assigned to user 2


-- Get todos including shared todos by id
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id];

