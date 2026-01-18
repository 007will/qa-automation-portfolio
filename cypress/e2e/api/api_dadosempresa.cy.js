import 'cypress-plugin-api';

const { dadosDaEmpresa } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');
const urlApiCustomer = Cypress.env('url-homol-term');

describe('API Test - Funcionalidades Dados da Empresa (Customer)', () => {
  let token;
  let customerId;

  const empresaAPI = {
    legalName: dadosDaEmpresa.razaoSocial,
    tradeName: dadosDaEmpresa.nomeFantasia,
    cnpj: dadosDaEmpresa.cnpj,
    email: dadosDaEmpresa.email,
    phone: dadosDaEmpresa.telefone,
    categoryId: 12,
    address: {
      street: dadosDaEmpresa.endereco,
      number: dadosDaEmpresa.numero,
      neighborhood: dadosDaEmpresa.bairro,
      city: dadosDaEmpresa.cidade,
      state: dadosDaEmpresa.uf,
      zipCode: dadosDaEmpresa.cep,
      country: dadosDaEmpresa.pais,
    },
  };

  it('Criar dados da empresa com API', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;
        cy.log('✅ Login realizado com sucesso');
        cy.log('Payload:', JSON.stringify(empresaAPI, null, 2));
        cy.log('URL:', urlApiCustomer);

        return cy.apiPostRequestWithToken(empresaAPI, urlApiCustomer, token, EXPECTED_STATUS);
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        if (response.status !== EXPECTED_STATUS) {
          cy.log('❌ ERRO DETALHADO:', JSON.stringify(response.body, null, 2));
        }

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('id');
        customerId = response.body.id;
        cy.log('✅ Empresa criada com ID:', customerId);
      });
  });

  it('Buscar dados da empresa por ID', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(empresaAPI, urlApiCustomer, token, 201);
      })
      .then((createResponse) => {
        customerId = createResponse.body.id;

        return cy.api({
          method: 'GET',
          url: `${urlApiCustomer}/${customerId}`,
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
        expect(response.body).to.have.property('id', customerId);
        expect(response.body.tradeName).to.eq(dadosDaEmpresa.nomeFantasia);
        cy.log('✅ Empresa encontrada:', response.body.tradeName);
      });
  });

  it('Atualizar dados da empresa com API', () => {
    const EXPECTED_STATUS = 200;
    const empresaAtualizada = {
      ...empresaAPI,
      tradeName: 'Empresa ATUALIZADA - AUTOMAÇÃO',
      phone: '61988888888',
    };

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(empresaAPI, urlApiCustomer, token, 201);
      })
      .then((createResponse) => {
        customerId = createResponse.body.id;

        return cy.api({
          method: 'PUT',
          url: `${urlApiCustomer}/${customerId}`,
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: empresaAtualizada,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        cy.log('Status recebido:', response.status);
        cy.log('Body recebido:', JSON.stringify(response.body, null, 2));

        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body.tradeName).to.include('ATUALIZADA');
        cy.log('✅ Dados da empresa atualizados com sucesso');
      });
  });

  it('Listar todas as empresas', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: urlApiCustomer,
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
        cy.log('✅ Total de empresas:', response.body.length);
      });
  });

  it('Buscar empresa por CNPJ', () => {
    const EXPECTED_STATUS = 200;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.api({
          method: 'GET',
          url: `${urlApiCustomer}/cnpj/${dadosDaEmpresa.cnpj}`,
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
        expect(response.body).to.have.property('cnpj', dadosDaEmpresa.cnpj);
        cy.log('✅ Empresa encontrada por CNPJ');
      });
  });

  it('Validar estrutura de endereço da empresa', () => {
    const EXPECTED_STATUS = 201;

    cy.loginAPI(Cypress.env('servico_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(empresaAPI, urlApiCustomer, token, EXPECTED_STATUS);
      })
      .then((response) => {
        expect(response.status).to.eq(EXPECTED_STATUS);
        expect(response.body).to.have.property('address');
        expect(response.body.address).to.have.property('street', dadosDaEmpresa.endereco);
        expect(response.body.address).to.have.property('city', dadosDaEmpresa.cidade);
        expect(response.body.address).to.have.property('state', dadosDaEmpresa.uf);
        expect(response.body.address).to.have.property('zipCode', dadosDaEmpresa.cep);
        cy.log('✅ Estrutura de endereço validada com sucesso');
      });
  });

  it('Deletar dados da empresa', () => {
    const EXPECTED_STATUS = 204;

    cy.loginAPI(Cypress.env('admin_login'), Cypress.env('password'))
      .then((response) => {
        token = response.access_token;

        return cy.apiPostRequestWithToken(empresaAPI, urlApiCustomer, token, 201);
      })
      .then((createResponse) => {
        customerId = createResponse.body.id;
        cy.log('Empresa criada com ID:', customerId);

        return cy.api({
          method: 'DELETE',
          url: `${urlApiCustomer}/${customerId}`,
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
        cy.log('✅ Empresa deletada com sucesso');
      });
  });
});
