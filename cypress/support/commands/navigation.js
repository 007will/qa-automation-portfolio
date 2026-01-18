// Comandos de navegação e acesso ao sistema

// Geração de Login
Cypress.Commands.add('login', (user, password) => {
  const Url = Cypress.config('baseUrl');
  cy.session([user, password], () => {
    cy.visit(Url, { failOnStatusCode: false });
    cy.get('[datatype="btn-login"]').click();
    cy.get('#email').type(user);
    cy.get('#password').type(password);
    cy.get('#next').click();
    cy.wait(5000);
    cy.waitForPageLoad();
  });
});

// Acessar Menu do BackOffice
Cypress.Commands.add('acessarBackOffice', (menu) => {
  const UrlBackOffice = Cypress.config('baseUrlBackOffice');
  cy.visit(UrlBackOffice, { 
    failOnStatusCode: false,
    timeout: 60000 
  });
  cy.wait(5000);
  cy.waitForPageLoad();
  cy.contains('button', 'Abrir Página Inicial').should('be.visible');
  cy.get('.css-etvl3m').trigger('mouseover');
  cy.get('[datatype="menuOpen"]').contains(menu).click();
});

// Acesso da tela de Cadastro das Funcionalidades
Cypress.Commands.add('acessarCadastrar', (titulo, cadastro, tituloCadastro) => {
  cy.wait(2000);
  cy.waitForPageLoad();
  cy.contains(titulo).should('be.visible');
  cy.get('body').then(($body) => {
    if ($body.find(`button:contains("${cadastro}")`).length > 0) {
      cy.contains('button', cadastro).click();
      cy.contains(tituloCadastro).should('be.visible');
    } else {
      cy.log(`Botão "${cadastro}" não encontrado, seguindo adiante...`);
    }
  });
});

// Acesso condicional para cadastro de Contatos
Cypress.Commands.add('acessarCadastrarContatos', (titulo, cadastro, tituloCadastro) => {
  cy.wait(2000);
  cy.contains(titulo).should('be.visible');
  cy.get('body').then(($body) => {
    if ($body.find(`button:contains("${cadastro}")`).length > 0) {
      cy.contains('button', cadastro).click();
      cy.contains(tituloCadastro).should('be.visible');
      cy.log(`Botão "${cadastro}" encontrado e clicado`);
    } else {
      cy.log(`Botão "${cadastro}" não encontrado, seguindo adiante...`);
    }
  });
});
