const form = document.getElementById("ToDoForm");
const input = document.getElementById("input");
const ToDoUl = document.getElementById("ToDoUl");
upDateList();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const toDoText = input.value;
  upDateLs(toDoText);
  upDateList();
});
function upDateLs(parameter) {
  const toDoEl = ToDoUl.querySelectorAll("li");
  console.log(toDoEl);
  const TextArray = localStorage.getItem("texts")
    ? JSON.parse(localStorage.getItem("texts"))
    : [];
  TextArray.forEach((text) => {
    text: toDoEl.innerText
    completed: toDoEl.classList.contains("completed");
  });
  localStorage.setItem("texts", JSON.stringify(TextArray));
}
function upDateList() {
  ToDoUl.innerHTML = "";
  const TextArray = JSON.parse(localStorage.getItem("texts"));
  if (TextArray) {
    TextArray.forEach((text) => {
      const ToDoList = document.createElement("li");
      if (text) {
        ToDoList.classList.add("ToDoList");
        ToDoList.innerHTML = `${text} <span class="completedSpan hidden">completed</span>`;
        ToDoUl.appendChild(ToDoList);
      }
      ToDoList.addEventListener("click", (e) => {
        ToDoList.classList.toggle("completed");
        const completed = ToDoList.querySelector("span");
        if (ToDoList.classList.contains("completed")) {
          completed.classList.remove("hidden");
        } else {
          completed.classList.add("hidden");
        }
      });
      ToDoList.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        removels(text);
        console.log("right Click is working ");
      });
    });
  }

  input.value = "";
}
removels = (parameter) => {
  const TextArray = JSON.parse(localStorage.getItem("texts"));
  localStorage.setItem(
    "texts",
    JSON.stringify(TextArray.filter((id) => id !== parameter))
  );
  upDateList();
};
