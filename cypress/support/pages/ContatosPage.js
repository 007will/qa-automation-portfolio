import BasePage from './BasePage';

/**
 * ContatosPage - Page Object para tela de Contatos
 */
class ContatosPage extends BasePage {
  // Seletores
  selectors = {
    tituloPagina: 'h1',
    btnAdicionar: 'button:contains("Adicionar Contato")',
    campoNome: 'input[name="nome"], #nome',
    campoSobrenome: 'input[name="sobrenome"], #sobrenome',
    campoEmail: 'input[name="email"], #email',
    campoTelefone: 'input[name="telefone"], #telefone',
    campoCelular: 'input[name="celular"], #celular',
    campoCPF: 'input[name="cpf"], #cpf',
    campoDataNascimento: 'input[name="dataNascimento"], #dataNascimento',
    selectArea: 'select[name="area"], #area',
    uploadFoto: 'input[type="file"]',
    listaContatos: '.contatos-lista, [data-testid="contatos-list"]',
    btnExcluir: 'button:contains("Excluir")',
    mensagemVazia: 'text:contains("Nenhum contato cadastrado")',
  };

  /**
   * Acessa a página de Contatos
   */
  acessar() {
    this.acessarBackOffice('Contatos');
    this.waitForLoad();
  }

  /**
   * Valida layout da página de cadastro
   */
  validarLayoutCadastro() {
    this.shouldContainText('Contatos');
    this.shouldContainText('Cadastre contatos por área responsável para que possa atender as solicitações de usuários.');
    this.shouldContainText('Nome*');
    this.shouldContainText('Sobrenome*');
    this.shouldContainText('E-mail*');
    this.shouldContainText('Telefone');
    this.shouldContainText('Celular*');
    this.shouldContainText('Área Responsável*');
    this.shouldContainText('CPF*');
    this.shouldContainText('Data de Nascimento*');
    this.shouldContainText('Foto do Contato*');
    this.shouldContainText('Adicionar Contato');
    this.shouldContainText('Contatos Cadastrados');
  }

  /**
   * Preenche formulário de contato
   * @param {Object} dados - Dados do contato
   * @param {string} area - Área responsável
   * @param {string} cpf - CPF do contato
   * @param {string} acao - Ação (CadastroContato/Editar)
   */
  preencherFormulario(dados, area, cpf, acao) {
    cy.preencherContatos(dados, area, cpf, acao);
  }

  /**
   * Exclui contato por nome
   * @param {string} nomeContato - Nome do contato a excluir
   */
  excluir(nomeContato) {
    cy.excluirContato(nomeContato);
  }

  /**
   * Valida mensagem de sucesso no cadastro
   */
  validarCadastroSucesso() {
    this.validarModalSucesso(
      'Contato Cadastrado Com Sucesso!',
      'Seu contato está salvo e vai aparecer em sua lista.'
    );
  }

  /**
   * Valida que contato aparece na lista
   * @param {string} nomeContato - Nome do contato a validar
   */
  validarContatoNaLista(nomeContato) {
    cy.contains(nomeContato).should('be.visible');
    cy.contains('Contatos Cadastrados').should('be.visible');
  }

  /**
   * Valida mensagem de lista vazia
   */
  validarListaVazia() {
    this.shouldContainText('Nenhum contato cadastrado.');
    this.shouldContainText('Utilize o formulário acima para adicionar um novo contato.');
  }

  /**
   * Edita contato existente via modal
   * @param {Object} dados - Dados do contato
   */
  editarContato(dados) {
    cy.preencherCampoModal(dados);
  }

  /**
   * Fluxo completo: limpar, cadastrar e validar contato
   * @param {Object} dados - Dados do contato
   * @param {string} area - Área responsável
   * @param {string} cpf - CPF único
   */
  cadastrarNovo(dados, area, cpf) {
    this.acessar();
    this.shouldContainText('Contatos');
    cy.wait(3000); // Aguarda carregamento dos contatos existentes
    this.excluir(dados.nomeContato);
    this.preencherFormulario(dados, area, cpf, dados.CadastroContato);
    this.validarCadastroSucesso();
    this.validarContatoNaLista(dados.nomeContato);
  }

  /**
   * Fluxo completo: validar layout e campos vazios
   */
  validarLayoutCompleto(dados) {
    this.acessar();
    this.validarLayoutCadastro();
    this.excluir(dados.nomeContato);
    cy.wait(2000);
    this.excluir(dados.nomeContato);
    this.validarListaVazia();
  }
}

export default new ContatosPage();
