class Calculator {
    constructor(operandTextElement) {
        this.operandTextElement = operandTextElement;
        this.allClear();
    }

    allClear() {
        this.previousOperand = '';
        this.operand = '0';
        this.operation = undefined;
    }

    delete() {
        if (this.operand.toString().length > 1) {
            this.operand = this.operand.toString().slice(0, -1);
        }
    }

    changeSign() {
        if (this.operand.toString().split('.')[1] > 0) {
            this.operand = parseFloat(this.operand) * -1;
        } else {
            console.log("here");
            this.operand = parseInt(this.operand) * -1;
        }
    }

    appendNumber(number) {
        if (number === '.' && this.operand.toString().includes('.')) return

        if (this.operand.toString().startsWith('0')) {
            this.operand = this.operand.toString().slice(1);
        }
        this.operand = this.operand.toString() + number.toString();
    }

    chooseOperation(operation) {
        this.previousOperand = this.operand;

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.operand = '0';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.operand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current
                if (Math.floor(computation) !== computation) {
                    computation = parseFloat(computation);
                }
                break

            case '-':
                computation = prev - current
                if (Math.floor(computation) !== computation) {
                    computation = parseFloat(computation);
                }
                break

            case 'x':
                computation = prev * current
                if (Math.floor(computation) !== computation) {
                    computation = parseFloat(computation);
                }
                break

            case '/':
                computation = prev / current
                if (Math.floor(computation) !== computation) {
                    computation = parseFloat(computation);
                }
                break
            case '%':
                computation = prev * current / 100;
                break
            default:
                return;
        }

        this.operand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.operandTextElement.innerText = this.getDisplayNumber(this.operand);
    }
}

const numberButtons = document.querySelectorAll("[num-button]");
const operationButtons = document.querySelectorAll("[operation-button]");
const equalsButton = document.querySelector("[equal-button]");
const allClearButton = document.querySelector("[all-clear-button]");
const operandTextElement = document.querySelector("[operand-area]");
const signButton = document.querySelector("[sign-button]");

const calculator = new Calculator(operandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    console.log(button);
    calculator.allClear();
    calculator.updateDisplay();
})


//click number and delete last digit of number
operandTextElement.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

signButton.addEventListener('click', () => {
    calculator.changeSign();
    calculator.updateDisplay();
})
