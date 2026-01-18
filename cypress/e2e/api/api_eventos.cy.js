import 'cypress-plugin-api';

const { eventoAPI } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiEventos = Cypress.env('url-homol-event');

describe('API Test - Funcionalidades Eventos', () => {
  let token;
  let eventId;

  it('Criar evento com API', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;
        cy.log('✅ Login realizado com sucesso');
        cy.log('Payload:', JSON.stringify(eventoAPI, null, 2));
        cy.log('URL:', urlApiEventos);

        return cy.apiPostRequestWithToken(eventoAPI, urlApiEventos, token, EXPECTED_STATUS);
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        if (response.status !== EXPECTED_STATUS) {
          cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
        }

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id');
        eventId = response.body.id;
        cy.log('✅ Evento criado com ID:', eventId);
      });
  });

  it('Listar eventos com API', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: urlApiEventos,
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
        cy.log('✅ Total de eventos:', response.body.length);
      });
  });

  it('Buscar evento específico por ID', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(eventoAPI, urlApiEventos, token, 201);
      })
      .then((createResponse) => {
        eventId = createResponse.body.id;

        return cy.api({
          method: 'GET',
          url: `${urlApiEventos}/${eventId}`,
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
        expect(response.body).to.have.property('id', eventId);
        expect(response.body.title).to.include('AUTOMAÇÃO');
        cy.log('✅ Evento encontrado:', response.body.title);
      });
  });

  it('Atualizar evento com API', () => {
    const EXPECTED_STATUS = 200;
    const eventoAtualizado = {
      ...eventoAPI,
      title: 'Evento ATUALIZADO via API - AUTOMAÇÃO',
      description: 'Descrição atualizada do evento',
    };

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(eventoAPI, urlApiEventos, token, 201);
      })
      .then((createResponse) => {
        eventId = createResponse.body.id;

        return cy.api({
          method: 'PUT',
          url: `${urlApiEventos}/${eventId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: eventoAtualizado,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body.title).to.include('ATUALIZADO');
        cy.log('✅ Evento atualizado com sucesso');
      });
  });

  it('Deletar evento com API', () => {
    const EXPECTED_STATUS = 204;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(eventoAPI, urlApiEventos, token, 201);
      })
      .then((createResponse) => {
        eventId = createResponse.body.id;
        cy.log('Evento criado com ID:', eventId);

        return cy.api({
          method: 'DELETE',
          url: `${urlApiEventos}/${eventId}`,
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
        cy.log('✅ Evento deletado com sucesso');
      });
  });

  it('Listar eventos por tipo', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiEventos}?type=ownEvent`,
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
        cy.log('✅ Eventos próprios encontrados:', response.body.length);
      });
  });

  it('Listar eventos por modalidade', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiEventos}?modality=online`,
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
        cy.log('✅ Eventos online encontrados:', response.body.length);
      });
  });
});
