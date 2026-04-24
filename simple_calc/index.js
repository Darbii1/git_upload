const display = document.getElementById("display");
    let currentInput = "";

    function updateDisplay() {
      display.textContent = currentInput || "0";
    }

    function appendValue(value) {
      currentInput += value;
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = "";
      updateDisplay();
    }

    function calculate() {
      try {
        currentInput = eval(currentInput).toString();
      } catch {
        currentInput = "Error";
      }
      updateDisplay();
    }

    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
          clearDisplay();
        } else if (value === "=") {
          calculate();
        } else {
          appendValue(value);
        }
      });
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        appendValue(e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      } else if (e.key.toLowerCase() === "c") {
        clearDisplay();
      }
    });