# Configuração do Google Chrome como Navegador Padrão

**Status:** ✅ Configurado  
**Data:** 14/01/2026

---

## 📋 Resumo da Configuração

O Google Chrome agora está configurado como navegador padrão para **todos** os ambientes:
- ✅ Execução local (headless)
- ✅ Pipeline Azure DevOps
- ✅ Modo interativo (UI)

---

## 🚀 Comandos Atualizados

### Execução Local

```bash
# Todos os testes em headless Chrome
npm test
# ou
npm run test

# Smoke tests em headless Chrome
npm run smoke

# Modo interativo (UI) com Chrome
npm run test:ui

# CI (igual ao npm test agora)
npm run test:ci
```

### Antes vs Depois

| Comando | Antes | Depois |
|---------|-------|--------|
| `npm test` | Electron 130 | **Chrome (headless)** |
| `npm run smoke` | Electron 130 | **Chrome (headless)** |
| `npm run test:ci` | Chrome | Chrome ✅ |
| `npm run test:ui` | ❌ Não existia | **Chrome (UI)** |

---

## ⚙️ Configuração no package.json

```json
"scripts": {
  "test": "cypress run --browser chrome --headless --spec 'cypress/e2e/**/*.cy.js'",
  "smoke": "cypress run --browser chrome --headless --spec 'cypress/e2e/**/smoke_*.cy.js'",
  "test:ci": "cypress run --browser chrome --headless --spec 'cypress/e2e/**/*.cy.js'",
  "smoke:ci": "cypress run --browser chrome --headless --spec 'cypress/e2e/**/smoke_*.cy.js'",
  "test:ui": "cypress open --browser chrome"
}
```

**Flags utilizadas:**
- `--browser chrome` - Especifica o navegador
- `--headless` - Modo sem interface gráfica (mais rápido)
- `--spec` - Padrão de arquivos a executar

---

## 🔧 Pipeline Azure DevOps

O arquivo `azure-pipelines.yml` **não precisa** de alteração, pois já usa:

```yaml
- script: |
    echo "🚀 Executando testes smoke"
    npm run test
  displayName: 'Executar testes Cypress'
```

Como `npm run test` agora usa Chrome, a pipeline automaticamente executará com Chrome.

---

## 🖥️ Requisitos do Sistema

### Localmente (Windows/Mac/Linux):
- ✅ Google Chrome já instalado
- ✅ Cypress detecta automaticamente

### Azure DevOps (`ubuntu-latest`):
- ✅ Chrome já vem pré-instalado na imagem
- ✅ Compatível com `--headless`

---

## 📊 Vantagens do Chrome vs Electron

| Aspecto | Electron | Chrome |
|---------|----------|--------|
| **Performance** | ⚡ Mais rápido | ⚡⚡ Similar |
| **Compatibilidade** | ⚠️ Pode ter diferenças | ✅ 100% real |
| **Debugging** | 🔍 Limitado | 🔍🔍 DevTools completo |
| **CSS/JS Moderno** | ⚠️ Pode variar | ✅ Sempre atualizado |
| **Uso em CI/CD** | ✅ Leve | ✅ Padrão da indústria |
| **Ambiente real** | ❌ Não representa usuário | ✅ **Navegador real** |

---

## 🧪 Como Testar

### 1. Local - Modo Headless
```bash
npm test
```

**Saída esperada:**
```
┌────────────────────────────────────────────────────────────┐
│ Cypress:        14.5.4                                     │
│ Browser:        Chrome 131 (headless)                      │  <-- ✅ Chrome
│ Node Version:   v20.19.6                                   │
│ Specs:          18 found                                   │
└────────────────────────────────────────────────────────────┘
```

### 2. Local - Modo Interativo
```bash
npm run test:ui
```

**Resultado:** Abre interface do Cypress com Chrome selecionado

### 3. Azure DevOps
- Faça commit das alterações
- Push para `master`
- Pipeline executará automaticamente com Chrome
- Verificar logs da pipeline: `Browser: Chrome 131 (headless)`

---

## 🐛 Troubleshooting

### Erro: "Browser not found: chrome"

**Windows:**
```bash
# Verificar instalação
"C:\Program Files\Google\Chrome\Application\chrome.exe" --version

# Se não encontrado, instalar:
# https://www.google.com/chrome/
```

**Linux (Azure):**
```bash
# Já vem pré-instalado, mas caso necessário:
sudo apt-get update
sudo apt-get install google-chrome-stable -y
```

**Mac:**
```bash
# Verificar instalação
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version

# Se não encontrado, instalar via Homebrew:
brew install --cask google-chrome
```

### Erro: "Chrome exited with code 1"

Pode ocorrer em ambientes CI sem display. Solução já aplicada:
- ✅ Flag `--headless` adicionada
- ✅ Azure DevOps suporta nativamente

### Forçar outro navegador temporariamente

```bash
# Edge
npx cypress run --browser edge

# Firefox
npx cypress run --browser firefox

# Electron (padrão antigo)
npx cypress run --browser electron
```

---

## 📝 Notas Adicionais

### Por que Chrome?
1. **Navegador mais usado** (~65% do mercado)
2. **Mais estável** em CI/CD que outros navegadores
3. **DevTools poderosos** para debugging
4. **Performance consistente** entre local e CI

### Electron ainda é útil?
- ✅ Sim, para testes **muito rápidos** (smoke local)
- ✅ Menor uso de recursos
- ❌ Não recomendado para validação final

### Recomendação
- **Desenvolvimento:** Chrome UI (`npm run test:ui`)
- **CI/CD:** Chrome headless (`npm test`)
- **Smoke local:** Chrome headless (`npm run smoke`)

---

**Configuração completa!** 🎉  
Agora todos os testes executam com Google Chrome por padrão.
