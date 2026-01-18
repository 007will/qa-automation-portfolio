import 'cypress-plugin-api';

const headersServicos = {
    'accept': '*/*',
    'Content-Type': 'multipart/form-data',
};

const { servicoAPI } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiServicos = Cypress.env('api_url_servicos');

describe('API Test - Funcionalidades Serviços', () => {
    let token;
    let preCadastroResponse = {};

    // Helper function to login and set the token
    const loginAndGetToken = () => {
        cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password')).then((response) => {
            token = response.access_token;
        });
    };

});

it('Criar serviços com API', () => {
  const EXPECTED_STATUS = 201;

  cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
    .then((response) => {
      const token = response.access_token;

      return cy.apiPostRequestWithToken(servicoAPI, urlApiServicos, token, EXPECTED_STATUS);
    })
    .then((response) => {
      // Aqui já é o resultado da requisição POST
      cy.log('Status recebido:', response.status);
      cy.log('Body recebido:', JSON.stringify(response.body));

      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Serviço criado com sucesso');
      expect(response.body.data.name).to.include('AUTOMAÇÃO');
    });
});
