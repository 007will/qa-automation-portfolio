# 📘 Guia de Page Objects (POM)

## 📂 Estrutura Criada

```
cypress/support/pages/
├── BasePage.js              # Classe base com métodos comuns
├── OportunidadesPage.js     # Page Object para Oportunidades
├── ContatosPage.js          # Page Object para Contatos
├── ServicosPage.js          # Page Object para Serviços
└── index.js                 # Exportação centralizada
```

## 🎯 Benefícios do Page Object Model

✅ **Manutenibilidade**: Seletores e lógica centralizados
✅ **Reusabilidade**: Métodos compartilhados entre testes
✅ **Legibilidade**: Testes mais claros e expressivos
✅ **Manutenção**: Mudanças de UI requerem alteração em um único local
✅ **Abstração**: Testes focam no "o que" fazer, não no "como"

---

## 🏗️ Arquitetura

### BasePage
Classe base contendo métodos comuns a todas as páginas:

```javascript
class BasePage {
  visit(url)                    // Navega para URL
  waitForLoad(timeout)          // Aguarda carregamento
  getElement(selector)          // Obtém elemento
  click(selector)               // Clica em elemento
  type(selector, value)         // Preenche campo
  shouldBeVisible(selector)     // Valida visibilidade
  login(username, password)     // Realiza login
  acessarBackOffice(menuItem)   // Acessa menu
  validarModalSucesso()         // Valida modal de sucesso
  aguardarGrid()                // Aguarda grid carregar
}
```

### Páginas Específicas
Herdam de `BasePage` e adicionam métodos específicos da funcionalidade:

- **OportunidadesPage**: Cadastro, edição, exclusão de oportunidades
- **ContatosPage**: Gerenciamento de contatos
- **ServicosPage**: Gestão de serviços

---

## 🚀 Como Usar

### 1️⃣ Importar Page Objects

```javascript
// Importação única
import { OportunidadesPage } from '../../support/pages';

// Importação múltipla
import { OportunidadesPage, ContatosPage, ServicosPage } from '../../support/pages';

// Importação alternativa
import OportunidadesPage from '../../support/pages/OportunidadesPage';
```

### 2️⃣ Usar nos Testes

#### ❌ Antes (sem POM)
```javascript
it('Validar Cadastro de Oportunidades SPCC Importação', () => {
    cy.acessarBackOffice('Oportunidade')
    cy.pesquisarItem(cadastroOportunidade)
    cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
    cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
    cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, ...)
    cy.contains("Oportunidade Cadastrada com Sucesso.", { timeout: 16000 }).should('be.visible')
    cy.waitForPageLoad()
})
```

#### ✅ Depois (com POM)
```javascript
it('Validar Cadastro de Oportunidades SPCC Importação', () => {
    OportunidadesPage.cadastrarNova(
        cadastroOportunidade,
        cadastroOportunidade.Brasil,
        cadastroOportunidade.PetCare,
        cadastroOportunidade.Racoes,
        cadastroOportunidade.tipoImportacao,
        cadastroOportunidade.SPCC
    );
    OportunidadesPage.waitForLoad();
})
```

---

## 📋 Exemplos Práticos

### Oportunidades

```javascript
import { OportunidadesPage } from '../../support/pages';

describe('Funcionalidade Oportunidades', () => {
  beforeEach(() => {
    OportunidadesPage.login(usuario.login, usuario.senha);
  });

  it('Cadastrar nova oportunidade', () => {
    OportunidadesPage.cadastrarNova(dados, pais, setor, categoria, tipo, entidade);
  });

  it('Editar oportunidade', () => {
    OportunidadesPage.acessar();
    OportunidadesPage.pesquisar(dados);
    OportunidadesPage.editarExistente(dados, pais, setor, categoria, tipo, entidade);
  });

  it('Excluir oportunidade', () => {
    OportunidadesPage.acessar();
    OportunidadesPage.pesquisar(dados);
    OportunidadesPage.excluir(dados);
    OportunidadesPage.validarExclusaoSucesso();
  });

  it('Alterar status', () => {
    OportunidadesPage.acessar();
    OportunidadesPage.alterarStatus(dados, false); // Desativar
    OportunidadesPage.alterarStatus(dados, true);  // Ativar
  });
});
```

### Contatos

```javascript
import { ContatosPage } from '../../support/pages';
import { gerarCpfUnico } from '../../support/utils';

describe('Funcionalidade Contatos', () => {
  beforeEach(() => {
    ContatosPage.login(usuario.login, senha);
  });

  it('Validar layout', () => {
    ContatosPage.validarLayoutCompleto(cadastroContatos);
  });

  it('Cadastrar contato', () => {
    cadastroContatos.CPF = gerarCpfUnico();
    ContatosPage.cadastrarNovo(
      cadastroContatos,
      cadastroContatos.areaImport,
      cadastroContatos.CPF
    );
  });

  it('Excluir contato', () => {
    ContatosPage.acessar();
    ContatosPage.excluir(cadastroContatos.nomeContato);
    ContatosPage.validarModalSucesso(
      'Contato Removido Com Sucesso!',
      'Seu contato foi removido da sua lista.'
    );
  });
});
```

### Serviços

```javascript
import { ServicosPage } from '../../support/pages';

describe('Funcionalidade Serviços', () => {
  beforeEach(() => {
    ServicosPage.login(usuario.login, senha);
  });

  it('Cadastrar serviço', () => {
    ServicosPage.cadastrarNovo(
      cadastroServico,
      cadastroServico.OpFinanceira,
      cadastroServico.ACC
    );
  });

  it('Validar filtros', () => {
    ServicosPage.acessar();
    ServicosPage.validarFiltroOrdenacao();
    ServicosPage.validarFiltroExibicao();
  });

  it('Testar ativação/desativação', () => {
    ServicosPage.testarDesativarReativar(
      cadastroServico,
      cadastroServico.OpAduaneiras,
      cadastroServico.Despachante
    );
  });
});
```

---

## 🔧 Métodos Disponíveis

### OportunidadesPage

| Método | Descrição |
|--------|-----------|
| `acessar()` | Acessa página de Oportunidades |
| `acessarCadastro()` | Abre formulário de cadastro |
| `pesquisar(dados)` | Pesquisa oportunidade |
| `preencherFormulario(...)` | Preenche formulário completo |
| `excluir(dados)` | Exclui oportunidade |
| `editar(dados)` | Edita oportunidade |
| `alterarStatus(dados, ativar)` | Ativa/desativa |
| `validarCadastroSucesso()` | Valida mensagem de sucesso no cadastro |
| `validarEdicaoSucesso()` | Valida mensagem de sucesso na edição |
| `validarExclusaoSucesso()` | Valida mensagem de sucesso na exclusão |
| `cadastrarNova(...)` | **Fluxo completo**: excluir + cadastrar + validar |
| `editarExistente(...)` | **Fluxo completo**: editar + validar |

### ContatosPage

| Método | Descrição |
|--------|-----------|
| `acessar()` | Acessa página de Contatos |
| `validarLayoutCadastro()` | Valida todos os campos do layout |
| `preencherFormulario(...)` | Preenche formulário de contato |
| `excluir(nomeContato)` | Exclui contato por nome |
| `validarCadastroSucesso()` | Valida modal de sucesso |
| `validarContatoNaLista(nome)` | Valida presença na lista |
| `validarListaVazia()` | Valida mensagem de lista vazia |
| `editarContato(dados)` | Edita via modal |
| `cadastrarNovo(...)` | **Fluxo completo**: limpar + cadastrar + validar |
| `validarLayoutCompleto(dados)` | **Fluxo completo**: validar layout + lista vazia |

### ServicosPage

| Método | Descrição |
|--------|-----------|
| `acessar()` | Acessa página de Serviços |
| `acessarCadastro()` | Abre formulário de cadastro |
| `pesquisar(dados)` | Pesquisa serviço |
| `preencherFormulario(...)` | Preenche formulário |
| `excluir(dados)` | Exclui serviço |
| `editar(dados)` | Edita serviço |
| `alterarStatus(dados, ativar)` | Ativa/desativa |
| `visualizarEmpresa(nome)` | Visualiza empresa na grid |
| `validarCadastroSucesso()` | Valida mensagem de sucesso |
| `validarFiltroOrdenacao()` | Valida filtro de ordenação |
| `validarFiltroExibicao()` | Valida filtro de exibição |
| `cadastrarNovo(...)` | **Fluxo completo**: excluir + cadastrar + validar |
| `editarExistente(...)` | **Fluxo completo**: pesquisar + editar + validar |
| `testarDesativarReativar(...)` | **Fluxo completo**: cadastrar + desativar + reativar |

---

## 📝 Padrões e Boas Práticas

### ✅ DO (Fazer)

```javascript
// ✅ Use métodos de alto nível quando possível
OportunidadesPage.cadastrarNova(dados, pais, setor, categoria, tipo, entidade);

// ✅ Use métodos individuais para fluxos customizados
OportunidadesPage.acessar();
OportunidadesPage.pesquisar(dados);
OportunidadesPage.excluir(dados);

// ✅ Combine Page Objects com custom commands quando necessário
ContatosPage.acessar();
cy.wait(3000); // Wait específico se necessário
ContatosPage.excluir(nomeContato);
```

### ❌ DON'T (Não Fazer)

```javascript
// ❌ Não acesse seletores diretamente nos testes
cy.get('[data-type="input-contactEmail"]').type('email@test.com');

// ❌ Não duplique lógica nos testes
cy.acessarBackOffice('Contatos');
cy.contains('Contatos').should('be.visible');
// Use: ContatosPage.acessar()

// ❌ Não misture lógica de página nos specs
cy.get('button').contains('Cadastrar').click();
cy.get('input[name="nome"]').type('Nome');
// Use: ContatosPage.preencherFormulario(...)
```

---

## 🎓 Migração Gradual

Você pode migrar specs gradualmente:

1. **Specs existentes continuam funcionando** com custom commands
2. **Novos specs usam POM** desde o início
3. **Refatore specs antigos** conforme necessidade

### Exemplo de Migração

**Arquivo Original**: `contatos.cy.js`
- Mantém funcionamento atual

**Novo Arquivo**: `contatos.pom.cy.js`
- Versão refatorada com POM
- Pode coexistir com original

---

## 🔍 Specs Refatorados

✅ [Oportunidade.adm.cy.js](../e2e/Backoffice/Oportunidade.adm.cy.js) - Refatorado com OportunidadesPage
✅ [contatos.pom.cy.js](../e2e/Backoffice/contatos.pom.cy.js) - Exemplo completo com ContatosPage

---

## 🚀 Próximos Passos

1. ✅ BasePage, OportunidadesPage, ContatosPage, ServicosPage criados
2. ✅ Specs Oportunidade.adm e contatos.pom refatorados
3. ⏳ Criar EventosPage, ProdutosPage, NoticiasPage conforme necessidade
4. ⏳ Migrar specs restantes gradualmente
5. ⏳ Expandir métodos nas páginas conforme novos cenários

---

## 📚 Referências

- [Cypress Page Objects](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- Custom Commands: [commands/](../commands/)
- Test Data Factory: [factories/testDataFactory.js](../factories/testDataFactory.js)
