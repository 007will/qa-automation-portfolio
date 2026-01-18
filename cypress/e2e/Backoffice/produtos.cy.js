const { faker } = require('@faker-js/faker');

describe('Funcionalidade Produto', () => {
    beforeEach(() => cy.login(Cypress.env('produto_import_export_login'), Cypress.env('password')));

    const { cadastroProduto } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');

    //Bug Aberto - HS Code #10771
    //Código interno HS code em conflito quando é repetido! realizar alteração para código aleatório
    //cadastroProduto.CodigoInterno = faker.datatype.number({ min: 1000000, max: 9999999 }).toString();
    //Implementar a cima não aplicado 21/10/2025

//***Alterações pendentes devido a mudança de localizador via solução de BUG ***//

    it('Validar Cadastro de Produto Importação', () => {
        cy.acessarBackOffice('Cadastro de Produto')
        cy.pesquisarItem(cadastroProduto)
        cy.excluirItem('Produto', 'nomeProduto', cadastroProduto.nomeProduto)
        cy.acessarCadastrar('Cadastro de Produto', 'Cadastrar Produto', 'Cadastro de Produto')
        cy.preencherCadastroProduto(cadastroProduto, cadastroProduto.tipoImport, cadastroProduto.Hig, cadastroProduto.Condicionador, cadastroProduto.Cadastrar)
        cy.contains("Produto Cadastrado com Sucesso.").should('be.visible')
    })

    it('Validar Cadastro de Produto Exportação', () => {
        cy.acessarBackOffice('Cadastro de Produto')
        cy.pesquisarItem(cadastroProduto)
        cy.excluirItem('Produto', 'nomeProduto', cadastroProduto.nomeProduto)
        cy.acessarCadastrar('Cadastro de Produto', 'Cadastrar Produto', 'Cadastro de Produto')
        cy.preencherCadastroProduto(cadastroProduto, cadastroProduto.tipoExport, cadastroProduto.Def, cadastroProduto.Muni, cadastroProduto.Cadastrar)
        cy.contains("Produto Cadastrado com Sucesso.").should('be.visible')
    })

    it('Validar Excluir Produto', () => {
        cy.acessarBackOffice('Cadastro de Produto')
        cy.pesquisarItem(cadastroProduto)
        cy.excluirItem('Produto', 'nomeProduto', cadastroProduto.nomeProduto)
        cy.acessarCadastrar('Cadastro de Produto', 'Cadastrar Produto', 'Cadastro de Produto')
        cy.preencherCadastroProduto(cadastroProduto, cadastroProduto.tipoImport, cadastroProduto.Def, cadastroProduto.Muni, cadastroProduto.Cadastrar)
        cy.pesquisarItem(cadastroProduto)
        cy.excluirItem('Produto', 'nomeProduto', cadastroProduto.nomeProduto)
        cy.contains("Produto Excluído com Sucesso.").should('be.visible')
    })

     it('Validar Editar Produto', () => {
        cy.acessarBackOffice('Cadastro de Produto')
        cy.pesquisarItem(cadastroProduto)
        cy.excluirItem('Produto', 'nomeProduto', cadastroProduto.nomeProduto)
        cy.acessarCadastrar('Cadastro de Produto', 'Cadastrar Produto', 'Cadastro de Produto')
        cy.preencherCadastroProduto(cadastroProduto, cadastroProduto.tipoImport, cadastroProduto.Def, cadastroProduto.Muni, cadastroProduto.Cadastrar)
        cy.editarProduto(cadastroProduto)
        cy.preencherCadastroProduto(cadastroProduto, cadastroProduto.tipoImport, cadastroProduto.Hig, cadastroProduto.Condicionador, cadastroProduto.Editar)
        cy.contains("Produto Atualizado com Sucesso.").should('be.visible')
    })
 })