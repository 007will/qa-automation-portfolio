import 'cypress-plugin-api';

const { produtoAPI } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiProdutos = Cypress.env('url-homol-product');

describe('API Test - Funcionalidades Produtos', () => {
  let token;
  let productId;

  it('Criar produto com API', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;
        cy.log('✅ Login realizado com sucesso');
        cy.log('Payload:', JSON.stringify(produtoAPI, null, 2));
        cy.log('URL:', urlApiProdutos);

        return cy.apiPostRequestWithToken(produtoAPI, urlApiProdutos, token, EXPECTED_STATUS);
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        if (response.status !== EXPECTED_STATUS) {
          cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
        }

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id');
        productId = response.body.id;
        cy.log('✅ Produto criado com ID:', productId);
      });
  });

  it('Listar produtos com API', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: urlApiProdutos,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        
        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.be.an('array');
        cy.log('✅ Total de produtos:', response.body.length);
      });
  });

  it('Buscar produto específico por ID', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        // Primeiro criar um produto para buscar
        return cy.apiPostRequestWithToken(produtoAPI, urlApiProdutos, token, 201);
      })
      .then((createResponse) => {
        productId = createResponse.body.id;

        return cy.api({
          method: 'GET',
          url: `${urlApiProdutos}/${productId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id', productId);
        expect(response.body.name).to.include('AUTOMAÇÃO');
        cy.log('✅ Produto encontrado:', response.body.name);
      });
  });

  it('Atualizar produto com API', () => {
    const EXPECTED_STATUS = 200;
    const produtoAtualizado = {
      ...produtoAPI,
      name: 'Produto ATUALIZADO via API - AUTOMAÇÃO',
      description: 'Descrição atualizada do produto',
    };

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        // Criar produto primeiro
        return cy.apiPostRequestWithToken(produtoAPI, urlApiProdutos, token, 201);
      })
      .then((createResponse) => {
        productId = createResponse.body.id;

        // Atualizar produto
        return cy.api({
          method: 'PUT',
          url: `${urlApiProdutos}/${productId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: produtoAtualizado,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body.name).to.include('ATUALIZADO');
        cy.log('✅ Produto atualizado com sucesso');
      });
  });

  it('Deletar produto com API', () => {
    const EXPECTED_STATUS = 204;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        // Criar produto primeiro
        return cy.apiPostRequestWithToken(produtoAPI, urlApiProdutos, token, 201);
      })
      .then((createResponse) => {
        productId = createResponse.body.id;
        cy.log('Produto criado com ID:', productId);

        // Deletar produto
        return cy.api({
          method: 'DELETE',
          url: `${urlApiProdutos}/${productId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);

        expect(response.status).to.eq(EXPECTED_STATUS);
        cy.log('✅ Produto deletado com sucesso');
      });
  });
});
