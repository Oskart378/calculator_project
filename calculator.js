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


console.log(calculator.operate("*", 2, 8));