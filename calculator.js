const calculator = {

    firstOperand: 0,
    secondOperand: 0,
    result: 0,
    operator: null,

    add: (a , b) => a + b,
    substract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    power:(a, b) =>  a ** b,

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
            case "/": 
            if(b == 0)
                this.result = "ERROR";
            else
                this.result = this.divide(a ,b);
            break;
            case "^": this.result = this.power(a, b);
            break;
            default:
                break;
        }

        return this.result;
    }

};

let currentValue = "";
let input = "";
const bufferValue = document.querySelector(".buffer");
const inputValue = document.querySelector(".input");
let expectingSecondOperand = false;


function initializeCalculatorUI() {

    const numericPad = document.querySelector(".numeric-pad");
    const operatorsPad = document.querySelector(".operators-pad");
    const operatorsChars = ["+", "-", "*", "/"];
    const bottomOperators = [".", "0", "="];
    
    inputValue.textContent = 0;

    for(let operator of bottomOperators) {
        const operatorBtn = document.createElement("div");
        operatorBtn.classList.add("numeric-btn");
        operatorBtn.textContent = operator;
        numericPad.appendChild(operatorBtn);
        operatorBtn.addEventListener("click", handleNumberBtns);
    }

    for (let i = 1; i <= 10; i++) {

        const numericBtn = document.createElement("div");
        numericBtn.classList.add("numeric-btn");
        if(i != 10)
            numericBtn.textContent = i;
        else
            numericBtn.textContent = "^";

        numericBtn.addEventListener("click", handleNumberBtns);
        numericPad.appendChild(numericBtn);
    }


    for(let operator of operatorsChars) {
        const operatorBtn = document.createElement("div");
        operatorBtn.classList.add("numeric-btn");
        operatorBtn.textContent = operator;
        operatorBtn.addEventListener("click", handleNumberBtns);
        operatorsPad.appendChild(operatorBtn);
    }

    for(let operator of ["CLR", "DEL"]) {
        const operatorBtn = document.createElement("div");
        operatorBtn.classList.add("misc-btn");
        operatorBtn.textContent = operator;
        operatorBtn.addEventListener("click", handleNumberBtns);
        numericPad.appendChild(operatorBtn);
    }

}



function handleNumberBtns(event) {

    /*currentValue = event.target.textContent;
    inputValue.textContent = currentValue;*/
    input = event.target.textContent;

    if(!isNaN(Number(input))) {
        currentValue += input;
        inputValue.textContent = Number(currentValue).toString();
    }

    else if(input === "CLR") {
        calculator.firstOperand = 0;
        calculator.secondOperand = 0;
        currentValue = "";
        bufferValue.textContent = "";
        inputValue.textContent = "0";
        calculator.operator = null;
        expectingSecondOperand = false;
    } 

    else if (input === "DEL") {

        if (currentValue === "0" || currentValue === "") return;

        else if(currentValue.length === 1){
            currentValue = 0;
            inputValue.textContent = 0;
        }

        else {
            currentValue = currentValue.substring(0, currentValue.length-1);
        inputValue.textContent = currentValue;
        }
        
    }
    

    else if (input === "="){
        if (!expectingSecondOperand || currentValue === "") return;

        calculator.secondOperand = Number(currentValue);
        const result = calculator.operate(
            calculator.operator,
            calculator.firstOperand,
            calculator.secondOperand
        );
        inputValue.textContent = result;
        bufferValue.textContent = `${calculator.firstOperand} ${calculator.operator} ${calculator.secondOperand} =`;

        currentValue = String(result); // allow chaining
        expectingSecondOperand = false;

    }


    else if (["+", "-", "*", "/", "^"].includes(input)) {

        // If just finished an operation and want to continue chaining
        if (expectingSecondOperand && currentValue === "") {
            calculator.operator = input;
            bufferValue.textContent = calculator.firstOperand + " " + input;
            return;
        }
    
        // If there's a current input, but also already expecting a second operand (user is chaining ops)
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
            calculator.operator = input;
            bufferValue.textContent = result + " " + input;
            inputValue.textContent = "0";
        } else {
            calculator.firstOperand = Number(currentValue || inputValue.textContent);
            calculator.operator = input;
            bufferValue.textContent = calculator.firstOperand + " " + input;
            inputValue.textContent = "0";
            currentValue = "";
            expectingSecondOperand = true;
        }
    }

    else if (input === "." && !currentValue.includes(".")) {
        inputValue.textContent += ".";
        currentValue += input;
    }

}


initializeCalculatorUI();

console.log(calculator.operate("*", 2, 8));