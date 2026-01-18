const { faker } = require('@faker-js/faker');

describe('Funcionalidade Eventos', () => {
  beforeEach(() => cy.login(Cypress.env('admin_login'), Cypress.env('password_adm')));

  const { cadastroEventos } = require('/cypress/dataTest/data_' + Cypress.env('ambiente') + '.js');

  it('Validar Cadastro de Eventos SPCC', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoSPCC, cadastroEventos.Presencial, cadastroEventos.SPCC, cadastroEventos.Moda, cadastroEventos.Feiras, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Cadastro de Eventos BS', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoSPCC, cadastroEventos.Presencial, cadastroEventos.BS, cadastroEventos.Commodities, cadastroEventos.Negocios, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Cadastro de Eventos CECIEx', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoSPCC, cadastroEventos.Presencial, cadastroEventos.CECIEx, cadastroEventos.Veiculos, cadastroEventos.Missao, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Cadastro de Evento Online', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoSPCC, cadastroEventos.Online, cadastroEventos.SPCC, cadastroEventos.Moda, cadastroEventos.Feiras, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Cadastro de Eventos Híbrido', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoSPCC, cadastroEventos.Hibrido, cadastroEventos.BS, cadastroEventos.Moda, cadastroEventos.Feiras, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Cadastro de Evento Parceiro', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoParceiro, cadastroEventos.Hibrido, cadastroEventos.SPCC, cadastroEventos.Veiculos, cadastroEventos.Negocios, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Cadastro de Evento Parceiro', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoParceiro, cadastroEventos.Hibrido, cadastroEventos.CECIEx, cadastroEventos.Moda, cadastroEventos.Missao, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
  })

  it('Validar Excluir Eventos SPCC', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.acessarCadastrar('Eventos', 'Cadastrar Evento', 'Cadastro de Evento')
    cy.preencherCadastroEventos(cadastroEventos, cadastroEventos.EventoSPCC, cadastroEventos.Presencial, cadastroEventos.SPCC, cadastroEventos.Moda, cadastroEventos.Feiras, cadastroEventos.Brasil)
    cy.contains("Evento Cadastrado com Sucesso.").should('be.visible')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
  })

  //Adaptação para criar excluir eventos terceiros
  it('Limpar massas Teste Eventos Próprios', () => {
    cy.acessarBackOffice('Eventos')
    cy.abrirMenuItemExcluir('Brasil', 'Eventos')
    cy.clicarExcluir()
    cy.confirmarSim()
    cy.waitForPageLoad()

  })

//   it.only('Limpar massas de Todos os Eventos Terceiros', () => {
//     cy.acessarBackOffice('Eventos')
//   cy.selecionarAbaEventos('Eventos Terceiros')
//   cy.excluirTodosItens('Eventos', 'Brasil')
//       cy.abrirMenuItemExcluir('Brasil', 'Eventos')
//     cy.clicarExcluir()
//     cy.confirmarSim()
//     cy.wait(1000)
//  })

})