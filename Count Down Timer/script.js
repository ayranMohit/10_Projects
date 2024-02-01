console.log("connected to countdown Project");
const daysDiv = document.getElementById("days");
const hoursDiv = document.getElementById("hours");
const mintesDiv = document.getElementById("minutes");
const secondsDiv = document.getElementById("seconds");

const newYears = "1 jan 2025";

function countdown() {
  const newYearsDate = new Date(newYears);
  const cuurentDate = new Date();
  console.log(newYearsDate - cuurentDate);
  const totalLeft = Math.floor((newYearsDate - cuurentDate) / 1000);
  const days = Math.floor(totalLeft / 3600 / 24);
  const hours = Math.floor((totalLeft / 3600 / 24) % 24);
  const minutes = Math.floor((totalLeft / 60) % 60);
  const seconds = Math.floor(totalLeft % 60);

  // console.log({cuurentDate});
  // console.log({days});
  // console.log({hours});
  // console.log({minutes});
  // console.log({seconds});
  // console.log(newYearsDate-cuurentDate);
  daysDiv.innerText = formatTime(days);
  hoursDiv.innerText = formatTime(hours);
  mintesDiv.innerText = formatTime(minutes);
  secondsDiv.innerText = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
//initial call
countdown();

setInterval(countdown, 1000);
