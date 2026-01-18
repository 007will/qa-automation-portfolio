const usuarios = [
    { nome: 'Usuário Comum', login: Cypress.env('negocio_login'), senha: Cypress.env('password') }
];

usuarios.forEach(usuario => {
    describe(`Funcionalidade Oportunidades - ${usuario.nome}`, () => {

        beforeEach(() => {
            cy.login(usuario.login, usuario.senha);
        });

        const { cadastroOportunidade } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');

        it('Validar Cadastro de Oportunidades SPCC Importação', () => {
            cy.acessarBackOffice('Oportunidade')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.PetCare, cadastroOportunidade.Racoes, cadastroOportunidade.tipoImportacao, cadastroOportunidade.SPCC, cadastroOportunidade.Salvar)
            cy.contains("Oportunidade Cadastrada com Sucesso.", { timeout: 16000 }).should('be.visible')
        })

        it('Validar Cadastro de Oportunidades SPCC Exportação', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Moda, cadastroOportunidade.Calcados, cadastroOportunidade.tipoExportacao, cadastroOportunidade.SPCC, cadastroOportunidade.Salvar)
            cy.contains("Oportunidade Cadastrada com Sucesso.", { timeout: 16000 }).should('be.visible')
        })

        it('Validar Cadastro de Oportunidades CECIEx Exportação', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.Commodities, cadastroOportunidade.Fertilizantes, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.contains("Oportunidade Cadastrada com Sucesso.", { timeout: 16000 }).should('be.visible')
        })

        it('Validar Cadastro de Oportunidades CECIEx Importação', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Defesa, cadastroOportunidade.Armas, cadastroOportunidade.tipoImportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.contains("Oportunidade Cadastrada com Sucesso.", { timeout: 16000 }).should('be.visible')
        })

        it('Validar Excluir Oportunidades', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Defesa, cadastroOportunidade.Armas, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.contains("Oportunidade Cadastrada com Sucesso.", { timeout: 16000 }).should('be.visible')
            cy.waitForPageLoad() // Para sumir o modal de cadastro com sucesso
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.contains("Oportunidade excluída com sucesso!", { timeout: 16000 }).should('be.visible')
            cy.waitForPageLoad() // Para dar tempo de validar o modal de exclusão antes da próxima ação
        })

        it('Validar Editar Oportunidades', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Defesa, cadastroOportunidade.Armas, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.editarOportunidade(cadastroOportunidade)
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.Commodities, cadastroOportunidade.Fertilizantes, cadastroOportunidade.tipoImportacao, cadastroOportunidade.SPCC, cadastroOportunidade.Editar)
            cy.contains("Edição Salva com Sucesso.", { timeout: 16000 }).should('be.visible')
        })

        it('Validar Destivar Oportunidade', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.Commodities, cadastroOportunidade.Fertilizantes, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.alterarStatus(cadastroOportunidade, false)

        })

        it('Validar Ativar Oportunidade', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.PetCare, cadastroOportunidade.Racoes, cadastroOportunidade.tipoImportacao, cadastroOportunidade.SPCC, cadastroOportunidade.Salvar)
            cy.alterarStatus(cadastroOportunidade, true)
        })

        it('Validar Pesquisar Oportunidade', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Defesa, cadastroOportunidade.Armas, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.pesquisarItem(cadastroOportunidade)
        });

        it('Validar Filtro de Ordenação', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.PetCare, cadastroOportunidade.Racoes, cadastroOportunidade.tipoImportacao, cadastroOportunidade.SPCC, cadastroOportunidade.Salvar)
            cy.contains('p.chakra-text', 'Ordenar por').should('be.visible')
            cy.contains('button', 'Mais Recentes').click()
            cy.contains('button', 'A - Z').click()
        });

        it('Validar layout da tela de Oportunidade de Negócios', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Brasil, cadastroOportunidade.PetCare, cadastroOportunidade.Racoes, cadastroOportunidade.tipoImportacao, cadastroOportunidade.SPCC, cadastroOportunidade.Salvar)
            cy.validarLabel('Oportunidade de Negócios')
            cy.contains('button', 'Cadastrar Oportunidade').should('be.visible')
            cy.validarLabel('Oportunidades Cadastradas')
            cy.pesquisarItem(cadastroOportunidade)
            cy.validarLabel('Data de Cadastro')
            //cy.validarLabel('Nome da Empresa')//Nome da empresa é bloqueado no usuário
            cy.validarLabel('Categoria')
            cy.validarLabel('Tipo de Operação')
            cy.validarLabel('Ordenar por')
            cy.get('p[datatype="pagination-number-1"]').should('be.visible').and('have.text', '1')
        });

        it('Validar e-mail com formato incorreto', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.get('[data-type="input-contactEmail"]').clear().type('emailinválido@com.br').blur()
            cy.contains('E-mail inválido')
        });

        it('Validar que Início não pode ser menor que a Data de Atual', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.get('[name="startDate"]').click().type(cadastroOportunidade.dataPassada)
            cy.contains('button', cadastroOportunidade.Salvar).click()
            cy.validarMensagemErroData('Início', 'A data de início deve ser após a data atual')
        });

        it('Validar que Data Final não pode ser menor que a Data de Início', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.get('[name="endDate"]').click().type(cadastroOportunidade.dataPassada)
            cy.contains('button', cadastroOportunidade.Salvar).click()
            cy.validarMensagemErroData('final', 'A data final deve ser igual ou posterior à data inicial')
        });

        it('Validar Campo Obrigatório de Oportunidades', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.get('[type="date"]').clear()
            cy.get('[datatype="input-endDate"]').clear()
            cy.contains('button', "Cadastrar Oportunidade").click()
            cy.validarLayoutOportunidadeUsuario()
        });
    });
});

//    it.('Validar Filtro de Categoria', () => {
//         cy.acessarBackOffice('Oportunidades e Negócios')
//         cy.excluirOportunidade(cadastroOportunidade)
//         cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
//         cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Defesa, cadastroOportunidade.Armas, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
//         cy.wait(2000)
//         cy.selecionarFiltro(cadastroOportunidade.Empresa);
// cy.selecionarFiltro('Categoria', 'Defesa');
// cy.selecionarFiltro('Tipo de Operação', 'Exportação');
// cy.selecionarFiltro('Status', 'Ativo');

//});
