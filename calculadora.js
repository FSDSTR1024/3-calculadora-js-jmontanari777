let primerNumero = '';
let operador = '';
let segundoNumero = '';
let ResetDisplay = false;
let ultimaOperacion = '';
let lastResult = '';

const operationDisplay = document.getElementById('operacion');
const resultDisplay = document.getElementById('result');

function formatNumber(number) {
    // Convertir a número y limitar a 11 decimales
    const num = parseFloat(parseFloat(number).toFixed(11));
    return num.toString();
}

function add(a, b) {
    return formatNumber(a + b);
}

function substract(a, b) {
    return formatNumber(a - b);
}

function product(a, b) {
    return formatNumber(a * b);
}

function division(a, b) {
    if (b === 0) return 'Error';
    return formatNumber(a / b);
}

function clearDisplay() {
    primerNumero = '';
    operador = '';
    segundoNumero = '';
    operationDisplay.textContent = '';
    resultDisplay.textContent = '0';
    ResetDisplay = false;
    ultimaOperacion = '';
    lastResult = '';
}

function backspace() {
    if (ResetDisplay) return;
    
    if (segundoNumero !== '') {
        segundoNumero = segundoNumero.slice(0, -1);
    } else if (operador !== '') {
        operador = '';
    } else if (primerNumero !== '') {
        primerNumero = primerNumero.slice(0, -1);
    }
    
    updateDisplay();
}

function addNumber(num) {
    if (ResetDisplay) {
        clearDisplay();
        ResetDisplay = false;
    }

    const currentNumber = operador === '' ? primerNumero : segundoNumero;
    if (currentNumber.length >= 15) return; // Limitar longitud total del número

    if (operador === '') {
        if (num === '.' && primerNumero.includes('.')) return;
        primerNumero += num;
    } else {
        if (num === '.' && segundoNumero.includes('.')) return;
        segundoNumero += num;
    }
    updateDisplay();
}

function setOperador(op) {
    if (ResetDisplay) {
        primerNumero = lastResult;
        ultimaOperacion = '';
        ResetDisplay = false;
    }

    if (primerNumero === '') return;
    if (segundoNumero !== '') calculate();
    operador = op;
    updateDisplay();
}

function calcular() {
    if (primerNumero === '' || operador === '' || segundoNumero === '') return;

    const num1 = parseFloat(primerNumero);
    const num2 = parseFloat(segundoNumero);
    let result;

    switch (operador) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = substract(num1, num2);
            break;
        case '*':
            result = product(num1, num2);
            break;
        case '/':
            result = division(num1, num2);
            break;
    }

    // Guardar la operación completa
    ultimaOperacion = `${primerNumero} ${operador} ${segundoNumero} =`;
    lastResult = result;

    if (result === 'Error') {
        resultDisplay.textContent = 'Error';
        operationDisplay.textContent = 'Error';
    } else {
        resultDisplay.textContent = result;
        operationDisplay.textContent = ultimaOperacion;
    }

    primerNumero = result;
    operador = '';
    segundoNumero = '';
    ResetDisplay = true;
}

function updateDisplay() {
    if (ResetDisplay) {
        operationDisplay.textContent = ultimaOperacion;
        resultDisplay.textContent = lastResult;
    } else {
        let displayText = primerNumero;
        if (operador) {
            displayText += ` ${operador}`;
            if (segundoNumero) {
                displayText += ` ${segundoNumero}`;
            }
        }
        operationDisplay.textContent = displayText;
        resultDisplay.textContent = segundoNumero || primerNumero || '0';
    }
}

// Limpiar la calculadora al inicio
clearDisplay();