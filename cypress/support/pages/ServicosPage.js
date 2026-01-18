import BasePage from './BasePage';

/**
 * ServicosPage - Page Object para tela de Cadastro de Serviços
 */
class ServicosPage extends BasePage {
  // Seletores
  selectors = {
    tituloPagina: 'h1',
    btnCadastrar: 'button:contains("Cadastrar")',
    campoBusca: 'input[placeholder*="Pesquisar"]',
    selectCategoria: 'select[name="categoria"]',
    selectSubcategoria: 'select[name="subcategoria"]',
    grid: '[data-testid="grid"], .grid-container, table',
    statusCheckbox: 'input[type="checkbox"]',
    btnExcluir: 'button:contains("Excluir")',
    labelOrdenar: 'label:contains("Ordenar por")',
    labelExibir: 'label:contains("Exibir")',
  };

  /**
   * Acessa a página de Cadastro de Serviços
   */
  acessar() {
    this.acessarBackOffice('Cadastro de Serviço');
    this.waitForLoad();
  }

  /**
   * Acessa o formulário de cadastro
   */
  acessarCadastro() {
    cy.acessarCadastrar(
      'Cadastro de Serviço',
      'Cadastrar Serviço',
      'Cadastro de Serviço'
    );
  }

  /**
   * Pesquisa serviço por dados
   * @param {Object} dados - Dados do serviço
   */
  pesquisar(dados) {
    cy.pesquisarItem(dados);
  }

  /**
   * Preenche formulário de serviço
   * @param {Object} dados - Dados do serviço
   * @param {string} categoria - Categoria selecionada
   * @param {string} subcategoria - Subcategoria selecionada
   * @param {string} acao - Ação (Cadastrar/Editar)
   */
  preencherFormulario(dados, categoria, subcategoria, acao) {
    cy.preencherCadastroServico(dados, categoria, subcategoria, acao);
  }

  /**
   * Exclui serviço
   * @param {Object} dados - Dados do serviço
   */
  excluir(dados) {
    cy.excluirItem('Serviço', 'nomeServico', dados.nomeServico);
  }

  /**
   * Edita serviço existente
   * @param {Object} dados - Dados do serviço
   */
  editar(dados) {
    cy.editarServico(dados);
  }

  /**
   * Altera status (ativa/desativa) do serviço
   * @param {Object} dados - Dados do serviço
   * @param {boolean} ativar - true para ativar, false para desativar
   */
  alterarStatus(dados, ativar) {
    cy.alterarStatus(dados, ativar);
  }

  /**
   * Visualiza empresa na grid
   * @param {string} nomeEmpresa - Nome da empresa
   */
  visualizarEmpresa(nomeEmpresa) {
    cy.visualizarEmpresa(nomeEmpresa);
  }

  /**
   * Valida mensagem de sucesso no cadastro
   */
  validarCadastroSucesso() {
    cy.contains('Serviço Cadastrado com Sucesso.').should('be.visible');
  }

  /**
   * Valida mensagem de sucesso na edição
   */
  validarEdicaoSucesso() {
    cy.contains('Serviço Atualizado com Sucesso.').should('be.visible');
  }

  /**
   * Valida mensagem de sucesso na exclusão
   */
  validarExclusaoSucesso() {
    cy.contains('Serviço Excluído com Sucesso.').should('be.visible');
  }

  /**
   * Valida presença do filtro de ordenação
   */
  validarFiltroOrdenacao() {
    cy.contains('label', 'Ordenar por').should('be.visible');
  }

  /**
   * Valida presença do filtro de exibição por página
   */
  validarFiltroExibicao() {
    cy.contains('label', 'Exibir').should('be.visible');
  }

  /**
   * Fluxo completo: excluir se existir, cadastrar e validar
   * @param {Object} dados - Dados do serviço
   * @param {string} categoria - Categoria
   * @param {string} subcategoria - Subcategoria
   */
  cadastrarNovo(dados, categoria, subcategoria) {
    this.acessar();
    this.pesquisar(dados);
    this.excluir(dados);
    this.acessarCadastro();
    this.preencherFormulario(dados, categoria, subcategoria, dados.Cadastrar);
    this.validarCadastroSucesso();
  }

  /**
   * Fluxo completo: editar serviço existente
   * @param {Object} dados - Dados do serviço
   * @param {string} nomeEmpresa - Nome da empresa para visualizar
   * @param {string} categoria - Nova categoria
   * @param {string} subcategoria - Nova subcategoria
   */
  editarExistente(dados, nomeEmpresa, categoria, subcategoria) {
    this.pesquisar(dados);
    this.visualizarEmpresa(nomeEmpresa);
    this.editar(dados);
    this.preencherFormulario(dados, categoria, subcategoria, dados.Editar);
    this.validarEdicaoSucesso();
  }

  /**
   * Fluxo completo: desativar e reativar serviço
   * @param {Object} dados - Dados do serviço
   * @param {string} categoria - Categoria
   * @param {string} subcategoria - Subcategoria
   */
  testarDesativarReativar(dados, categoria, subcategoria) {
    this.acessar();
    this.pesquisar(dados);
    this.excluir(dados);
    this.acessarCadastro();
    this.preencherFormulario(dados, categoria, subcategoria, dados.Cadastrar);
    this.alterarStatus(dados, false);
    this.waitForLoad();
    this.alterarStatus(dados, true);
  }
}

export default new ServicosPage();
