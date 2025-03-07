import express from "express";
import serverless from "serverless-http";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Recipe endpoint
app.get('/api/recipes', async (req, res) => {
  const { diet, ingredients } = req.query;

  if (!diet || !ingredients) {
    return res.status(400).json({ error: 'Diet and ingredients are required.' });
  }

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        diet,
        includeIngredients: ingredients,
        apiKey: "15a46fd22d804f3c98d440451746da82",
        number: 10, // Limit to 10 recipes
      },
    });
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
