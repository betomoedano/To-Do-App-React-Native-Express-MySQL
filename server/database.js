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
    WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
  `,
    [id, id]
  );
  return rows;
}

export async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

export async function createTodo(user_id, title) {
  const [result] = await pool.query(
    `
    INSERT INTO todos (user_id, title)
    VALUES (?, ?)
  `,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
}

/**
 * Tests for development
 */
// console.log(await createTodo("test", "test"));

// const todos = await getTodos();
// console.log(todos);

// const todoByID = await getTodo(2);
// console.log(todoByID);
