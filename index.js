//We import Express and create our app. The server will listen on port 3000.
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory user "database"
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Middleware to serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// CREATE - POST /users
app.post("/users", (req, res) => {
  const { name } = req.body;
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// READ ALL - GET /users
app.get("/users", (req, res) => {
  res.json(users);
});

// READ ONE - GET /users/:id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// UPDATE - PUT /users/:id
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;
  user.name = name;
  res.json(user);
});

// DELETE - DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
