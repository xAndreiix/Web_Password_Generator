const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercasedEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const downloadBtn = document.getElementById("download");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBER = "0123456789";
const SYMBOL = "!@#$%^&*()_+{}[]<>?";

function generatePassword() {
  let chars = "";
  if (uppercaseEl.checked) chars += UPPER;
  if (lowercasedEl.checked) chars += LOWER;
  if (numbersEl.checked) chars += NUMBER;
  if (symbolsEl.checked) chars += SYMBOL;

  const length = +lengthEl.value;
  let pwd = "";

  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordEl.value = pwd;
  checkStrength(pwd);
}

function checkStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const strength = ["red", "orange", "yellow", "lightgreen", "#38bdf8"];
  const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];

  strengthBar.style.width = `${score * 25}%`;
  strengthBar.style.background = strength[score];
  strengthText.innerText = `Strength: ${labels[score]}`;
  strengthText.style.color = strength[score];
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  passwordEl.select();
  document.execCommand("copy");
  alert("Password copied!");
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([passwordEl.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "password.txt";
  link.click();
});

[lengthEl, uppercaseEl, lowercasedEl, numbersEl, symbolsEl].forEach((el) => {
  el.addEventListener("change", generatePassword);
});

generatePassword();
