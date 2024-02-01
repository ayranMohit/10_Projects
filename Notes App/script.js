//console.log("Connected To Notes App");
let count = Number(0);
const addNotebtn = document.getElementById("addNote");
const notesArray = JSON.parse(localStorage.getItem("notes"));

if (notesArray) {
  notesArray.forEach((note) => {
    console.log(note);
    addNewNote(note);
  });
}
addNotebtn.onclick = () => {
  addNewNote();
};
function addNewNote(note = "") {
  count += 1;
  const maincontainer = document.createElement("div");
  maincontainer.classList.add("maincontainer");
  maincontainer.innerHTML = `<div id="container" class="container">
  <div id="tools" class="tools">
  <span class="toolsSpan">Note No-${count}</span>
    <button id="edit" class="edit"><i class="fas fa-edit"></i></button>
    <button id="delete" class="delete">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
  <div id="main" class="main ${
    note ? "" : "hidden"
  }" >Click Edit Button To Write</div>
  <textarea name="textarea" id="textarea" class="textarea ${
    note ? "hidden" : ""
  } "></textarea> </div>`;
  document.body.appendChild(maincontainer);
  const editBtn = maincontainer.querySelector(".edit");
  //console.log(editBtn);
  editBtn.onclick = () => {
    textAreaDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  };
  const textAreaDiv = maincontainer.querySelector(".main");
  const textArea = maincontainer.querySelector(".textarea");
  // console.log(textArea);
  textArea.innerHTML = note;
  textAreaDiv.innerHTML = marked(note);

  textArea.addEventListener("input", (e) => {
    updateLs();
    const { value } = e.target;
    textAreaDiv.innerHTML = marked(value);
  });
  const deleteBtn = maincontainer.querySelector(".delete");
  deleteBtn.onclick = () => {
    maincontainer.remove();
    localStorage.removeItem("notes", JSON.stringify(textArea.value));
    updateLs();
  };
}

updateLs = () => {
  const noteText = document.querySelectorAll("textarea");
  console.log(noteText);
  const notesArray = [];
  noteText.forEach((note) => {
    notesArray.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notesArray));
};
