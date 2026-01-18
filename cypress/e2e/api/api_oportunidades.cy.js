import 'cypress-plugin-api';

const { oportunidadeAPI } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiOportunidades = Cypress.env('url-homol-negocio');

describe('API Test - Funcionalidades Oportunidades', () => {
  let token;
  let opportunityId;

  context('Oportunidades - Admin', () => {
    it('Criar oportunidade como Admin via API', () => {
      const EXPECTED_STATUS = 201;

      cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;
          cy.log('✅ Login Admin realizado com sucesso');
          cy.log('Payload:', JSON.stringify(oportunidadeAPI, null, 2));
          cy.log('URL:', urlApiOportunidades);

          return cy.apiPostRequestWithToken(oportunidadeAPI, urlApiOportunidades, token, EXPECTED_STATUS);
        })
        .then((response) => {
          cy.log('Status recebido:', response.status);
          cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

          if (response.status !== EXPECTED_STATUS) {
            cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
          }

          expect(response.status).to.eq(EXPECTED_STATUS);
          expect(response.body).to.have.property('id');
          opportunityId = response.body.id;
          cy.log('✅ Oportunidade criada com ID:', opportunityId);
        });
    });

    it('Listar todas as oportunidades como Admin', () => {
      const EXPECTED_STATUS = 200;

      cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;

          return cy.api({
            method: 'GET',
            url: urlApiOportunidades,
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
          cy.log('✅ Total de oportunidades:', response.body.length);
        });
    });

    it('Atualizar oportunidade como Admin', () => {
      const EXPECTED_STATUS = 200;
      const oportunidadeAtualizada = {
        ...oportunidadeAPI,
        companyName: 'Empresa ATUALIZADA - AUTOMAÇÃO',
        productName: 'Produto ATUALIZADO',
      };

      cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;

          return cy.apiPostRequestWithToken(oportunidadeAPI, urlApiOportunidades, token, 201);
        })
        .then((createResponse) => {
          opportunityId = createResponse.body.id;

          return cy.api({
            method: 'PUT',
            url: `${urlApiOportunidades}/${opportunityId}`,
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
            body: oportunidadeAtualizada,
            failOnStatusCode: false,
          });
        })
        .then((response) => {
          cy.log('Status recebido:', response.status);
          cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

          expect(response.status).to.eq(EXPECTED_STATUS);
          expect(response.body.companyName).to.include('ATUALIZADA');
          cy.log('✅ Oportunidade atualizada com sucesso');
        });
    });

    it('Deletar oportunidade como Admin', () => {
      const EXPECTED_STATUS = 204;

      cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;

          return cy.apiPostRequestWithToken(oportunidadeAPI, urlApiOportunidades, token, 201);
        })
        .then((createResponse) => {
          opportunityId = createResponse.body.id;
          cy.log('Oportunidade criada com ID:', opportunityId);

          return cy.api({
            method: 'DELETE',
            url: `${urlApiOportunidades}/${opportunityId}`,
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
          cy.log('✅ Oportunidade deletada com sucesso');
        });
    });
  });

  context('Oportunidades - Usuário', () => {
    it('Criar oportunidade como Usuário via API', () => {
      const EXPECTED_STATUS = 201;

      cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;
          cy.log('✅ Login Usuário realizado com sucesso');

          return cy.apiPostRequestWithToken(oportunidadeAPI, urlApiOportunidades, token, EXPECTED_STATUS);
        })
        .then((response) => {
          cy.log('Status recebido:', response.status);
          cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

          expect(response.status).to.eq(EXPECTED_STATUS);
          expect(response.body).to.have.property('id');
          opportunityId = response.body.id;
          cy.log('✅ Oportunidade criada pelo usuário com ID:', opportunityId);
        });
    });

    it('Listar minhas oportunidades como Usuário', () => {
      const EXPECTED_STATUS = 200;

      cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;

          return cy.api({
            method: 'GET',
            url: `${urlApiOportunidades}/my-opportunities`,
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
          cy.log('✅ Minhas oportunidades:', response.body.length);
        });
    });

    it('Buscar oportunidade específica por ID como Usuário', () => {
      const EXPECTED_STATUS = 200;

      cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
        .then((response) => {
          token = response.access_token;

          return cy.apiPostRequestWithToken(oportunidadeAPI, urlApiOportunidades, token, 201);
        })
        .then((createResponse) => {
          opportunityId = createResponse.body.id;

          return cy.api({
            method: 'GET',
            url: `${urlApiOportunidades}/${opportunityId}`,
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
          expect(response.body).to.have.property('id', opportunityId);
          expect(response.body.companyName).to.include('AUTOMAÇÃO');
          cy.log('✅ Oportunidade encontrada:', response.body.companyName);
        });
    });
  });

  it('Filtrar oportunidades por tipo', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiOportunidades}?type=Importação`,
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
        cy.log('✅ Oportunidades de Importação:', response.body.length);
      });
  });

  it('Filtrar oportunidades por país', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiOportunidades}?country=Brasil`,
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
        cy.log('✅ Oportunidades no Brasil:', response.body.length);
      });
  });
});
