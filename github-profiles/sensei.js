const input = document.getElementById("input");
const form = document.getElementById("form");
const main = document.getElementById("main");
const APIURL = "https://api.github.com/users/";

// fetch(APIURL + "florinpop17")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//   });

fetchingUrl = (parameter) => {
  fetch(APIURL + parameter, { Origin: "cors" })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      showingResult(json);
    });
};
showingResult = (parameter) => {
  main.innerHTML = `<div id="mainDiv"><div id="firstDiv"><div id="imgDiv"><img src="${parameter.avatar_url}" alt="${parameter.name}"></div><div id="infoDiv"><h1>${parameter.name}</h1>
  <h3>${parameter.login}</h3>
  <span>${parameter.location}</span>
  <p>${parameter.bio}</p>
  <ul>
    <li>Following<br>${parameter.following}</li>
    <li>Followers<br>${parameter.followers}</li>
    <li>Public Repos<br>${parameter.public_repos}</li>
  </ul></div></div></div>`;
};

input.addEventListener("input", (e) => {
  e.preventDefault();
  fetchingUrl(input.value);
  // updateRepos(input.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchingUrl(input.value);
  // updateRepos(input.value);
  input.value = "";
});

updateRepos = (parameter) => {
  const reposDiv = document.createElement("div");
  reposDiv.classList.add("reposDiv");

  // const reposDiv = document.getElementById("reposDiv");
  // console.log(reposDiv);
  fetch(APIURL + parameter + "/repos")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element) => {
        if (element) {
          // console.log(element);
          const repo = document.createElement("a");
          repo.href = element.html_url;
          repo.target = "_blank";
          repo.innerText = element.name;
          reposDiv.appendChild(repo);
          console.log(repo);
        }
      });
    });
  console.log(reposDiv);
  main.innerHTML += reposDiv;
};

