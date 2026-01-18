# 🔄 Integração CI/CD - Azure Pipelines

## 📋 Configuração para Testes de API

### Adicionar ao `azure-pipelines.yml`

```yaml
# Adicionar nova stage para testes de API
stages:
  # ... stages existentes ...
  
  - stage: TestAPI
    displayName: 'Executar Testes de API'
    dependsOn: []
    jobs:
      - job: RunAPITests
        displayName: 'Testes de API - Cypress'
        pool:
          vmImage: 'ubuntu-latest'
        
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
            displayName: 'Instalar Node.js'
          
          - script: npm ci
            displayName: 'Instalar dependências'
          
          - script: |
              npx cypress run \
                --spec "cypress/e2e/api/*.cy.js" \
                --config video=true \
                --env ambiente=hml
            displayName: 'Executar Testes de API'
            continueOnError: true
          
          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'cypress/results/*.xml'
              testRunTitle: 'Testes de API - Cypress'
            displayName: 'Publicar Resultados dos Testes'
            condition: always()
          
          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: 'cypress/screenshots'
              artifact: 'screenshots-api'
            displayName: 'Publicar Screenshots'
            condition: failed()
```

---

## 🎯 Estratégias de Execução

### 1. Executar em Paralelo por Módulo

```yaml
- stage: TestAPI
  displayName: 'Testes de API - Paralelo'
  jobs:
    - job: TestServicos
      displayName: 'API Serviços'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_servicos.cy.js"
    
    - job: TestProdutos
      displayName: 'API Produtos'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_produtos.cy.js"
    
    - job: TestEventos
      displayName: 'API Eventos'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_eventos.cy.js"
    
    - job: TestNoticias
      displayName: 'API Notícias'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_noticias.cy.js"
    
    - job: TestOportunidades
      displayName: 'API Oportunidades'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_oportunidades.cy.js"
    
    - job: TestLives
      displayName: 'API Lives'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_lives.cy.js"
    
    - job: TestDadosEmpresa
      displayName: 'API Dados Empresa'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_dadosempresa.cy.js"
    
    - job: TestContatos
      displayName: 'API Contatos'
      steps:
        - script: npx cypress run --spec "cypress/e2e/api/api_contatos.cy.js"
```

### 2. Smoke Tests (Testes Rápidos)

```yaml
- stage: SmokeTestAPI
  displayName: 'Smoke Tests - API'
  jobs:
    - job: QuickTests
      displayName: 'Testes Críticos'
      steps:
        - script: |
            npx cypress run \
              --spec "cypress/e2e/api/api_servicos.cy.js,cypress/e2e/api/api_produtos.cy.js" \
              --config video=false
          displayName: 'Executar Smoke Tests'
```

### 3. Execução por Ambiente

```yaml
parameters:
  - name: ambiente
    displayName: 'Ambiente'
    type: string
    default: 'hml'
    values:
      - hml
      - dev
      - test

- script: |
    npx cypress run \
      --spec "cypress/e2e/api/*.cy.js" \
      --env ambiente=${{ parameters.ambiente }}
  displayName: 'Testes API - ${{ parameters.ambiente }}'
```

---

## 📊 Relatórios Mochawesome

### Configurar Merge de Relatórios

Adicionar ao pipeline:

```yaml
- script: |
    npm install --save-dev mochawesome-merge mochawesome-report-generator
  displayName: 'Instalar ferramentas de relatório'

- script: |
    npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged-report.json
  displayName: 'Merge relatórios JSON'
  condition: always()

- script: |
    npx mochawesome-report-generator cypress/reports/merged-report.json \
      --reportDir cypress/reports/html \
      --reportTitle "Testes de API - $(Build.BuildNumber)" \
      --reportPageTitle "API Tests"
  displayName: 'Gerar relatório HTML'
  condition: always()

- task: PublishPipelineArtifact@1
  inputs:
    targetPath: 'cypress/reports/html'
    artifact: 'relatorio-api-tests'
  displayName: 'Publicar Relatório HTML'
  condition: always()
```

---

## 🔐 Gerenciar Secrets

### Variáveis Secretas no Azure DevOps

1. Ir para **Pipelines > Library > Variable Groups**
2. Criar grupo: `API-Test-Credentials`
3. Adicionar variáveis:

```
admin_login           = admin-test@yopmail.com
servico_login         = servicos@yopmail.com
produto_login         = produtosimportexport@yopmail.com
password              = ******** (marcar como secret)
customerId_admin      = 90c61a6b-24a0-48f7-ab33-8c2b7447af52
customerId_servico    = d0c00d8c-29ea-48fc-b09b-0d71d11d8663
```

### Usar no Pipeline

```yaml
variables:
  - group: API-Test-Credentials

steps:
  - script: |
      npx cypress run \
        --spec "cypress/e2e/api/*.cy.js" \
        --env admin_login=$(admin_login),servico_login=$(servico_login),password=$(password)
    displayName: 'Executar Testes com Credenciais'
    env:
      CYPRESS_ADMIN_LOGIN: $(admin_login)
      CYPRESS_PASSWORD: $(password)
```

---

## 🚨 Notificações de Falha

### Enviar Email em Caso de Falha

```yaml
- task: SendEmail@1
  inputs:
    To: 'equipe-qa@empresa.com'
    Subject: '❌ Falha nos Testes de API - Build $(Build.BuildNumber)'
    Body: |
      Os testes de API falharam no ambiente: $(ambiente)
      
      Build: $(Build.BuildNumber)
      Branch: $(Build.SourceBranchName)
      
      Ver detalhes: $(System.TeamFoundationCollectionUri)$(System.TeamProject)/_build/results?buildId=$(Build.BuildId)
  displayName: 'Enviar Email de Falha'
  condition: failed()
```

### Integração com Slack/Teams

```yaml
- task: Webhook@1
  inputs:
    method: 'POST'
    url: '$(SLACK_WEBHOOK_URL)'
    body: |
      {
        "text": "❌ Testes de API falharam!",
        "attachments": [
          {
            "color": "danger",
            "fields": [
              { "title": "Build", "value": "$(Build.BuildNumber)", "short": true },
              { "title": "Ambiente", "value": "$(ambiente)", "short": true },
              { "title": "Branch", "value": "$(Build.SourceBranchName)", "short": true }
            ]
          }
        ]
      }
  displayName: 'Notificar Slack'
  condition: failed()
```

---

## 📈 Métricas e KPIs

### Dashboard do Azure DevOps

Criar widgets para:
- Taxa de sucesso dos testes
- Tempo de execução
- Tendências de falhas
- Cobertura por módulo

### Query Exemplo

```kusto
TestRun
| where TestRunTitle contains "API"
| summarize 
    TotalTests = count(),
    PassedTests = countif(Outcome == "Passed"),
    FailedTests = countif(Outcome == "Failed")
| extend PassRate = (PassedTests * 100.0) / TotalTests
| project PassRate, TotalTests, PassedTests, FailedTests
```

---

## 🔄 Schedule (Execução Agendada)

### Executar Testes Diariamente

```yaml
schedules:
  - cron: "0 2 * * *"  # Todos os dias às 2h
    displayName: 'Execução Noturna - Testes de API'
    branches:
      include:
        - main
    always: true

  - cron: "0 */4 * * *"  # A cada 4 horas
    displayName: 'Smoke Tests - API'
    branches:
      include:
        - develop
```

---

## 🎯 Gates e Quality Gates

### Bloquear Deploy se Testes Falharem

```yaml
- stage: Deploy
  displayName: 'Deploy para Produção'
  dependsOn: TestAPI
  condition: succeeded('TestAPI')
  jobs:
    - deployment: DeployProd
      # ... configuração de deploy ...
```

### Quality Gate com Threshold

```yaml
- task: BuildQualityChecks@8
  inputs:
    checkWarnings: true
    warningFailOption: 'fixed'
    warningThreshold: '0'
    checkCoverage: false
  displayName: 'Quality Gate - Zero Falhas'
```

---

## 📝 Exemplo Completo

```yaml
trigger:
  branches:
    include:
      - main
      - develop
  paths:
    include:
      - cypress/e2e/api/**

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: API-Test-Credentials
  - name: ambiente
    value: 'hml'

stages:
  - stage: TestAPI
    displayName: 'Testes de API'
    jobs:
      - job: RunTests
        displayName: 'Executar Testes'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
          
          - script: npm ci
            displayName: 'Instalar Dependências'
          
          - script: |
              npx cypress run \
                --spec "cypress/e2e/api/*.cy.js" \
                --env ambiente=$(ambiente),admin_login=$(admin_login),password=$(password) \
                --reporter mochawesome \
                --reporter-options reportDir=cypress/reports,overwrite=false,html=false,json=true
            displayName: 'Executar Testes de API'
            continueOnError: true
          
          - script: |
              npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged.json
              npx mochawesome-report-generator cypress/reports/merged.json -o cypress/reports/html
            displayName: 'Gerar Relatório'
            condition: always()
          
          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'cypress/results/*.xml'
            condition: always()
          
          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: 'cypress/reports/html'
              artifact: 'relatorio-api'
            condition: always()
          
          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: 'cypress/screenshots'
              artifact: 'screenshots'
            condition: failed()
```

---

## ✅ Checklist de Configuração

- [ ] Criar Variable Group com credenciais
- [ ] Adicionar stage de testes ao pipeline
- [ ] Configurar publish de artifacts
- [ ] Configurar notificações de falha
- [ ] Configurar quality gates
- [ ] Adicionar schedule para execução noturna
- [ ] Criar dashboard de métricas
- [ ] Documentar processo para o time

---

**Última Atualização:** 14 de janeiro de 2026
