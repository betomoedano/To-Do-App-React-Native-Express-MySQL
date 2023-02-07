import express from "express";
import { getTodo, getTodosByID, createTodo } from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";

const corsOptions = {
  origin: "http://127.0.0.1:5173", // specify the allowed origin
  methods: ["POST", "GET"], // specify the allowed methods
  credentials: true, // allow sending credentials (cookies, authentication)
};

const developers = [
  { id: 1, name: "John Doe", apiKey: "abcdef123456" },
  { id: 2, name: "Jane Doe", apiKey: "ghijkl789012" },
];

const ckeckApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const developer = developers.find((d) => d.apiKey === apiKey); //check if we have a dev with that key
  if (!developer) {
    return res.status(401).json({ message: "Unauthorized, invalid Api Key" });
  }
  req.developer = developer;
  next();
};

const app = express();
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions));
app.use(ckeckApiKey);

app.get("/todos/:id", async (req, res) => {
  const todos = await getTodosByID(req.params.id);
  res.status(200).send(todos);
});

// app.get("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const todo = await getTodo(id);
//   res.status(200).send(todo);
// });

app.post("/todos", async (req, res) => {
  console.log(req.body);
  const { user_id, title } = req.body;
  const todo = await createTodo(user_id, title);
  res.status(201).send(todo);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

////////////////////////////////////////////////////////////////////
