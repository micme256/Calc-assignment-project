let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let operators = ['+', '/', '-', '*'];

let currentInput = "";
let currentOperator ="";
let previousOperator="";
let previousInput = "";
let result;

function calc(a, b, operator) {
    let result;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
            case '/':
                if (b === 0) {
                    return 'Syntax error: Division by zero';
                }
                result = a / b;
                break;
        default:
            return b;
    }

    if (typeof result === "number") {
        currentInput = result;
    }
    if(result.toString().indexOf('.')===-1 || result.toString().split('.')[1].length <= 3){
        
        return result;
    }
    return result.toFixed(3); 
}

function handleButtonClick(e){
   const value= e.target.textContent.trim();
   checkValueType(value);
}
function checkValueType(value){
   if(numbers.includes(Number(value))){
    currentInput+=value
    displayInput.textContent = previousInput+currentOperator+currentInput;
   }
   else if (value === ".") {
    if (!currentInput.includes(value) && currentInput !=="") {
        currentInput += value;
    }
}

   else if(operators.includes(value)){
    previousOperator=currentOperator;
    previousInput=calc(Number(previousInput), Number(currentInput), previousOperator);
    currentOperator=value;
    currentInput="";
    displayInput.textContent = previousInput+currentOperator+currentInput;
   }
  else if(value==="="){
    result=calc(Number(previousInput), Number(currentInput), currentOperator);
    displayOutput.textContent=result;
    currentInput = "";
    previousInput = "";
    currentOperator = "";
    displayInput.textContent = "";
   }
   else if (value === "CLEAR") {
    currentInput = "";
    previousInput = "";
    currentOperator = "";
    displayInput.textContent = "";
    displayOutput.textContent = "";
    } 
    else if (value === "DELETE") {
        currentInput = currentInput.slice(0, -1);
        displayInput.textContent = currentInput;
    }
    
   
}



let displayOutput = document.querySelector('.output');
let displayInput = document.querySelector('.input');

displayOutput.textContent=result;
displayInput.textContent = currentInput;

//code for keyboard input
function handleKeyboardPress(e){
   const key = document.querySelector(`button[data-key="${e.key}"]`);
   if (!key) return;
   const value = key.textContent.trim();
   checkValueType(value);
   key.classList.add('button-clicked');
}
function removeTransition(e){
    console.log(e)
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('button-clicked');
}

let keys=Array.from(document.querySelectorAll('.key'));
keys.forEach(key=> key.addEventListener('click', handleButtonClick));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', handleKeyboardPress);