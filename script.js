const input = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const cardsContainer = document.getElementById("cardsContainer");

async function fetchMeals(country) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    const data = await response.json();

    cardsContainer.innerHTML = "";

    if (!data.meals) {
      cardsContainer.innerHTML = "<p>No meals found for this country.</p>";
      return;
    }

    data.meals.forEach(meal => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    cardsContainer.innerHTML = "<p>Failed to fetch data. Please try again.</p>";
  }
}

searchBtn.addEventListener("click", () => {
  const country = input.value.trim();
  if (country) fetchMeals(country);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const country = input.value.trim();
    if (country) fetchMeals(country);
  }
});
