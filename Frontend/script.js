document.getElementById('recipe-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const diet = document.getElementById('diet').value;
    const ingredients = document.getElementById('ingredients').value;
  
    if (!diet || !ingredients) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      const response = await fetch(`/api/recipes?diet=${diet}&ingredients=${ingredients}`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch recipes.');
      }
  
      displayRecipes(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch recipes. Please try again.');
    }
});
  
function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = '';
  
    if (recipes.length === 0) {
      resultsContainer.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
      return;
    }
  
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
  
      recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <a href="https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/ /g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
      `;
  
      resultsContainer.appendChild(recipeCard);
    });
}