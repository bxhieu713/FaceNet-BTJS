let previousOperand = "";
let currentOperand = "";
let previousOperator = "";
let currentOperator = "";
let result = "";

let displayInput = document.querySelector(".display-input");
let displayOutput = document.querySelector(".display-output");

let allClear = document.querySelector(".all-clear");
let delete_1 = document.querySelector(".delete");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");

numbers.forEach(function (number) {
  number.onclick = function () {
    appendNumber(number.innerText);
  };
});

delete_1.onclick = function () {
  deleteLastEntry();
};

allClear.onclick = function () {
  clearDisplay();
};

operators.forEach(function (operator) {
  operator.onclick = function () {
    chooseOperator(operator.innerText);
  };
});

equals.onclick = function () {
  handleEquals();
};

function appendNumber(number) {
  if (number === "." && displayOutput.innerText.includes(".")) return;
  if (number === "+/-") changeSign();
  else {
    if (displayOutput.innerText === "0") {
      if (number === ".") {
        displayOutput.append(number);
      } else {
        displayOutput.innerText = number;
      }
    } else {
      displayOutput.append(number);
    }
  }
}

function changeSign() {
  return (displayOutput.innerText = displayOutput.innerText * -1);
}

function clearDisplay() {
  displayInput.innerText = "0";
  displayOutput.innerText = "0";
}

function deleteLastEntry() {
  if (displayOutput.innerText.length === 1) {
    displayOutput.innerText = "0";
  } else {
    displayOutput.innerText = displayOutput.innerText.slice(0, -1);
  }

}

// chọn dấu
function chooseOperator(operator) {

  if (
    displayOutput.innerText === "" ||
    displayOutput.innerText === "-" ||
    displayOutput.innerText === "."
  )
    return;
  if (
    displayOutput.innerText === "0" &&
    (previousOperator === "÷" || previousOperator === "%")
  ) {
    alert("Không thể chia cho 0");
    return;
  }
  if (displayInput.innerText !== "0" && !displayInput.innerText.includes("=")) {
    currentOperand = parseFloat(displayOutput.innerText);
    currentOperator = operator;
    operate(currentOperand, previousOperand, previousOperator);
    displayInterimResult(result);
  } else {
    previousOperator = operator;
    previousOperand = parseFloat(displayOutput.innerText);
    displayInput.innerText = `${previousOperand} ${previousOperator}`;
    displayOutput.innerText = "";
  }
}
// kqua khi nhan dau
let displayInterimResult = (result) => {
  displayInput.innerText = `${result} ${currentOperator}`;
  displayOutput.innerText = "";
  previousOperator = currentOperator;
  previousOperand = result;
};


//equals
function handleEquals() {
    if (displayOutput.innerText === '' ||  displayInput.innerText === '0' ||
         displayInput.innerText.includes('=')) return;
    currentOperand = parseFloat(displayOutput.innerText);
    if (currentOperand === 0 && (previousOperator === '÷' || previousOperator === '%')) {
        alert('Không thể chia cho 0');
        return;
    }
    operate(currentOperand, previousOperand, previousOperator);
    displayEqualsResult(result);
}

let displayEqualsResult = (result) => {
    displayInput.innerText=`${previousOperand} ${previousOperator} ${currentOperand} =`;
    displayOutput.innerText=result;
}

function operate(current, last, operator) {
    switch (operator) {
        case '+':
            add(last, current);
            break;
        case '-':
            substract(last, current);
            break;
        case '×':
            multiply(last, current);
            break;
        case '÷':
            divide(last, current);
            break;
        case '%':
            mode(last, current);
            break;
    }
}

let add = (num1, num2) => result = num1 + num2;
let substract = (num1, num2) => result = num1 - num2;
let multiply = (num1, num2) => result = num1 * num2;
let divide = (num1, num2) => result = num1 / num2;
let mode = (num1, num2) => result = num1 % num2;