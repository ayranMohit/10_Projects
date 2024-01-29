console.log("its connected to Movie App");
//Access Getting
const searchInput = document.getElementById("searchInput");
const mainDiv = document.getElementById("main");
// const searchInput = document.getElementById("searchInput")
// const searchInput = document.getElementById("searchInput")
const basicURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPATH = "https://image.tmdb.org/t/p/w1280/";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  mainDiv.innerHTML = "";
  if (searchInput.value) {
    showSearchDetails(searchInput.value);
  } else {
    fetchingbasicURL();
  }
});

fetchingbasicURL = () => {
  fetch(basicURL)
    .then((response) => response.json())
    .then((json) => {
      json.results.forEach((result) => {
        showingBasicSResult(result);
        console.log(result);
        //showMovieDetailes(result)
      });
    });
};
showingBasicSResult = (parameter) => {
  const container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = `<div id="imageDiv"><img src="${
    imgPATH + parameter.poster_path
  }" alt="${
    parameter.title
  }" id="movieIMG"></div><div id="infoDiv"><h1 id="movieH1">${
    parameter.title
  }</h1><span id="movieRATING">${
    parameter.vote_average
  }</span></div><div id="overViewDiv"></div>`;
  mainDiv.appendChild(container);
  const movieIMG = container.querySelector("img")
  const movieH1 = container.querySelector("h1")
  movieIMG.onclick=()=>{
    mainDiv.innerHTML =""
    showMovieDetailes(parameter)
  }
  movieH1.onclick=()=>{
    mainDiv.innerHTML =""
    showMovieDetailes(parameter)
  }
  //console.log(movieIMG);
};
fetchingbasicURL();

showSearchDetails = (parameter) => {
  fetch(searchURL + parameter)
    .then((response) => response.json())
    .then((json) => {
      json.results.forEach((result) => {
        console.log(result);
        showingBasicSResult(result);
      });
    });
};
showMovieDetailes = (parameter) => {
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("detailDiv");
  detailDiv.innerHTML = `<div id="detailsContainer"><button id="closeBtn"><i class="fas fa-window-close"></i></button><div id="firstDetails"><div id="detailImage"><img src="${
    imgPATH + parameter.poster_path
  }" alt="${parameter.title}"></div> <div id="detailsInfo"><h1>${
    parameter.title
  }</h1><h2>Original Title : ${
    parameter.original_title
  }</h2><h3>Release Date : ${
    parameter.release_date
  }</h3><h4>Language : ${
    parameter.original_language
  }</h4><h5>Rating : ${
    parameter.vote_average
  }</h5>Voted : ${
    parameter.vote_count
  }<h5></h5><p>${
    parameter.overview
  }</p></div></div><div id="secondDetails"><img src="${
    imgPATH + parameter.backdrop_path
  }" alt="${parameter.title}"></div></div>`;
  mainDiv.appendChild(detailDiv);
  const closeBtn = detailDiv.querySelector("button")
  closeBtn.onclick=()=>{
    mainDiv.removeChild(detailDiv)
    fetchingbasicURL()
  }
};
