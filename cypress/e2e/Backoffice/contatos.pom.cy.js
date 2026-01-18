import { ContatosPage } from '../../support/pages';
import { gerarCpfUnico } from '../../support/utils';

const usuarios = [
    {
      perfil: 'Importação + Exportação',
      login: Cypress.env('produto_import_export_login'),
    },
    // {
    //   perfil: 'Importação',
    //   login: Cypress.env('produto_import_login'),
    // },
    // {
    //   perfil: 'Exportação',
    //   login: Cypress.env('produto_export_login'),
    // },
    // {
    //   perfil: 'Negócio',
    //   login: Cypress.env('negocio_login'),
    // },
    // {
    //   perfil: 'Serviço',
    //   login: Cypress.env('servico_login'),
    // }
  ];  

  usuarios.forEach((usuario) => {

    describe(`Funcionalidade Contatos - ${usuario.perfil}`, () => {
  
      beforeEach(() => {
        ContatosPage.login(usuario.login, Cypress.env('password'));
      });
   
    const { cadastroContatos } = require('../../dataTest/data_' + Cypress.env('ambiente') + '.js');

    it('Validar Layout da Página de Cadastro de Contatos - SPCC', () => {        
        ContatosPage.validarLayoutCompleto(cadastroContatos);          
    })

    it('Validar Exclusão de Contato se Houver - SPCC', () => {        
        ContatosPage.acessar();
        ContatosPage.shouldContainText('Contatos');
        ContatosPage.shouldContainText('Cadastre contatos por área responsável para que possa atender as solicitações de usuários.');
        cy.wait(3000);
        ContatosPage.excluir(cadastroContatos.nomeContato);
        cadastroContatos.CPF = gerarCpfUnico();                        
        ContatosPage.preencherFormulario(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF, cadastroContatos.CadastroContato);
        ContatosPage.validarCadastroSucesso();
        ContatosPage.validarContatoNaLista(cadastroContatos.nomeContato);
        ContatosPage.excluir(cadastroContatos.nomeContato);               
    })

    // Casos de teste parametrizados para cadastro de contatos por área
    const casosCadastroArea = [
        { area: 'areaImport', descricao: 'Importação' },
        { area: 'areaExport', descricao: 'Exportação' },
        { area: 'areaServico', descricao: 'Serviços' },
        { area: 'areaEvento', descricao: 'Eventos' }
    ];

    casosCadastroArea.forEach(caso => {
        it(`Validar Cadastro de Contato ${caso.descricao} - SPCC`, () => {
            cadastroContatos.CPF = gerarCpfUnico();
            ContatosPage.cadastrarNovo(cadastroContatos, cadastroContatos[caso.area], cadastroContatos.CPF);
            ContatosPage.excluir(cadastroContatos.nomeContato);
        });
    });

    it('Validar Editar Contato - SPCC', () => {
        cadastroContatos.CPF = gerarCpfUnico();
        ContatosPage.cadastrarNovo(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF);
        ContatosPage.editarContato(cadastroContatos);
        ContatosPage.excluir(cadastroContatos.nomeContato);
    })

    it('Validar Excluir Contato - SPCC', () => {
        cadastroContatos.CPF = gerarCpfUnico();
        ContatosPage.cadastrarNovo(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF);
        ContatosPage.excluir(cadastroContatos.nomeContato);
        ContatosPage.validarModalSucesso('Contato Removido Com Sucesso!', 'Seu contato foi removido da sua lista.');
    })

    it('Validar Mensagem de Campos Obrigatórios', () => {
        ContatosPage.acessar();
        cy.contains('button', 'Adicionar Contato').click();
        cy.contains('Nome é obrigatório.').should('be.visible');
        cy.contains('Sobrenome é obrigatório.').should('be.visible');
        cy.contains('E-mail é obrigatório.').should('be.visible');
        cy.contains('Área Responsável é obrigatório.').should('be.visible');
        cy.contains('CPF é obrigatório.').should('be.visible');
    })

    it('Validar Cadastro de Contato Duplicado', () => {
        cadastroContatos.CPF = gerarCpfUnico();
        ContatosPage.cadastrarNovo(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF);
        // Tenta cadastrar com mesmo CPF
        ContatosPage.preencherFormulario(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF, cadastroContatos.CadastroContato);
        cy.contains('CPF já cadastrado').should('be.visible');
        ContatosPage.excluir(cadastroContatos.nomeContato);
    })

});
});
