// Helpers utilitários para testes Cypress
function gerarCpfValido() {
  const rand9 = () => Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  let base;
  do {
    base = rand9();
  } while (base.every((d) => d === base[0]));

  const calc = (digits, factor) => {
    const sum = digits.reduce((s, d) => s + d * factor--, 0);
    const res = sum % 11;
    return res < 2 ? 0 : 11 - res;
  };

  const d10 = calc(base.slice(), 10);
  const d11 = calc([...base, d10], 11);
  return base.join('') + String(d10) + String(d11);
}

const _usados = new Set();
function gerarCpfUnico() {
  let cpf;
  do {
    cpf = gerarCpfValido();
  } while (_usados.has(cpf));
  _usados.add(cpf);
  return cpf;
}

module.exports = { gerarCpfValido, gerarCpfUnico };
