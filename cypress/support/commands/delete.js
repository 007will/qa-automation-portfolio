// Comandos para exclusão de itens

// Função auxiliar para isolar a exclusão
function excluir(titulo) {
  cy.contains('[datatype="grid-items"] div', titulo)
    .parents('[datatype="grid-items"]')
    .within(() => {
      cy.get('button[datatype="btn-MoreVertRoundedIcon"]').click();
    });
  cy.contains('button', 'Excluir').click();
  cy.contains('button', 'Sim').click();
}

// Função genérica para exclusão de qualquer tipo de item
Cypress.Commands.add('excluirItem', (tipo, nomeCampo, valorCampo) => {
  cy.log(`Iniciando verificação e exclusão de ${tipo}: "${valorCampo}"`);

  cy.aguardarGrid();

  cy.get('body').then(($body) => {
    const existe =
      $body.find(
        `[datatype="grid-items"] div:contains("${valorCampo}"), [datatype="grid-items"] p:contains("${valorCampo}")`,
      ).length > 0;

    if (existe) {
      cy.log(`${tipo} encontrado: "${valorCampo}". Iniciando exclusão...`);

      excluir(valorCampo);

      cy.contains(/(Sucesso|sucesso|Excluíd[ao]|excluíd[ao])/i, { timeout: 15000 })
        .should('be.visible')
        .then(() => {
          cy.log(`🧹 ${tipo} "${valorCampo}" excluído com sucesso!`);
        });
    } else {
      cy.log(`${tipo} "${valorCampo}" não encontrado. Nenhuma exclusão realizada.`);
    }
    cy.waitForPageLoad();
  });
});

// Função exclusiva para exclusão de Contatos
Cypress.Commands.add('excluirContato', (nomeContato) => {
  cy.log(`Verificando existência do contato: "${nomeContato}"`);

  cy.aguardarGrid();

  cy.get('body').then(($body) => {
    const contatoExiste =
      $body.find(
        `[datatype="grid-items"] div:contains("${nomeContato}"), 
                        [datatype="grid-items"] p:contains("${nomeContato}")`,
      ).length > 0;

    if (!contatoExiste) {
      cy.log(`Contato "${nomeContato}" não encontrado — nada a excluir.`);
      return;
    }

    cy.log(`Contato encontrado. Iniciando exclusão...`);

    cy.contains('[datatype="grid-items"] div, [datatype="grid-items"] p', nomeContato)
      .parents('[datatype="grid-items"]')
      .first()
      .within(() => {
        cy.get('button[datatype="btn-MoreVertRoundedIcon"]')
          .should('be.visible')
          .click({ force: true });
      });

    cy.contains('button[datatype="btn-delete"]', 'Excluir', { timeout: 8000 })
      .should('be.visible')
      .click({ force: true });

    cy.contains('button[datatype="btn-modal-yes"]', 'Sim', { timeout: 8000 })
      .should('be.visible')
      .click({ force: true });

    cy.contains(/Contato Excluído Com Sucesso!/i, { timeout: 10000 }).should('be.visible');

    cy.contains('button', /^OK$/i, { timeout: 8000 }).click({ force: true });

    cy.log(`Contato "${nomeContato}" excluído com sucesso.`);
  });
});

Cypress.Commands.add('clicarExcluir', () => {
  cy.contains('button', 'Excluir', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
});

Cypress.Commands.add('confirmarSim', () => {
  cy.contains('button', 'Sim', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
});

Cypress.Commands.add('excluirTodosItens', (menu, titulo) => {
  cy.log(`Iniciando exclusão em massa de "${titulo}" no menu "${menu}"`);

  const excluirItem = () => {
    cy.acessarBackOffice(menu);

    cy.get('body').then(($body) => {
      const itemExiste =
        $body.find(`[datatype="grid-items"] div:contains("${titulo}")`).length > 0;

      if (itemExiste) {
        cy.log(`Item encontrado: "${titulo}" - iniciando exclusão...`);
        cy.abrirMenuItemExcluir(titulo);
        cy.clicarExcluir();
        cy.confirmarSim();
        cy.wait(500);
        excluirItem();
      } else {
        cy.log(`Nenhum item restante com o título "${titulo}". Processo finalizado.`);
      }
    });
  };

  excluirItem();
});

Cypress.Commands.add('excluirEventoDoGrid', (filtro, dataFormatada) => {
  cy.get('body').then(($body) => {
    const seletorItem =
      $body.find(`[datatype="event-name"]:contains("${filtro}")`).length > 0
        ? `[datatype="event-name"]:contains("${filtro}")`
        : `div.css-19z2ndn:contains("${dataFormatada}")`;

    cy.get(seletorItem, { timeout: 10000 })
      .should('be.visible')
      .parents('[datatype="grid-items"]')
      .first()
      .within(() => {
        cy.get('button[datatype="btn-MoreVertRoundedIcon"]').click({ force: true });
      });

    cy.contains('button[datatype="btn-delete"]', 'Excluir', { timeout: 8000 })
      .should('be.visible')
      .click({ force: true });

    cy.contains('button[datatype="btn-modal-yes"]', 'Sim', { timeout: 8000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(3000);

    cy.log(`🧹 Evento "${filtro}" (ou data ${dataFormatada}) excluído com sucesso!`);
  });
});
