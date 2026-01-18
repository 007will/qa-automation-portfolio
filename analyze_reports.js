const fs = require('fs');
const path = require('path');

// Função para ler e analisar um arquivo JSON
function analyzeReport(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error.message);
    return null;
  }
}

// Função para extrair testes de um relatório
function extractTests(report) {
  const tests = [];
  
  if (report && report.results) {
    report.results.forEach(result => {
      if (result.suites) {
        result.suites.forEach(suite => {
          if (suite.tests) {
            suite.tests.forEach(test => {
              tests.push({
                title: test.fullTitle || test.title,
                duration: test.duration || 0,
                state: test.state,
                pass: test.pass,
                fail: test.fail,
                error: test.err && test.err.message ? test.err.message : null,
                file: result.file || result.fullFile
              });
            });
          }
        });
      }
    });
  }
  
  return tests;
}

// Main
const reportsDir = path.join(__dirname, 'cypress', 'reports');
const files = fs.readdirSync(reportsDir)
  .filter(f => f.match(/^mochawesome_\d+\.json$/))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

console.log(`\n📊 ANÁLISE DE RELATÓRIOS DE TESTES CYPRESS`);
console.log(`${'='.repeat(80)}\n`);
console.log(`Total de relatórios encontrados: ${files.length}\n`);

// Estatísticas agregadas
let totalStats = {
  totalTests: 0,
  totalPasses: 0,
  totalFailures: 0,
  totalDuration: 0,
  totalReports: 0
};

// Armazenar testes para análise
let allTests = [];
let failedTests = [];
let slowTests = [];

// Processar cada relatório
files.forEach((file, index) => {
  const filePath = path.join(reportsDir, file);
  const report = analyzeReport(filePath);
  
  if (report && report.stats) {
    totalStats.totalTests += report.stats.tests || 0;
    totalStats.totalPasses += report.stats.passes || 0;
    totalStats.totalFailures += report.stats.failures || 0;
    totalStats.totalDuration += report.stats.duration || 0;
    totalStats.totalReports++;
    
    // Extrair testes individuais
    const tests = extractTests(report);
    allTests = allTests.concat(tests);
    
    // Identificar testes falhados
    tests.filter(t => t.fail).forEach(t => {
      failedTests.push({
        ...t,
        reportFile: file
      });
    });
    
    // Identificar testes lentos (>30s = 30000ms)
    tests.filter(t => t.duration > 30000).forEach(t => {
      slowTests.push({
        ...t,
        reportFile: file
      });
    });
  }
  
  // Progresso
  if ((index + 1) % 50 === 0) {
    console.log(`Processados: ${index + 1}/${files.length} relatórios...`);
  }
});

console.log(`Processamento completo: ${totalStats.totalReports} relatórios analisados.\n`);

// Calcular taxa de sucesso
const successRate = totalStats.totalTests > 0 
  ? ((totalStats.totalPasses / totalStats.totalTests) * 100).toFixed(2)
  : 0;

// Imprimir estatísticas gerais
console.log(`${'='.repeat(80)}`);
console.log(`📈 ESTATÍSTICAS GERAIS`);
console.log(`${'='.repeat(80)}`);
console.log(`Total de Testes Executados: ${totalStats.totalTests}`);
console.log(`✅ Testes Aprovados (Passes): ${totalStats.totalPasses}`);
console.log(`❌ Testes Falhados (Failures): ${totalStats.totalFailures}`);
console.log(`📊 Taxa de Sucesso: ${successRate}%`);
console.log(`⏱️  Duração Total: ${(totalStats.totalDuration / 1000 / 60).toFixed(2)} minutos`);
console.log(`⏱️  Duração Média por Relatório: ${(totalStats.totalDuration / totalStats.totalReports / 1000).toFixed(2)} segundos\n`);

// Top 5 testes mais lentos
console.log(`${'='.repeat(80)}`);
console.log(`🐌 TOP 5 TESTES MAIS LENTOS`);
console.log(`${'='.repeat(80)}`);
const sortedSlowTests = [...allTests]
  .sort((a, b) => b.duration - a.duration)
  .slice(0, 5);

sortedSlowTests.forEach((test, index) => {
  console.log(`\n${index + 1}. ${test.title}`);
  console.log(`   ⏱️  Duração: ${(test.duration / 1000).toFixed(2)}s`);
  console.log(`   📁 Arquivo: ${test.file}`);
  console.log(`   📊 Status: ${test.state}`);
});

// Testes com duração acima de 30s
console.log(`\n\n${'='.repeat(80)}`);
console.log(`⚠️  TESTES COM DURAÇÃO ACIMA DE 30s`);
console.log(`${'='.repeat(80)}`);
console.log(`Total: ${slowTests.length} testes\n`);

if (slowTests.length > 0) {
  // Agrupar por arquivo
  const slowTestsByFile = {};
  slowTests.forEach(test => {
    if (!slowTestsByFile[test.file]) {
      slowTestsByFile[test.file] = [];
    }
    slowTestsByFile[test.file].push(test);
  });
  
  Object.keys(slowTestsByFile).forEach(file => {
    console.log(`📁 ${file} (${slowTestsByFile[file].length} testes lentos)`);
    slowTestsByFile[file].forEach(test => {
      console.log(`   • ${test.title} - ${(test.duration / 1000).toFixed(2)}s`);
    });
    console.log('');
  });
}

// Análise de falhas
console.log(`${'='.repeat(80)}`);
console.log(`❌ ANÁLISE DE FALHAS`);
console.log(`${'='.repeat(80)}`);
console.log(`Total de Falhas: ${failedTests.length}\n`);

if (failedTests.length > 0) {
  // Agrupar falhas por título de teste
  const failuresByTest = {};
  failedTests.forEach(test => {
    const key = test.title;
    if (!failuresByTest[key]) {
      failuresByTest[key] = {
        count: 0,
        files: new Set(),
        errors: []
      };
    }
    failuresByTest[key].count++;
    failuresByTest[key].files.add(test.file);
    if (test.error) {
      failuresByTest[key].errors.push(test.error);
    }
  });
  
  // Ordenar por frequência de falha
  const sortedFailures = Object.entries(failuresByTest)
    .sort((a, b) => b[1].count - a[1].count);
  
  console.log(`🔍 Testes com Falhas Repetidas:\n`);
  sortedFailures.forEach(([testName, data], index) => {
    console.log(`${index + 1}. ${testName}`);
    console.log(`   🔢 Ocorrências: ${data.count}`);
    console.log(`   📁 Arquivos: ${Array.from(data.files).join(', ')}`);
    if (data.errors.length > 0) {
      const uniqueErrors = [...new Set(data.errors)];
      console.log(`   ❌ Erros:`);
      uniqueErrors.forEach(err => {
        console.log(`      - ${err.substring(0, 100)}${err.length > 100 ? '...' : ''}`);
      });
    }
    console.log('');
  });
  
  // Agrupar falhas por tipo de erro
  console.log(`\n📋 Principais Causas de Falhas:\n`);
  const errorPatterns = {};
  failedTests.forEach(test => {
    if (test.error) {
      const errorKey = test.error.substring(0, 100);
      if (!errorPatterns[errorKey]) {
        errorPatterns[errorKey] = 0;
      }
      errorPatterns[errorKey]++;
    }
  });
  
  const sortedErrors = Object.entries(errorPatterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  sortedErrors.forEach(([error, count], index) => {
    console.log(`${index + 1}. [${count}x] ${error}${error.length === 100 ? '...' : ''}`);
  });
} else {
  console.log(`✅ Nenhuma falha detectada! Todos os testes passaram.\n`);
}

// Recomendações
console.log(`\n${'='.repeat(80)}`);
console.log(`💡 RECOMENDAÇÕES PARA MELHORIA`);
console.log(`${'='.repeat(80)}\n`);

const recommendations = [];

// Recomendação baseada na taxa de sucesso
if (parseFloat(successRate) < 95) {
  recommendations.push({
    priority: '🔴 ALTA',
    area: 'Estabilidade dos Testes',
    issue: `Taxa de sucesso de ${successRate}% está abaixo do ideal (95%)`,
    recommendation: 'Investigar e corrigir testes com falhas frequentes. Verificar se há problemas de sincronização, timeouts ou dependências externas.'
  });
}

// Recomendação baseada em testes lentos
if (slowTests.length > 10) {
  recommendations.push({
    priority: '🟡 MÉDIA',
    area: 'Performance dos Testes',
    issue: `${slowTests.length} testes executam em mais de 30 segundos`,
    recommendation: 'Otimizar testes lentos: reduzir esperas desnecessárias, usar mocks para chamadas de API, paralelizar quando possível.'
  });
}

// Recomendação baseada em falhas repetidas
if (failedTests.length > 5) {
  const repeatedFailures = Object.values(
    failedTests.reduce((acc, test) => {
      if (!acc[test.title]) acc[test.title] = 0;
      acc[test.title]++;
      return acc;
    }, {})
  ).filter(count => count > 1).length;
  
  if (repeatedFailures > 0) {
    recommendations.push({
      priority: '🔴 ALTA',
      area: 'Flakiness',
      issue: `${repeatedFailures} testes apresentam falhas intermitentes`,
      recommendation: 'Identificar e corrigir testes flaky. Adicionar esperas explícitas, melhorar seletores, verificar race conditions.'
    });
  }
}

// Recomendação baseada na duração média
const avgDuration = totalStats.totalDuration / totalStats.totalReports / 1000;
if (avgDuration > 60) {
  recommendations.push({
    priority: '🟡 MÉDIA',
    area: 'Eficiência da Suite',
    issue: `Duração média de ${avgDuration.toFixed(2)}s por relatório é alta`,
    recommendation: 'Considerar paralelização dos testes, otimização de setup/teardown, uso de cy.session() para login.'
  });
}

// Recomendações gerais
recommendations.push({
  priority: '🟢 BOA PRÁTICA',
  area: 'Monitoramento Contínuo',
  issue: 'Manter qualidade dos testes ao longo do tempo',
  recommendation: 'Implementar dashboard de métricas, alertas para degradação de performance, revisão periódica de testes obsoletos.'
});

recommendations.push({
  priority: '🟢 BOA PRÁTICA',
  area: 'Manutenibilidade',
  issue: 'Facilitar manutenção e evolução da suite',
  recommendation: 'Adotar Page Object Model, extrair dados de teste para fixtures, documentar casos de teste complexos.'
});

recommendations.forEach((rec, index) => {
  console.log(`${index + 1}. ${rec.priority} - ${rec.area}`);
  console.log(`   ⚠️  Problema: ${rec.issue}`);
  console.log(`   ✅ Recomendação: ${rec.recommendation}\n`);
});

// Resumo final
console.log(`${'='.repeat(80)}`);
console.log(`📝 RESUMO EXECUTIVO`);
console.log(`${'='.repeat(80)}\n`);

console.log(`Status Geral: ${parseFloat(successRate) >= 95 ? '✅ EXCELENTE' : parseFloat(successRate) >= 80 ? '⚠️  BOM' : '❌ NECESSITA ATENÇÃO'}`);
console.log(`\nDestaques:`);
console.log(`• ${totalStats.totalTests} testes executados em ${totalStats.totalReports} relatórios`);
console.log(`• Taxa de sucesso: ${successRate}%`);
console.log(`• ${failedTests.length} falhas detectadas`);
console.log(`• ${slowTests.length} testes com performance abaixo do ideal (>30s)`);
console.log(`• Tempo médio de execução: ${(avgDuration).toFixed(2)}s por suite`);

if (sortedSlowTests.length > 0) {
  console.log(`\nTeste mais lento: ${sortedSlowTests[0].title} (${(sortedSlowTests[0].duration / 1000).toFixed(2)}s)`);
}

console.log(`\n${'='.repeat(80)}\n`);
console.log(`✅ Análise concluída com sucesso!`);
console.log(`📅 Data da análise: ${new Date().toLocaleString('pt-BR')}\n`);
