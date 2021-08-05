const express = require("express");
const formidableMiddleware = require("express-formidable");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

app.get("/characters", async (req, res) => {
  let name = "";
  if (req.query.title) name = `&name=${req.query.title}`;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=100&skip=${req.query.skip}${name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  let title = "";
  if (req.query.title) title = `&title=${req.query.title}`;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&skip=${req.query.skip}${title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
