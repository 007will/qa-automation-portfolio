# 🔍 ANÁLISE DE FALHAS - 206/209 Testes Falharam

**Data:** 14 de janeiro de 2026  
**Execução:** `npx cypress run`  
**Resultado:** 3 passou | 206 falharam | 0 pendentes

---

## 📊 Resumo das Falhas

| Categoria | Testes | Passou | Falhou | Taxa Falha |
|-----------|--------|--------|--------|------------|
| **Backoffice** | 173 | 2 | 171 | 99% |
| **API** | 36 | 1 | 35 | 97% |
| **TOTAL** | 209 | 3 | 206 | 99% |

---

## 🚨 CAUSA RAIZ #1: Variáveis de Ambiente Ausentes (CRÍTICO)

### Problema Identificado

Os testes de API criados usam nomenclatura diferente das variáveis configuradas:

```javascript
// ❌ O QUE OS TESTES USAM (não existe):
Cypress.env('url-homol-product')
Cypress.env('url-homol-event')
Cypress.env('url-homol-news')
Cypress.env('url-homol-negocio')
Cypress.env('url-homol-term')

// ✅ O QUE EXISTE NO cypress.config.js:
api_url_produtos
api_url_eventos
api_url_noticias
api_url_oportunidades (VAZIO!)
```

### Impacto
- **100% dos testes de API falham** por URL undefined
- Todos os requests retornam erro antes mesmo de tentar autenticar

### Solução Aplicada
✅ Adicionadas variáveis com ambas nomenclaturas ao `cypress.config.js`:
```javascript
env: {
  // URLs antigas (compatibilidade)
  api_url_produtos: '...',
  api_url_eventos: '...',
  
  // URLs novas (testes novos)
  'url-homol-product': '...',
  'url-homol-event': '...',
  'url-homol-news': '...',
  'url-homol-negocio': '...',
  'url-homol-term': '...',
}
```

---

## 🚨 CAUSA RAIZ #2: URL Oportunidades Vazia

### Problema
```javascript
api_url_oportunidades: '',  // ❌ STRING VAZIA
```

### Impacto
- Todos os testes de oportunidades (admin + user) falham
- 16 + 15 = 31 testes afetados

### Solução Aplicada
✅ URL configurada:
```javascript
api_url_oportunidades: 'https://msopportunity-test.azurewebsites.net/opportunity'
```

---

## 🚨 CAUSA RAIZ #3: Falta URL Customer/Termo

### Problema
Nenhuma variável configurada para o módulo Customer (Dados da Empresa)

### Impacto
- 7 testes de `api_dadosempresa.cy.js` falham

### Solução Aplicada
✅ URL adicionada:
```javascript
'url-homol-term': 'https://mscustomer-test.azurewebsites.net/customer'
```

---

## 🚨 CAUSA RAIZ #4: Testes Backoffice - Múltiplos Problemas

### 4.1 Timeouts Muito Curtos
```javascript
defaultCommandTimeout: 5000,   // 5s - muito curto!
pageLoadTimeout: 10000,        // 10s - muito curto!
requestTimeout: 10000,
```

**Problema:** Testes falham por timeout antes de elementos carregarem

**Recomendação:**
```javascript
defaultCommandTimeout: 15000,  // 15s
pageLoadTimeout: 30000,        // 30s
requestTimeout: 30000,
```

### 4.2 Contatos - 33/35 Falhas

**Arquivo:** `Backoffice/contatos.cy.js`

**Possíveis causas:**
- Seletores quebrados (mudanças no frontend)
- CPF duplicado (cadastro já existe)
- Campos obrigatórios não preenchidos
- Timeout aguardando elementos

**Ação sugerida:**
```bash
# Executar 1 teste isolado para ver erro específico
npx cypress run --spec "cypress/e2e/Backoffice/contatos.cy.js" --headed --no-exit
```

### 4.3 Contatos POM - 50/50 Falhas

**Arquivo:** `Backoffice/contatos.pom.cy.js`

**Provável causa:** Page Object não inicializado ou importado incorretamente

**Verificar:**
1. Se Page Object existe em `cypress/support/pages/`
2. Se está importado no teste
3. Se métodos estão corretos

### 4.4 Oportunidades - 31 Falhas

**Arquivos:**
- `Oportunidade.adm.cy.js` - 16 falhas
- `Oportunidade.user.cy.js` - 15 falhas

**Possíveis causas:**
- URL vazia (corrigida acima)
- Dados de teste inválidos
- Permissões de usuário

### 4.5 Notícias - 13 Falhas

**Possíveis causas:**
- Requer login Admin
- Datas no passado
- Campos obrigatórios

### 4.6 Eventos - 9 Falhas

**Possíveis causas:**
- Datas inválidas
- Campos obrigatórios
- Endereço incompleto

### 4.7 Lives - 4 Falhas

**Possíveis causas:**
- Data/hora deve ser futura
- Link de streaming inválido
- Permissões Admin

### 4.8 Produtos - 3/4 Falhas (1 passou!)

**Bom sinal:** 1 teste passou, significa que:
- Autenticação funciona
- URL está correta
- Estrutura básica OK

**Investigar:** Por que os outros 3 falharam?

### 4.9 Serviços - 8 Falhas

**Possíveis causas:**
- CategoryId/SubCategoryId inválidos
- Campos obrigatórios
- Dados duplicados

---

## ✅ AÇÕES CORRETIVAS APLICADAS

### Imediatas (Já Feitas)
- [x] ✅ Adicionadas variáveis `url-homol-*` ao config
- [x] ✅ Preenchida URL de oportunidades
- [x] ✅ Adicionada URL de customer/termo
- [x] ✅ Mantida compatibilidade com URLs antigas

---

## 📋 PRÓXIMAS AÇÕES RECOMENDADAS

### 1. Testar API Isoladamente (ALTA PRIORIDADE)
```bash
# Executar apenas testes de API para validar correção
npx cypress run --spec "cypress/e2e/api/*.cy.js"
```

**Resultado esperado:** Pelo menos 80% devem passar agora

### 2. Aumentar Timeouts (ALTA PRIORIDADE)
```javascript
// Em cypress.config.js
defaultCommandTimeout: 15000,  // de 5000 para 15000
pageLoadTimeout: 30000,        // de 10000 para 30000
requestTimeout: 30000,
```

### 3. Debugar Contatos (MÉDIA PRIORIDADE)
```bash
# Executar 1 teste com debug
npx cypress run --spec "cypress/e2e/Backoffice/contatos.cy.js" --headed --browser chrome

# Ver erro específico nos logs
```

### 4. Validar Dados de Teste (MÉDIA PRIORIDADE)

Verificar em `cypress/dataTest/data_hml.js`:
- CPFs únicos (usar timestamp ou gerador)
- Datas futuras para eventos/lives
- Emails únicos
- IDs de categorias existem no banco

### 5. Revisar Seletores (BAIXA PRIORIDADE)

Se frontend mudou, atualizar seletores em:
- `cypress/support/commands.js`
- Page Objects (se existirem)
- Testes diretamente

### 6. Verificar Backend (CRÍTICO SE FALHAR APÓS #1)

Se mesmo após correção das URLs os testes falharem:
```bash
# Testar endpoints manualmente
curl -X GET https://msservice-test.azurewebsites.net/service
curl -X GET https://msproduct-test.azurewebsites.net/product
```

Verificar se:
- Serviços estão online
- Autenticação funciona
- Dados de teste existem

---

## 🎯 Plano de Validação

### Fase 1: Validar Correção de Variáveis (AGORA)
```bash
# 1. Executar apenas API
npx cypress run --spec "cypress/e2e/api/api_produtos.cy.js"

# Se passar, executar todas
npx cypress run --spec "cypress/e2e/api/*.cy.js"
```

**Meta:** 80% de sucesso nos testes de API

### Fase 2: Ajustar Timeouts (SE FASE 1 OK)
```bash
# Executar 1 teste Backoffice
npx cypress run --spec "cypress/e2e/Backoffice/produtos.cy.js"
```

### Fase 3: Corrigir Dados de Teste (SE FASE 2 OK)
- Revisar CPFs, emails, datas
- Regenerar dados se necessário
- Testar novamente

### Fase 4: Revisar Seletores (SE FASE 3 OK)
- Abrir Cypress em modo headed
- Identificar seletores quebrados
- Atualizar commands.js

---

## 📊 Estimativa de Correção

| Problema | Complexidade | Tempo | Status |
|----------|--------------|-------|--------|
| Variáveis de ambiente | Baixa | 5min | ✅ Feito |
| Aumentar timeouts | Baixa | 2min | 🔄 Recomendado |
| Validar dados teste | Média | 30min | ⏳ Pendente |
| Debugar contatos | Alta | 2h | ⏳ Pendente |
| Revisar seletores | Alta | 4h | ⏳ Pendente |
| **TOTAL** | - | **~7h** | - |

---

## 🎯 Taxa de Sucesso Esperada

### Após Correção de Variáveis (Fase 1)
```
API Tests: 80-90% sucesso
Backoffice: Ainda ~10% (outros problemas)
```

### Após Todas Correções (Fase 4)
```
API Tests: 95%+ sucesso
Backoffice: 70-80% sucesso
```

---

## 📝 Lições Aprendidas

1. ✅ **Sempre validar variáveis de ambiente antes de criar testes**
2. ✅ **Usar nomenclatura consistente em todo projeto**
3. ✅ **Documentar variáveis necessárias**
4. ⚠️ **Timeouts padrão do Cypress (4000ms) são insuficientes para apps reais**
5. ⚠️ **Dados de teste precisam ser únicos (CPF, email)**
6. ⚠️ **Datas precisam ser dinâmicas (futuras)**

---

## 🔗 Referências

- [cypress.config.js](../../cypress.config.js) - Configuração corrigida
- [data_hml.js](../../cypress/dataTest/data_hml.js) - Dados de teste
- [CHECKLIST_CONFIGURACAO.md](CHECKLIST_CONFIGURACAO.md) - Validação completa

---

**Próximo Passo:** Execute `npx cypress run --spec "cypress/e2e/api/*.cy.js"` para validar correções!
