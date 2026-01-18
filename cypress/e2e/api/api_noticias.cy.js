import 'cypress-plugin-api';

const { noticiaAPI } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiNoticias = Cypress.env('url-homol-news');

describe('API Test - Funcionalidades Notícias', () => {
  let token;
  let newsId;

  it('Criar notícia com API', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;
        cy.log('✅ Login Admin realizado com sucesso');
        cy.log('Payload:', JSON.stringify(noticiaAPI, null, 2));
        cy.log('URL:', urlApiNoticias);

        return cy.apiPostRequestWithToken(noticiaAPI, urlApiNoticias, token, EXPECTED_STATUS);
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        if (response.status !== EXPECTED_STATUS) {
          cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
        }

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id');
        newsId = response.body.id;
        cy.log('✅ Notícia criada com ID:', newsId);
      });
  });

  it('Listar notícias com API', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: urlApiNoticias,
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
        cy.log('✅ Total de notícias:', response.body.length);
      });
  });

  it('Buscar notícia específica por ID', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(noticiaAPI, urlApiNoticias, token, 201);
      })
      .then((createResponse) => {
        newsId = createResponse.body.id;

        return cy.api({
          method: 'GET',
          url: `${urlApiNoticias}/${newsId}`,
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
        expect(response.body).to.have.property('id', newsId);
        expect(response.body.title).to.include('AUTOMAÇÃO');
        cy.log('✅ Notícia encontrada:', response.body.title);
      });
  });

  it('Atualizar notícia com API', () => {
    const EXPECTED_STATUS = 200;
    const noticiaAtualizada = {
      ...noticiaAPI,
      title: 'Notícia ATUALIZADA via API - AUTOMAÇÃO',
      content: 'Conteúdo atualizado da notícia',
    };

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(noticiaAPI, urlApiNoticias, token, 201);
      })
      .then((createResponse) => {
        newsId = createResponse.body.id;

        return cy.api({
          method: 'PUT',
          url: `${urlApiNoticias}/${newsId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: noticiaAtualizada,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body.title).to.include('ATUALIZADA');
        cy.log('✅ Notícia atualizada com sucesso');
      });
  });

  it('Deletar notícia com API', () => {
    const EXPECTED_STATUS = 204;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(noticiaAPI, urlApiNoticias, token, 201);
      })
      .then((createResponse) => {
        newsId = createResponse.body.id;
        cy.log('Notícia criada com ID:', newsId);

        return cy.api({
          method: 'DELETE',
          url: `${urlApiNoticias}/${newsId}`,
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
        cy.log('✅ Notícia deletada com sucesso');
      });
  });

  it('Buscar notícias publicadas', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiNoticias}/published`,
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
        cy.log('✅ Notícias publicadas:', response.body.length);
      });
  });
});
