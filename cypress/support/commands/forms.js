// Comandos para preenchimento de formulários

// Cadastro de Notícias
Cypress.Commands.add('preencherNoticia', (cadastroNoticias, entidade, news) => {
  cy.wait(2000);
  cy.get('[name="title"]').clear().type(cadastroNoticias.tituloNoticia);
  cy.get('[type="date"]').type(cadastroNoticias.dataNoticia);
  cy.get('[datatype="multiPhotoUploader"]').selectFile('cypress/fixtures/Feira.jpeg', {
    force: true,
  });
  cy.get('[role="textbox"]').clear().type(cadastroNoticias.noticiaTexto);
  cy.get(
    `:nth-child(${entidade}) > .css-1vnzyn > .chakra-switch > .chakra-switch__track`,
  ).click();
  cy.contains('button', `${news}`).click();
  cy.get('div[datatype="grid-items"]')
    .contains(cadastroNoticias.tituloNoticia)
    .should('be.visible');
});

// Cadastro de Oportunidades
Cypress.Commands.add(
  'preencherOportunidadeNegocios',
  (cadastroOportunidade, paises, categoria, subcategoria, operacao, entidade, opcao) => {
    cy.wait(2000);
    cy.get('[name="companyName"]').then(($input) => {
      const isReadonly = $input.is('[readonly]') || $input.prop('readOnly');
      if (!isReadonly) {
        cy.wrap($input).clear().type(cadastroOportunidade.nomeEmpresa);
        cy.log('Campo "Nome da Empresa" editável — valor preenchido.');
      } else {
        cy.log('Campo "Nome da Empresa" é somente leitura — mantendo valor atual.');
      }
    });

    cy.get('[name="contactName"]').clear().type(cadastroOportunidade.nomeContato);
    cy.get('[name="contactEmail"]').clear().type(cadastroOportunidade.email);
    cy.get('[name="country"]').click();
    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.contains('button', `${paises}`).click();
    cy.get('[name="productName"]').clear().type(cadastroOportunidade.nomeProduto);
    cy.get('[name="startDate"]').type(cadastroOportunidade.dataInicio);
    cy.get('[name="endDate"]').type(cadastroOportunidade.dataFinal);
    cy.get('[name="productCategoryId"]').click();
    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.contains('button', `${categoria}`).click();
    cy.get('[name="productSubcategoryId"]').click();
    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.contains('button', `${subcategoria}`).click();
    cy.get('[name="hsCode"]').clear().type(cadastroOportunidade.hsCode);

    cy.get('body').then(($body) => {
      const opButton =
        $body.find('button[name="operationType"]').length > 0
          ? 'button[name="operationType"]'
          : $body.find('button[name="productOperationType"]').length > 0
            ? 'button[name="productOperationType"]'
            : null;

      if (!opButton) {
        cy.log('Nenhum seletor de Tipo de Operação encontrado — verifique o ambiente.');
        return;
      }

      cy.get(opButton).should('be.visible').click({ force: true });

      cy.log('Menu "Tipo de Operação" aberto.');

      cy.contains('button', operacao, { timeout: 8000 })
        .should('be.visible')
        .click({ force: true });

      cy.log(`Tipo de operação selecionado: ${operacao}`);
    });

    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.contains('button', `${operacao}`).click();
    cy.get('[name="productDescription"]').clear().type(cadastroOportunidade.descricaoProduto);
    cy.selecionarEntidadeSeExistir(entidade);
    cy.contains('button', `${opcao}`).click();
    cy.wait(1000);
  },
);

Cypress.Commands.add('selecionarEntidadeSeExistir', (entidade) => {
  const seletor = `#root > div > div.css-cdlra3 > div.css-k008qs > form > div:nth-child(4) > div > div.css-1gmdz1o > div > div > div:nth-child(${entidade}) > label > span`;

  cy.get('body').then(($body) => {
    if ($body.find(seletor).length > 0) {
      cy.get(seletor).click();
      cy.log(`Entidade ${entidade} selecionada.`);
    } else {
      cy.log(`Entidade ${entidade} não encontrada — ignorando seleção.`);
    }
  });
});

// Cadastro de Eventos
Cypress.Commands.add(
  'preencherCadastroEventos',
  (
    cadastroEventos,
    tipoEvento,
    formatoEvento,
    organizador,
    setor,
    categoriaEvento,
    paises,
  ) => {
    cy.wait(2000);
    cy.get(`span[datatype="radio-${tipoEvento}"]`).click();
    cy.get('[name="title"]').type(cadastroEventos.tituloEvento);
    cy.get(`label[datatype="opt-eventFormat-${formatoEvento}"] input[type="checkbox"]`).check({
      force: true,
    });
    cy.get('[name="startDate"]').type(cadastroEventos.dataInicio);
    cy.get('[name="endDate"]').type(cadastroEventos.dataFinal);
    cy.get(`label[datatype="opt-entity-${organizador}"] input[type="checkbox"]`).check({
      force: true,
    });
    cy.get(`label[datatype="opt-sector-${setor}"] input[type="checkbox"]`).check({ force: true });
    cy.get(`label[datatype="opt-category-${categoriaEvento}"] input[type="checkbox"]`).check({
      force: true,
    });
    cy.get('[name="eventVenue"]').type(cadastroEventos.localEvento);
    cy.get('[name="address"]').type(cadastroEventos.endereco);
    cy.get('[name="city"]').type(cadastroEventos.cidade);
    cy.get('[name="addressNumber"]').type(cadastroEventos.Numero);
    cy.get('[name="neighborhood"]').type(cadastroEventos.bairro);
    cy.get('[name="state"]').type(cadastroEventos.uf);
    cy.get('[name="zipCode"]').type(cadastroEventos.cep);
    cy.get('[name="country"]').click();
    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.contains('button', `${paises}`).click();
    cy.get('[name="description"]').type(cadastroEventos.descricaoEvento);
    cy.get('input[type="file"]').selectFile('cypress/fixtures/riacho.png', { force: true });
    cy.get('body').then(($body) => {
      if ($body.find('input[name="payment"]').length) {
        cy.get('[name="payment"]').type(cadastroEventos.valorCheio);
        cy.get('[name="discount"]').type(cadastroEventos.desconto);
      } else {
        cy.get('[name="registrationLink"]').type(cadastroEventos.linkInscricao);
      }
    });
    cy.get('[name="contactName"]').type(cadastroEventos.nomeContato);
    cy.get('[name="contactEmail"]').type(cadastroEventos.email);
    cy.get('input[placeholder="1 (702) 123-4567"').type(cadastroEventos.telefone);
    cy.get('.chakra-switch__thumb').click({ force: true });
    cy.contains('button', 'Cadastrar Evento').click();
    cy.wait(1000);
  },
);

// Cadastrar Serviços
Cypress.Commands.add('preencherCadastroServico', (cadastroServico, categoria, subcategoria, botao) => {
  cy.wait(2000);
  cy.get('[name="name"]').type(cadastroServico.nomeServico);
  cy.get('[name="categoryId"]').click();
  cy.wait(1000);
  cy.contains('button', `${categoria}`).click();
  cy.get('[name="subCategoryId"]').click();
  cy.wait(1000);
  cy.contains('button', `${subcategoria}`).click();
  cy.get('[name="serviceDescription"]').type(cadastroServico.descricaoServico);
  cy.contains('button', `${botao}`).click();
  cy.get('div[datatype="grid-items"]')
    .contains(cadastroServico.nomeServico)
    .should('be.visible');
});

// Cadastro de Produtos
Cypress.Commands.add(
  'preencherCadastroProduto',
  (cadastroProduto, tipoProduto, cateProduto, subProduto, opcao) => {
    cy.wait(2000);
    cy.get(`input[type="radio"][name="type"][value="${tipoProduto}"]`).check({ force: true });
    cy.get('input[name="name"]').clear().type(cadastroProduto.nomeProduto);
    cy.get('[name="hsCode"]').type(cadastroProduto.hsCode);
    cy.get('[datatype="validate-hscode-btn"]').click();
    cy.contains('Animais vivos.');
    cy.wait(1000);
    cy.get('[name="categoriesIds"]').click();
    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.get(`input[type="checkbox"][value="${cateProduto}"]`).check({ force: true });
    cy.get('button[datatype="menu-subcategory"]').click();
    cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
    cy.get(`input[type="checkbox"][value="${subProduto}"]`).check({ force: true });
    cy.get('input[name="internalCode"]').type(cadastroProduto.CodigoInterno);
    cy.get('[name="commercialDescription"]').type(cadastroProduto.Descricao);
    cy.get('input[type="file"]').selectFile('cypress/fixtures/produto.jpg', { force: true });
    cy.wait(2000);
    cy.contains('button', `${opcao}`).click();
  },
);

// Cadastro de Contatos
Cypress.Commands.add('preencherContatos', (cadastroContatos, area, option) => {
  cy.wait(2000);
  cy.get('[name="name"]').type(cadastroContatos.nomeContato);
  cy.get('[name="lastName"]').type(cadastroContatos.sobrenomeContato);
  cy.get('[name="email"]').type(cadastroContatos.email);
  cy.get('[name="phone"]').type(cadastroContatos.telefone);
  cy.get('input[maxlength="18"]').type(cadastroContatos.celular);
  cy.contains('button', `${area}`).click({ force: true });
  cy.get('[name="cpf"]').type(cadastroContatos.CPF);
  cy.get('[name="birthDate"]').type(cadastroContatos.dataContato);
  cy.get('input[type="file"]').selectFile('cypress/fixtures/contato.png', { force: true });
  cy.contains('button', 'Adicionar Contato').click({ force: true });
  cy.wait(2000);
});

// Editar Contatos no Modal
Cypress.Commands.add('preencherCampoModal', (cadastroContatos) => {
  cy.wait(2000);
  cy.get('.chakra-modal__content').within(() => {
    cy.get('input[name="name"]').clear().type(cadastroContatos.nomeContato);
    cy.get('input[name="lastName"]').clear().type(cadastroContatos.sobrenomeContato);
    cy.get('input[datatype="email"]').clear().type(cadastroContatos.email);
    cy.get('input[type="tel"]').eq(0).clear().type(cadastroContatos.telefone);
    cy.get('input[type="tel"]').eq(1).clear().type(cadastroContatos.celular);
    cy.get('input[name="cpf"]').clear().type(cadastroContatos.CPF);
    cy.get('input[name="birthDate"]').clear().type(cadastroContatos.dataContato);
  });
});

// Cadastro de Lives
Cypress.Commands.add('preencherCadastroLives', (cadastroLives, statusLive) => {
  cy.log('Iniciando preenchimento do cadastro de Lives');

  cy.wait(2000);

  cy.contains('button', 'Cadastrar Live').should('be.visible').click({ force: true });
  cy.contains('p.chakra-text', 'Cadastro de Lives').should('be.visible');

  cy.get('[name="title"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(cadastroLives.nomeLives);
  cy.get('[name="description"]').should('be.visible').clear().type(cadastroLives.descricao);
  cy.get('[name="transmissionDate"]')
    .should('be.visible')
    .clear({ force: true })
    .type(cadastroLives.dataInicio, { force: true });

  cy.get('[name="status"]').should('be.visible').click({ force: true });
  cy.get('div[role="menu"], [role="listbox"]').should('be.visible');
  cy.contains('button', `${statusLive}`).click();

  cy.get('[name="youtubeLink"]').should('be.visible').clear().type(cadastroLives.linkLive);

  cy.get('body').then(($body) => {
    if ($body.find('input[type="file"]').length > 0) {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/live.png', { force: true });
    }
  });

  cy.contains('button', 'Cadastrar Live', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });

  cy.log('Live cadastrada com sucesso.');
});

Cypress.Commands.add('preencherDataPublicacao', (daysToAdd) => {
  const now = new Date();
  now.setDate(now.getDate() + daysToAdd);
  const futureDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  cy.get('input[datatype="input-date"][type="date"]').clear().type(futureDate);
});
