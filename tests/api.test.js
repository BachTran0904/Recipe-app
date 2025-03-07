import request from "supertest";
import { handler } from "../netlify/functions/api.js"; // Adjust the path to your handler

describe("Recipe API", () => {
  it("should return recipe data for valid diet and ingredients", async () => {
    const res = await request(handler)
      .get("/api/recipes")
      .query({ diet: "vegetarian", ingredients: "tomato,cheese" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Assuming the response is an array of recipes
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("image");
  });

  it("should return an error for missing diet", async () => {
    const res = await request(handler)
      .get("/api/recipes")
      .query({ ingredients: "tomato,cheese" }); // Missing diet

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Diet and ingredients are required.");
  });

  it("should return an error for missing ingredients", async () => {
    const res = await request(handler)
      .get("/api/recipes")
      .query({ diet: "vegetarian" }); // Missing ingredients

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Diet and ingredients are required.");
  });

  it("should return an error for invalid API key or Spoonacular API failure", async () => {
    const res = await request(handler)
      .get("/api/recipes")
      .query({ diet: "invalid", ingredients: "invalid" }); // Invalid query

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Failed to fetch recipes.");
  });
});