const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.API_KEY;

app.get("/cities", async (req, res) => {
  try {
    const response = await axios.get(
      "https://weather.indianapi.in/india/cities",
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch cities",
      details: err.response?.data || err.message,
    });
  }
});

app.get("/weather/:cityId", async (req, res) => {
  const { cityId } = req.params;

  try {
    const response = await axios.get(
      `https://weather.indianapi.in/weather?city_id=${cityId}`,
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch weather",
      details: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);