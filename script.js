const display = document.getElementById("display");

function adicionar(valor) {
  display.value += valor;
}

function limpar() {
  display.value = "";
}

function apagar() {
  display.value = display.value.slice(0, -1);
}

function calcular() {
  try {
    const expressao = display.value.trim();

    if (expressao === "") {
      display.value = "";
      return;
    }

    if (!/^[0-9+\-*/%.]+$/.test(expressao)) {
      display.value = "Erro";
      return;
    }

    const tokens = expressao.match(/(\d+(\.\d+)?|[+\-*/%])/g);
    if (!tokens) {
      display.value = "Erro";
      return;
    }

    const output = [];
    const operadores = [];
    const precedencia = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        output.push(parseFloat(token));
      } else {
        while (
          operadores.length &&
          precedencia[operadores[operadores.length - 1]] >= precedencia[token]
        ) {
          output.push(operadores.pop());
        }
        operadores.push(token);
      }
    });

    while (operadores.length) {
      output.push(operadores.pop());
    }

    const stack = [];
    output.forEach((token) => {
      if (typeof token === "number") {
        stack.push(token);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
          case "%":
            stack.push(a % b);
            break;
        }
      }
    });

    display.value = stack.pop();
  } catch {
    display.value = "Erro";
  }
}

document.querySelectorAll("button").forEach((button) => {
  const value = button.dataset.value;
  const action = button.dataset.action;

  if (value) {
    button.addEventListener("click", () => adicionar(value));
  }

  if (action === "limpar") {
    button.addEventListener("click", limpar);
  } else if (action === "apagar") {
    button.addEventListener("click", apagar);
  } else if (action === "calcular") {
    button.addEventListener("click", calcular);
  }
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)) {
    adicionar(key);
  } else if (key === "Enter") {
    calcular();
  } else if (key === "Backspace") {
    apagar();
  } else if (key === "Escape") {
    limpar();
  }
});
