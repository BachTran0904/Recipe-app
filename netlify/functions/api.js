const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const api = express();
const router = express.Router();

// Middleware
api.use(cors());
api.use(express.json());

// Recipe endpoint
router.get("/recipes", async (req, res) => {
  const { diet, ingredients } = req.query;

  if (!diet || !ingredients) {
    return res.status(400).json({ error: "Diet and ingredients are required." });
  }

  try {
    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        diet,
        includeIngredients: ingredients,
        apiKey: process.env.SPOONACULAR_API_KEY, // Ensure this is set in your .env file
        number: 10, // Limit to 10 recipes
      },
    });
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

// Use the router
api.use("/api/", router);

// Export the serverless function
module.exports.handler = serverless(api);
