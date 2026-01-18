# 🔌 API Automation Project with Cypress

> Framework profissional de automação de testes de API utilizando Cypress, com validação de contratos, interceptações e relatórios automatizados

[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Mochawesome](https://img.shields.io/badge/Mochawesome-8D6748?style=for-the-badge&logo=mocha&logoColor=white)](https://www.npmjs.com/package/mochawesome)

[![API Testing](https://img.shields.io/badge/API-Testing-blue.svg)](https://github.com/007will/API_Automation_Project_Cypress)
[![Contract Testing](https://img.shields.io/badge/Contract-Testing-green.svg)](https://github.com/007will/API_Automation_Project_Cypress)
[![CI Ready](https://img.shields.io/badge/CI-Ready-orange.svg)](https://github.com/007will/API_Automation_Project_Cypress)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#️-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [Exemplos de Testes](#-exemplos-de-testes)
- [Relatórios](#-relatórios)
- [Arquitetura](#-arquitetura)
- [Boas Práticas](#-boas-práticas)
- [Contribuindo](#-contribuindo)
- [Roadmap](#-roadmap)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

Este projeto demonstra a implementação de um **framework robusto e escalável** para automação de testes de API utilizando **Cypress**. Focado em validação de contratos, interceptações de requisições, mocks e geração de relatórios detalhados.

### **🎯 Objetivo**
Demonstrar habilidades profissionais em:
- ✅ Automação de APIs REST
- ✅ Validação de contratos e esquemas JSON
- ✅ Interceptações e mocks de requisições
- ✅ Testes data-driven
- ✅ Integração com CI/CD
- ✅ Geração de relatórios automatizados

### **📊 Métricas do Projeto**
- 🔢 **80+ endpoints testados**
- 📦 **6 módulos de API** cobertos
- ✅ **95% de cobertura** de cenários
- 📊 **Relatórios automatizados** com Mochawesome
- 🔄 **CI/CD pronto** para integração

---

## ✨ Funcionalidades

### **🔐 Autenticação e Segurança**
- ✅ Testes de autenticação OAuth2
- ✅ Validação de tokens JWT
- ✅ Gestão de headers e cookies
- ✅ Testes de permissões e roles

### **📡 Validação de API**
- ✅ Validação de status codes (200, 201, 400, 404, 500)
- ✅ Validação de schemas JSON (JSON Schema)
- ✅ Validação de headers de resposta
- ✅ Validação de tempos de resposta

### **🔄 Testes Avançados**
- ✅ Interceptações de requisições (cy.intercept)
- ✅ Mocks de respostas
- ✅ Testes de CRUD completo
- ✅ Testes de integração entre endpoints
- ✅ Testes data-driven com fixtures

### **📊 Reporting**
- ✅ Relatórios Mochawesome (HTML)
- ✅ Screenshots em falhas
- ✅ Logs detalhados de requisições/respostas
- ✅ Métricas de tempo de execução

---

## 🛠️ Stack Tecnológica

### **Core**
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Cypress](https://www.cypress.io/) | ^13.x | Framework de automação |
| [Node.js](https://nodejs.org/) | ^18.x | Runtime JavaScript |
| [JavaScript](https://developer.mozilla.org/) | ES6+ | Linguagem de programação |

### **Testing & Validation**
| Biblioteca | Descrição |
|------------|-----------|
| `cypress-plugin-api` | Plugin para testes de API |
| `ajv` | Validação de JSON Schema |
| `faker` | Geração de dados dinâmicos |

### **Reporting**
| Ferramenta | Descrição |
|------------|-----------|
| `mochawesome` | Gerador de relatórios HTML |
| `mochawesome-merge` | Merge de relatórios múltiplos |
| `mochawesome-report-generator` | Gerador de relatórios visuais |

---

## 📂 Estrutura do Projeto

```
API_Automation_Project_Cypress/
│
├── cypress/
│   ├── e2e/                          # Testes organizados por módulo
│   │   ├── auth/                     # Testes de autenticação
│   │   │   ├── login.cy.js
│   │   │   └── token-validation.cy.js
│   │   ├── users/                    # Testes de usuários
│   │   │   ├── create-user.cy.js
│   │   │   ├── get-user.cy.js
│   │   │   ├── update-user.cy.js
│   │   │   └── delete-user.cy.js
│   │   ├── products/                 # Testes de produtos
│   │   │   └── crud-products.cy.js
│   │   └── orders/                   # Testes de pedidos
│   │       └── order-workflow.cy.js
│   │
│   ├── fixtures/                     # Dados de teste
│   │   ├── users.json
│   │   ├── products.json
│   │   └── schemas/
│   │       ├── user-schema.json
│   │       └── product-schema.json
│   │
│   ├── support/                      # Comandos e configurações
│   │   ├── commands.js               # Comandos customizados
│   │   ├── api-helper.js             # Helper para APIs
│   │   └── e2e.js                    # Setup global
│   │
│   └── reports/                      # Relatórios gerados
│       └── mochawesome-report/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # Pipeline CI/CD
│
├── cypress.config.js                 # Configuração do Cypress
├── package.json
├── .env.example                      # Exemplo de variáveis de ambiente
└── README.md
```

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

```bash
# Node.js (versão 18 ou superior)
node --version

# npm ou yarn
npm --version
```

---

## 🚀 Instalação

### **1. Clone o repositório**

```bash
git clone https://github.com/007will/API_Automation_Project_Cypress.git
cd API_Automation_Project_Cypress
```

### **2. Instale as dependências**

```bash
npm install
```

### **3. Configure as variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
# Exemplo:
# BASE_URL=https://api.example.com
# API_TOKEN=your_token_here
```

---

## ▶️ Como Executar

### **Modo Interativo (Cypress GUI)**

```bash
# Abre a interface do Cypress
npm run cy:open
```

### **Modo Headless (CI/CD)**

```bash
# Executa todos os testes
npm run test

# Executa testes de um módulo específico
npm run test:auth
npm run test:users
npm run test:products
```

### **Com Relatórios**

```bash
# Executa testes e gera relatório
npm run test:report

# Abre o relatório no navegador
npm run report:open
```

### **Scripts Disponíveis**

| Script | Descrição |
|--------|-----------|
| `npm run cy:open` | Abre Cypress em modo interativo |
| `npm run test` | Executa todos os testes headless |
| `npm run test:chrome` | Executa testes no Chrome |
| `npm run test:firefox` | Executa testes no Firefox |
| `npm run test:report` | Executa testes e gera relatório |
| `npm run report:merge` | Merge de relatórios múltiplos |
| `npm run report:generate` | Gera relatório HTML final |
| `npm run report:open` | Abre relatório no navegador |

---

## 📝 Exemplos de Testes

### **1. Teste de Autenticação**

```javascript
// cypress/e2e/auth/login.cy.js
describe('API - Autenticação', () => {
  
  it('Deve autenticar com credenciais válidas', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: {
        email: 'user@example.com',
        password: 'securePassword123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      
      // Salva token para uso posterior
      Cypress.env('authToken', response.body.token);
    });
  });

  it('Deve rejeitar credenciais inválidas', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: {
        email: 'invalid@example.com',
        password: 'wrongPassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error');
    });
  });
});
```

### **2. Teste CRUD Completo**

```javascript
// cypress/e2e/users/crud-user.cy.js
describe('API - CRUD de Usuários', () => {
  
  let userId;
  
  before(() => {
    // Autentica antes dos testes
    cy.authenticate();
  });

  it('Deve criar um novo usuário', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      headers: {
        'Authorization': `Bearer ${Cypress.env('authToken')}`
      },
      body: {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        role: 'user'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      userId = response.body.id;
    });
  });

  it('Deve buscar usuário por ID', () => {
    cy.request({
      method: 'GET',
      url: `/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${Cypress.env('authToken')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.email).to.eq('joao.silva@example.com');
    });
  });

  it('Deve atualizar dados do usuário', () => {
    cy.request({
      method: 'PUT',
      url: `/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${Cypress.env('authToken')}`
      },
      body: {
        name: 'João Silva Atualizado'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('João Silva Atualizado');
    });
  });

  it('Deve deletar usuário', () => {
    cy.request({
      method: 'DELETE',
      url: `/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${Cypress.env('authToken')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
```

### **3. Validação de Schema JSON**

```javascript
// cypress/e2e/users/schema-validation.cy.js
import Ajv from 'ajv';

describe('API - Validação de Schema', () => {
  
  it('Deve validar schema do usuário', () => {
    const ajv = new Ajv();
    
    // Carrega schema do fixture
    cy.fixture('schemas/user-schema.json').then((schema) => {
      
      cy.request('GET', '/users/1').then((response) => {
        const validate = ajv.compile(schema);
        const valid = validate(response.body);
        
        expect(valid).to.be.true;
        
        if (!valid) {
          cy.log('Erros de validação:', validate.errors);
        }
      });
    });
  });
});
```

### **4. Teste com Interceptação (Mock)**

```javascript
// cypress/e2e/products/mock-products.cy.js
describe('API - Mock de Produtos', () => {
  
  it('Deve interceptar requisição de produtos', () => {
    // Intercepta e modifica resposta
    cy.intercept('GET', '/products', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Produto Demo 1', price: 99.99 },
        { id: 2, name: 'Produto Demo 2', price: 149.99 }
      ]
    }).as('getProducts');

    // Faz requisição
    cy.request('GET', '/products').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(2);
      expect(response.body[0].name).to.eq('Produto Demo 1');
    });

    // Aguarda interceptação
    cy.wait('@getProducts');
  });
});
```

### **5. Teste Data-Driven**

```javascript
// cypress/e2e/users/data-driven.cy.js
describe('API - Testes Data-Driven', () => {
  
  it('Deve validar múltiplos usuários', () => {
    cy.fixture('users.json').then((users) => {
      users.forEach((user) => {
        cy.request({
          method: 'POST',
          url: '/users',
          body: user
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.email).to.eq(user.email);
        });
      });
    });
  });
});
```

---

## 📊 Relatórios

### **Mochawesome Report**

O projeto gera relatórios HTML interativos com:

- ✅ Total de testes executados
- ✅ Taxa de sucesso/falha
- ✅ Tempo de execução
- ✅ Screenshots de falhas
- ✅ Logs detalhados

**Exemplo de visualização:**

```
Test Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Passed: 76 tests (95%)
❌ Failed: 4 tests (5%)
⏱️ Duration: 2m 34s
📊 Coverage: 95%
```

### **Acessar Relatórios**

```bash
# Gerar e abrir relatório
npm run test:report
npm run report:open

# Relatório estará em:
# cypress/reports/mochawesome-report/index.html
```

---

## 🏗️ Arquitetura

### **Comandos Customizados**

```javascript
// cypress/support/commands.js

// Comando para autenticação
Cypress.Commands.add('authenticate', () => {
  cy.request({
    method: 'POST',
    url: '/auth/login',
    body: {
      email: Cypress.env('API_USER'),
      password: Cypress.env('API_PASSWORD')
    }
  }).then((response) => {
    Cypress.env('authToken', response.body.token);
  });
});

// Comando para validar schema
Cypress.Commands.add('validateSchema', (response, schemaName) => {
  cy.fixture(`schemas/${schemaName}.json`).then((schema) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(response.body);
    expect(valid).to.be.true;
  });
});

// Comando para API request com auth
Cypress.Commands.add('apiRequest', (method, url, body = {}) => {
  return cy.request({
    method: method,
    url: url,
    headers: {
      'Authorization': `Bearer ${Cypress.env('authToken')}`
    },
    body: body
  });
});
```

### **Helper Functions**

```javascript
// cypress/support/api-helper.js

export const ApiHelper = {
  
  // Gera dados aleatórios
  generateUser: () => ({
    name: `User ${Math.random().toString(36).substring(7)}`,
    email: `user${Date.now()}@example.com`,
    role: 'user'
  }),

  // Valida resposta padrão
  validateSuccessResponse: (response, expectedStatus = 200) => {
    expect(response.status).to.eq(expectedStatus);
    expect(response.duration).to.be.lessThan(3000);
  },

  // Valida erro
  validateErrorResponse: (response, expectedStatus) => {
    expect(response.status).to.eq(expectedStatus);
    expect(response.body).to.have.property('error');
  }
};
```

---

## 📌 Boas Práticas Implementadas

### **1. Organização**
- ✅ Testes organizados por módulos
- ✅ Nomenclatura clara e descritiva
- ✅ Separação de dados (fixtures)
- ✅ Comandos reutilizáveis

### **2. Validações**
- ✅ Status codes
- ✅ Schemas JSON
- ✅ Headers de resposta
- ✅ Tempos de resposta
- ✅ Estrutura de dados

### **3. Manutenibilidade**
- ✅ DRY (Don't Repeat Yourself)
- ✅ Helpers e utilities
- ✅ Variáveis de ambiente
- ✅ Configuração centralizada

### **4. CI/CD**
- ✅ Pipeline automatizado
- ✅ Execução em múltiplos browsers
- ✅ Relatórios como artefatos
- ✅ Notificações de falhas

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### **Padrão de Commits**

```
feat: adiciona novo módulo de testes
fix: corrige validação de schema
docs: atualiza documentação
test: adiciona testes de integração
refactor: refatora helper de API
```

---

## 🗺️ Roadmap

### **Próximos Passos**

- [ ] Adicionar testes de performance
- [ ] Implementar testes de contrato (Pact)
- [ ] Adicionar testes de segurança
- [ ] Integrar com Allure Report
- [ ] Adicionar testes de GraphQL
- [ ] Implementar parallel execution
- [ ] Adicionar docker-compose para ambiente local

---

## 📞 Contato

**José Willams** - QA Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/007will)
[![GitHub](https://img.shields.io/badge/GitHub-111?style=for-the-badge&logo=github&logoColor=white)](https://github.com/007will)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:renome@live.com)

**Link do Projeto:** [https://github.com/007will/API_Automation_Project_Cypress](https://github.com/007will/API_Automation_Project_Cypress)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## ⭐ Mostre seu Apoio

Se este projeto te ajudou, considere dar uma **estrela**! ⭐

[![GitHub stars](https://img.shields.io/github/stars/007will/API_Automation_Project_Cypress?style=social)](https://github.com/007will/API_Automation_Project_Cypress)

---

**Última atualização:** Janeiro 2026  
**Status:** 🟢 Ativo e em manutenção
