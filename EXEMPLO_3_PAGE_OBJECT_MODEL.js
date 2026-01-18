/**
 * EXEMPLO PRÁTICO 3: Page Object Model (POM) Simplificado
 * Centraliza seletores, torna testes mais legíveis
 */

// ==========================================
// cypress/support/pages/BasePage.js
// ==========================================
export class BasePage {
  /**
   * Classe base para todas as páginas
   */
  constructor(title) {
    this.title = title;
    this.selectors = {};
  }

  /**
   * Valida que estamos na página correta
   */
  verifyPageTitle() {
    cy.contains(this.title, { timeout: 5000 }).should('be.visible');
    cy.log(`📄 Página "${this.title}" carregada`);
    return this;
  }

  /**
   * Aguarda carregamento da página
   */
  waitForLoad() {
    cy.waitForPageLoad();
    return this;
  }

  /**
   * Clica em um botão por texto
   */
  clickButton(buttonText) {
    cy.contains('button', buttonText).click();
    cy.log(`🖱️ Botão clicado: "${buttonText}"`);
    return this;
  }

  /**
   * Preenche um campo por seletor
   */
  fillField(selector, value) {
    cy.get(selector).clear().type(String(value));
    return this;
  }

  /**
   * Valida que um campo tem um texto
   */
  shouldHaveText(selector, text) {
    cy.get(selector).should('have.text', text);
    return this;
  }

  /**
   * Tira screenshot para documentação
   */
  screenshot(name) {
    cy.screenshot(`${this.title}-${name}`);
    return this;
  }
}

// ==========================================
// cypress/support/pages/OportunidadesPage.js
// ==========================================
export class OportunidadesPage extends BasePage {
  constructor() {
    super('Cadastro de Oportunidade');
    
    this.selectors = {
      // Formulário
      companyName: '[data-testid="opportunity-company-name"]',
      contactName: '[data-testid="opportunity-contact-name"]',
      email: '[data-testid="opportunity-email"]',
      country: '[data-testid="opportunity-country"]',
      productName: '[data-testid="opportunity-product-name"]',
      startDate: '[data-testid="opportunity-start-date"]',
      endDate: '[data-testid="opportunity-end-date"]',
      category: '[data-testid="opportunity-category"]',
      subcategory: '[data-testid="opportunity-subcategory"]',
      hsCode: '[data-testid="opportunity-hscode"]',
      operationType: '[data-testid="opportunity-operation-type"]',
      description: '[data-testid="opportunity-description"]',
      entity: '[data-testid="opportunity-entity"]',
      
      // Botões
      saveBtn: 'button[data-testid="opportunity-save"]',
      editBtn: 'button[data-testid="opportunity-edit"]',
      
      // Mensagens
      successMessage: '[data-testid="message-success"]'
    };
  }

  /**
   * Visita a página de oportunidades
   */
  visit() {
    cy.acessarBackOffice('Oportunidades e Negócios');
    this.waitForLoad();
    return this;
  }

  /**
   * Preenche formulário de cadastro
   * @param {object} data - Objeto com dados da oportunidade
   */
  fillForm(data) {
    cy.log('📝 Preenchendo formulário de oportunidade');

    // Preencher campos simples
    if (data.nomeEmpresa) {
      cy.get(this.selectors.companyName).then(($input) => {
        if (!$input.prop('readonly')) {
          cy.wrap($input).clear().type(data.nomeEmpresa);
        }
      });
    }

    if (data.nomeContato) {
      this.fillField(this.selectors.contactName, data.nomeContato);
    }

    if (data.email) {
      this.fillField(this.selectors.email, data.email);
    }

    // Selecionar país (dropdown)
    if (data.pais) {
      cy.get(this.selectors.country).click();
      cy.contains('button', data.pais).click();
    }

    if (data.nomeProduto) {
      this.fillField(this.selectors.productName, data.nomeProduto);
    }

    // Datas
    if (data.dataInicio) {
      cy.get(this.selectors.startDate).type(data.dataInicio);
    }

    if (data.dataFinal) {
      cy.get(this.selectors.endDate).type(data.dataFinal);
    }

    // Categoria (dropdown)
    if (data.categoria) {
      cy.get(this.selectors.category).click();
      cy.contains('button', data.categoria).click();
    }

    // Subcategoria (dropdown)
    if (data.subcategoria) {
      cy.get(this.selectors.subcategory).click();
      cy.contains('button', data.subcategoria).click();
    }

    if (data.hsCode) {
      this.fillField(this.selectors.hsCode, data.hsCode);
    }

    // Tipo de operação (pode ter dois seletores diferentes)
    if (data.tipoOperacao) {
      cy.get('body').then(($body) => {
        const selector = $body.find(this.selectors.operationType).length
          ? this.selectors.operationType
          : '[name="productOperationType"]';

        cy.get(selector).click({ force: true });
        cy.contains('button', data.tipoOperacao).click({ force: true });
      });
    }

    if (data.descricaoProduto) {
      this.fillField(this.selectors.description, data.descricaoProduto);
    }

    // Entidade (checkbox)
    if (data.entidade) {
      cy.contains('label', data.entidade).within(() => {
        cy.get('input[type="checkbox"]').check({ force: true });
      });
    }

    cy.log('✅ Formulário preenchido');
    return this;
  }

  /**
   * Salva o formulário
   */
  save() {
    cy.get(this.selectors.saveBtn).click();
    cy.shouldShowSuccess('Oportunidade Cadastrada com Sucesso', {
      timeout: 10000,
      fallback: ['Edição Salva com Sucesso', 'Sucesso']
    });
    cy.log('💾 Oportunidade salva');
    return this;
  }

  /**
   * Pesquisa uma oportunidade
   */
  search(nomeEmpresa) {
    cy.searchInGrid(nomeEmpresa);
    return this;
  }

  /**
   * Exclui uma oportunidade
   */
  delete(nomeEmpresa) {
    cy.deleteGridItem(nomeEmpresa);
    cy.log('🗑️ Oportunidade excluída');
    return this;
  }
}

// ==========================================
// cypress/support/pages/ContatosPage.js
// ==========================================
export class ContatosPage extends BasePage {
  constructor() {
    super('Contatos');
    
    this.selectors = {
      firstName: '[data-testid="contact-first-name"]',
      lastName: '[data-testid="contact-last-name"]',
      email: '[data-testid="contact-email"]',
      phone: '[data-testid="contact-phone"]',
      mobile: '[data-testid="contact-mobile"]',
      area: '[data-testid="contact-area"]',
      cpf: '[data-testid="contact-cpf"]',
      birthDate: '[data-testid="contact-birth-date"]',
      photo: 'input[type="file"]',
      addBtn: 'button[data-testid="contact-add"]',
      deleteBtn: 'button[data-testid="contact-delete"]',
      emptyMessage: '[data-testid="contact-empty-message"]'
    };
  }

  visit() {
    cy.acessarBackOffice('Contatos');
    this.waitForLoad();
    this.verifyPageTitle();
    return this;
  }

  /**
   * Valida layout inicial
   */
  validateLayout() {
    cy.log('🔍 Validando layout');
    cy.contains('Cadastre contatos por área').should('be.visible');
    cy.contains('Nome*').should('be.visible');
    cy.contains('Sobrenome*').should('be.visible');
    cy.contains('E-mail*').should('be.visible');
    cy.contains('CPF*').should('be.visible');
    return this;
  }

  /**
   * Adiciona um contato
   */
  addContact(data) {
    cy.log('➕ Adicionando contato');

    this.fillField(this.selectors.firstName, data.nomeContato);
    this.fillField(this.selectors.lastName, data.sobrenomeContato);
    this.fillField(this.selectors.email, data.email);
    this.fillField(this.selectors.phone, data.telefone);
    this.fillField(this.selectors.mobile, data.celular);

    // Área (dropdown)
    cy.get(this.selectors.area).click();
    cy.contains('button', data.area).click();

    this.fillField(this.selectors.cpf, data.cpf);
    this.fillField(this.selectors.birthDate, data.dataContato);

    // Upload foto
    cy.get(this.selectors.photo).selectFile('cypress/fixtures/contato.png', { force: true });

    cy.get(this.selectors.addBtn).click();
    
    cy.shouldShowSuccess('Contato Cadastrado Com Sucesso');
    cy.log('✅ Contato adicionado');
    return this;
  }

  /**
   * Exclui um contato
   */
  deleteContact(nomeContato) {
    cy.deleteGridItem(nomeContato);
    return this;
  }

  /**
   * Valida que lista está vazia
   */
  validateEmpty() {
    cy.contains('Nenhum contato cadastrado').should('be.visible');
    return this;
  }
}

// ==========================================
// cypress/support/pages/ServicosPage.js
// ==========================================
export class ServicosPage extends BasePage {
  constructor() {
    super('Cadastro de Serviço');
    
    this.selectors = {
      name: '[data-testid="service-name"]',
      category: '[data-testid="service-category"]',
      subcategory: '[data-testid="service-subcategory"]',
      description: '[data-testid="service-description"]',
      saveBtn: 'button[data-testid="service-save"]'
    };
  }

  visit() {
    cy.acessarBackOffice('Cadastro de Serviço');
    this.waitForLoad();
    return this;
  }

  fillForm(data) {
    cy.log('📝 Preenchendo serviço');

    this.fillField(this.selectors.name, data.nomeServico);

    cy.get(this.selectors.category).click();
    cy.contains('button', data.categoria).click();

    cy.get(this.selectors.subcategory).click();
    cy.contains('button', data.subcategoria).click();

    this.fillField(this.selectors.description, data.descricaoServico);

    return this;
  }

  save() {
    cy.get(this.selectors.saveBtn).click();
    cy.shouldShowSuccess('Serviço Cadastrado com Sucesso');
    return this;
  }
}

// ==========================================
// Uso em testes - ANTES vs DEPOIS
// ==========================================

/**
 * ANTES (código repetitivo)
 */
describe('Oportunidades - ANTES', () => {
  it('Validar cadastro', () => {
    cy.login(Cypress.env('admin_login'), Cypress.env('password'));
    cy.acessarBackOffice('Oportunidades e Negócios');
    cy.wait(2000);
    cy.waitForPageLoad();
    cy.pesquisarItem({ nomeEmpresa: 'Empresa Teste' });
    cy.excluirItem('Oportunidade', 'nomeEmpresa', 'Empresa Teste');
    cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade');
    cy.get('[name="companyName"]').type('Empresa Teste');
    cy.get('[name="contactName"]').type('João Silva');
    // ... 20 linhas de cy.get() e cy.type()
    cy.contains('Oportunidade Cadastrada com Sucesso').should('be.visible');
  });
});

/**
 * DEPOIS (código limpo com POM)
 */
describe('Oportunidades - DEPOIS', () => {
  beforeEach(() => {
    cy.login(Cypress.env('admin_login'), Cypress.env('password'));
  });

  it('Validar cadastro', () => {
    const data = new OportunidadeBuilder()
      .withCompany('Empresa Teste ' + Date.now())
      .withImportation()
      .build();

    const page = new OportunidadesPage();

    page
      .visit()
      .fillForm(data)
      .save()
      .delete(data.nomeEmpresa);
  });

  it('Validar cadastro com múltiplas categorias', () => {
    const page = new OportunidadesPage();
    const categories = ['PetCare', 'Moda', 'Commodities'];

    categories.forEach(cat => {
      const data = new OportunidadeBuilder()
        .withCategory(cat)
        .build();

      page
        .visit()
        .fillForm(data)
        .save();
    });
  });
});

/**
 * Teste parametrizado (5 linhas)
 */
const testCases = [
  { cat: 'PetCare', subcat: 'Rações', type: 'Importação' },
  { cat: 'Moda', subcat: 'Calçados', type: 'Exportação' },
  { cat: 'Commodities', subcat: 'Fertilizantes', type: 'Importação' },
];

describe('Oportunidades - Parametrizado', () => {
  testCases.forEach(({ cat, subcat, type }) => {
    it(`Validar ${type} de ${cat}`, () => {
      const data = new OportunidadeBuilder()
        .withCategory(cat)
        .withSubcategory(subcat)
        .withType(type)
        .build();

      new OportunidadesPage()
        .visit()
        .fillForm(data)
        .save();
    });
  });
});

export { OportunidadesPage, ContatosPage, ServicosPage };
