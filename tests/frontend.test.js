import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, "../Frontend/index.html"), "utf8");

describe("Recipe Recommender UI", () => {
  let dom, document;

  beforeEach(() => {
    // Create a DOM instance
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it("should have a title", () => {
    const title = document.querySelector("h1");
    expect(title).not.toBeNull();
    expect(title.textContent).toBe("Recipe Recommender");
  });

  it("should have a form with the correct ID", () => {
    const form = document.querySelector("#recipe-form");
    expect(form).not.toBeNull();
  });

  it("should have a diet select input with options", () => {
    const dietSelect = document.querySelector("#diet");
    expect(dietSelect).not.toBeNull();

    // Check the options
    const options = dietSelect.querySelectorAll("option");
    expect(options.length).toBe(4); // 4 options including the default "Select a diet"
    expect(options[0].value).toBe("");
    expect(options[1].value).toBe("vegetarian");
    expect(options[2].value).toBe("vegan");
    expect(options[3].value).toBe("gluten-free");
  });

  it("should have an ingredients input field", () => {
    const ingredientsInput = document.querySelector("#ingredients");
    expect(ingredientsInput).not.toBeNull();
    expect(ingredientsInput.placeholder).toBe("Enter ingredients (comma-separated)");
    expect(ingredientsInput.required).toBe(true);
  });

  it("should have a submit button with the correct text", () => {
    const submitButton = document.querySelector("button");
    expect(submitButton).not.toBeNull();
    expect(submitButton.textContent).toBe("Get Recipes");
  });

  it("should have a recipe results container", () => {
    const resultsContainer = document.querySelector("#recipe-results");
    expect(resultsContainer).not.toBeNull();
    expect(resultsContainer.classList.contains("recipe-results")).toBe(true);
  });
});