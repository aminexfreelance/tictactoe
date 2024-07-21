let input = '';

function clearDisplay() {
    input = '';
    updateDisplay();
}

function appendDigit(digit) {
    input += digit;
    updateDisplay();
}

function appendOperator(operator) {
    input += operator;
    updateDisplay();
}

function computeResult() {
    try {
        const result = eval(input);
        input = result.toString();
        updateDisplay();
    } catch (error) {
        input = 'Error';
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('display').value = input;
}
