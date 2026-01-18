# 🚀 Testes de API - Índice de Navegação

## 📖 Comece Aqui

Bem-vindo à documentação completa dos **Testes de API** do projeto Diretório Automation!

---

## 🗺️ Guia de Navegação

### 🚀 **Para Começar Rapidamente**
👉 [**GUIA_RAPIDO.md**](GUIA_RAPIDO.md) - Comandos essenciais, configuração e primeiros passos

### 📚 **Documentação Completa**
👉 [**README_API_TESTS.md**](README_API_TESTS.md) - Documentação detalhada de todos os testes

### 🔄 **Integração CI/CD**
👉 [**AZURE_PIPELINES_CONFIG.md**](AZURE_PIPELINES_CONFIG.md) - Configuração para Azure DevOps

### ✅ **Resumo da Entrega**
👉 [**RESUMO_ENTREGA.md**](RESUMO_ENTREGA.md) - O que foi criado e estatísticas

---

## 📁 Arquivos de Teste

| # | Arquivo | Cenários | Operações | Perfil |
|---|---------|----------|-----------|--------|
| 1 | [api_servicos.cy.js](api_servicos.cy.js) | 1 | CREATE | Serviço |
| 2 | [api_produtos.cy.js](api_produtos.cy.js) | 5 | CRUD | Produto |
| 3 | [api_eventos.cy.js](api_eventos.cy.js) | 7 | CRUD + Filtros | Serviço |
| 4 | [api_noticias.cy.js](api_noticias.cy.js) | 6 | CRUD + Publicadas | Admin |
| 5 | [api_oportunidades.cy.js](api_oportunidades.cy.js) | 9 | CRUD + Admin/User | Ambos |
| 6 | [api_lives.cy.js](api_lives.cy.js) | 7 | CRUD + Status | Admin |
| 7 | [api_dadosempresa.cy.js](api_dadosempresa.cy.js) | 7 | CRUD + CNPJ | Serviço |
| 8 | [api_contatos.cy.js](api_contatos.cy.js) | 8 | CRUD + Email/CPF | Admin |

**Total:** 50 cenários de teste

---

## ⚡ Quick Start

### 1️⃣ Configurar Ambiente
```bash
# Copiar template
cp ../../cypress.env.example.json ../../cypress.env.json

# Editar com suas credenciais
# Ou usar "Manage Environments" no VS Code
```

### 2️⃣ Executar Testes
```bash
# Todos os testes de API
npx cypress run --spec "cypress/e2e/api/*.cy.js"

# Modo interativo
npx cypress open
```

### 3️⃣ Ver Resultados
```
📊 Relatórios: cypress/reports/
📸 Screenshots: cypress/screenshots/api/
🎥 Vídeos: cypress/videos/api/
```

---

## 📊 Visão Geral

### Por Módulo
```
Serviços        ████░░░░░░ 1 cenário
Produtos        █████████░ 5 cenários
Eventos         ██████████ 7 cenários
Notícias        █████████░ 6 cenários
Oportunidades   ██████████ 9 cenários
Lives           ██████████ 7 cenários
Dados Empresa   ██████████ 7 cenários
Contatos        ██████████ 8 cenários
```

### Por Operação
- ✅ **CREATE (POST):** 8/8 módulos (100%)
- ✅ **READ (GET):** 8/8 módulos (100%)
- ✅ **UPDATE (PUT):** 7/8 módulos (88%)
- ✅ **DELETE:** 7/8 módulos (88%)
- ⚠️ **Filtros/Buscas:** 4/8 módulos (50%)

---

## 🔗 Links Úteis

### Swagger (Documentação das APIs)
- [Serviços](https://msservice-dev.azurewebsites.net/docs/)
- [Produtos](https://msproduct-dev.azurewebsites.net/docs/)
- [Eventos](https://msevent-dev.azurewebsites.net/docs/)
- [Notícias](https://msnews-dev.azurewebsites.net/docs/)
- [Oportunidades](https://msopportunity-dev.azurewebsites.net/docs/)
- [Customer](https://mscustomer-dev.azurewebsites.net/docs/)
- [Identity](https://dev-gsidentity.azurewebsites.net/api/swagger/index.html)

---

## 🎯 Roadmap

### ✅ Concluído
- [x] 50 cenários de teste implementados
- [x] Documentação completa
- [x] Guias de uso
- [x] Template de configuração
- [x] Integração CI/CD

### 🚧 Em Progresso
- [ ] Expandir api_servicos.cy.js para CRUD completo
- [ ] Adicionar mais filtros e validações

### 📋 Planejado
- [ ] Testes de schema validation
- [ ] Testes de performance
- [ ] Testes de segurança
- [ ] Retry automático
- [ ] Paginação e filtros avançados

---

## 📞 Precisa de Ajuda?

1. **Quick Start:** Leia o [GUIA_RAPIDO.md](GUIA_RAPIDO.md)
2. **Dúvidas Técnicas:** Consulte [README_API_TESTS.md](README_API_TESTS.md)
3. **CI/CD:** Veja [AZURE_PIPELINES_CONFIG.md](AZURE_PIPELINES_CONFIG.md)
4. **Entrega Completa:** Revise [RESUMO_ENTREGA.md](RESUMO_ENTREGA.md)

---

**Criado em:** 14 de janeiro de 2026  
**Versão:** 1.0  
**Status:** ✅ Pronto para Uso
