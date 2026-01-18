const { faker } = require('@faker-js/faker');

describe('Funcionalidade Lives', () => {
    beforeEach(() => cy.login(Cypress.env('admin_login'), Cypress.env('password_adm')));

    const { cadastroLives } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');

    it('Validar Cadastro de Live A Realizar', () => {
        cy.acessarBackOffice('Lives Cadastradas')
        cy.pesquisarItem(cadastroLives)
        cy.excluirItem('Lives', 'nomeLives', cadastroLives.nomeLives)
        cy.acessarCadastrar('Cadastro de Lives', 'Cadastrar Live', 'Cadastro de Lives')
        cy.preencherCadastroLives(cadastroLives, cadastroLives.ARealizar, cadastroLives.Cadastrar)
        cy.contains("Live editada com sucesso.").should('be.visible') // ## BUG - MENSAGEM CADASTRO LIVES - Apresenta Editar ##
    })

    it('Validar Cadastro de Live Realizada', () => {
        cy.acessarBackOffice('Lives Cadastradas')
        cy.pesquisarItem(cadastroLives)
        cy.excluirItem('Lives', 'nomeLives', cadastroLives.nomeLives)
        cy.acessarCadastrar('Cadastro de Lives', 'Cadastrar Live', 'Cadastro de Lives')
        cy.preencherCadastroLives(cadastroLives, cadastroLives.Realizado, cadastroLives.Cadastrar)
        cy.contains("Live editada com sucesso.").should('be.visible') // ## BUG - MENSAGEM CADASTRO LIVES - Apresenta Editar ##
    })

    it('Validar Edição de Live', () => {
        cy.acessarBackOffice('Lives Cadastradas')
        cy.pesquisarItem(cadastroLives)
        cy.excluirItem('Lives', 'nomeLives', cadastroLives.nomeLives)
        cy.acessarCadastrar('Cadastro de Lives', 'Cadastrar Live', 'Cadastro de Lives')
        cy.preencherCadastroLives(cadastroLives, cadastroLives.Realizado, cadastroLives.Cadastrar)
        cy.contains("Live editada com sucesso.").should('be.visible') // ## BUG - MENSAGEM CADASTRO LIVES - Apresenta Editar ##
        cy.editarItem(cadastroLives.nomeLives)
        cy.contains("Live editada com sucesso.").should('be.visible')

    })

    it('Validar Exclusão de Lives', () => {
        cy.acessarBackOffice('Lives Cadastradas')
        cy.pesquisarItem(cadastroLives)
        cy.excluirItem('Lives', 'nomeLives', cadastroLives.nomeLives)
        cy.acessarCadastrar('Cadastro de Lives', 'Cadastrar Live', 'Cadastro de Lives')
        cy.preencherCadastroLives(cadastroLives, cadastroLives.Realizado, cadastroLives.Cadastrar)
        cy.contains("Live editada com sucesso.").should('be.visible')
        cy.excluirItem('Lives', 'nomeLives', cadastroLives.nomeLives)// ## BUG - MENSAGEM CADASTRO LIVES - Apresenta Editar ##

    })
})