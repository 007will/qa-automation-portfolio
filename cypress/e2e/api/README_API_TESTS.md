# 📝 Testes de API - Documentação Completa

## 📋 Visão Geral

Esta documentação descreve todos os cenários de automação de API implementados para o projeto **Diretório Automation**.

## 🗂️ Estrutura de Arquivos

```
cypress/e2e/api/
├── api_servicos.cy.js         # Testes de API de Serviços
├── api_produtos.cy.js         # Testes de API de Produtos
├── api_eventos.cy.js          # Testes de API de Eventos
├── api_noticias.cy.js         # Testes de API de Notícias
├── api_oportunidades.cy.js    # Testes de API de Oportunidades (Admin + User)
├── api_lives.cy.js            # Testes de API de Lives/Transmissões
├── api_dadosempresa.cy.js     # Testes de API de Dados da Empresa (Customer)
└── api_contatos.cy.js         # Testes de API de Contatos/Usuários (Identity)
```

---

## 🔗 Endpoints e Swagger

| Módulo | Swagger URL | Ambiente |
|--------|-------------|----------|
| **Serviços** | https://msservice-dev.azurewebsites.net/docs/ | DEV |
| **Produtos** | https://msproduct-dev.azurewebsites.net/docs/ | DEV |
| **Eventos** | https://msevent-dev.azurewebsites.net/docs/ | DEV |
| **Lives** | https://msevent-dev.azurewebsites.net/docs/#/Transmission/post_transmission | DEV |
| **Notícias** | https://msnews-dev.azurewebsites.net/docs/ | DEV |
| **Oportunidades** | https://msopportunity-dev.azurewebsites.net/docs/ | DEV |
| **Termo/Customer** | https://mscustomer-dev.azurewebsites.net/docs/ | DEV |
| **Identity (User/Admin)** | https://dev-gsidentity.azurewebsites.net/api/swagger/index.html | DEV |

---

## 🧪 Cenários de Teste por Módulo

### 1️⃣ **api_servicos.cy.js**

**Objetivo:** Validar operações CRUD de serviços.

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar serviços com API | POST | 201 |

**Payload:**
```javascript
{
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  name: 'Serviço via API - AUTOMAÇÃO',
  categoryId: 1,
  subCategoryId: 10,
  description: 'descrição comercial',
  pictures: '',
  subcategoryName: 'Stealing'
}
```

---

### 2️⃣ **api_produtos.cy.js**

**Objetivo:** Validar operações CRUD de produtos.

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar produto com API | POST | 201 |
| 2 | Listar produtos com API | GET | 200 |
| 3 | Buscar produto específico por ID | GET | 200 |
| 4 | Atualizar produto com API | PUT | 200 |
| 5 | Deletar produto com API | DELETE | 204 |

**Payload:**
```javascript
{
  customerId: 'a1c1946b-1768-4867-aae2-5218cab97a17',
  hsCode: '01013000',
  internalCode: 'AUTO12345',
  name: 'Produto via API - AUTOMAÇÃO',
  description: 'Produto de teste para automação',
  categoryId: 3,
  subCategoryId: 15,
  pictures: '',
  type: 'exporter'
}
```

---

### 3️⃣ **api_eventos.cy.js**

**Objetivo:** Validar operações CRUD de eventos.

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar evento com API | POST | 201 |
| 2 | Listar eventos com API | GET | 200 |
| 3 | Buscar evento específico por ID | GET | 200 |
| 4 | Atualizar evento com API | PUT | 200 |
| 5 | Deletar evento com API | DELETE | 204 |
| 6 | Listar eventos por tipo | GET | 200 |
| 7 | Listar eventos por modalidade | GET | 200 |

**Payload:**
```javascript
{
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  title: 'Evento via API - AUTOMAÇÃO',
  description: 'Descrição do evento de teste',
  type: 'ownEvent',
  modality: 'online',
  startDate: '2026-01-14T10:00:00Z',
  endDate: '2026-01-21T18:00:00Z',
  eventType: 1,
  businessType: 4,
  categoryId: 2,
  address: { ... },
  fullPrice: 1000,
  discount: 10
}
```

---

### 4️⃣ **api_noticias.cy.js**

**Objetivo:** Validar operações CRUD de notícias (Admin).

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar notícia com API | POST | 201 |
| 2 | Listar notícias com API | GET | 200 |
| 3 | Buscar notícia específica por ID | GET | 200 |
| 4 | Atualizar notícia com API | PUT | 200 |
| 5 | Deletar notícia com API | DELETE | 204 |
| 6 | Buscar notícias publicadas | GET | 200 |

**Autenticação:** Requer login Admin

**Payload:**
```javascript
{
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  title: 'Notícia via API - AUTOMAÇÃO',
  content: 'Conteúdo da notícia de teste',
  publicationDate: '2026-01-21T10:00:00Z',
  categoryId: 1,
  pictures: ''
}
```

---

### 5️⃣ **api_oportunidades.cy.js**

**Objetivo:** Validar operações CRUD de oportunidades (Admin + User).

#### Context: Admin
| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar oportunidade como Admin | POST | 201 |
| 2 | Listar todas as oportunidades | GET | 200 |
| 3 | Atualizar oportunidade como Admin | PUT | 200 |
| 4 | Deletar oportunidade como Admin | DELETE | 204 |

#### Context: Usuário
| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar oportunidade como Usuário | POST | 201 |
| 2 | Listar minhas oportunidades | GET | 200 |
| 3 | Buscar oportunidade específica | GET | 200 |

#### Filtros
| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Filtrar oportunidades por tipo | GET | 200 |
| 2 | Filtrar oportunidades por país | GET | 200 |

**Payload:**
```javascript
{
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  companyName: 'Empresa AUTOMAÇÃO',
  contactName: 'Contato Oportunidade',
  contactEmail: 'oportunidade@teste.com',
  productName: 'Produto Oportunidade - AUTOMAÇÃO',
  productDescription: 'Descrição do produto',
  hsCode: '12345678',
  type: 'Importação',
  country: 'Brasil',
  categoryId: 3,
  subCategoryId: 1
}
```

---

### 6️⃣ **api_lives.cy.js**

**Objetivo:** Validar operações CRUD de lives/transmissões.

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar live com API | POST | 201 |
| 2 | Listar lives com API | GET | 200 |
| 3 | Buscar live específica por ID | GET | 200 |
| 4 | Atualizar live com API | PUT | 200 |
| 5 | Deletar live com API | DELETE | 204 |
| 6 | Listar lives por status | GET | 200 |
| 7 | Listar lives realizadas | GET | 200 |

**Autenticação:** Requer login Admin

**Payload:**
```javascript
{
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  title: 'Live via API - AUTOMAÇÃO',
  description: 'Descrição da live de teste',
  startDate: '2026-01-21T15:00:00Z',
  streamingLink: 'https://www.youtube.com/watch?v=test123',
  status: 'A Realizar',
  pictures: ''
}
```

---

### 7️⃣ **api_dadosempresa.cy.js**

**Objetivo:** Validar operações CRUD de dados da empresa (Customer/Termo).

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar dados da empresa com API | POST | 201 |
| 2 | Buscar dados da empresa por ID | GET | 200 |
| 3 | Atualizar dados da empresa | PUT | 200 |
| 4 | Listar todas as empresas | GET | 200 |
| 5 | Buscar empresa por CNPJ | GET | 200 |
| 6 | Validar estrutura de endereço | - | 201 |
| 7 | Deletar dados da empresa | DELETE | 204 |

**Payload:**
```javascript
{
  legalName: 'Teste',
  tradeName: 'Teste',
  cnpj: '12.345.678/0001-90',
  email: 'teste@email.com',
  phone: '61999999999',
  categoryId: 12,
  address: {
    street: 'Rua demo',
    number: '01',
    neighborhood: 'Riacho',
    city: 'Brasília',
    state: 'DF',
    zipCode: '71825-300',
    country: 'Brasil'
  }
}
```

---

### 8️⃣ **api_contatos.cy.js**

**Objetivo:** Validar operações CRUD de contatos/usuários (Identity).

| # | Cenário | Método | Status Esperado |
|---|---------|--------|-----------------|
| 1 | Criar contato/usuário com API | POST | 201 |
| 2 | Listar todos os usuários | GET | 200 |
| 3 | Buscar usuário específico por ID | GET | 200 |
| 4 | Atualizar dados do usuário | PUT | 200 |
| 5 | Buscar usuário por email | GET | 200 |
| 6 | Buscar usuário por CPF | GET | 200 |
| 7 | Deletar usuário | DELETE | 204 |
| 8 | Validar campos obrigatórios | POST | 400 |

**Autenticação:** Requer login Admin

**Payload:**
```javascript
{
  firstName: 'Contato de Teste',
  lastName: 'da AUTOMAÇÃO',
  email: 'contato.api.timestamp@yopmail.com',
  phoneNumber: '61999999999',
  cellphone: '61988888888',
  cpf: '12345678900',
  areaOfInterest: 'Importação e Exportação',
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663'
}
```

---

## 🔑 Autenticação

### Variáveis de Ambiente

Configure no arquivo `cypress.env.json` ou no Manage Environments:

```json
{
  "ambiente": "hml",
  "admin_login": "admin-test@yopmail.com",
  "servico_login": "servicos@yopmail.com",
  "password": "Ximas23!",
  
  "url-token": "https://acspidentitydevqa.b2clogin.com/acspidentitydevqa.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_ropc_auth",
  "client_id": "90c61a6b-24a0-48f7-ab33-8c2b7447af52",
  "scope": "openid 90c61a6b-24a0-48f7-ab33-8c2b7447af52",
  "grant_type": "password",
  
  "api_url_servicos": "https://msservice-test.azurewebsites.net/service",
  "url-homol-product": "https://msproduct-test.azurewebsites.net/product",
  "url-homol-event": "https://msevent-test.azurewebsites.net/event",
  "url-homol-news": "https://msnews-test.azurewebsites.net/news",
  "url-homol-negocio": "https://msopportunity-test.azurewebsites.net/opportunity",
  "url-homol-term": "https://mscustomer-test.azurewebsites.net/customer"
}
```

### Usuários de Teste

| Perfil | Email | Customer ID |
|--------|-------|-------------|
| **Admin** | admin-test@yopmail.com | 90c61a6b-24a0-48f7-ab33-8c2b7447af52 |
| **Produtos** | produtosimportexport@yopmail.com | a1c1946b-1768-4867-aae2-5218cab97a17 |
| **Serviços** | servicos@yopmail.com | d0c00d8c-29ea-48fc-b09b-0d71d11d8663 |
| **Negócios** | oportunidades@yopmail.com | 90c61a6b-24a0-48f7-ab33-8c2b7447af52 |

---

## 🚀 Executando os Testes

### Executar todos os testes de API
```bash
npx cypress run --spec "cypress/e2e/api/*.cy.js"
```

### Executar teste específico
```bash
npx cypress run --spec "cypress/e2e/api/api_servicos.cy.js"
```

### Executar em modo interativo
```bash
npx cypress open
```

### Executar com ambiente específico
```bash
npx cypress run --env ambiente=hml --spec "cypress/e2e/api/*.cy.js"
```

---

## 📊 Cobertura de Testes

| Módulo | Cenários | Status |
|--------|----------|--------|
| Serviços | 1 | ✅ |
| Produtos | 5 | ✅ |
| Eventos | 7 | ✅ |
| Notícias | 6 | ✅ |
| Oportunidades | 9 | ✅ |
| Lives | 7 | ✅ |
| Dados Empresa | 7 | ✅ |
| Contatos | 8 | ✅ |
| **TOTAL** | **50** | ✅ |

---

## 🐛 Debugging

### Logs Detalhados

Todos os testes incluem logs estruturados:

```javascript
cy.log('✅ Login realizado com sucesso');
cy.log('Payload:', JSON.stringify(data, null, 2));
cy.log('Status recebido:', response.status);
cy.log('Body recebido:', JSON.stringify(response.body, null, 2));
```

### Erro 500 - Backend

Se encontrar erro 500:
1. Verifique os logs do servidor
2. Valide se os IDs (categoryId, subCategoryId, customerId) existem
3. Confirme se os dados obrigatórios foram enviados
4. Verifique se o token está válido

### Erro 401 - Unauthorized

1. Token expirado (válido por 3600s = 1h)
2. Token inválido ou corrompido
3. Usuário sem permissão para o endpoint

---

## 📝 Padrões de Código

### Estrutura de Teste
```javascript
it('Descrição do cenário', () => {
  const EXPECTED_STATUS = 201;

  cy.loginAPI(user, password)
    .then((response) => {
      token = response.access_token;
      return cy.apiPostRequestWithToken(data, url, token, EXPECTED_STATUS);
    })
    .then((response) => {
      cy.log('Status:', response.status);
      expect(response.status).to.eq(EXPECTED_STATUS);
      expect(response.body).to.have.property('id');
    });
});
```

### Boas Práticas
- ✅ Sempre logar informações relevantes
- ✅ Validar status HTTP e estrutura de resposta
- ✅ Usar `failOnStatusCode: false` para controlar erros
- ✅ Capturar IDs retornados para testes subsequentes
- ✅ Limpar dados criados (DELETE) quando necessário

---

## 🔄 Melhorias Futuras

- [ ] Implementar retry automático em caso de falha
- [ ] Adicionar validação de schema com JSON Schema
- [ ] Criar testes de performance/carga
- [ ] Implementar testes de segurança (SQL Injection, XSS)
- [ ] Adicionar validação de rate limiting
- [ ] Criar suite de testes de integração entre módulos
- [ ] Implementar data-driven tests com múltiplos payloads
- [ ] Adicionar testes de paginação e filtros avançados

---

## 📞 Contato

Para dúvidas ou sugestões sobre os testes de API, entre em contato com a equipe de QA.

**Última atualização:** 14 de janeiro de 2026
