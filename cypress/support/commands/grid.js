// Comandos para manipulação de grids e listagens

// Função para aguardar o carregamento do grid
Cypress.Commands.add('aguardarGrid', () => {
  cy.log('Aguardando carregamento do grid...');

  cy.get('body').then(($body) => {
    if ($body.find('[datatype="grid-items"]').length > 0) {
      cy.get('[datatype="grid-items"]', { timeout: 15000 }).should('be.visible');
      cy.log('Grid carregado com sucesso.');
    } else if ($body.text().includes('Ainda não há')) {
      cy.log('Nenhum item encontrado — grid vazio.');
    } else {
      cy.log('Nenhum grid identificado nesta tela.');
    }
  });
});

// Função genérica para pesquisar itens
Cypress.Commands.add('pesquisarItem', (dados) => {
  const nomeItem =
    dados.nomeServico ||
    dados.nomeEmpresa ||
    dados.tituloNoticia ||
    dados.nomeProduto ||
    dados.nomeContato ||
    dados.nomeLives;

  if (!nomeItem) {
    throw new Error(
      'Nenhum campo identificador encontrado. Verifique se o objeto contém nomeServico, nomeEmpresa, tituloNoticia, nomeProduto ou nomeContato.',
    );
  }

  cy.log(`Pesquisando item: ${nomeItem}`);

  const placeholders = [
    'Pesquise por Serviço',
    'Pesquise por Oportunidades',
    'Pesquise por Título da Notícia',
    'Pesquise por Produto ou HS Code',
    'Pesquise por Contato',
    'Digite a Razão Social',
    'Pesquise por Título da Live',
  ];

  cy.get('input[placeholder]', { timeout: 10000 })
    .filter((_, el) => placeholders.includes(el.getAttribute('placeholder')))
    .first()
    .should('be.visible')
    .clear()
    .type(nomeItem, { delay: 50 });

  cy.wait(1000);

  cy.get('body').then(($body) => {
    const temGrid = $body.find('[datatype="grid-items"]').length > 0;
    const temMensagem = $body.text().includes('Ainda não há Oportunidades Cadastradas');

    if (temGrid) {
      cy.get('[datatype="grid-items"]', { timeout: 10000 })
        .should('contain.text', nomeItem)
        .and('be.visible');
      cy.log(`Item "${nomeItem}" encontrado com sucesso.`);
    } else if (temMensagem) {
      cy.log(
        `Nenhum item encontrado para "${nomeItem}". Mensagem exibida: "Ainda não há Oportunidades Cadastradas".`,
      );
    } else {
      cy.log(`Elemento "[datatype='grid-items']" não encontrado na tela.`);
    }
  });
});

// Comando genérico para editar itens no grid
Cypress.Commands.add('editarItem', (titulo, options = {}) => {
  const {
    action = 'auto',
    itemSelector = '[datatype="grid-items"] div, [datatype="grid-items"] p',
    throwIfNotFound = false,
  } = options;
  cy.wait(5000);
  cy.get('body').then(($body) => {
    const existe = $body.find(`${itemSelector}:contains("${titulo}")`).length > 0;
    if (!existe) {
      const msg = `Erro: Item "${titulo}" não encontrado!`;
      cy.log(msg);
      if (throwIfNotFound) {
        throw new Error(msg);
      }
      return;
    }

    cy.contains(itemSelector, titulo)
      .parents('[datatype="grid-items"]')
      .within(() => {
        cy.get('button[datatype="btn-MoreVertRoundedIcon"]').click({ force: true });
      });

    cy.get('body').then(($menu) => {
      if (action === 'auto') {
        if ($menu.find('button:contains("Editar")').length > 0) {
          cy.contains('button', 'Editar').click({ force: true });
        } else if ($menu.find('button:contains("Visualizar")').length > 0) {
          cy.contains('button', 'Visualizar').click({ force: true });
        } else {
          cy.log('Nenhuma ação de edição encontrada no menu para: ' + titulo);
        }
      } else {
        cy.contains('button', action).click({ force: true });
      }
    });
  });
  cy.wait(1000);
});

// Wrappers de compatibilidade
Cypress.Commands.add('editarNoticia', (cadastroNoticias) => {
  cy.editarItem(cadastroNoticias.tituloNoticia, { throwIfNotFound: true });
});

Cypress.Commands.add('editarServico', (cadastroServico) => {
  cy.editarItem(cadastroServico.nomeServico);
});

Cypress.Commands.add('editarOportunidade', (cadastroOportunidade) => {
  cy.editarItem(cadastroOportunidade.nomeEmpresa);
});

Cypress.Commands.add('editarProduto', (cadastroProduto) => {
  cy.editarItem(cadastroProduto.nomeProduto);
});

Cypress.Commands.add('editarContato', (cadastroContatos) => {
  cy.editarItem(cadastroContatos.nomeContato);
});

Cypress.Commands.add('editarLive', (cadastroLives) => {
  cy.editarItem(cadastroLives.nomeLives);
});

// Alterar status para Funcionalidades (ativar/desativar)
Cypress.Commands.add('alterarStatus', (dados, ativar = true) => {
  const nomeItem =
    dados.nomeServico ||
    dados.nomeEmpresa ||
    dados.tituloNoticia ||
    dados.nomeProduto ||
    dados.nomeContato;

  if (!nomeItem) {
    throw new Error(
      'Nenhum campo identificador encontrado. Verifique se o objeto contém nomeServico, nomeEmpresa, tituloNoticia, nomeProduto ou nomeContato.',
    );
  }

  cy.contains('[datatype="grid-items"] div', nomeItem, { timeout: 10000 })
    .should('be.visible')
    .parents('[datatype="grid-items"]')
    .within(() => {
      cy.get('input[type="checkbox"]').then(($input) => {
        const checked = $input.is(':checked');

        if (ativar && !checked) {
          cy.wrap($input).check({ force: true });
          cy.log(`"${nomeItem}" foi ativado com sucesso.`);
        } else if (!ativar && checked) {
          cy.wrap($input).uncheck({ force: true });
          cy.log(`"${nomeItem}" foi desativado com sucesso.`);
        } else {
          cy.log(`"${nomeItem}" já está no estado desejado.`);
        }
      });
    });
});

// Selecionar filtros genéricos
Cypress.Commands.add('selecionarFiltro', (filtro, valor) => {
  cy.log(`Selecionando filtro "${filtro}" com valor "${valor}"`);

  const filtros = {
    'Nome da Empresa': '[datatype="area-select-company"]',
    Categoria: '[datatype="area-select-customer"]',
    'Tipo de Operação': null, // Será tratado especialmente abaixo
    Status: '[datatype="area-select-status"]',
  };

  const seletorFiltro = filtros[filtro];

  if (filtro !== 'Tipo de Operação' && !seletorFiltro) {
    throw new Error(
      `Filtro "${filtro}" não mapeado. Adicione-o ao objeto "filtros" no comando selecionarFiltro.`,
    );
  }

  // Para o filtro de Tipo de Operação, buscar o botão correto
  if (filtro === 'Tipo de Operação') {
    cy.log('Clicando no campo Tipo de Operação...');
    // Usar o primeiro botão com datatype="menuButton-label" (índice 0)
    cy.get('button[datatype="menuButton-label"]').eq(0).click({ force: true });
  } else {
    cy.get(seletorFiltro, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  cy.wait(1000);

  // Selecionar o valor dentro do dropdown/menu
  cy.log(`Buscando valor "${valor}" no menu...`);
  
  // Tentar clicar no label do checkbox primeiro (mais específico)
  cy.get('body').then(($body) => {
    const labelCheckbox = $body.find(`label[datatype*="checkBox-${valor}"]`);
    const buttonMenuItem = $body.find(`button[datatype="menuItem-label"]:contains("${valor}")`);
    const spanCheckbox = $body.find(`span.chakra-checkbox__label:contains("${valor}")`);
    const buttonSimples = $body.find(`button:not([datatype="menuItem-label"]):contains("${valor}")`);
    
    if (labelCheckbox.length > 0) {
      cy.log('Clicando no label do checkbox...');
      cy.get(`label[datatype*="checkBox-${valor}"]`).first().click({ force: true });
    } else if (buttonMenuItem.length > 0) {
      cy.log('Clicando no button menuItem-label...');
      cy.get(`button[datatype="menuItem-label"]`).contains(valor, { matchCase: false }).click({ force: true });
    } else if (spanCheckbox.length > 0) {
      cy.log('Clicando no span do checkbox...');
      cy.contains('span.chakra-checkbox__label', valor, { matchCase: false }).click({ force: true });
    } else if (buttonSimples.length > 0) {
      cy.log('Clicando no button simples...');
      cy.contains('button', valor, { matchCase: false }).first().click({ force: true });
    } else {
      cy.log(`⚠️ Valor "${valor}" não encontrado dentro do filtro "${filtro}"`);
    }
  });

  cy.wait(500);
  cy.log(`Filtro "${filtro}" aplicado com valor "${valor}".`);
});

// Helper para abrir menu de item
Cypress.Commands.add('abrirMenuItemPorTitulo', (titulo) => {
  return cy
    .contains('[datatype="grid-items"] div, [datatype="grid-items"] p', titulo, { timeout: 10000 })
    .should('be.visible')
    .parents('[datatype="grid-items"]')
    .first()
    .within(() => {
      return cy
        .get('button[datatype="btn-MoreVertRoundedIcon"]', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true })
        .invoke('attr', 'aria-controls')
        .then((menuId) => {
          cy.get(`[id="${menuId}"]`, { timeout: 10000 }).should('be.visible');
          return menuId;
        });
    });
});

Cypress.Commands.add('abrirMenuItemExcluir', (titulo) => {
  cy.contains('[datatype="grid-items"] div', titulo, { timeout: 10000 })
    .should('be.visible')
    .parents('[datatype="grid-items"]')
    .within(() => {
      cy.get('button[datatype="btn-MoreVertRoundedIcon"]').click({ force: true });
    });
});

Cypress.Commands.add('abrirMenuOportunidade', (nomeOportunidade) => {
  cy.log(`Acessando menu da oportunidade: "${nomeOportunidade}"`);

  cy.contains('[datatype="grid-items"] div', nomeOportunidade, { timeout: 10000 })
    .should('be.visible')
    .parents('[datatype="grid-items"]')
    .within(() => {
      cy.get('button[datatype="btn-MoreVertRoundedIcon"]').click({ force: true });
    });

  cy.wait(1000);

  cy.get('body').then(($body) => {
    if ($body.find('button[datatype="btn-edit"]:contains("Editar")').length > 0) {
      cy.log('Oportunidade própria detectada');
      cy.contains('button', 'Editar').click({ force: true });
    } else if ($body.find('button[datatype="btn-edit"]:contains("Visualizar")').length > 0) {
      cy.log('Oportunidade de terceiros detectada');
      cy.contains('button', 'Visualizar').click({ force: true });
    } else {
      cy.log(`Nenhuma ação encontrada para "${nomeOportunidade}"`);
    }
  });
});

Cypress.Commands.add('visualizarEmpresa', (nomeEmpresa) => {
  cy.log(`Iniciando validação da empresa "${nomeEmpresa}"`);

  cy.contains('p.chakra-text', 'Empresas', { timeout: 10000 }).should('be.visible');
  cy.log('Tela "Empresas" acessada com sucesso.');

  cy.get('input[datatype="input-businessName"]', { timeout: 10000 })
    .filter(':visible')
    .first()
    .should('be.visible')
    .clear({ force: true })
    .type(nomeEmpresa, { delay: 50, force: true });

  cy.contains('td, div, p', nomeEmpresa, { timeout: 10000 }).should('be.visible');

  cy.get('button[datatype="btn-MoreVertRoundedIcon"]').click({ force: true });

  cy.get('button[datatype="btn-MoreVertRoundedIcon"][aria-expanded="true"]', { timeout: 5000 }).should(
    'exist',
  );

  cy.get('button[datatype="btn-edit"][tabindex="0"]', { timeout: 8000 })
    .should('be.visible')
    .and('contain.text', 'Visualizar')
    .click({ force: true });

  cy.contains('p.chakra-text', 'Visualizar Empresa', { timeout: 10000 }).should('be.visible');

  cy.get('input[datatype="company-name-view"]', { timeout: 10000 })
    .should('be.visible')
    .and('have.value', nomeEmpresa)
    .and('have.attr', 'readonly');

  cy.log(`Empresa "${nomeEmpresa}" visualizada com sucesso.`);
});

Cypress.Commands.add('selecionarAbaEventos', (nomeAba) => {
  cy.contains('button', nomeAba, { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });

  cy.log(`Aba selecionada: ${nomeAba}`);
});
