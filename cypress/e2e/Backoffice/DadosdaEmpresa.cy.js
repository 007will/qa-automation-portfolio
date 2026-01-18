const { faker } = require('@faker-js/faker');
const { gerarCpfUnico } = require('../../support/utils');
const usuarios = [
    {
        perfil: 'Importação + Exportação',
        login: Cypress.env('produto_import_export_login'),
    },
    {
        perfil: 'Importação',
        login: Cypress.env('produto_import_login'),
    },
    {
        perfil: 'Exportação',
        login: Cypress.env('produto_export_login'),
    },
    {
        perfil: 'Negócio',
        login: Cypress.env('negocio_login'),
    },
    {
        perfil: 'Serviço',
        login: Cypress.env('servico_login'),
    }
];

usuarios.forEach((usuario) => {

    describe(`Funcionalidade Empresa - ${usuario.perfil}`, () => {

        beforeEach(() => {
            cy.login(usuario.login, Cypress.env('password'));
        });


        // Debug: log quando o spec é carregado (para detectar carregamentos duplicados)
        console.log('Loaded contatos.spec for ambiente:', Cypress.env('ambiente'));
        const { dadosDaEmpresa } = require('../../dataTest/data_' + Cypress.env('ambiente') + '.js');

        it('Validar Layout da Página da Empresa - SPCC', () => {
            cy.acessarBackOffice('Dados da Empresa')
            cy.contains('Abrir Página Inicial').should('be.visible')
            cy.contains("Dados da Empresa").should('be.visible')
            cy.contains("Status").should('be.visible')
            cy.contains("Nome Fantasia*").should('be.visible')
            cy.contains("Razão Social*").should('be.visible')
            cy.contains("CNPJ*").should('be.visible')
            cy.contains("E-mail*").should('be.visible')
            cy.contains("Telefone/Celular*").should('be.visible')
            cy.contains("Categoria *").should('be.visible')
            cy.contains("Endereço").should('be.visible')
            cy.contains("CEP*").should('be.visible')
            cy.contains("Endereço*").should('be.visible')
            cy.contains("Nº *").should('be.visible')
            cy.contains("Bairro*").should('be.visible')
            cy.contains("Cidade*").should('be.visible')
            cy.contains("UF *").should('be.visible')
            cy.contains("País*").should('be.visible')
            cy.contains("Complemento").should('be.visible')
            cy.contains("Sobre a Empresa").should('be.visible')
            cy.contains("Descrição da Empresa (Resumo)*").should('be.visible')
            cy.contains("/500").should('be.visible')
            cy.get('input[datatype="input-linkedin"]')
                .should('have.attr', 'placeholder', 'Adicione o link do seu Linkedin');
            cy.get('input[datatype="input-facebook"]')
                .should('have.attr', 'placeholder', 'Adicione o link do seu Facebook');
            cy.get('input[datatype="input-instagram"]')
                .should('have.attr', 'placeholder', 'Adicione o link do seu Instagram');
            cy.contains('button', 'Alterar Logo').should('be.visible')
            cy.contains('button', 'Salvar').should('be.visible')
            //cy.contains("Países de Atuação").should('be.visible')
            //cy.contains("Adicione até 10 países de atuação da empresa e escolha as suas respectivas áreas.").should('be.visible')
            //cy.contains("País de Atuação").should('be.visible')
            //cy.contains("Áreas de Atuação").should('be.visible')
            //cy.contains('button', 'Selecione').should('be.visible');
            //cy.contains("Brasil").should('be.visible')
            //cy.contains("Centro de Distribuição").should('be.visible')
            // cy.contains("Exportação").should('be.visible')
            // cy.contains("Importação").should('be.visible')
            // cy.contains("Representação").should('be.visible')
            cy.contains("Informações Adicionais").should('be.visible')
            cy.contains("Adicione novas descrições, fotos ou vídeos para complementar as informações da sua página.").should('be.visible')
            cy.contains("Adicione uma Imagem").should('be.visible')
            cy.get('input[datatype="input-videoLink"]')
  .should('have.attr', 'placeholder', 'Adicione o link do seu vídeo');
           cy.contains('button', 'Salvar')
                .should('be.visible');
        })
    })
})