import '@shelex/cypress-allure-plugin';
import './commands/index';

// LIMPEZA GLOBAL — RODA ANTES DE CADA TESTE
beforeEach(() => {
  cy.task('clearCache'); // limpa ciclo interno do Cypress
  cy.clearCookies(); // cookies
  cy.clearLocalStorage(); // localStorage
  cy.window().then((win) => {
    win.sessionStorage.clear(); // sessionStorage
  });
});
