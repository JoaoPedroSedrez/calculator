let currentInput = ''; 
let lastResult = null; 

// Quando tecla é pressionada
function pressKey(key) {
    const resultField = document.getElementById('result');

    // Se o último resultado foi mostrado e o usuário começa uma nova operação
    if (lastResult !== null && ['+', '-', '*', '/'].includes(key)) {
        currentInput = lastResult + key; // Usa o resultado para continuar a operação
        lastResult = null; // Reseta o estado de último resultado
    } else if (lastResult !== null) {
        // Se o usuário digitar um número logo após um resultado
        currentInput = ''; // Reseta o input
        lastResult = null;
    }

    // Não deixa ter dois operadores juntos (4+++2)
    if (['+', '-', '*', '/'].includes(key)) {
        if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
            return; // Não adiciona o operador se já houver um no final
        }
    }

    currentInput += key; // Adiciona o caractere pressionado ao input atual
    resultField.value = currentInput; // Exibe no visor
}


// Calcular o resultado
function calculateResult() {
    const resultField = document.getElementById('result');
    try {
        const result = eval(currentInput); // Calcula a expressão matemática
        resultField.value = result.toFixed(2); // Exibe o resultado com 2 casas decimais
        currentInput = String(result); // Atualiza o input com o resultado
        lastResult = result; 
    } catch (error) {
        resultField.value = 'Erro'; // Exibe "Erro" se a expressão for inválida
        currentInput = ''; // Reseta o input
        lastResult = null;
    }
}

// Limpa visor
function clearResult() {
    currentInput = ''; // Reseta o input
    lastResult = null; // Reseta o estado de último resultado
    document.getElementById('result').value = ''; // Limpa o visor
}

// Apaga o ulitmo digito (backspace)
function deleteLast() {
    const resultField = document.getElementById('result');
    currentInput = currentInput.slice(0, -1); // Remove o último caractere
    resultField.value = currentInput; // Atualiza o visor
}

// Integra calculadora com teclado do computador
document.addEventListener('keydown', (event) => {
    const key = event.key; // Captura a tecla pressionada

    if (!isNaN(key)) {
        // Se for um número (0-9)
        pressKey(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Se for uma operação matemática
        pressKey(key);
    } else if (key === 'Enter') {
        // Se for a tecla Enter, calcula o resultado
        calculateResult();
    } else if (key === 'Backspace') {
        // Se for a tecla Backspace, apaga o último dígito
        deleteLast();
    } else if (key === 'Escape') {
        // Se for a tecla Esc, limpa o visor
        clearResult();
    } else if (key === '.'|| key === ',') {
        // Permite adicionar o ponto decimal
        pressKey('.');
    }
});
