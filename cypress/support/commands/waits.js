// Comandos de espera reutilizáveis
Cypress.Commands.add('waitForElement', (selectorOrText, options = {}) => {
  const interval = options.interval || 500;

  return cy.window({ log: false }).then(() => {
    return new Cypress.Promise((resolve) => {
      const check = () => {
        try {
          if (typeof selectorOrText === 'function') {
            const ok = selectorOrText();
            if (ok) return resolve();
          } else if (String(selectorOrText).startsWith('text:')) {
            const text = String(selectorOrText).replace(/^text:/, '');
            if (Cypress.$(`*:contains("${text}")`).length > 0) return resolve();
          } else if (Cypress.$(selectorOrText).length > 0) {
            return resolve();
          }
        } catch (e) {
          // ignore and retry
        }
        setTimeout(check, interval);
      };
      check();
    });
  });
});

Cypress.Commands.add('waitForModal', (selectorOrTitle, options = {}) => {
  let target = selectorOrTitle;
  if (typeof selectorOrTitle === 'string' && !selectorOrTitle.startsWith('text:') && selectorOrTitle.indexOf('.') === -1) {
    target = `text:${selectorOrTitle}`;
  }
  return cy.waitForElement(target, options).then(() => {
    if (String(target).startsWith('text:')) {
      const txt = String(target).replace(/^text:/, '');
      return cy.contains(txt).should('be.visible');
    }
    return cy.get(target).should('be.visible');
  });
});

Cypress.Commands.add('waitForPageLoad', (options = {}) => {
  const interval = options.interval || 500;
  const timeout = options.timeout || 15000;
  const loaderSelectors = options.loaderSelectors || [
    '.chakra-spinner',
    '.loading',
    '[datatype="skeleton"]',
    '.MuiCircularProgress-root',
  ];

  const start = Date.now();

  return cy.window({ log: false }).then(() => {
    return new Cypress.Promise((resolve, reject) => {
      const check = () => {
        const elapsed = Date.now() - start;

        if (elapsed > timeout) {
          return reject(new Error('Timeout aguardando carregamento da página'));
        }

        try {
          const ready =
            document.readyState === 'complete' ||
            document.readyState === 'interactive';

          const hasLoader = loaderSelectors.some(
            (s) => Cypress.$(s).length && Cypress.$(s).is(':visible'),
          );

          if (ready && !hasLoader) {
            return resolve();
          }
        } catch (e) {
          // ignore and retry
        }

        setTimeout(check, interval);
      };
      check();
    });
  });
});
