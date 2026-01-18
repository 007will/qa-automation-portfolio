import { OportunidadesPage } from '../../support/pages';

const usuarios = [
    { nome: 'Admin', login: Cypress.env('admin_login'), senha: Cypress.env('password_adm') },
];

usuarios.forEach(usuario => {
    describe(`Funcionalidade Oportunidades - ${usuario.nome}`, () => {

        beforeEach(() => {
            OportunidadesPage.login(usuario.login, usuario.senha);
        });

        const { cadastroOportunidade } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');

        // Casos de teste parametrizados para cadastro de oportunidades
        const casosCadastro = [
            {
                descricao: 'SPCC Importação',
                pais: 'Brasil',
                setor: 'PetCare',
                categoria: 'Racoes',
                tipo: 'tipoImportacao',
                entidade: 'SPCC'
            },
            {
                descricao: 'SPCC Exportação',
                pais: 'Argentina',
                setor: 'Moda',
                categoria: 'Calcados',
                tipo: 'tipoExportacao',
                entidade: 'SPCC'
            },
            {
                descricao: 'CECIEx Exportação',
                pais: 'Brasil',
                setor: 'Commodities',
                categoria: 'Fertilizantes',
                tipo: 'tipoExportacao',
                entidade: 'CECIEx'
            },
            {
                descricao: 'CECIEx Importação',
                pais: 'Argentina',
                setor: 'Defesa',
                categoria: 'Armas',
                tipo: 'tipoImportacao',
                entidade: 'CECIEx'
            }
        ];

        casosCadastro.forEach(caso => {
            it(`Validar Cadastro de Oportunidades ${caso.descricao}`, () => {
                OportunidadesPage.cadastrarNova(
                    cadastroOportunidade,
                    cadastroOportunidade[caso.pais],
                    cadastroOportunidade[caso.setor],
                    cadastroOportunidade[caso.categoria],
                    cadastroOportunidade[caso.tipo],
                    cadastroOportunidade[caso.entidade]
                );
                if (caso.descricao === 'SPCC Importação') {
                    OportunidadesPage.waitForLoad();
                }
            });
        });

        it('Validar Excluir Oportunidades', () => {
            OportunidadesPage.acessar();
            OportunidadesPage.pesquisar(cadastroOportunidade);
            OportunidadesPage.excluir(cadastroOportunidade);
            OportunidadesPage.acessarCadastro();
            OportunidadesPage.preencherFormulario(
                cadastroOportunidade,
                cadastroOportunidade.Argentina,
                cadastroOportunidade.Defesa,
                cadastroOportunidade.Armas,
                cadastroOportunidade.tipoExportacao,
                cadastroOportunidade.CECIEx,
                cadastroOportunidade.Salvar
            );
            OportunidadesPage.validarCadastroSucesso();
            OportunidadesPage.pesquisar(cadastroOportunidade);
            OportunidadesPage.excluir(cadastroOportunidade);
            OportunidadesPage.validarExclusaoSucesso();
        })

        it('Validar Editar Oportunidades', () => {
            OportunidadesPage.acessar();
            OportunidadesPage.pesquisar(cadastroOportunidade);
            OportunidadesPage.excluir(cadastroOportunidade);
            OportunidadesPage.acessarCadastro();
            OportunidadesPage.preencherFormulario(
                cadastroOportunidade,
                cadastroOportunidade.Argentina,
                cadastroOportunidade.Defesa,
                cadastroOportunidade.Armas,
                cadastroOportunidade.tipoExportacao,
                cadastroOportunidade.CECIEx,
                cadastroOportunidade.Salvar
            );
            OportunidadesPage.editarExistente(
                cadastroOportunidade,
                cadastroOportunidade.Brasil,
                cadastroOportunidade.Commodities,
                cadastroOportunidade.Fertilizantes,
                cadastroOportunidade.tipoImportacao,
                cadastroOportunidade.SPCC
            );
        })

        // Casos de teste parametrizados para alteração de status
        const casosStatus = [
            { acao: 'Desativar', status: false, pais: 'Brasil', setor: 'Commodities', categoria: 'Fertilizantes', tipo: 'tipoExportacao', entidade: 'CECIEx' },
            { acao: 'Ativar', status: true, pais: 'Brasil', setor: 'PetCare', categoria: 'Racoes', tipo: 'tipoImportacao', entidade: 'SPCC' }
        ];

        casosStatus.forEach(caso => {
            it(`Validar ${caso.acao} Oportunidade`, () => {
                OportunidadesPage.acessar();
                OportunidadesPage.pesquisar(cadastroOportunidade);
                OportunidadesPage.excluir(cadastroOportunidade);
                OportunidadesPage.acessarCadastro();
                OportunidadesPage.preencherFormulario(
                    cadastroOportunidade,
                    cadastroOportunidade[caso.pais],
                    cadastroOportunidade[caso.setor],
                    cadastroOportunidade[caso.categoria],
                    cadastroOportunidade[caso.tipo],
                    cadastroOportunidade[caso.entidade],
                    cadastroOportunidade.Salvar
                );
                OportunidadesPage.alterarStatus(cadastroOportunidade, caso.status);
            });
        });

        it('Validar Pesquisar Oportunidade', () => {
            OportunidadesPage.cadastrarNova(
                cadastroOportunidade,
                cadastroOportunidade.Argentina,
                cadastroOportunidade.Defesa,
                cadastroOportunidade.Armas,
                cadastroOportunidade.tipoExportacao,
                cadastroOportunidade.CECIEx
            );
            OportunidadesPage.pesquisar(cadastroOportunidade);
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
            cy.validarLabel('Nome da Empresa')
            cy.validarLabel('Categoria')
            cy.validarLabel('Tipo de Operação')
            cy.validarLabel('Ordenar por')
            cy.get('p[datatype="pagination-number-1"]').should('be.visible').and('have.text', '1')
        });

        it('Validar Visualização de Oportunidade de Terceiros', () => {
            cy.acessarBackOffice('Empresas')
            cy.visualizarEmpresa('AUTOMAÇÃO')
        });

        it('Validar e-mail com formato incorreto', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.get('[data-type="input-contactEmail"]').clear().type('emailinválido@com.br').blur()
            cy.contains('E-mail inválido')
        });

        // Casos de teste parametrizados para validação de datas
        const casosValidacaoData = [
            {
                campo: 'startDate',
                campoDescricao: 'Início',
                mensagem: 'A data de início deve ser após a data atual',
                descricao: 'Início não pode ser menor que a Data Atual'
            },
            {
                campo: 'endDate',
                campoDescricao: 'final',
                mensagem: 'A data final deve ser igual ou posterior à data inicial',
                descricao: 'Data Final não pode ser menor que a Data de Início'
            }
        ];

        casosValidacaoData.forEach(caso => {
            it(`Validar que ${caso.descricao}`, () => {
                cy.acessarBackOffice('Oportunidades e Negócios')
                cy.pesquisarItem(cadastroOportunidade)
                cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
                cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
                cy.get(`[name="${caso.campo}"]`).click().type(cadastroOportunidade.dataPassada)
                cy.contains('button', cadastroOportunidade.Salvar).click()
                cy.validarMensagemErroData(caso.campoDescricao, caso.mensagem)
            });
        });

        it('Validar Campo Obrigatório de Oportunidades', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.pesquisarItem(cadastroOportunidade)
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.get('[type="date"]').clear()
            cy.get('[datatype="input-endDate"]').clear()
            cy.contains('button', "Cadastrar Oportunidade").click()
            cy.validarLayoutOportunidadeAdmin()
            cy.contains('p', 'Alguns dados são obrigatórios.').should('be.visible')

        });
        it('Validar Filtro de Categoria', () => {
            cy.acessarBackOffice('Oportunidades e Negócios')
            cy.excluirItem('Oportunidade', 'nomeEmpresa', cadastroOportunidade.nomeEmpresa)
            cy.acessarCadastrar('Oportunidade de Negócios', 'Cadastrar Oportunidade', 'Cadastro de Oportunidade')
            cy.preencherOportunidadeNegocios(cadastroOportunidade, cadastroOportunidade.Argentina, cadastroOportunidade.Defesa, cadastroOportunidade.Armas, cadastroOportunidade.tipoExportacao, cadastroOportunidade.CECIEx, cadastroOportunidade.Salvar)
            cy.wait(2000)
            cy.selecionarFiltro('Nome da Empresa', cadastroOportunidade.nomeEmpresa);
            cy.selecionarFiltro('Categoria', 'Defesa');
            cy.selecionarFiltro('Tipo de Operação', 'Exportação');
            // Status não é um filtro, é um switch individual em cada linha da tabela

            //Aberto MELHORIA *10739 - para tratrar o ajuste de mensagens de erro nos campos duplicados
            //Melhoria aplicada, verificar na automação acima
        });
    });
});