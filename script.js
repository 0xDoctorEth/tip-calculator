// Get Elements

const billInput = document.getElementById("bill-input");
const tipInputs = document.querySelectorAll(".radio-container");

const customInput = document.querySelector(".custom");
const peopleInput = document.getElementById("people-input");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const resetButton = document.querySelector(".reset-btn");
const errorMessage = document.querySelector(".error-msg");

function updateResults(tipAmountPerPerson, totalAmountPerPerson) {
  tipAmount.textContent = `${tipAmountPerPerson.toFixed(2)}`;
  totalAmount.textContent = `${totalAmountPerPerson.toFixed(2)}`;

  resetButton.classList.toggle("active");
}

function displayError() {
  errorMessage.classList.add("show");
}

// Calculate tip as user inputs values

function calculateInput(e) {
  e.preventDefault();

  const tipPercentage =
    parseFloat(e.target.textContent.replace("%", "").trim()) / 100;
  const amount = parseFloat(billInput.value);
  const people = peopleInput.value;

  const tipAmountPerPerson = (amount * tipPercentage) / people;
  const totalAmountPerPerson = amount / people + tipAmountPerPerson;

  if (people <= 0) {
    displayError();
  } else {
    updateResults(tipAmountPerPerson, totalAmountPerPerson);
  }
}

// Calculate tip as user enters custom percentage

function handleCustomInput(e) {
  if (e.key === "Enter" && customInput.value !== "") {
    calculateCustomInput();
    return;
  }
}

function calculateCustomInput() {
  const amount = parseFloat(billInput.value);
  const people = peopleInput.value;

  const customInputPercentage = parseFloat(customInput.value) / 100;

  const customInputAmount = (amount * customInputPercentage) / people;
  const totalAmountPerPerson = amount / people + customInputAmount;

  updateResults(customInputAmount, totalAmountPerPerson);
}

// clear results
function resetResult(e) {
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";

  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";

  resetButton.classList.toggle("active");
  errorMessage.classList.remove("show");
}

tipInputs.forEach((inputbtn) => {
  inputbtn.addEventListener("click", calculateInput);
});

resetButton.addEventListener("click", resetResult);
customInput.addEventListener("keydown", handleCustomInput);
