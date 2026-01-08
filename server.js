const express = require("express");
const app = express();
const crypto = require("crypto");
require('dotenv').config()


const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded())


app.get("/", (req, res) => {
  res.send("server running");
});


let arr = [];

app.get("/api/todo", (req, res) => {
  res.send({
    success: true,
    records: arr
  });
});

app.get("/api/todo/:id", (req, res) => {
  const user = arr.find(ele => ele.id === req.params.id);

  res.send({
    success: true,
    records: user
  });
});


app.post("/api/todo", (req, res) => {
  const { name, email, degree, status } = req.body;

  arr.push({ id: crypto.randomUUID(), name, email, degree, status });

  res.send({
    success: true,
    message: "To-Do Added"
  });
});

app.delete("/api/todo/:userId", (req, res) => {
  const { userId } = req.params;

  const filterData = arr.filter(ele => ele.id !== userId);
  arr = filterData;

  res.send({
    success: true,
    message: "To-Do has been deleted"
  });
});

app.put("/api/todo", (req, res) => {
  const { id } = req.query
  const { name, email, degree, status } = req.body

  const index = arr.findIndex(ele => ele.id === id)
  if (index != -1) {
    arr[index] = { id, name, email, degree, status }
  }

  res.send({
    success: true,
    message: "To-Do has been updated"
  })
})


app.listen(PORT, () => {
  console.log(`To-Do Server running on http://localhost:${PORT}`);
});