const { faker } = require('@faker-js/faker');

describe('Funcionalidade Notícias', () => {
    beforeEach(() => cy.login(Cypress.env('admin_login'), Cypress.env('password_adm')));

    const { cadastroNoticias } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');

    it('Validar Cadastro de Notícias SPCC', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaHoje }, cadastroNoticias.SPCC, cadastroNoticias.CadastroNews)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 10000 }).should('be.visible')
        cy.waitForPageLoad()
    })

    it('Validar Cadastro de Notícias Brazilian Suppliers', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaPassada }, cadastroNoticias.BS, cadastroNoticias.CadastroNews)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 10000 }).should('be.visible')
    })

    it('Validar Cadastro de Notícias CECIEx', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaFutura }, cadastroNoticias.CECIEx, cadastroNoticias.CadastroNews)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 10000 }).should('be.visible')
    })

    it('Validar Excluir Notícias', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaHoje }, cadastroNoticias.SPCC, cadastroNoticias.CadastroNews)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.contains("Notícia Excluída com Sucesso", { timeout: 10000 }).should('be.visible')
    })

    it('Validar Editar Notícias', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaPassada }, cadastroNoticias.SPCC, cadastroNoticias.CadastroNews)
        cy.editarNoticia(cadastroNoticias)
        cy.get('.chakra-switch__track[data-checked]').should('exist') // Verifica se o switch está ativado
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaFutura }, cadastroNoticias.BS, cadastroNoticias.EdicaoNews)
        cy.contains("Notícia Editada com Sucesso", { timeout: 10000 }).should('be.visible')
    })

    it('Validar Campo Obrigatório de Notícias', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.get('[type="date"]').clear()
        cy.contains('button', "Cadastrar Notícia").click()

        cy.validarCamposObrigatorios({
            modalMessages: ['Alguns dados são obrigatórios.', 'Tente salvar novamente após preenchê-los.'],
            fieldSelectors: [
                { selector: '[datatype="message-title"]', errorMessage: 'O título da notícia é obrigatório' },
                { selector: '[datatype="message-createdAt"]', errorMessage: 'A data é obrigatória' },
                { selector: '[datatype="error-message-picture"]', errorMessage: 'Foto é obrigatória' },
                { selector: '[datatype="error-message-description"]', errorMessage: 'A descrição da notícia é obrigatória' },
                { selector: '[datatype="error-message-entity"]', errorMessage: 'Selecione pelo menos uma entidade.' }
            ]
        });

        // Preenche e valida o cadastro (fora da verificação de mensagens)
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaFutura }, cadastroNoticias.CECIEx, cadastroNoticias.CadastroNews)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 10000 }).should('be.visible')
    })

    it('Validar Pesquisar Notícia', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaHoje }, cadastroNoticias.SPCC, cadastroNoticias.CadastroNews)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 10000 }).should('be.visible')
        cy.pesquisarItem(cadastroNoticias)
    });

    it('Validar Filtro por Ordenação', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaHoje }, cadastroNoticias.CECIEx, cadastroNoticias.CadastroNews)
        cy.contains('p.chakra-text', 'Ordenar por').should('be.visible');
        cy.contains('button', 'Mais Recentes').click()
        cy.contains('button', 'A - Z').click()
        cy.wait(2000)
    });

    it('Validar Filtro por Entidade', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaFutura }, cadastroNoticias.BS, cadastroNoticias.CadastroNews)
        cy.contains('p.chakra-text', 'Entidade').should('be.visible');
        cy.contains('button', 'Selecione').click()
        cy.contains('span.chakra-checkbox__label', 'BR Suppliers').click();

    });

    it('Validar Filtro por Data', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaHoje }, cadastroNoticias.CECIEx, cadastroNoticias.CadastroNews)
        cy.contains('p.chakra-text', 'Data de Publicação').should('be.visible');
        cy.get('input[datatype="input-date"][type="date"]').should('be.visible').and('have.attr', 'placeholder', 'Escolha uma data');
        cy.preencherDataPublicacao(7)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 5000 }).should('be.visible')
    });

    it('Validar Cadastro de Notícia SPCC com Data Passada', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.preencherNoticia({ ...cadastroNoticias, dataNoticia: cadastroNoticias.dataNoticiaPassada }, cadastroNoticias.SPCC, cadastroNoticias.CadastroNews)
        cy.contains("Notícia Cadastrada com Sucesso", { timeout: 5000 }).should('be.visible')
    })

    it('Validar Cadastro de Notícia Imagem Inválida', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.get('[data-testid="AddRoundedIcon"]').click();
        cy.get('[datatype="multiPhotoUploader"]').selectFile('cypress/fixtures/formatogif.gif', { force: true })
        cy.contains("Formato de arquivo inválido. Apenas arquivos JPG e PNG são permitidos.", { timeout: 5000 }).should('be.visible')
    })

    it('Validar Cadastro de Notícia Imagem Maior que 2MB', () => {
        cy.acessarBackOffice('Notícias')
        cy.pesquisarItem(cadastroNoticias)
        cy.excluirItem('Notícia', 'tituloNoticia', cadastroNoticias.tituloNoticia)
        cy.acessarCadastrar('Cadastro de Notícias', 'Cadastrar Notícia', 'Cadastro de Notícias')
        cy.get('[data-testid="AddRoundedIcon"]').click();
        cy.get('[datatype="multiPhotoUploader"]').selectFile('cypress/fixtures/imagemgrande.jpeg', { force: true })
        cy.contains("O arquivo é muito grande. O tamanho máximo é 2 MB.", { timeout: 10000 }).should('be.visible')
    })

});