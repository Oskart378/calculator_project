const calculator = {
    firstOperand: 0,
    secondOperand: 0,
    result: 0,
    operator: null,
  
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,  // fixed typo
    multiply: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? "ERROR" : a / b),
    power: (a, b) => a ** b,
  
    operate(operator, a, b) {
      this.firstOperand = a;
      this.secondOperand = b;
  
      switch (operator) {
        case "+":
          this.result = this.add(a, b);
          break;
        case "-":
          this.result = this.subtract(a, b);
          break;
        case "*":
          this.result = this.multiply(a, b);
          break;
        case "/":
          this.result = this.divide(a, b);
          break;
        case "^":
          this.result = this.power(a, b);
          break;
        default:
          this.result = b; // return b if no valid operator
          break;
      }
      return this.result;
    },
  };
  
  let currentValue = "";
  const bufferValue = document.querySelector(".buffer");
  const inputValue = document.querySelector(".input");
  let expectingSecondOperand = false;
  
  function initializeCalculatorUI() {
    const numericPad = document.querySelector(".numeric-pad");
    const operatorsPad = document.querySelector(".operators-pad");
    const docBody = document.querySelector("body");
  
    const bottomOperators = [".", "0", "="];
    const operatorsChars = ["+", "-", "*", "/"];
    const miscButtons = ["CLR", "DEL"];
  
    inputValue.textContent = "0";
  
    // Bottom row (., 0, =)
    bottomOperators.forEach((op) => {
      const btn = createButton(op, "numeric-btn", handleButtonClick);
      numericPad.appendChild(btn);
    });
  
    // Numbers 1-9 + ^ button as 10th button
    for (let i = 1; i <= 10; i++) {
      let label = i === 10 ? "^" : String(i);
      const btn = createButton(label, "numeric-btn", handleButtonClick);
      numericPad.appendChild(btn);
    }
  
    // Operator buttons
    operatorsChars.forEach((op) => {
      const btn = createButton(op, "numeric-btn", handleButtonClick);
      operatorsPad.appendChild(btn);
    });
  
    // Misc buttons CLR and DEL
    miscButtons.forEach((op) => {
      const btn = createButton(op, "misc-btn", handleButtonClick);
      numericPad.appendChild(btn);
    });

    docBody.addEventListener("keydown", keyHandler);
    
  }

  function keyHandler(event) {

    const buttons = document.querySelectorAll("button");
    const foundButton = event.key === "Backspace"? Array.from(buttons).find(btn => btn.textContent === "DEL")
     : event.key === "Enter" ? Array.from(buttons).find(btn => btn.textContent === "="): Array.from(buttons).find(btn => btn.textContent === event.key);

    if(foundButton != null)
        foundButton.dispatchEvent(new Event("click"));
  }
  
  function createButton(text, className, clickHandler) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add(className);
    btn.addEventListener("click", clickHandler);
    return btn;
  }
  
  function handleButtonClick(event) {
    const input = event.target.textContent;
  
    if (!isNaN(Number(input)) && input !== " ") {
      inputNumber(input);
    } else if (input === ".") {
      inputDecimal();
    } else if (input === "CLR") {
      clearAll();
    } else if (input === "DEL") {
      deleteLast();
    } else if (input === "=") {
      calculateResult();
    } else if (["+", "-", "*", "/", "^"].includes(input)) {
      handleOperator(input);
    }
  }
  
  function inputNumber(digit) {
    // If currentValue is "0" (from reset), replace instead of append
    if (currentValue === "0") currentValue = digit;
    else currentValue += digit;
  
    inputValue.textContent = currentValue;
  }
  
  function inputDecimal() {
    if (!currentValue.includes(".")) {
      currentValue = currentValue === "" ? "0." : currentValue + ".";
      inputValue.textContent = currentValue;
    }
  }
  
  function clearAll() {
    calculator.firstOperand = 0;
    calculator.secondOperand = 0;
    calculator.operator = null;
    currentValue = "";
    expectingSecondOperand = false;
    bufferValue.textContent = "";
    inputValue.textContent = "0";
  }
  
  function deleteLast() {
    if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
      inputValue.textContent = currentValue;
    } else {
      currentValue = "";
      inputValue.textContent = "0";
    }
  }
  
  function calculateResult() {
    if (!expectingSecondOperand || currentValue === "") return;
  
    calculator.secondOperand = Number(currentValue);
    const result = calculator.operate(
      calculator.operator,
      calculator.firstOperand,
      calculator.secondOperand
    );
  
    inputValue.textContent = result;
    bufferValue.textContent = `${calculator.firstOperand} ${calculator.operator} ${calculator.secondOperand} =`;
  
    currentValue = String(result);
    expectingSecondOperand = false;
    calculator.operator = null;
  }
  
  function handleOperator(operatorInput) {
    if (expectingSecondOperand && currentValue === "") {
      // Allow operator change before second operand entered
      calculator.operator = operatorInput;
      bufferValue.textContent = `${calculator.firstOperand} ${operatorInput}`;
      return;
    }
  
    if (expectingSecondOperand) {
      calculator.secondOperand = Number(currentValue);
      const result = calculator.operate(
        calculator.operator,
        calculator.firstOperand,
        calculator.secondOperand
      );
  
      inputValue.textContent = result;
      bufferValue.textContent = `${calculator.firstOperand} ${calculator.operator} ${calculator.secondOperand} =`;
  
      calculator.firstOperand = result;
      currentValue = "";
      calculator.operator = operatorInput;
      bufferValue.textContent = `${result} ${operatorInput}`;
      inputValue.textContent = "0";
    } else {
      calculator.firstOperand = Number(currentValue || inputValue.textContent);
      calculator.operator = operatorInput;
      bufferValue.textContent = `${calculator.firstOperand} ${operatorInput}`;
      inputValue.textContent = "0";
      currentValue = "";
      expectingSecondOperand = true;
    }
  }
  
  // Initialize UI after DOM loads
  initializeCalculatorUI();
  
  console.log(calculator.operate("*", 2, 8));
  