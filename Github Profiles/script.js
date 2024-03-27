const input = document.getElementById("input");
const searchBtn = document.getElementById("search");
const main = document.getElementById("main");
const reposDiv = document.getElementById("reposDiv");

const APIURL = "https://api.github.com/users/";
const accessToken =
  "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";


showData = (parameter) => {
  main.innerHTML = `<div class="container-fluid">
  <div class="row">
    <div class="col-4">
      <img src="${parameter.avatar_url}" alt="">
    </div>
    <div class="col-8">
      <h1>${parameter.name}</h1>
      <h6>${parameter.login}</h6>
      <span>${parameter.location}</span>
      <p>${parameter.bio}</p>
    </div>
    <div class="row">
    <ul id="ul">
      <li>Following<br>${parameter.following}</li>
      <li>Followers<br>${parameter.followers}</li>
      <li>Public Repos<br>${parameter.public_repos}</li>
    </ul>
  </div>
  </div>
  
</div>`;
};
showRepos = (parameter) => {
  fetch(APIURL + parameter + "/repos", {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element) => {
        if (element) {
          console.log(element);
          const repo = document.createElement("a");
          repo.href = element.html_url;
          repo.innerHTML = `<button>${element.name}</button>`;
          repo.target = "_blank";
          reposDiv.appendChild(repo);
        }
      });
    });
};
searchBtn.onclick=()=>{
  fetch(APIURL + input.value, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      showData(json);
    });
  showRepos(input.value)
}