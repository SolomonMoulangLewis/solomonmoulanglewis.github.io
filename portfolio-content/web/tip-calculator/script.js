//Calculator on screen Title
const calcTitle = document.querySelector('#heading');

//Number variables
const numberButtons = document.querySelectorAll('[data-number]');
//Decimal Point Variable 
const decimalDot = document.querySelector('#dot');
//AC variable
const allClearButton = document.querySelector('#ac');
//Del Variable
const delPrevButton = document.querySelector('#del');

//Submit variable
const submitButton = document.querySelector('#submit');

//Display Left
const displayLeft = document.querySelector('.input');

//Display Text
var enterBill = "Enter Bill";
var enterTipPercentage = "Enter Tip Percentage";
var tipAmount = "Total Tip";

//Variables store Calculator button numbers
let numberString = ""; //to display
let numbers = []; //to process
let number; //temp

//Variables for tip calculations
let bill = 0;
let tipPerc = 0;
let total = 0;

//Page number variable
//      Although i don't think this was necessary.
let page = 1;


/*
    This is the 'functionality' of the calculator.
*/
//Adding function to submit button
submitButton.addEventListener("click", () => {
    //Switch case statement for 'pages'
    switch (page) {
        case 1: //On page 1 do:
            storeBill();
            calcTitle.innerHTML = enterTipPercentage;
            clear();
            writeToScreen();
            page++;
            break;
        case 2: 
            storePercentage();
            calcTitle.innerHTML = tipAmount;
            calculateTip();
            displayTotal();
    }
});
//Adding function to clear button
allClearButton.addEventListener("click", () => {
    clear();
    //Figuring out issue with function not running
        //console.log(numbers.length);
        //displayLeft.innerHTML = "" 
    writeToScreen();
});
//Adding function to delete button
delPrevButton.addEventListener("click", () => {
    clear();
    writeToScreen();
});

//adding function for dot button
decimalDot.addEventListener("click", () => {
    number = decimalDot.innerText;
    numberString += number.toString();
    numbers.push(number);
    writeToScreen();
});

//Getting 'all' number buttons,
//adding function to each.
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        number = button.innerText;
        numbers.push(number);
        numberString += number.toString()
        writeToScreen();
    });
});

//writes strings, changes innerHTML text
function writeToScreen(){
    for (var i = 0; i < numbers.length + 1; i++){
        displayLeft.innerHTML = numberString;
    }
}

//funtion adds up numbers from array to Bill Variable
function storeBill(){
    for (var i = 0; i < numbers.length; i++) {
        bill += numbers[i];
    }
}

//function adds up numbers from array, stores in percentage variable
function storePercentage(){
    for (var i = 0; i < numbers.length; i++) {
        tipPerc += numbers[i];
    }
}
//Function calculates total tip at the end
function calculateTip(){
    total = ((tipPerc / 100) * bill);
}
//function displays the total
function displayTotal(){
    total.toString();
    displayLeft.innerHTML = total;
}

//Removes ALL elements from string and array
function clear() {
    numberString = "";
    numbers.splice(0, numbers.length);
}

//Removes LAST element 
// - Doesn't seem to work, could you let me know why?
function deletePrev(){
    numbers.pop();
    numberString.slice(0, -3);
}

//Initial calculator title text
window.onload = function() {
    calcTitle.innerHTML = enterBill;
}
