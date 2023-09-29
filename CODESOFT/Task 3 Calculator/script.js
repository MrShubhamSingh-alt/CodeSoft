
document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('button');

  let currentInput = '';
  let previousInput = '';
  let operator = '';

  // Function to update the display
  function updateDisplay() {
    display.value = currentInput;
  }

  // Event listener for button clicks
  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const value = button.dataset.value;

      if (!isNaN(value) || value === '.' || value === '00') {
        // If the clicked button is a number or a decimal point
        currentInput += value;
        updateDisplay();
      } else if (value === 'AC') {
        // Clear the display and reset
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay();
      } else if (value === 'DEL') {
        // Delete the last character
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      } else if (['+', '-', '*', '/'].includes(value)) {
        // If an operator is clicked
        if (currentInput !== '') {
          if (previousInput !== '') {
            // Calculate intermediate result if there's a previous operator
            currentInput = calculate(previousInput, currentInput, operator);
            previousInput = '';
          } else {
            previousInput = currentInput;
            currentInput = '';
          }
          operator = value;
        }
      } else if (value === '=') {
        // Calculate the final result
        if (currentInput !== '' && previousInput !== '') {
          currentInput = calculate(previousInput, currentInput, operator);
          previousInput = '';
          operator = '';
          updateDisplay(); // Display the final result
        }
      }
    });
  });

  // Function to calculate the result
  function calculate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
      case '+':
        return (num1 + num2).toString();
      case '-':
        return (num1 - num2).toString();
      case '*':
        return (num1 * num2).toString();
      case '/':
        if (num2 === 0) {
          return 'Error';
        }
        return (num1 / num2).toString();
      default:
        return num2;
    }
  }
});
 