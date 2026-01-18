// Comandos de validação e asserções

// Validação do layout e campos obrigatórios da Oportunidade (Admin)
Cypress.Commands.add('validarLayoutOportunidadeAdmin', () => {
  cy.log('Validando layout e mensagens obrigatórias da tela de Oportunidade (Admin)...');

  cy.validarModalMensagens([
    'Alguns dados são obrigatórios.',
    'Tente salvar novamente após preenchê-los.',
  ]);

  const mensagensEsperadas = [
    'Nome da Empresa é obrigatório',
    'Nome do Contato é obrigatório',
    'E-mail é obrigatório',
    'País é obrigatório',
    'Nome do Produto é obrigatório',
    'A data de início é obrigatória',
    'A data final é obrigatória',
    'Selecione uma categoria',
    'Selecione uma Subcategoria',
    'HS Code é Obrigatório',
    'Tipo de Operação é Obrigatório',
    'A Descrição do Produto é Obrigatória',
    'Selecione pelo menos uma entidade para exibir esta oportunidade',
  ];

  cy.get('body', { timeout: 10000 }).within(() => {
    mensagensEsperadas.forEach((msg) => {
      cy.contains(msg, { matchCase: false }).should('be.visible');
    });
  });

  cy.log('Layout e mensagens obrigatórias da Oportunidade (Admin) validados com sucesso.');
});

// Comando genérico para validar campos obrigatórios
Cypress.Commands.add('validarCamposObrigatorios', (options = {}) => {
  const {
    modalMessages = [],
    fieldMessages = [],
    fieldSelectors = [],
    timeout = 10000,
  } = options;

  if (modalMessages && modalMessages.length) {
    if (
      Cypress.Commands &&
      Cypress.Commands._commands &&
      Cypress.Commands._commands['validarModalMensagens']
    ) {
      cy.validarModalMensagens(modalMessages);
    } else {
      modalMessages.forEach((msg) => cy.contains(msg, { timeout }).should('be.visible'));
    }
  }

  if (fieldSelectors && fieldSelectors.length) {
    fieldSelectors.forEach(({ selector, errorMessage }) => {
      cy.get(selector, { timeout }).should('be.visible');
      if (errorMessage) {
        cy.get(selector, { timeout }).should('have.text', errorMessage);
      }
    });
  }

  if (fieldMessages && fieldMessages.length) {
    cy.get('body', { timeout }).within(() => {
      fieldMessages.forEach((msg) =>
        cy.contains(msg, { matchCase: false }).should('be.visible'),
      );
    });
  }

  cy.log('Validação de campos obrigatórios concluída.');
});

// Validar layout da tela de Oportunidade (Usuário)
Cypress.Commands.add('validarLayoutOportunidadeUsuario', () => {
  cy.log('Validando layout da tela de Oportunidade (Usuário)...');

  cy.contains('h2, p, span', 'Cadastro de Oportunidade', { timeout: 8000 }).should('be.visible');
  cy.contains('p, h3', 'Produto de Interesse').should('be.visible');

  cy.get('button').contains('Cadastrar Oportunidade').click({ force: true });

  const mensagensObrigatorias = [
    'Nome do Contato é obrigatório',
    'E-mail é obrigatório',
    'País é obrigatório',
    'Nome do Produto é obrigatório',
    'A data de início é obrigatória',
    'Selecione uma Subcategoria',
    'HS Code é Obrigatório',
    'Selecione uma categoria',
    'Selecione uma Subcategoria',
    'Tipo de Operação é Obrigatório',
    'A Descrição do Produto é Obrigatória',
  ];

  mensagensObrigatorias.forEach((msg) => {
    cy.contains(msg, { timeout: 5000 }).should('be.visible');
  });

  cy.log('Layout e validações de obrigatoriedade verificados com sucesso.');
});

// Títulos e descrições dos Modais
Cypress.Commands.add('validarModalSucesso', (titulo, descricao) => {
  cy.get('.chakra-modal__body', { timeout: 5000 }).within(() => {
    cy.contains('p', titulo).should('be.visible');
    cy.contains('p', descricao).should('be.visible');
    cy.contains('button', 'OK').click();
  });
});

Cypress.Commands.add('validarModalMensagens', (mensagens = []) => {
  // Aguardar que o modal ou a área de mensagens esteja visível
  cy.get('body').then($body => {
    if ($body.find('.chakra-modal__body').length > 0) {
      cy.get('.chakra-modal__body', { timeout: 10000 }).should('be.visible');
    }
  });

  // Validar cada mensagem individualmente
  mensagens.forEach((msg) => {
    cy.get('body').contains('p.chakra-text, .chakra-modal__body', msg, { matchCase: false, timeout: 10000 })
      .should('be.visible');
  });
});

// Valida se um texto de label está visível
Cypress.Commands.add('validarLabel', (textoLabel) => {
  cy.contains('p.chakra-text', textoLabel, { timeout: 10000 })
    .should('be.visible')
    .and('have.text', textoLabel);

  cy.log(`Label "${textoLabel}" validado com sucesso.`);
});

// Validar mensagem de erro para Datas de Início e Fim
Cypress.Commands.add('validarMensagemErroData', (tipoCampo, mensagemEsperada) => {
  const seletor =
    tipoCampo === 'final' ? 'p[datatype="message-dateEnd"]' : 'p[datatype="message-dateStart"]';

  cy.get(seletor, { timeout: 8000 })
    .should('be.visible')
    .and('contain.text', mensagemEsperada);

  cy.log(`Mensagem de validação "${mensagemEsperada}" exibida corretamente.`);
});
