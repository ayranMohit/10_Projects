console.log("connected to Recipe App");
const randomBtn = document.getElementById("random");
console.log(randomBtn);
const headerDiv = document.getElementById("meal-header");

// async
function getRandomMeals() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((json) => {
      console.log(json.meals[0].strMeal, json.meals[0].strMealThumb),
        (headerDiv.innerHTML += `
       <img
         src="${json.meals[0].strMealThumb}"
         alt="${json.meals[0].strMeal}"/>
     <div class="meal-body">
       <h4>${json.meals[0].strMeal}</h4>
       <button id="fav-btn">
         <i class="fas fa-heart"></i>
       </button>  </div>`);
    });
}
getRandomMeals();

randomBtn.onclick=()=>{
  console.log("its working");
  getRandomMeals()
}

// async function getMealsById(id) {
//   const MealById = await fetch(
//     "www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
//   );
// }

// async function getMealBySearch(term) {
//   const MealBySearch = await fetch(
//     "www.themealdb.com/api/json/v1/1/search.php?s=" + id
//   );
// }
