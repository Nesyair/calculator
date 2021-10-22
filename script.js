let displayText = "";
const display_div = document.querySelector("div.display");

let numberButtons = document.getElementsByClassName("number-button");
numberButtons = Array.from(numberButtons);

let operationButtons = document.getElementsByClassName("operation-button");
operationButtons = Array.from(operationButtons);

let context = document.querySelectorAll("body");

let saved = [];
let savedOperations = [];
let currentNumber = "";
let currentOperation = "";

context.forEach(element => {
    element.addEventListener("keypress", function(event) {
        //alert(event.key + " " + isNaN(event.key).toString());
        if((!isNaN(event.key)) || event.key == ".") {
            // [ressed a button or dot]
            numberOrDot(event.key)

        } else if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/" || event.key == "Enter") {
            // Presed an operator or enter
            operatorOrEnter(event.key)
        }
    })
})

function numberOrDot(char) {
    if(char == "." && currentNumber.includes(".")) {

    } else {
        if(currentOperation !== "") {
            savedOperations.push(currentOperation);
            currentOperation = "";
            currentNumber = ""
        }
        currentNumber = currentNumber + char;
        displayText = displayText + char;
    }

    if (saved.length == 1 && savedOperations.length == 1){
        displayText = saved[0] + savedOperations[0] + currentNumber;
    }
    
    changeDisplay(displayText);
}

function operatorOrEnter(char) {
    if(displayText == "" || currentNumber == "") {

    }  else if (char == "=" || char == "Enter") {
        saved.push(currentNumber)
        currentNumber = "";
        doMath();
        saved.pop();
    } else if(char == "C") {
        clear()
       
    } else {

        saved.push(currentNumber)

        currentNumber = "";
        currentOperation = char
        displayText = displayText + char;
        changeDisplay(displayText);

        if (saved.length == 2 && savedOperations.length == 1){
            doMath();
        }
        
    }
}

numberButtons.forEach(element => {
    element.addEventListener("click", function() {
        if(element.textContent == "." && currentNumber.includes(".")) {

        } else {
            if(currentOperation !== "") {
                savedOperations.push(currentOperation);
                currentOperation = "";
                currentNumber = ""
            }
            currentNumber = currentNumber + element.textContent;
            displayText = displayText + element.textContent;
        }

        if (saved.length == 1 && savedOperations.length == 1){
            displayText = saved[0] + savedOperations[0] + currentNumber;
        }
        
        changeDisplay(displayText);
    })
});

operationButtons.forEach(element => {
    element.addEventListener("click", function(e) {
        
        if(displayText == "" || currentNumber == "") {

        }  else if (element.textContent == "=") {
            saved.push(currentNumber)
            currentNumber = "";
            doMath();
            saved.pop();
        } else if(element.textContent == "C") {
            clear()
            e.target.blur();
        } else {

            saved.push(currentNumber)

            currentNumber = "";
            currentOperation = element.textContent
            displayText = displayText + element.textContent;
            changeDisplay(displayText);

            if (saved.length == 2 && savedOperations.length == 1){
                doMath();
            }
            
        }
    })
})

function changeDisplay(text) {
    display_div.textContent = text
} 

function doMath() {
    let num1, num2, operator;

    while(saved.length > 0 && savedOperations.length > 0) {
        num1 = Number(saved.shift());
        operator = savedOperations.shift();
        num2 = Number(saved.shift());

        if(operator == "/" && num2 == 0) {
            clear();
            changeDisplay("Cannot divide by 0")
            return;
        }

        saved.unshift(operate(operator, num1, num2))
    }
    displayText = saved[0];
    currentNumber = saved[0]
    
    changeDisplay(displayText)
}

function operate(operator, num1, num2) {
    let result = 0;
    switch(operator) {
        case "+":
            result = add(num1, num2);
            break;

        case "-":
            result = subtract(num1, num2);
            break;

        case "*":
            result = multiply(num1, num2);
            break;

        case "/":
            result = divide(num1, num2);
            break;

    }

    return result;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function clear() {
    displayText = ""
    saved = [];
    savedOperations = [];
    currentNumber = "";
    currentOperation = "";
    changeDisplay(0);
}

changeDisplay("0")