function luhnGenerate(base) {
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
  let result = '';
  for (let i = 0; i < quantity; i++) {
    let card = bin;
    while (card.length < length - 1) {
      card += Math.floor(Math.random() * 10);
    }
    card += luhnGenerate(card);
    result += ${card}|${month}|${year}|${cvv}\n;
  }
  return result;
}

document.addEventListener('DOMContentLoaded', () => {
  const genBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  genBtn.addEventListener('click', () => {
    const bin = document.getElementById('bin').value.trim();
    const length = parseInt(document.getElementById('length').value);
    const month = document.getElementById('month').value.trim() || '**';
    const year = document.getElementById('year').value.trim() || '**';
    const cvv = document.getElementById('cvv').value.trim() || '***';
    const quantity = Math.min(parseInt(document.getElementById('quantity').value), 20);
    
    if (!/^\d{6,8}$/.test(bin)) {
      document.getElementById('output').textContent = '❌ BIN inválido';
      return;
    }
    
    const result = generateCards(bin, length, month, year, cvv, quantity);
    document.getElementById('output').textContent = result;
  });
  
  copyBtn.addEventListener('click', () => {
    const text = document.getElementById('output').textContent;
    if (!text.trim()) {
      alert('No hay datos para copiar.');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      alert('¡Copiado!');
    }).catch(err => {
      alert('Error: ' + err);
    });
  });
});