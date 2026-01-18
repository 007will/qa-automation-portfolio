# ✅ Checklist de Configuração - Testes de API

Use esta checklist para garantir que todos os testes de API estão configurados corretamente.

---

## 📋 Checklist de Configuração Inicial

### 1️⃣ Arquivos e Estrutura

- [x] ✅ 8 arquivos de teste criados em `cypress/e2e/api/`
  - [x] api_servicos.cy.js
  - [x] api_produtos.cy.js
  - [x] api_eventos.cy.js
  - [x] api_noticias.cy.js
  - [x] api_oportunidades.cy.js
  - [x] api_lives.cy.js
  - [x] api_dadosempresa.cy.js
  - [x] api_contatos.cy.js

- [x] ✅ 5 arquivos de documentação criados
  - [x] INDEX.md
  - [x] GUIA_RAPIDO.md
  - [x] README_API_TESTS.md
  - [x] AZURE_PIPELINES_CONFIG.md
  - [x] RESUMO_ENTREGA.md

- [x] ✅ Payloads adicionados ao `cypress/dataTest/data_hml.js`
  - [x] servicoAPI
  - [x] produtoAPI
  - [x] eventoAPI
  - [x] noticiaAPI
  - [x] oportunidadeAPI
  - [x] liveAPI

- [x] ✅ Template de configuração criado
  - [x] cypress.env.example.json

---

### 2️⃣ Configuração do Ambiente

- [ ] **Copiar arquivo de configuração**
  ```bash
  cp cypress.env.example.json cypress.env.json
  ```

- [ ] **Configurar credenciais no `cypress.env.json`**
  - [ ] `admin_login` e `password`
  - [ ] `servico_login` e `password`
  - [ ] `produto_login` e `password` (opcional)
  - [ ] URLs das APIs (verificar se DEV ou TEST)

- [ ] **OU configurar via Manage Environments no VS Code**
  - [ ] Criar ambiente HML-User-Admin
  - [ ] Criar ambiente HML-User-Servico
  - [ ] Criar ambiente HML-User-Produto

---

### 3️⃣ Validação de Endpoints

Verificar se as URLs estão corretas para o ambiente desejado:

- [ ] **Serviços**
  - [ ] DEV: `https://msservice-dev.azurewebsites.net/service`
  - [ ] TEST: `https://msservice-test.azurewebsites.net/service`

- [ ] **Produtos**
  - [ ] DEV: `https://msproduct-dev.azurewebsites.net/product`
  - [ ] TEST: `https://msproduct-test.azurewebsites.net/product`

- [ ] **Eventos**
  - [ ] DEV: `https://msevent-dev.azurewebsites.net/event`
  - [ ] TEST: `https://msevent-test.azurewebsites.net/event`

- [ ] **Notícias**
  - [ ] DEV: `https://msnews-dev.azurewebsites.net/news`
  - [ ] TEST: `https://msnews-test.azurewebsites.net/news`

- [ ] **Oportunidades**
  - [ ] DEV: `https://msopportunity-dev.azurewebsites.net/opportunity`
  - [ ] TEST: `https://msopportunity-test.azurewebsites.net/opportunity`

- [ ] **Customer**
  - [ ] DEV: `https://mscustomer-dev.azurewebsites.net/customer`
  - [ ] TEST: `https://mscustomer-test.azurewebsites.net/customer`

- [ ] **Identity**
  - [ ] DEV: `https://dev-gsidentity.azurewebsites.net/api`

---

### 4️⃣ Teste Inicial

- [ ] **Instalar dependências** (se necessário)
  ```bash
  npm install
  ```

- [ ] **Executar um teste simples**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_produtos.cy.js"
  ```

- [ ] **Verificar resultados**
  - [ ] Teste executou sem erros de configuração
  - [ ] Logs estão sendo exibidos corretamente
  - [ ] Relatórios foram gerados em `cypress/reports/`

- [ ] **Em caso de falha, verificar:**
  - [ ] Token de autenticação está sendo gerado
  - [ ] Endpoints estão respondendo
  - [ ] Payloads estão corretos
  - [ ] Customer IDs existem no banco

---

### 5️⃣ Testes por Módulo

Execute cada módulo individualmente para validação:

- [ ] **Produtos**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_produtos.cy.js"
  ```
  - [ ] ✅ Criar produto
  - [ ] ✅ Listar produtos
  - [ ] ✅ Buscar por ID
  - [ ] ✅ Atualizar produto
  - [ ] ✅ Deletar produto

- [ ] **Eventos**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_eventos.cy.js"
  ```
  - [ ] ✅ Criar evento
  - [ ] ✅ Listar eventos
  - [ ] ✅ Buscar por ID
  - [ ] ✅ Atualizar evento
  - [ ] ✅ Deletar evento
  - [ ] ✅ Filtrar por tipo
  - [ ] ✅ Filtrar por modalidade

- [ ] **Notícias**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_noticias.cy.js"
  ```
  - [ ] ✅ Criar notícia (Admin)
  - [ ] ✅ Listar notícias
  - [ ] ✅ Buscar por ID
  - [ ] ✅ Atualizar notícia
  - [ ] ✅ Deletar notícia
  - [ ] ✅ Buscar publicadas

- [ ] **Oportunidades**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_oportunidades.cy.js"
  ```
  - [ ] ✅ Criar como Admin
  - [ ] ✅ Criar como User
  - [ ] ✅ Listar todas (Admin)
  - [ ] ✅ Listar minhas (User)
  - [ ] ✅ Atualizar
  - [ ] ✅ Deletar
  - [ ] ✅ Filtros

- [ ] **Lives**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_lives.cy.js"
  ```
  - [ ] ✅ Criar live (Admin)
  - [ ] ✅ Listar lives
  - [ ] ✅ Buscar por ID
  - [ ] ✅ Atualizar live
  - [ ] ✅ Deletar live
  - [ ] ✅ Filtrar por status

- [ ] **Dados da Empresa**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_dadosempresa.cy.js"
  ```
  - [ ] ✅ Criar empresa
  - [ ] ✅ Buscar por ID
  - [ ] ✅ Buscar por CNPJ
  - [ ] ✅ Atualizar empresa
  - [ ] ✅ Listar todas
  - [ ] ✅ Validar estrutura
  - [ ] ✅ Deletar empresa

- [ ] **Contatos**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_contatos.cy.js"
  ```
  - [ ] ✅ Criar contato (Admin)
  - [ ] ✅ Listar usuários
  - [ ] ✅ Buscar por ID
  - [ ] ✅ Buscar por email
  - [ ] ✅ Buscar por CPF
  - [ ] ✅ Atualizar usuário
  - [ ] ✅ Deletar usuário
  - [ ] ✅ Validar campos obrigatórios

- [ ] **Serviços**
  ```bash
  npx cypress run --spec "cypress/e2e/api/api_servicos.cy.js"
  ```
  - [ ] ✅ Criar serviço
  - [ ] ⚠️ Expandir para CRUD completo (próximo passo)

---

### 6️⃣ Execução Completa

- [ ] **Executar todos os testes juntos**
  ```bash
  npx cypress run --spec "cypress/e2e/api/*.cy.js"
  ```

- [ ] **Verificar taxa de sucesso**
  - [ ] Pelo menos 80% dos testes passando
  - [ ] Falhas são de API/backend, não de configuração

- [ ] **Verificar relatórios**
  - [ ] Mochawesome gerou relatórios JSON
  - [ ] Screenshots capturados em falhas
  - [ ] Vídeos gravados (se configurado)

---

### 7️⃣ Ajustes Necessários

Se encontrar problemas, ajustar:

- [ ] **Payloads de Teste**
  - [ ] Verificar campos obrigatórios no Swagger
  - [ ] Ajustar IDs (customerId, categoryId, etc.)
  - [ ] Validar tipos de dados

- [ ] **Status Esperados**
  - [ ] Confirmar se API retorna 201 ou 200 no CREATE
  - [ ] Validar se DELETE retorna 204 ou 200
  - [ ] Ajustar EXPECTED_STATUS nos testes

- [ ] **Estrutura de Resposta**
  - [ ] Verificar se API retorna `id` ou `_id`
  - [ ] Validar campos retornados
  - [ ] Ajustar expects conforme necessário

---

### 8️⃣ Integração CI/CD (Opcional)

- [ ] **Criar Variable Group no Azure DevOps**
  - [ ] Nome: `API-Test-Credentials`
  - [ ] Adicionar todas as variáveis sensíveis
  - [ ] Marcar `password` como secret

- [ ] **Adicionar stage ao azure-pipelines.yml**
  - [ ] Copiar configuração de AZURE_PIPELINES_CONFIG.md
  - [ ] Ajustar conforme necessário
  - [ ] Testar execução no pipeline

- [ ] **Configurar Notificações**
  - [ ] Email em caso de falha
  - [ ] Integração com Slack/Teams (opcional)

- [ ] **Schedule de Execução**
  - [ ] Configurar execução noturna
  - [ ] Smoke tests a cada 4 horas (opcional)

---

### 9️⃣ Documentação

- [ ] **Ler documentação principal**
  - [ ] INDEX.md (índice de navegação)
  - [ ] GUIA_RAPIDO.md (comandos essenciais)
  - [ ] README_API_TESTS.md (documentação completa)

- [ ] **Compartilhar com o time**
  - [ ] Enviar links da documentação
  - [ ] Fazer demo dos testes
  - [ ] Explicar estrutura e padrões

---

### 🔟 Melhorias Futuras

- [ ] **Expandir api_servicos.cy.js**
  - [ ] Adicionar GET (listar)
  - [ ] Adicionar GET por ID
  - [ ] Adicionar PUT (atualizar)
  - [ ] Adicionar DELETE
  - [ ] Adicionar filtros

- [ ] **Validação de Schema**
  - [ ] Instalar cypress-ajv-schema-validator
  - [ ] Criar schemas JSON
  - [ ] Adicionar validações aos testes

- [ ] **Testes de Performance**
  - [ ] Medir tempo de resposta
  - [ ] Validar SLAs
  - [ ] Adicionar assertions de tempo

- [ ] **Testes de Segurança**
  - [ ] Validar autenticação
  - [ ] Testar SQL Injection
  - [ ] Testar XSS
  - [ ] Validar rate limiting

---

## ✅ Resultado Esperado

Ao final desta checklist, você deve ter:

- ✅ Todos os 50 testes executando com sucesso
- ✅ Configuração de ambiente validada
- ✅ Integração CI/CD configurada (opcional)
- ✅ Documentação lida e compreendida
- ✅ Time alinhado sobre os testes

---

## 🐛 Problemas Comuns

### Erro 401 (Unauthorized)
```
Solução:
- Verificar credenciais no cypress.env.json
- Validar se token está sendo gerado
- Confirmar URL de autenticação
```

### Erro 500 (Server Error)
```
Solução:
- Verificar logs do backend
- Validar IDs no payload (customerId, categoryId)
- Confirmar estrutura no Swagger
- Contatar equipe de desenvolvimento
```

### Erro 404 (Not Found)
```
Solução:
- Verificar URL do endpoint
- Validar variáveis de ambiente
- Confirmar se recurso existe
```

### Testes não encontrados
```
Solução:
- Verificar caminho: cypress/e2e/api/*.cy.js
- Executar: npx cypress open
- Selecionar manualmente o teste
```

---

**Data:** 14 de janeiro de 2026  
**Versão:** 1.0  
**Status:** Pronto para validação
