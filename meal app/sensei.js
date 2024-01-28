const mealDiv = document.getElementById("fav-meals");
const reloadBtn = document.getElementById("reload");
const FavMealList = document.getElementById("favourite-meals");
const searchbtn = document.getElementById("search");
const input = document.getElementById("Inputvalue");
const mealInfoContainer = document.getElementById("meal-info-container");
const mealInfo = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

getRandomMeals();

reloadBtn.onclick = () => location.reload();

async function getRandomMeals() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await response.json();
  const randomMeal = responseData.meals[0];
  console.log(randomMeal);
  console.log(randomMeal.strMealThumb);
  console.log(randomMeal.strMeal);
  addMeal(randomMeal, true);
}

function getMealsBySearch(term) {
  fetch("https:www.themealdb.com/api/json/v1/1/search.php?s=" + term)
    .then((response) => response.json())
    .then((json) => {
      mealDiv.innerHTML = "";
      const meals = json.meals;
      if (meals) {
        meals.forEach((meal) => {
          addMeal(meal, true);
        });
      }
    });
}

async function getMealsById(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseData = await response.json();
  const MealById = responseData.meals[0];
  // console.log(MealById);

  return MealById;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `<div class="meal-header" id="meal-header">
    ${random ? `<span class="random" id="random">Random Recipe</span>` : ""}
    <img class='mealImg' src="${mealData.strMealThumb}"
         alt="${mealData.strMeal}"/></div>
     <div class="meal-body">
       <h4>${mealData.strMeal}</h4>
       <button class="fav-btn" id="fav-btn">
         <i class="fas fa-heart"></i>
       </button>  </div>`;
  mealDiv.appendChild(meal);
  const mealImage = meal.querySelector(".mealImg");
  mealImage.onclick = () => showInfo(mealData);
  const RandomRecipebtn = meal.querySelector(".random");
  RandomRecipebtn.onclick = () => {
    meal.innerHTML = "";
    getRandomMeals();
  };
  const favBtn = meal.querySelector(".meal-body .fav-btn");
  favBtn.onclick = () => {
    if (favBtn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      favBtn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      favBtn.classList.add("active");
    }
    fetchFavMeals();
  };
}
function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}
fetchFavMeals();

async function fetchFavMeals() {
  FavMealList.innerHTML = "";
  const mealIds = getMealsLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealsById(mealId);
    // console.log(meal);
    addMealToFav(meal);
  }
}
function addMealToFav(mealData) {
  const mealLi = document.createElement("li");

  FavMealList.appendChild(mealLi);
  mealLi.innerHTML = `<img class='liImage' src="${mealData.strMealThumb}" alt="${mealData.strMeal}"  /><span class='liSpan'>${mealData.strMeal}</span><br><button class = "clear"><i class="fas fa-window-close" aria-hidden="true"></i>
  </button>`;
  const clearBtn = mealLi.querySelector(".clear");
  clearBtn.onclick = () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  };
  const liImage = mealLi.querySelector(".liImage");
  liImage.onclick = () => showInfo(mealData);
  const liSpan = mealLi.querySelector(".liSpan");
  liSpan.onclick = () => showInfo(mealData);
}
searchbtn.onclick = () => {
  const term = input.value;
  getMealsBySearch(term);
};
// input.addEventListener("input", (e) => {
//   const { value } = e.target;
//   getMealsBySearch(value);
// });

const showInfo = (mealData) => {
  mealInfo.innerHTML = "";
  const mealInfoDiv = document.createElement("div");
  mealInfoDiv.classList.add("mealInfoDiv");
  mealInfo.appendChild(mealInfoDiv);
  const ingredient = [];
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredient.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealInfoDiv.innerHTML = `
  <h1>${mealData.strMeal}</h1>
  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  />
  <p><h3>Instructions</h3>${mealData.strInstructions}
  </p><h3>Ingredients</h3>
  <ul>${ingredient.map((ing) => `<li>${ing}</li>`).join("")}</ul>`;

  mealInfoContainer.classList.remove("hidden");
};

popupCloseBtn.onclick = () => {
  mealInfoContainer.classList.add("hidden");
};
