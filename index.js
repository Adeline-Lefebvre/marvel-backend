const express = require("express");
const formidableMiddleware = require("express-formidable");
const app = express();
app.use(formidableMiddleware());

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.post("/", (req, res) => {
  try {
    console.log(req.fields);
    const newStudent = req.fields.name;
    students.push(newStudent);
    res.json(students);
  } catch (error) {
    console.log(error.message);
  }
});

app.all("*", function (req, res) {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server has started");
});
