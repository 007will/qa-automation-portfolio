# 🏗️ ARQUITETURA PROPOSTA - Visão Estrutural

## Estrutura ATUAL vs PROPOSTA

### ❌ ESTRUTURA ATUAL (Desorganizada)

```
cypress/
├── support/
│   ├── commands.js (1058 linhas 😱)
│   │   ├─ Login
│   │   ├─ BackOffice navigation
│   │   ├─ Forms (Notícia, Oportunidade, Evento, etc)
│   │   ├─ Validações
│   │   ├─ Grid operations
│   │   ├─ Waits
│   │   └─ ... 15 categorias mezcladas
│   ├── api_commands.js (100 linhas)
│   ├── utils.js (30 linhas)
│   ├── e2e.js (2 linhas)
│   └── fixtures/
│
├── e2e/
│   ├── Backoffice/
│   │   ├── Oportunidade.adm.cy.js (195 linhas)
│   │   ├── Oportunidade.user.cy.js
│   │   ├── contatos.cy.js (185 linhas)
│   │   ├── servicos.cy.js (150 linhas)
│   │   ├── produtos.cy.js
│   │   ├── eventos.cy.js
│   │   ├── Noticia.cy.js
│   │   └── ...
│   └── api/
│
├── dataTest/
│   └── data_hml.js (227 linhas - tudo junto)
│
└── reports/
    └── mochawesome_*.json (80 arquivos)

PROBLEMAS:
❌ commands.js gigante (1058 linhas)
❌ Sem separação por responsabilidade
❌ Dados hardcoded e duplicados
❌ Testes repetidos
❌ Seletores espalhados
❌ Sem logging estruturado
```

### ✅ ESTRUTURA PROPOSTA (Organizada)

```
cypress/
├── support/
│   ├── commands/
│   │   ├── index.js (registra todos)
│   │   ├── navigation.js (80 linhas - login, acessarBackOffice)
│   │   ├── forms.js (120 linhas - fillForm, validações)
│   │   ├── grid.js (100 linhas - pesquisar, excluir, editar)
│   │   ├── assertions.js (80 linhas - shouldShowSuccess, layouts)
│   │   └── waits.js (60 linhas - waitForPageLoad, etc)
│   │
│   ├── factories/
│   │   ├── testDataFactory.js (150 linhas)
│   │   │   ├─ createOportunidade()
│   │   │   ├─ createServico()
│   │   │   ├─ createContato()
│   │   │   └─ createEvento()
│   │   │
│   │   └── builders/
│   │       ├── OportunidadeBuilder.js (fluent API)
│   │       ├── ServicoBuilder.js
│   │       └── ContatoBuilder.js
│   │
│   ├── pages/
│   │   ├── BasePage.js (base class)
│   │   ├── OportunidadesPage.js (Page Object)
│   │   ├── ContatosPage.js (Page Object)
│   │   ├── ServicosPage.js (Page Object)
│   │   ├── NoticiasPage.js (Page Object)
│   │   └── EventosPage.js (Page Object)
│   │
│   ├── locators/
│   │   └── index.js (todos os seletores centralizados)
│   │
│   ├── helpers/
│   │   ├── logger.js (logs estruturados)
│   │   ├── errorHandler.js (retry, fallback)
│   │   └── performanceHelper.js (timing)
│   │
│   ├── api_commands.js (sem mudanças)
│   ├── e2e.js (importa helpers + commands)
│   └── fixtures/
│
├── e2e/
│   ├── Backoffice/
│   │   ├── oportunidades.cy.js (80 linhas)
│   │   │   └─ Usa OportunidadesPage + TestDataFactory
│   │   │
│   │   ├── contatos.cy.js (60 linhas)
│   │   │   └─ Usa ContatosPage + TestDataFactory
│   │   │
│   │   ├── servicos.cy.js (50 linhas)
│   │   │   └─ Usa ServicosPage + TestDataFactory
│   │   │
│   │   └── ... (testes 50% menores)
│   │
│   ├── health-check.cy.js (novo)
│   │   └─ Valida saúde da aplicação antes de testes
│   │
│   └── api/
│       └── ... (sem mudanças)
│
├── dataTest/
│   └── data_hml.js (40 linhas)
│       └─ Apenas re-exporta TestDataFactory
│
└── reports/
    └── allure-report/ (novo)
```

## 🔄 Fluxo de Dados

### ❌ FLUXO ATUAL

```
it('Test') 
  → cy.login() [commands.js - 10 linhas]
  → cy.acessarBackOffice() [commands.js - 5 linhas]
  → cy.get('[...]').type('valor') [hardcoded seletor]
  → cy.get('[...]').type('valor') [mais hardcoded]
  → cy.contains('Sucesso').should('be.visible')
  
❌ Problemas:
  - Seletores espalhados
  - Sem abstração
  - Dados hardcoded
  - Difícil manter
```

### ✅ FLUXO PROPOSTO

```
// Definir dados (uma vez, reutilizável)
const data = new OportunidadeBuilder()
  .withCompany('Empresa ABC')
  .withImportation()
  .build();

// Usar Page Object (limpo, legível)
it('Validar cadastro', () => {
  const page = new OportunidadesPage();
  
  page
    .visit()
    .fillForm(data)
    .save()
    .delete(data.nomeEmpresa);
});

✅ Vantagens:
  - Dados centralizados
  - Seletores abstratos
  - Testes legíveis
  - Fácil manter
```

## 📊 Comparação de Linhas de Código

```
ARQUIVO                    ANTES       DEPOIS      REDUÇÃO
─────────────────────────────────────────────────────────
commands.js               1058        600         -43%
contatos.cy.js            185         60          -67%
Oportunidade.adm.cy.js    195         80          -59%
servicos.cy.js            150         50          -67%
data_hml.js               227         40          -82%
─────────────────────────────────────────────────────────
TOTAL TESTE              ~2500       ~1500        -40%
```

## 🎯 Mapping de Refatoração

```
ANTES (commands.js 1058 linhas)
│
├─ Login (10 linhas) ──────────────────────┐
├─ BackOffice (5 linhas) ───────────────┐  │
├─ Forms (200 linhas) ──────────────┐   │  │
├─ Validações (150 linhas) ─────┐   │   │  │
├─ Grid (200 linhas) ────┐       │   │   │  │
├─ Waits (100 linhas) ──┐│       │   │   │  │
└─ Utils (500 linhas)  ││       │   │   │  │
                        ││       │   │   │  │
                        ▼▼       ▼   ▼   ▼  ▼
                   ┌─────────────────────────┐
                   │   cypress/support/      │
                   ├─────────────────────────┤
                   │ commands/               │
                   │ ├─ waits.js (100)      │
                   │ ├─ grid.js (200)       │
                   │ ├─ assertions.js (150) │
                   │ ├─ forms.js (200)      │
                   │ ├─ navigation.js (10)  │
                   │ └─ index.js (50)       │
                   │                        │
                   │ factories/             │
                   │ ├─ testDataFactory.js │
                   │ └─ builders/           │
                   │                        │
                   │ pages/                 │
                   │ ├─ BasePage.js        │
                   │ ├─ OportunidadesPage  │
                   │ └─ ContatosPage       │
                   │                        │
                   │ helpers/               │
                   │ ├─ logger.js           │
                   │ └─ errorHandler.js     │
                   │                        │
                   │ locators/              │
                   │ └─ index.js            │
                   └─────────────────────────┘
```

## 🔀 Fluxo de Teste Proposto

```
┌─────────────────────────────────────────────────────────┐
│                    TESTE (cy.js)                        │
│ it('Validar cadastro', () => { ... })                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├──→ cypress/support/e2e.js
                 │    (importa: commands, pages, factories)
                 │
                 ├─────────────────────────────────────┐
                 │                                     │
                 ▼                                     ▼
        ┌──────────────┐                   ┌──────────────┐
        │  Page Object │                   │TestDataFactory
        │              │                   │              │
        │OportunidadesP│◄─────────uses──────│createOpor..()│
        │     age      │                   │              │
        │              │                   └──────────────┘
        │ visit()      │
        │ fillForm()   │
        │ save()       │◄─────────uses──────┐
        │ delete()     │                    │
        └──────┬───────┘                    │
               │                     ┌──────────────┐
               ├────uses────────────→│   Locators   │
               │                     │              │
               │                     │ .company     │
               ├────calls──────────→ │ .email       │
               │                     │ .phone       │
               │                     └──────────────┘
               │
               ├────calls─────────┐
               │                  │
               ▼                  ▼
        ┌────────────┐      ┌──────────────┐
        │  Commands  │      │    Logger    │
        │            │      │              │
        │ waitFor..()│      │ step()       │
        │ should...()│      │ success()    │
        └────────────┘      │ error()      │
                            └──────────────┘

        ┌──────────────────┐
        │   ErrorHandler   │
        │                  │
        │ withRetry()      │
        │ validateWith...()│
        └──────────────────┘
```

## 📦 Dependências Entre Módulos

```
e2e/
├─ Oportunidade.cy.js
│  ├─ imports OportunidadesPage
│  ├─ imports TestDataFactory
│  └─ uses Logger, ErrorHandler
│
├─ contatos.cy.js
│  ├─ imports ContatosPage
│  ├─ imports TestDataFactory
│  └─ uses Logger, ErrorHandler
│
└─ servicos.cy.js
   ├─ imports ServicosPage
   ├─ imports TestDataFactory
   └─ uses Logger, ErrorHandler

support/
├─ pages/
│  ├─ OportunidadesPage
│  │  ├─ extends BasePage
│  │  ├─ uses Locators
│  │  └─ uses Commands
│  │
│  ├─ ContatosPage
│  │  ├─ extends BasePage
│  │  ├─ uses Locators
│  │  └─ uses Commands
│  │
│  └─ BasePage (base class)
│
├─ factories/
│  ├─ TestDataFactory (standalone)
│  └─ builders/ (standalone)
│
├─ helpers/
│  ├─ Logger (standalone)
│  └─ ErrorHandler (standalone)
│
├─ locators/
│  └─ index.js (standalone)
│
└─ commands/
   ├─ navigation.js
   ├─ forms.js
   ├─ grid.js
   ├─ assertions.js
   ├─ waits.js
   └─ index.js (agregador)
```

## 🔄 Ciclo de Vida do Teste

```
┌─────────────────────────────────────────────────────────┐
│ 1. BEFORE EACH (e2e.js hooks)                           │
├─────────────────────────────────────────────────────────┤
│  cy.task('clearCache')          [limpeza]               │
│  cy.clearCookies()              [limpeza]               │
│  Logger.step('Iniciando teste') [log]                   │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 2. SETUP (no teste)                                     │
├─────────────────────────────────────────────────────────┤
│  const data = TestDataFactory.createOportunidade()      │
│  const page = new OportunidadesPage()                   │
│  cy.login(user, pass)           [session cache]         │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 3. EXECUÇÃO (Page Object)                               │
├─────────────────────────────────────────────────────────┤
│  page.visit()                   [navigate]              │
│  page.fillForm(data)            [interact]              │
│  page.save()                    [assert]                │
│  Logger.success('Salvo com sucesso')  [log]            │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 4. CLEANUP (no teste)                                   │
├─────────────────────────────────────────────────────────┤
│  page.delete(data.nomeEmpresa)  [cleanup]               │
│  Logger.success('Teste completado')   [log]            │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 5. AFTER EACH (e2e.js hooks)                            │
├─────────────────────────────────────────────────────────┤
│  if (failed) cy.screenshot()    [evidence]              │
│  Logger.success/error(...)      [log resultado]         │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Padrão de Organização Esperado

```
Princípios SOLID Aplicados:
├─ S (Single Responsibility)
│  └─ Cada comando faz UMA coisa
│  └─ Cada página representa UMA página
│  └─ Cada factory gera UM tipo de dado
│
├─ O (Open/Closed)
│  └─ Fácil adicionar novos commands sem mudar antigos
│  └─ Fácil adicionar páginas sem mudar as antigas
│
├─ L (Liskov Substitution)
│  └─ Qualquer página pode substituir BasePage
│  └─ Qualquer builder segue padrão fluente
│
├─ I (Interface Segregation)
│  └─ Commands pequenos e focados
│  └─ Page Objects com poucos métodos
│
└─ D (Dependency Injection)
   └─ Commands recebem dados como parâmetros
   └─ Pages usam seletores via Locators
```

## 🔍 Exemplo de Fluxo Real

```
TESTE: Validar cadastro de oportunidade

❌ ANTES:
───────────────────────────────────────────
it('Validar Cadastro Oportunidade SPCC', () => {
  cy.login(Cypress.env('admin_login'), Cypress.env('password'))
  cy.acessarBackOffice('Oportunidades e Negócios')
  cy.pesquisarItem({ nomeEmpresa: 'Empresa Teste' })
  cy.excluirItem('Oportunidade', 'nomeEmpresa', 'Empresa Teste')
  cy.acessarCadastrar('...', '...', '...')
  cy.get('[name="companyName"]').clear().type('Empresa Teste')
  cy.get('[name="contactName"]').clear().type('João Silva')
  cy.get('[name="email"]').clear().type('joao@test.com')
  // ... 15 mais linhas de cy.get().type()
  cy.contains('Sucesso').should('be.visible')
})
→ 50 linhas, hardcoded, difícil ler


✅ DEPOIS:
───────────────────────────────────────────
it('Validar Cadastro Oportunidade SPCC', () => {
  const data = new OportunidadeBuilder()
    .withCompany('Empresa Teste')
    .withImportation()
    .withCategory('PetCare')
    .build()
  
  new OportunidadesPage()
    .visit()
    .fillForm(data)
    .save()
    .delete(data.nomeEmpresa)
})
→ 15 linhas, claro, reutilizável, fácil ler
```

---

**Arquitetura proposta está pronta para implementação! 🚀**

Veja `CHECKLIST_IMPLEMENTACAO.md` para passo a passo.
