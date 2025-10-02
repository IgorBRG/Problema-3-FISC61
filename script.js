// -------- função alvo: f(x) = sin²(x)
function f(x) {
  return Math.sin(x) ** 2;
}

// -------- Regra de Simpson (composta)
// n deve ser PAR: número de subintervalos (pontos = n+1)
function simpson(f, a, b, n) {
  if (n % 2 !== 0) {
    throw new Error("n deve ser par (número de subintervalos).");
  }
  const h = (b - a) / n;
  let s = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    s += (i % 2 === 0 ? 2 : 4) * f(x);
  }
  return (h / 3) * s;
}

// -------- cálculo e plotagem
function calcular() {
  const a = 0;
  const b = Math.PI / 2;
  const exact = Math.PI / 4;

  // n = número de subintervalos (pares). (2n+1 pontos do enunciado → n = 2n)
  const ns = [2, 4, 10, 20, 50, 100, 200, 400];
  const erros = []; 
  let out = "n   Aproximação         Erro Absoluto\n";
  out += "----------------------------------------\n";

  ns.forEach((n) => {
    const approx = simpson(f, a, b, n);
    const err = Math.abs(approx - exact);
    erros.push(err);
    out += `${String(n).padEnd(3)} ${approx.toFixed(12)}   ${err.toExponential(3)}\n`;
  });

  document.getElementById("output").textContent = out;

  const trace = {
    x: ns,
    y: erros,
    mode: "lines+markers",
    name: "Erro |Iₙ − π/4|",
  };

  const layout = {
    title: "Erro da Regra de Simpson vs n (log-log)",
    xaxis: { title: "n (subintervalos, par)", type: "log" },
    yaxis: { title: "Erro absoluto", type: "log" },
    margin: { t: 48, r: 16, b: 56, l: 64 },
  };

  Plotly.newPlot("chart", [trace], layout, { responsive: true });
}

// botão + execução inicial
document.getElementById("btnCalcular").addEventListener("click", calcular);
calcular();
