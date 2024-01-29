console.log("connected to Movie App");
const container = document.getElementById("container");
const secondContainer = document.createElement("div");
secondContainer.classList.add("secondContainer");
container.appendChild(secondContainer);
const serchinput = document.getElementById("serchinput");
const resultHeader = document.getElementById("resultHeader");

const baseURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const imgPATH = "https://image.tmdb.org/t/p/w1280";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

serchinput.addEventListener("input", (e) => {
  e.preventDefault();
  const name = serchinput.value;
  console.log(name);
  fetch(searchURL + name)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.results);
      secondContainer.innerHTML = "";
      const resultArray = json.results;
      addingMovies(resultArray);
      resultHeader.innerHTML = `<span>Searched For "${name}"</span>`;
    });
    if (name === "") {
      resultHeader.remove()
      location.reload()
    }
});
fetchURL = async () => {
  const response = await fetch(baseURL);
  const responsedata = await response.json();
  return responsedata.results;
};
addBaseMovies = async () => {
  const resultArray = await fetchURL();
  addingMovies(resultArray);
};
addBaseMovies();
function addingMovies(parameter) {
  parameter.forEach((result) => {
    const baseMovies = document.createElement("div");
    baseMovies.classList.add("base-Movies");
    baseMovies.innerHTML = `
    <img
      src="${imgPATH + result.poster_path}" alt="${result.title}"
    />
    <div class="movie-info">
      <h2>${result.title}</h2>
      <span class="movie-rating" id="movie-rating">${result.vote_average}</span>
    </div>
  `;
    imgBtn = baseMovies.querySelector("img");
    imgBtn.onclick = () => {
      secondContainer.classList.toggle("hidden");
      movieDetails(result);
    };
    h2Btn = baseMovies.querySelector("h2");
    h2Btn.onclick = () => {
      secondContainer.style.display = "none";
      movieDetails(result);
    };
    secondContainer.appendChild(baseMovies);
  });
}
function movieDetails(parameter) {
  const movieDetailsDiv = document.createElement("div");
  movieDetailsDiv.classList.add("movieDetails");
  movieDetailsDiv.innerHTML = `<div class="movieDetails">
  <div id="imgDiv" class="imgDiv">
    <img src="${imgPATH + parameter.poster_path}" alt="${parameter.title}">
    <div id="detailsInfo" class="detailsInfo">
      <h1 id="Movie-Tittle" class="Movie-Tittle">${
        parameter.title
      }<span id="original-title" class="original-title">(${
    parameter.original_title
  })</span></h1>
  <h4>${parameter.vote_average}</h4>
      <h3 id="release-Date" class="release-Date">Released On :  ${
        parameter.release_date
      }</h3>
      <h3 id="language" class="language">Language "${
        parameter.original_language
      }"</h3>
      <p class="overview" id="overview">${parameter.overview}</p>
    </div>
    <button class="close" ><i class="fas fa-window-close"></i></button>
    </div>
  <img id="detailsImg" class="detailsImg" src="${
    imgPATH + parameter.backdrop_path
  }" alt="${parameter.title}">
  <video src=""></video>
  </div>`;
  const closebtn = movieDetailsDiv.querySelector("button");
  closebtn.onclick = () => {
    secondContainer.classList.remove("hidden");
    movieDetailsDiv.classList.toggle("hidden");
    if () {
      
    }
  };
  container.appendChild(movieDetailsDiv);
}
