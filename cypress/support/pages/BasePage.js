/**
 * BasePage - Classe base para Page Objects
 * Contém métodos comuns compartilhados entre todas as páginas
 */
class BasePage {
  /**
   * Navega até a URL da página
   * @param {string} url - URL relativa ou absoluta
   */
  visit(url) {
    cy.visit(url, { failOnStatusCode: false, timeout: 60000 });
  }

  /**
   * Aguarda o carregamento completo da página
   * @param {number} timeout - Timeout em ms (padrão: 10000)
   */
  waitForLoad(timeout = 10000) {
    cy.waitForPageLoad({ timeout });
  }

  /**
   * Obtém elemento por seletor
   * @param {string} selector - Seletor CSS ou texto
   * @returns {Cypress.Chainable}
   */
  getElement(selector) {
    return cy.get(selector);
  }

  /**
   * Obtém elemento por texto
   * @param {string} text - Texto a buscar
   * @returns {Cypress.Chainable}
   */
  getByText(text) {
    return cy.contains(text);
  }

  /**
   * Clica em elemento
   * @param {string} selector - Seletor do elemento
   */
  click(selector) {
    this.getElement(selector).click();
  }

  /**
   * Preenche campo de texto
   * @param {string} selector - Seletor do campo
   * @param {string} value - Valor a preencher
   */
  type(selector, value) {
    this.getElement(selector).clear().type(value);
  }

  /**
   * Verifica se elemento está visível
   * @param {string} selector - Seletor do elemento
   */
  shouldBeVisible(selector) {
    this.getElement(selector).should('be.visible');
  }

  /**
   * Verifica se texto está visível
   * @param {string} text - Texto a verificar
   */
  shouldContainText(text) {
    cy.contains(text).should('be.visible');
  }

  /**
   * Aguarda por modal/elemento específico
   * @param {string} selector - Seletor do elemento
   * @param {number} timeout - Timeout em ms
   */
  waitForModal(selector, timeout = 10000) {
    cy.waitForModal(selector, { timeout });
  }

  /**
   * Aguarda por elemento específico
   * @param {string} selector - Seletor ou texto
   * @param {number} timeout - Timeout em ms
   */
  waitForElement(selector, timeout = 10000) {
    cy.waitForElement(selector, { timeout });
  }

  /**
   * Realiza login na aplicação
   * @param {string} username - Email/usuário
   * @param {string} password - Senha
   */
  login(username, password) {
    cy.login(username, password);
  }

  /**
   * Acessa menu do BackOffice
   * @param {string} menuItem - Item do menu a acessar
   */
  acessarBackOffice(menuItem) {
    cy.acessarBackOffice(menuItem);
  }

  /**
   * Valida mensagem de sucesso em modal
   * @param {string} titulo - Título do modal
   * @param {string} descricao - Descrição/mensagem
   */
  validarModalSucesso(titulo, descricao) {
    cy.validarModalSucesso(titulo, descricao);
  }

  /**
   * Aguarda grid carregar ou detecta estado vazio
   */
  aguardarGrid() {
    cy.aguardarGrid();
  }
}

export default BasePage;
