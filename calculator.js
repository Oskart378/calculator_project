const calculator = {

    firstOperand: 0,
    secondOperand: 0,
    result: 0,
    operator: "+",

    add: (a , b) => a + b,
    substract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,

    operate(operator, a , b) {

        this.firstOperand = a;
        this.secondOperand = b;
        
        switch(operator) {
            case "+": this.result = this.add(a, b);
            break;
            case "-": this.result = this.substract(a, b);
            break;
            case "*": this.result = this.multiply(a ,b);
            break;
            case "/": this.result = this.divide(a ,b);
        }

        return this.result;
    }

};

function initializeCalculatorUI() {

    const numericPad = document.querySelector(".numeric-pad");
    const operatorsPad = document.querySelector(".operators-pad");
    const operatorsChars = ["+", "-", "*", "/"];
    const bottomOperators = [".", "0", "="];

    for(let operator of bottomOperators) {
        const operatorBtn = document.createElement("div");
        operatorBtn.classList.add("numeric-btn");
        operatorBtn.textContent = operator;
        numericPad.appendChild(operatorBtn);
    }

    for (let i = 1; i < 10; i++) {

        const numericBtn = document.createElement("div");
        numericBtn.classList.add("numeric-btn");
        numericBtn.textContent = i;
        numericPad.appendChild(numericBtn);
    }


    for(let operator of operatorsChars) {
        const operatorBtn = document.createElement("div");
        operatorBtn.classList.add("numeric-btn");
        operatorBtn.textContent = operator;
        operatorsPad.appendChild(operatorBtn);
    }


}

initializeCalculatorUI();

console.log(calculator.operate("*", 2, 8));