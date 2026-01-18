/**
 * EXEMPLO PRÁTICO 4: Logger e Error Handling
 * Melhora debugging e rastreabilidade
 */

// ==========================================
// cypress/support/helpers/logger.js
// ==========================================
export class Logger {
  /**
   * Log estruturado com timestamp e tipo
   */
  static log(level, message, data = {}) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const icon = {
      'info': 'ℹ️',
      'step': '📌',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'debug': '🐛'
    }[level] || '📝';

    const formatted = `[${timestamp}] ${icon} ${message}`;
    cy.log(formatted);

    if (Object.keys(data).length > 0) {
      cy.log(JSON.stringify(data, null, 2));
    }
  }

  /**
   * Log de passo do teste
   */
  static step(message, data = {}) {
    this.log('step', message, data);
  }

  /**
   * Log de sucesso
   */
  static success(message, data = {}) {
    this.log('success', message, data);
  }

  /**
   * Log de aviso
   */
  static warning(message, data = {}) {
    this.log('warning', message, data);
  }

  /**
   * Log de erro com screenshot automático
   */
  static error(message, details = {}) {
    this.log('error', message, details);
    cy.screenshot(`error-${Date.now()}`);
  }

  /**
   * Log de expectativa (esperado vs obtido)
   */
  static expectation(label, expected, actual) {
    const match = expected === actual;
    const icon = match ? '✓' : '✗';
    const msg = `${icon} ${label} | Esperado: ${expected} | Obtido: ${actual}`;
    this.log(match ? 'success' : 'warning', msg);
  }

  /**
   * Log de validação
   */
  static validation(elementDescription, isValid) {
    const icon = isValid ? '✓' : '✗';
    const level = isValid ? 'success' : 'error';
    this.log(level, `${icon} ${elementDescription}`);
  }

  /**
   * Agrupa múltiplos logs
   */
  static group(groupName, callback) {
    cy.log(`📂 ${groupName}`);
    callback();
    cy.log(`📂 Fim: ${groupName}`);
  }

  /**
   * Log de performance
   */
  static performance(actionName, durationMs) {
    const icon = durationMs < 2000 ? '⚡' : durationMs < 5000 ? '⏱️' : '🐢';
    this.log('info', `${icon} ${actionName}: ${durationMs}ms`);
  }
}

// ==========================================
// cypress/support/helpers/errorHandler.js
// ==========================================
export class ErrorHandler {
  /**
   * Trata erro com retry automático
   */
  static async withRetry(action, options = {}) {
    const { maxRetries = 3, delay = 1000, description = 'Action' } = options;
    
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        Logger.step(`Tentativa ${attempt}/${maxRetries}: ${description}`);
        
        // Executar a ação
        const result = typeof action === 'function' ? await action() : action;
        
        Logger.success(`${description} - sucesso na tentativa ${attempt}`);
        return result;
      } catch (error) {
        lastError = error;
        Logger.warning(`Tentativa ${attempt}/${maxRetries} falhou: ${error.message}`);
        
        if (attempt < maxRetries) {
          cy.wait(delay);
        }
      }
    }
    
    // Se chegou aqui, todas as tentativas falharam
    Logger.error(`${description} - falha após ${maxRetries} tentativas`, {
      errorMessage: lastError?.message,
      errorStack: lastError?.stack
    });
    
    throw lastError;
  }

  /**
   * Aguarda elemento com tratamento de erro
   */
  static waitForElement(selector, options = {}) {
    const { timeout = 5000, description = 'element' } = options;
    
    Logger.step(`Aguardando ${description}`, { selector });
    
    cy.get(selector, { timeout }).should('exist').then(($el) => {
      if ($el.length === 0) {
        this.elementNotFound(selector, description);
        throw new Error(`Element not found: ${selector}`);
      }
      Logger.success(`${description} encontrado`);
    }).catch(error => {
      this.elementNotFound(selector, description);
      throw error;
    });
  }

  /**
   * Manipulador para elemento não encontrado
   */
  static elementNotFound(selector, description) {
    Logger.error(`Elemento não encontrado: ${description}`, { selector });
    cy.screenshot(`element-not-found-${Date.now()}`);
  }

  /**
   * Validação com fallback
   */
  static async validateWithFallback(primary, fallback = [], options = {}) {
    const { timeout = 5000, description = 'validation' } = options;
    
    const allOptions = Array.isArray(primary) ? primary : [primary, ...fallback];
    
    Logger.step(`Validando: ${description}`, { options: allOptions });
    
    for (const option of allOptions) {
      try {
        cy.contains(option, { timeout: 2000 }).should('be.visible');
        Logger.success(`Validação encontrada: "${option}"`);
        return option;
      } catch (e) {
        Logger.warning(`Opção não encontrada: "${option}"`);
      }
    }
    
    Logger.error(`Nenhuma opção de validação encontrada`, { options: allOptions });
    throw new Error(`No validation option found for: ${allOptions.join(', ')}`);
  }
}

// ==========================================
// cypress/support/commands/logging.js
// ==========================================
export const loggingCommands = {
  /**
   * Comando para executar ação com logging
   */
  withLogging(actionName, callback) {
    Cypress.Commands.add('withLogging', (actionName, callback) => {
      const startTime = Date.now();
      Logger.step(`Iniciando: ${actionName}`);
      
      callback();
      
      const duration = Date.now() - startTime;
      Logger.success(`Finalizado: ${actionName}`);
      Logger.performance(actionName, duration);
    });
  },

  /**
   * Comando para validar elemento com logging
   */
  validateElement(selector, description) {
    Cypress.Commands.add('validateElement', (selector, description) => {
      Logger.step(`Validando elemento: ${description}`);
      
      cy.get(selector).should('be.visible').then(($el) => {
        Logger.success(`${description} validado`);
        Logger.validation(description, true);
      });
    });
  }
};

// ==========================================
// Integração com cypress/support/e2e.js
// ==========================================
export const setupLogging = () => {
  // Logs antes de cada teste
  beforeEach(() => {
    Logger.step(`Iniciando teste: ${Cypress.currentTest.title}`);
  });

  // Logs após cada teste
  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      Logger.error(`FALHA: ${this.currentTest.title}`, {
        error: this.currentTest.err.message
      });
      cy.screenshot(`failed-${Date.now()}`);
    } else if (this.currentTest.state === 'passed') {
      Logger.success(`PASSOU: ${this.currentTest.title}`);
    } else {
      Logger.warning(`PENDENTE: ${this.currentTest.title}`);
    }
  });
};

// ==========================================
// Exemplo de uso em testes
// ==========================================

/**
 * ANTES - sem logging
 */
describe('Teste sem logging', () => {
  it('Cadastro básico', () => {
    cy.login(user, pass);
    cy.acessarBackOffice('Menu');
    cy.get('[name="field"]').type('valor');
    cy.contains('Sucesso').should('be.visible');
  });
});

/**
 * DEPOIS - com logging estruturado
 */
describe('Teste com logging', () => {
  beforeEach(() => {
    cy.login(user, pass);
  });

  it('Cadastro com logging', () => {
    // Step 1
    Logger.step('Acessando BackOffice', { menu: 'Oportunidades' });
    cy.acessarBackOffice('Oportunidades e Negócios');
    cy.waitForPageLoad();

    // Step 2 - com retry
    const fillForm = () => {
      Logger.step('Preenchendo formulário');
      cy.get('[name="company"]').type('Empresa ABC');
      cy.get('[name="contact"]').type('João Silva');
      Logger.success('Formulário preenchido');
    };

    ErrorHandler.withRetry(() => fillForm(), {
      description: 'Preenchimento do formulário'
    });

    // Step 3 - com validação
    Logger.step('Validando sucesso');
    ErrorHandler.validateWithFallback(
      ['Oportunidade Cadastrada com Sucesso', 'Sucesso'],
      [],
      { description: 'Mensagem de sucesso' }
    );

    Logger.success('Teste completado com sucesso');
  });
});

/**
 * Exemplo com Group de Logs
 */
describe('Teste com grupos de logs', () => {
  it('Fluxo com organização', () => {
    Logger.group('Setup', () => {
      Logger.step('Login');
      cy.login(user, pass);
      
      Logger.step('Navegação');
      cy.acessarBackOffice('Menu');
    });

    Logger.group('Ação Principal', () => {
      Logger.step('Preenchimento');
      cy.get('[name="field"]').type('valor');
      
      Logger.step('Submissão');
      cy.contains('button', 'Salvar').click();
    });

    Logger.group('Validação', () => {
      Logger.step('Verificando resultado');
      cy.contains('Sucesso').should('be.visible');
      Logger.success('Validação concluída');
    });

    Logger.group('Cleanup', () => {
      Logger.step('Excluindo teste');
      // cleanup code
      Logger.success('Cleanup realizado');
    });
  });
});

/**
 * Exemplo com tratamento de erro
 */
describe('Teste com error handling', () => {
  it('Com retry e fallback', () => {
    try {
      Logger.step('Acessando página crítica');
      cy.visit('/critical-page');
      
      Logger.step('Esperando elemento crítico');
      ErrorHandler.waitForElement('[data-testid="critical-element"]', {
        timeout: 10000,
        description: 'Elemento crítico da aplicação'
      });

      Logger.success('Página crítica acessada com sucesso');
    } catch (error) {
      Logger.error('Falha ao acessar página crítica', {
        url: '/critical-page',
        error: error.message
      });
      throw error;
    }
  });
});

export { Logger, ErrorHandler, loggingCommands, setupLogging };
