const { faker } = require('@faker-js/faker');
const { gerarCpfUnico } = require('../../support/utils');
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
        cy.login(usuario.login, Cypress.env('password'));
      });
   

    // Debug: log quando o spec é carregado (para detectar carregamentos duplicados)
    console.log('Loaded contatos.spec for ambiente:', Cypress.env('ambiente'));
    const { cadastroContatos } = require('../../dataTest/data_' + Cypress.env('ambiente') + '.js');

    it('Validar Layout da Página de Cadastro de Contatos - SPCC', () => {        
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cy.contains("Nome*").should('be.visible')
        cy.contains("Sobrenome*").should('be.visible')
        cy.contains("E-mail*").should('be.visible')
        cy.contains("Telefone").should('be.visible')
        cy.contains("Celular*").should('be.visible')
        cy.contains("Área Responsável*").should('be.visible')
        cy.contains("CPF*").should('be.visible')
        cy.contains("Data de Nascimento*").should('be.visible')
        cy.contains("Foto do Contato*").should('be.visible')
        cy.contains('Adicionar Contato').should('be.visible')
        cy.contains("Contatos Cadastrados").should('be.visible')
        cy.excluirContato(cadastroContatos.nomeContato)
        cy.wait(2000)
        cy.excluirContato(cadastroContatos.nomeContato)
        cy.contains("Nenhum contato cadastrado.").should('be.visible')
        cy.contains("Utilize o formulário acima para adicionar um novo contato.").should('be.visible')               
    })

    it('Validar Exclusão de Contato se Houver - SPCC', () => {        
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cy.wait(3000)
        cy.excluirContato(cadastroContatos.nomeContato)
        cadastroContatos.CPF = gerarCpfUnico()                        
        cy.preencherContatos(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF, cadastroContatos.CadastroContato)
        cy.validarModalSucesso("Contato Cadastrado Com Sucesso!", "Seu contato está salvo e vai aparecer em sua lista.")
        cy.contains("Contato de Teste da AUTOMAÇÃO").should('be.visible')
        cy.contains('Contatos Cadastrados').should('be.visible')
        cy.excluirContato(cadastroContatos.nomeContato)               
    })

    it('Validar Cadastro de Contato Importação - SPCC', () => {
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cy.wait(3000)
        cy.excluirContato(cadastroContatos.nomeContato)        
        cadastroContatos.CPF = gerarCpfUnico()                        
        cy.preencherContatos(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF, cadastroContatos.CadastroContato)
        cy.validarModalSucesso("Contato Cadastrado Com Sucesso!", "Seu contato está salvo e vai aparecer em sua lista.")
        cy.contains("Contato de Teste da AUTOMAÇÃO").should('be.visible')
        cy.contains('Contatos Cadastrados').should('be.visible')
        cy.excluirContato(cadastroContatos.nomeContato)
    })

    it('Validar Cadastro de Contato Exportação - SPCC', () => {
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cy.wait(3000)
        cy.excluirContato(cadastroContatos.nomeContato)
        cadastroContatos.CPF = gerarCpfUnico()                
        cy.preencherContatos(cadastroContatos, cadastroContatos.areaExport, cadastroContatos.CPF, cadastroContatos.CadastroContato)
        cy.validarModalSucesso("Contato Cadastrado Com Sucesso!", "Seu contato está salvo e vai aparecer em sua lista.")
        cy.contains("Contato de Teste da AUTOMAÇÃO").should('be.visible')
        cy.contains('Contatos Cadastrados').should('be.visible')
        cy.excluirContato(cadastroContatos.nomeContato)
    })

    it('Validar Cadastro de Contato Importação e Exportação - SPCC', () => {
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cy.wait(3000)
        cy.excluirContato(cadastroContatos.nomeContato)
        cadastroContatos.CPF = gerarCpfUnico()                
        cy.preencherContatos(cadastroContatos, cadastroContatos.areaImportExport, cadastroContatos.CPF, cadastroContatos.CadastroContato)
        cy.validarModalSucesso("Contato Cadastrado Com Sucesso!", "Seu contato está salvo e vai aparecer em sua lista.")
        cy.contains("Contato de Teste da AUTOMAÇÃO").should('be.visible')
        cy.contains('Contatos Cadastrados').should('be.visible')
        cy.excluirContato(cadastroContatos.nomeContato)
    })

    it('Validar Contato com CPF já cadastrado - SPCC', () => {
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cadastroContatos.CPF = gerarCpfUnico()                
        cy.preencherContatos(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF, cadastroContatos.CadastroContato)
        cy.validarModalSucesso("Contato Cadastrado Com Sucesso!", "Seu contato está salvo e vai aparecer em sua lista.")
        cy.contains("Contato de Teste da AUTOMAÇÃO").should('be.visible')
        cy.contains('Contatos Cadastrados').should('be.visible')
        cadastroContatos.CPF = gerarCpfUnico()                
        cy.preencherContatos(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CPF, cadastroContatos.CadastroContato)
        cy.contains('Este contato já existe').should('be.visible')
        cy.contains('Contatos Cadastrados').should('be.visible')
        cy.contains('Verifique se o CPF e/ou E-mail já não estão cadastrados.').should('be.visible')
        cy.wait(3000)
        cy.excluirContato(cadastroContatos.nomeContato)
        cy.contains('Nenhum contato cadastrado.').should('be.visible')
        cy.contains('Utilize o formulário acima para adicionar um novo contato.').should('be.visible')
    })
    
    it('Validar Campos Obrigatórios - SPCC', () => {
        cy.acessarBackOffice('Contatos')
        cy.contains("Contatos").should('be.visible')
        cy.contains("Cadastre contatos por área responsável para que possa atender as solicitações de usuários.")
        cy.excluirContato(cadastroContatos.nomeContato)
        cy.wait(2000)
        cy.excluirContato(cadastroContatos.nomeContato)
        cy.contains("Nenhum contato cadastrado.").should('be.visible')
        cy.contains("Utilize o formulário acima para adicionar um novo contato.").should('be.visible')
        cy.contains('Adicionar Contato').should('be.visible').click()

        cy.validarCamposObrigatorios({
            modalMessages: ['Alguns dados são obrigatórios.', 'Tente salvar novamente após preenchê-los.'],
            fieldMessages: [
                'Nome é obrigatório',
                'Sobrenome é obrigatório',
                'E-mail é obrigatório',
                'Celular é obrigatório',
                'Área Responsável é obrigatória',
                'O CPF é obrigatório',
                'Data de nascimento é obrigatória',
                'Foto é obrigatória'
            ]
        });
    }) 

    //Área de editar contato possui localizadores duplicados, dificultando a automação
    // Celular não vaidando, corrigir depois
    // it('Validar Editar Contato em Modal SPCC', () => {
    //     cy.acessarBackOffice('Contatos')
    //     cy.waitForPageLoad()
    //     cy.excluirContato(cadastroContatos.nomeContato)
    //     cadastroContatos.CPF = gerarCpfUnico()
    //     cy.preencherContatos(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.CadastroContato)
    //     cy.validarModalSucesso("Contato Cadastrado Com Sucesso!", "Seu contato está salvo e vai aparecer em sua lista.")
    //     cy.contains("Contato de Teste da AUTOMAÇÃO").should('be.visible')
    //     cy.contains('Contatos Cadastrados').should('be.visible')
    //     cy.waitForPageLoad()
    //     cy.editarContato(cadastroContatos, cadastroContatos.areaImport, cadastroContatos.EditarContato)
    //     cy.contains('Foto do Contato').should('be.visible')
    //     cy.preencherCampoModal(cadastroContatos, cadastroContatos.areaEmport, cadastroContatos.CadastroContato)
    //     cy.contains('button', 'Salvar').should('be.visible').click()
    //     cy.validarModalSucesso("Contato Editado Com Sucesso!", "Seu contato está editado e as modificações foram aplicadas.")
    //     //cy.contains('Contato Editado Com Sucesso!').should('be.visible')
    //     cy.contains('button', 'OK').should('be.visible').click()
    // })

})
});