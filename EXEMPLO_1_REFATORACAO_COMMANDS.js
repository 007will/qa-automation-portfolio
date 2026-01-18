/**
 * EXEMPLO PRÁTICO 1: Refatoração de Commands em Módulos
 * 
 * Estrutura proposta:
 * cypress/support/
 * ├── commands/
 * │   ├── navigation.js
 * │   ├── forms.js
 * │   ├── assertions.js
 * │   ├── grid.js
 * │   └── waits.js
 */

// ==========================================
// cypress/support/commands/navigation.js
// ==========================================
export const navigationCommands = {
  /**
   * Realiza login de forma segura com sessão
   * @param {string} user - Email/usuário
   * @param {string} password - Senha
   * @param {object} options - Opções adicionais
   */
  login(user, password, options = {}) {
    const { timeout = 30000 } = options;
    
    Cypress.Commands.add('login', (user, password) => {
      cy.session([user, password], () => {
        cy.visit(Cypress.config('baseUrl'), { failOnStatusCode: false });
        cy.contains('button', 'Login').click();
        cy.get('[data-testid="email-input"]').type(user);
        cy.get('[data-testid="password-input"]').type(password);
        cy.get('[data-testid="submit-btn"]').click();
        cy.waitForPageLoad();
      }, {
        validate: () => {
          // Validação de sessão ativa
          cy.get('[data-testid="user-avatar"]').should('exist');
        },
        cacheAcrossSpecs: true
      });
    });
  },

  /**
   * Acessa um menu específico do BackOffice
   * @param {string} menu - Nome do menu
   */
  acessarBackOffice(menu) {
    Cypress.Commands.add('acessarBackOffice', (menu) => {
      cy.visit(Cypress.config('baseUrlBackOffice'));
      cy.waitForPageLoad();
      cy.contains('button', 'Abrir Página Inicial').should('be.visible');
      cy.get('[data-testid="menu-toggle"]').trigger('mouseover');
      cy.get(`[data-testid="menu-${menu}"]`).click();
      cy.waitForPageLoad();
    });
  }
};

// ==========================================
// cypress/support/commands/forms.js
// ==========================================
export const formCommands = {
  /**
   * Preenche um formulário genérico
   * @param {object} data - Objeto com dados do formulário
   * @param {object} mapping - Mapeamento de campos { nomeEmpresa: 'input[name="companyName"]' }
   */
  fillForm(data, mapping) {
    Cypress.Commands.add('fillForm', (data, mapping) => {
      Object.entries(mapping).forEach(([key, selector]) => {
        if (data[key] === undefined) return;
        
        cy.get(selector).then($el => {
          const type = $el[0].tagName.toLowerCase();
          
          if (type === 'select' || $el.attr('role') === 'listbox') {
            cy.get(selector).click();
            cy.contains('button', String(data[key])).click();
          } else if ($el.attr('type') === 'checkbox') {
            cy.get(selector).check({ force: true });
          } else if ($el.attr('type') === 'radio') {
            cy.get(`${selector}[value="${data[key]}"]`).check({ force: true });
          } else {
            cy.get(selector).clear().type(String(data[key]));
          }
        });
      });
    });
  }
};

// ==========================================
// cypress/support/commands/assertions.js
// ==========================================
export const assertionCommands = {
  /**
   * Valida se uma mensagem de sucesso apareceu
   * @param {string|RegExp} message - Mensagem esperada
   * @param {object} options - { fallback: [], timeout: 8000 }
   */
  shouldShowSuccess(message, options = {}) {
    Cypress.Commands.add('shouldShowSuccess', (message, options = {}) => {
      const { timeout = 8000, fallback = [] } = options;
      
      const messages = Array.isArray(message) ? message : [message, ...fallback];
      const pattern = messages
        .map(m => (typeof m === 'string' ? m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : m.source))
        .join('|');
      
      cy.contains(new RegExp(pattern, 'i'), { timeout })
        .should('be.visible')
        .then(($el) => {
          cy.log(`✅ Sucesso validado: "${$el.text()}"`);
        });
    });
  },

  /**
   * Valida se um layout tem todos os elementos esperados
   * @param {string[]} expectedElements - Lista de textos/seletores
   */
  shouldHaveLayout(expectedElements) {
    Cypress.Commands.add('shouldHaveLayout', (expectedElements) => {
      expectedElements.forEach(element => {
        cy.contains(element, { timeout: 5000 })
          .should('be.visible')
          .then(($el) => {
            cy.log(`✓ Layout elemento verificado: "${element}"`);
          });
      });
    });
  }
};

// ==========================================
// cypress/support/commands/grid.js
// ==========================================
export const gridCommands = {
  /**
   * Pesquisa um item na grid
   * @param {string} searchValue - Valor a pesquisar
   * @param {object} options - { placeholder: 'Pesquise...', timeout: 5000 }
   */
  searchInGrid(searchValue, options = {}) {
    Cypress.Commands.add('searchInGrid', (searchValue, options = {}) => {
      const { timeout = 5000 } = options;
      
      cy.get('input[placeholder*="Pesquise"]', { timeout })
        .first()
        .clear()
        .type(searchValue, { delay: 50 });
      
      cy.wait(500);
      cy.get('[data-testid="grid-items"]', { timeout })
        .should('contain.text', searchValue)
        .then(() => {
          cy.log(`📍 Item encontrado: "${searchValue}"`);
        });
    });
  },

  /**
   * Exclui um item da grid
   * @param {string} itemName - Nome do item a excluir
   * @param {object} options - { confirmDelete: true, timeout: 5000 }
   */
  deleteGridItem(itemName, options = {}) {
    Cypress.Commands.add('deleteGridItem', (itemName, options = {}) => {
      const { confirmDelete = true, timeout = 5000 } = options;
      
      cy.contains('[data-testid="grid-item"]', itemName)
        .should('be.visible')
        .parent()
        .find('[data-testid="btn-more-options"]')
        .click();
      
      cy.get('[data-testid="btn-delete"]', { timeout })
        .should('be.visible')
        .click();
      
      if (confirmDelete) {
        cy.get('[data-testid="btn-confirm-yes"]', { timeout })
          .should('be.visible')
          .click();
        
        cy.contains(/excluído|deletado/i, { timeout })
          .should('be.visible');
      }
      
      cy.log(`🗑️ Item excluído: "${itemName}"`);
    });
  }
};

// ==========================================
// cypress/support/commands/waits.js
// ==========================================
export const waitCommands = {
  /**
   * Aguarda até que a página esteja completamente carregada
   * @param {object} options - { timeout: 15000, loaderSelectors: [...] }
   */
  waitForPageLoad(options = {}) {
    Cypress.Commands.add('waitForPageLoad', (options = {}) => {
      const { timeout = 15000, loaderSelectors = ['.spinner', '[data-testid="loader"]'] } = options;
      
      const start = Date.now();
      
      return cy.window({ log: false }).then(() => {
        return new Cypress.Promise((resolve, reject) => {
          const check = () => {
            const elapsed = Date.now() - start;
            
            if (elapsed > timeout) {
              return reject(new Error('Timeout aguardando carregamento da página'));
            }
            
            try {
              const isReady = document.readyState === 'complete' || document.readyState === 'interactive';
              const hasLoader = loaderSelectors.some(s => 
                Cypress.$(s).length && Cypress.$(s).is(':visible')
              );
              
              if (isReady && !hasLoader) {
                cy.log('⏱️ Página carregada');
                return resolve();
              }
            } catch (e) {
              // swallow
            }
            
            setTimeout(check, 500);
          };
          
          check();
        });
      });
    });
  }
};

// ==========================================
// cypress/support/commands/index.js
// ==========================================
// Importar todas as funções de comando
import { navigationCommands } from './navigation';
import { formCommands } from './forms';
import { assertionCommands } from './assertions';
import { gridCommands } from './grid';
import { waitCommands } from './waits';

// Registrar todos os comandos
export const registerCommands = () => {
  Object.values(navigationCommands).forEach(cmd => cmd());
  Object.values(formCommands).forEach(cmd => cmd());
  Object.values(assertionCommands).forEach(cmd => cmd());
  Object.values(gridCommands).forEach(cmd => cmd());
  Object.values(waitCommands).forEach(cmd => cmd());
};

export default registerCommands;
