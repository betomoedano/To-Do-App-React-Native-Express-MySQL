import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTodosByID(id) {
  const [rows] = await pool.query(
    `
    SELECT todos.*, shared_todos.shared_with_id
    FROM todos
    LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
    WHERE todos.user_id = ${id} OR shared_todos.shared_with_id = ${id} 
  `
  );
  return rows;
}

export async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

export async function createTodo(title, notes) {
  const [result] = await pool.query(
    `
    INSERT INTO todos (title, notes)
    VALUES (?, ?)
  `,
    [title, notes]
  );
  const id = result.insertId;
  return getTodo(id);
}

/**
 * Tests for development
 */
// console.log(await createTodo("test", "test"));

// const todos = await getTodos();
// console.log(todos);

// const todoByID = await getTodo(2);
// console.log(todoByID);
