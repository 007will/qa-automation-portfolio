import 'cypress-plugin-api';

const { liveAPI } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiLives = Cypress.env('url-homol-event') + '/transmission';

describe('API Test - Funcionalidades Lives', () => {
  let token;
  let liveId;

  it('Criar live com API', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;
        cy.log('✅ Login Admin realizado com sucesso');
        cy.log('Payload:', JSON.stringify(liveAPI, null, 2));
        cy.log('URL:', urlApiLives);

        return cy.apiPostRequestWithToken(liveAPI, urlApiLives, token, EXPECTED_STATUS);
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        if (response.status !== EXPECTED_STATUS) {
          cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
        }

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id');
        liveId = response.body.id;
        cy.log('✅ Live criada com ID:', liveId);
      });
  });

  it('Listar lives com API', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: urlApiLives,
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
        cy.log('✅ Total de lives:', response.body.length);
      });
  });

  it('Buscar live específica por ID', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(liveAPI, urlApiLives, token, 201);
      })
      .then((createResponse) => {
        liveId = createResponse.body.id;

        return cy.api({
          method: 'GET',
          url: `${urlApiLives}/${liveId}`,
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
        expect(response.body).to.have.property('id', liveId);
        expect(response.body.title).to.include('AUTOMAÇÃO');
        cy.log('✅ Live encontrada:', response.body.title);
      });
  });

  it('Atualizar live com API', () => {
    const EXPECTED_STATUS = 200;
    const liveAtualizada = {
      ...liveAPI,
      title: 'Live ATUALIZADA via API - AUTOMAÇÃO',
      description: 'Descrição atualizada da live',
      status: 'Realizado',
    };

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(liveAPI, urlApiLives, token, 201);
      })
      .then((createResponse) => {
        liveId = createResponse.body.id;

        return cy.api({
          method: 'PUT',
          url: `${urlApiLives}/${liveId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: liveAtualizada,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body.title).to.include('ATUALIZADA');
        cy.log('✅ Live atualizada com sucesso');
      });
  });

  it('Deletar live com API', () => {
    const EXPECTED_STATUS = 204;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(liveAPI, urlApiLives, token, 201);
      })
      .then((createResponse) => {
        liveId = createResponse.body.id;
        cy.log('Live criada com ID:', liveId);

        return cy.api({
          method: 'DELETE',
          url: `${urlApiLives}/${liveId}`,
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
        cy.log('✅ Live deletada com sucesso');
      });
  });

  it('Listar lives por status', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiLives}?status=A Realizar`,
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
        cy.log('✅ Lives a realizar:', response.body.length);
      });
  });

  it('Listar lives realizadas', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiLives}?status=Realizado`,
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
        cy.log('✅ Lives realizadas:', response.body.length);
      });
  });
});
