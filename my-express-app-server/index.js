const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

const users = [
  { id: 1, name: "Mithila", email: "mithila@gmail.com" },
  { id: 2, name: "Monira", email: "monira@gmail.com" },
  { id: 3, name: "Kamal", email: "kamal@gmail.com" },
];

// routes
app.get("/", (req, res) => {
  res.send("Hi, from server side !!");
});

app.get("/message", (req, res) => {
  res.send({ message: "hello" });
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log("post method called");
  const newuser = req.body;
  // Use the last user's ID and add 1
  newuser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newuser);
  res.status(201).send(newuser); // ✅ Send back the created user
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID from the request URL
  const index = users.findIndex((user) => user.id === id); // Find the index of the user with the given ID
  if (index !== -1) {
    users.splice(index, 1); // If user found, remove from array
    res.send({ success: true, message: `user with id ${id} deleted` }); //send success response
  } else {
    res.status(404).send({ success: false, message: "user not found" }); // If user not found, send error response
  }
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    res.send({ success: true, message: "update success", user });
  } else {
    res.statur(404).send({ success: false, message: "User not Found" });
  }
});



//start server
app.listen(port, () => {
  console.log(`Send data from port: ${port}`);
});
