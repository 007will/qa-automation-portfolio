import 'cypress-plugin-api';

const { cadastroContatos } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiIdentity = 'https://dev-gsidentity.azurewebsites.net/api';

describe('API Test - Funcionalidades Contatos/Usuários (Identity)', () => {
  let token;
  let userId;

  const contatoAPI = {
    firstName: cadastroContatos.nomeContato,
    lastName: cadastroContatos.sobrenomeContato,
    email: `contato.api.${Date.now()}@yopmail.com`, // Email único
    phoneNumber: cadastroContatos.telefone,
    cellphone: cadastroContatos.celular,
    cpf: cadastroContatos.CPF,
    areaOfInterest: cadastroContatos.areaImportExport,
    customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  };

  it('Criar contato/usuário com API', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;
        cy.log('✅ Login Admin realizado com sucesso');
        cy.log('Payload:', JSON.stringify(contatoAPI, null, 2));
        cy.log('URL:', `${urlApiIdentity}/users`);

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: contatoAPI,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        if (response.status !== EXPECTED_STATUS) {
          cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
        }

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id');
        userId = response.body.id;
        cy.log('✅ Contato/Usuário criado com ID:', userId);
      });
  });

  it('Listar todos os usuários', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiIdentity}/users`,
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
        cy.log('✅ Total de usuários:', response.body.length);
      });
  });

  it('Buscar usuário específico por ID', () => {
    const EXPECTED_STATUS = 200;
    const emailUnico = `contato.busca.${Date.now()}@yopmail.com`;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: { ...contatoAPI, email: emailUnico },
          failOnStatusCode: false,
        });
      })
      .then((createResponse) => {
        userId = createResponse.body.id;

        return cy.api({
          method: 'GET',
          url: `${urlApiIdentity}/users/${userId}`,
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
        expect(response.body).to.have.property('id', userId);
        expect(response.body.firstName).to.eq(cadastroContatos.nomeContato);
        cy.log('✅ Usuário encontrado:', response.body.firstName);
      });
  });

  it('Atualizar dados do usuário', () => {
    const EXPECTED_STATUS = 200;
    const emailUnico = `contato.update.${Date.now()}@yopmail.com`;
    
    const contatoAtualizado = {
      ...contatoAPI,
      email: emailUnico,
      firstName: 'Contato ATUALIZADO',
      phoneNumber: '61999999999',
    };

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: { ...contatoAPI, email: emailUnico },
          failOnStatusCode: false,
        });
      })
      .then((createResponse) => {
        userId = createResponse.body.id;

        return cy.api({
          method: 'PUT',
          url: `${urlApiIdentity}/users/${userId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: contatoAtualizado,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body.firstName).to.include('ATUALIZADO');
        cy.log('✅ Usuário atualizado com sucesso');
      });
  });

  it('Buscar usuário por email', () => {
    const EXPECTED_STATUS = 200;
    const emailUnico = `contato.email.${Date.now()}@yopmail.com`;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: { ...contatoAPI, email: emailUnico },
          failOnStatusCode: false,
        });
      })
      .then((createResponse) => {
        return cy.api({
          method: 'GET',
          url: `${urlApiIdentity}/users/email/${emailUnico}`,
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
        expect(response.body).to.have.property('email', emailUnico);
        cy.log('✅ Usuário encontrado por email');
      });
  });

  it('Buscar usuário por CPF', () => {
    const EXPECTED_STATUS = 200;
    const emailUnico = `contato.cpf.${Date.now()}@yopmail.com`;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: { ...contatoAPI, email: emailUnico },
          failOnStatusCode: false,
        });
      })
      .then((createResponse) => {
        return cy.api({
          method: 'GET',
          url: `${urlApiIdentity}/users/cpf/${cadastroContatos.CPF}`,
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
        expect(response.body).to.have.property('cpf', cadastroContatos.CPF);
        cy.log('✅ Usuário encontrado por CPF');
      });
  });

  it('Deletar usuário', () => {
    const EXPECTED_STATUS = 204;
    const emailUnico = `contato.delete.${Date.now()}@yopmail.com`;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: { ...contatoAPI, email: emailUnico },
          failOnStatusCode: false,
        });
      })
      .then((createResponse) => {
        userId = createResponse.body.id;
        cy.log('Usuário criado com ID:', userId);

        return cy.api({
          method: 'DELETE',
          url: `${urlApiIdentity}/users/${userId}`,
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
        cy.log('✅ Usuário deletado com sucesso');
      });
  });

  it('Validar campos obrigatórios do contato', () => {
    const contatoInvalido = {
      firstName: '',
      lastName: '',
      email: '',
    };

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'POST',
          url: `${urlApiIdentity}/users`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: contatoInvalido,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(400);
        cy.log('✅ Validação de campos obrigatórios funcionando');
      });
  });
});
