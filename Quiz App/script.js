console.log("connected to Quiz App");

const quizData = [
  {
    question: "who is current prime minister?",
    a: "Obaidul Qader",
    b: "Salman F Rahman",
    c: "Shamim Osman",
    d: "Sheikh Hasina",
    answer: "d",
  },
  {
    question: "What is the capital of Bangladesh?",
    a: "Dhaka",
    b: "Chattogram",
    c: "Sylhet",
    d: "Rajshahi",
    answer: "a",
  },
  {
    question: "What is the total area of Bangladesh?",
    a: "1,47,570 square kilometre",
    b: "1,47,670 square kilometre",
    c: "1,57,670 square kilometre",
    d: "1,47,970 square kilometre",
    answer: "a",
  },
  {
    question: "What is the local zonal area of sea of Bangladesh?",
    a: "11 nautical mile",
    b: "15 nautical mile",
    c: "22 nautical mile",
    d: "12 nautical mile",
    answer: "d",
  },
  {
    question: "What is Bangladeshi local time zone?",
    a: "GMT -6",
    b: "GMT +6",
    c: "GMT +5:40",
    d: "GMT +6:20",
    answer: "b",
  },
  {
    question: "When was the Dhaka University established?",
    a: "1 July 1920",
    b: "1 July 1921",
    c: "1 July 1919",
    d: "1 July 1923",
    answer: "b",
  },
];

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const aText = document.getElementById("a_text");
const bText = document.getElementById("b_text");
const cText = document.getElementById("c_text");
const dText = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const reloadBtn = document.getElementById("reload");
const optionDiv = document.getElementById("optionDiv");

let currentQuiz = 0;
let score = 0;
console.log("lenght ", quizData.length);

function loadQuiz() {
  let currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  aText.innerText = currentQuizData.a;
  bText.innerText = currentQuizData.b;
  cText.innerText = currentQuizData.c;
  dText.innerText = currentQuizData.d;
}
loadQuiz();

submitBtn.onclick = () => {
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      if (currentQuiz < quizData.length) {
        if (answerEl.id == quizData[currentQuiz].answer) {
          score += 1;
          console.log('correct');
        } else {
          score -= 0.5;
          console.log("wrong");
          console.log(quizData[currentQuiz].answer);
        }
        console.log({currentQuiz});
        console.log({score});
        currentQuiz += 1;
        loadQuiz();
        answerEl.checked = false;
        
      } else {
        reloadBtn.style.display = "block";
        reloadBtn.onclick=()=>location.reload()
        submitBtn.style.display = "none";
        questionEl.innerHTML = `Congratulations!`;
        optionDiv.innerHTML = `<p>You have finished all the questions<br>Your Score is <b>${score}/${quizData.length}</b></p>`;
      }
    }
  });
  
};
