function adicionar(valor) {
  const display = document.getElementById("display");
  display.value += valor;
}

function calcular() {
  const display = document.getElementById("display");
  try {
    // eval é perigoso, mas aqui funciona para operações simples
    display.value = eval(display.value);
  } catch {
    display.value = "Erro";
  }
}

function limpar() {
  document.getElementById("display").value = "";
}

function apagar() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

// Suporte ao teclado
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
