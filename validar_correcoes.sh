#!/bin/bash

# 🔍 Script de Validação - Análise de Falhas
# Executa validações para confirmar correções

echo "=================================="
echo "🔍 VALIDAÇÃO DE CORREÇÕES - API"
echo "=================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar variáveis
check_env_var() {
    local var_name=$1
    local var_value=$(grep "$var_name" cypress.config.js)
    
    if [ -z "$var_value" ]; then
        echo -e "${RED}❌ $var_name não encontrada${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $var_name configurada${NC}"
        return 0
    fi
}

echo "1️⃣ Verificando Variáveis de Ambiente..."
echo "========================================="

check_env_var "url-homol-product"
check_env_var "url-homol-event"
check_env_var "url-homol-news"
check_env_var "url-homol-negocio"
check_env_var "url-homol-term"
check_env_var "api_url_oportunidades"

echo ""
echo "2️⃣ Testando Endpoints de API..."
echo "================================"

# Teste de conectividade (sem autenticação)
test_endpoint() {
    local name=$1
    local url=$2
    
    echo -n "Testando $name... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "$url" 2>/dev/null)
    
    if [ "$response" -eq 401 ] || [ "$response" -eq 200 ] || [ "$response" -eq 404 ]; then
        echo -e "${GREEN}✅ Online (HTTP $response)${NC}"
    else
        echo -e "${RED}❌ Offline ou erro (HTTP $response)${NC}"
    fi
}

test_endpoint "Produtos" "https://msproduct-test.azurewebsites.net/product"
test_endpoint "Eventos" "https://msevent-test.azurewebsites.net/event"
test_endpoint "Notícias" "https://msnews-test.azurewebsites.net/news"
test_endpoint "Oportunidades" "https://msopportunity-test.azurewebsites.net/opportunity"
test_endpoint "Serviços" "https://msservice-test.azurewebsites.net/service"
test_endpoint "Customer" "https://mscustomer-test.azurewebsites.net/customer"

echo ""
echo "3️⃣ Executando Teste de API (Produtos)..."
echo "=========================================="

npx cypress run --spec "cypress/e2e/api/api_produtos.cy.js" --quiet

RESULT=$?

echo ""
echo "=================================="
echo "📊 RESULTADO DA VALIDAÇÃO"
echo "=================================="

if [ $RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ SUCESSO! Testes de API passaram${NC}"
    echo ""
    echo "Próximos passos:"
    echo "1. Execute todos os testes de API:"
    echo "   npx cypress run --spec \"cypress/e2e/api/*.cy.js\""
    echo ""
    echo "2. Se tudo passar, ajuste timeouts para Backoffice"
    echo "3. Execute testes de Backoffice"
else
    echo -e "${RED}❌ FALHOU! Ainda há problemas${NC}"
    echo ""
    echo "Ações sugeridas:"
    echo "1. Verifique logs acima para detalhes"
    echo "2. Confirme se variáveis estão corretas no cypress.config.js"
    echo "3. Teste endpoints manualmente (curl)"
    echo "4. Veja ANALISE_FALHAS.md para mais detalhes"
fi

echo ""
echo "=================================="
