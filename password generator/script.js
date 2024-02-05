const resultSpan = document.getElementById("result");
const copyBtn = document.getElementById("copy");
const lengthInp = document.getElementById("length");
const upperCaseInp = document.getElementById("upperCase");
const lowerCaseInp = document.getElementById("lowerCase");
const numberInp = document.getElementById("number");
const symbolInp = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
lengthInp.addEventListener("change", () => {
  console.log(lengthInp.value);
});
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+/?";

getUpperCase = () => {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
};
getLowerCase = () => {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
};
getNumber = () => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};
getSymbol = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

generatePass = () => {
  let password = "";
  let shuffledPassword = "";
  for (let i = 0; i < lengthInp.value; i++) {
    if (upperCaseInp.checked) {
      password += getUpperCase();
    }
    if (lowerCaseInp.checked) {
      password += getLowerCase();
    }
    if (numberInp.checked) {
      password += getNumber();
    }
    if (symbolInp.checked) {
      password += getSymbol();
    }
  }
  for (let i = 0; i < lengthInp.value; i++) {
    if (password) {
      let pass = password[Math.floor(Math.random() * lengthInp.value)];
      shuffledPassword += pass;
    }
  }
  console.log(shuffledPassword.length);
  resultSpan.innerText = shuffledPassword;
};

generateBtn.onclick = () => {
  generatePass();
};

copyBtn.onclick = () => {
  const textArea = document.createElement("textarea");
  if (resultSpan.innerText) {
    textArea.value = resultSpan.innerText;
  }
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  textArea.remove
  alert("Password is copied to Clipboard")
};
