const express = require("express");
const formidableMiddleware = require("express-formidable");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidableMiddleware());

app.get("/characters", async (req, res) => {
  try {
    const characters = await axios.get(
      "https://lereacteur-marvel-api.netlify.app/characters"
    );
    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const comics = await axios.get(
      `https://lereacteur-marvel-api.netlify.app/comics?apikey=${process.env.API_KEY}`
    );
    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", function (req, res) {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server has started");
});
