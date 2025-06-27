function luhn(base) {
  let sum = 0;
  let alt = false;
  for (let i = base.length - 1; i >= 0; i--) {
    let n = parseInt(base.charAt(i), 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return (10 - (sum % 10)) % 10;
}

function generateCards(bin, length, month, year, cvv, quantity) {
  let cards = "";
  for (let i = 0; i < quantity; i++) {
    let cc = bin;
    while (cc.length < length - 1) {
      cc += Math.floor(Math.random() * 10);
    }
    cc += luhn(cc);
    cards += ${cc}|${month}|${year}|${cvv}\n;
  }
  return cards;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generate").addEventListener("click", () => {
    const bin = document.getElementById("bin").value.trim();
    const length = parseInt(document.getElementById("length").value);
    const month = document.getElementById("month").value.trim() || "**";
    const year = document.getElementById("year").value.trim() || "**";
    const cvv = document.getElementById("cvv").value.trim() || "***";
    const quantity = Math.min(parseInt(document.getElementById("quantity").value) || 1, 20);

    if (!/^\d{6,8}$/.test(bin)) {
      document.getElementById("output").textContent = "❌ BIN inválido. Entre 6 y 8 dígitos.";
      return;
    }

    const cards = generateCards(bin, length, month, year, cvv, quantity);
    document.getElementById("output").textContent = cards;
  });

  document.getElementById("copy").addEventListener("click", () => {
    const text = document.getElementById("output").textContent;
    if (!text.trim()) {
      alert("No hay datos para copiar.");
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Copiado!");
    }).catch(err => {
      alert("Error al copiar: " + err);
    });
  });
});
