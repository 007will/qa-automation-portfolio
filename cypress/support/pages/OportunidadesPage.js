import BasePage from './BasePage';

/**
 * OportunidadesPage - Page Object para tela de Oportunidades de Negócios
 */
class OportunidadesPage extends BasePage {
  // Seletores
  selectors = {
    tituloPagina: 'h1',
    btnCadastrar: 'button:contains("Cadastrar")',
    campoBusca: 'input[placeholder*="Pesquisar"]',
    grid: '[data-testid="grid"], .grid-container, table',
    statusCheckbox: 'input[type="checkbox"]',
    btnExcluir: 'button:contains("Excluir")',
    btnConfirmarExclusao: 'button:contains("Sim")',
    modalSucesso: '.modal-sucesso, [role="dialog"]',
    menuAcoes: '[aria-label="menu"], .menu-acoes',
  };

  /**
   * Acessa a página de Oportunidades
   */
  acessar() {
    this.acessarBackOffice('Oportunidades e Negócios');
    this.waitForLoad();
  }

  /**
   * Acessa o formulário de cadastro
   */
  acessarCadastro() {
    cy.acessarCadastrar(
      'Oportunidade de Negócios',
      'Cadastrar Oportunidade',
      'Cadastro de Oportunidade'
    );
  }

  /**
   * Pesquisa oportunidade por dados
   * @param {Object} dados - Dados da oportunidade para pesquisar
   */
  pesquisar(dados) {
    cy.pesquisarItem(dados);
  }

  /**
   * Preenche formulário de oportunidade
   * @param {Object} dados - Dados da oportunidade
   * @param {string} pais - País selecionado
   * @param {string} setor - Setor selecionado
   * @param {string} categoria - Categoria selecionada
   * @param {string} tipo - Tipo (Importação/Exportação)
   * @param {string} entidade - Entidade (SPCC/CECIEx)
   * @param {string} acao - Ação (Salvar/Editar)
   */
  preencherFormulario(dados, pais, setor, categoria, tipo, entidade, acao) {
    cy.preencherOportunidadeNegocios(dados, pais, setor, categoria, tipo, entidade, acao);
  }

  /**
   * Exclui oportunidade
   * @param {Object} dados - Dados da oportunidade para excluir
   */
  excluir(dados) {
    cy.excluirItem('Oportunidade', 'nomeEmpresa', dados.nomeEmpresa);
  }

  /**
   * Edita oportunidade existente
   * @param {Object} dados - Dados da oportunidade
   */
  editar(dados) {
    cy.editarOportunidade(dados);
  }

  /**
   * Altera status (ativa/desativa) da oportunidade
   * @param {Object} dados - Dados da oportunidade
   * @param {boolean} ativar - true para ativar, false para desativar
   */
  alterarStatus(dados, ativar) {
    cy.alterarStatus(dados, ativar);
  }

  /**
   * Valida mensagem de sucesso no cadastro
   */
  validarCadastroSucesso() {
    cy.contains('Oportunidade Cadastrada com Sucesso.', { timeout: 16000 })
      .should('be.visible');
  }

  /**
   * Valida mensagem de sucesso na edição
   */
  validarEdicaoSucesso() {
    cy.contains('Edição Salva com Sucesso.', { timeout: 16000 })
      .should('be.visible');
  }

  /**
   * Valida mensagem de sucesso na exclusão
   */
  validarExclusaoSucesso() {
    cy.contains('Oportunidade Excluída com Sucesso.', { timeout: 16000 })
      .should('be.visible');
  }

  /**
   * Fluxo completo: excluir se existir, cadastrar e validar
   * @param {Object} dados - Dados da oportunidade
   * @param {string} pais - País
   * @param {string} setor - Setor
   * @param {string} categoria - Categoria
   * @param {string} tipo - Tipo (Importação/Exportação)
   * @param {string} entidade - Entidade (SPCC/CECIEx)
   */
  cadastrarNova(dados, pais, setor, categoria, tipo, entidade) {
    this.acessar();
    this.pesquisar(dados);
    this.excluir(dados);
    this.acessarCadastro();
    this.preencherFormulario(dados, pais, setor, categoria, tipo, entidade, dados.Salvar);
    this.validarCadastroSucesso();
  }

  /**
   * Fluxo completo: editar oportunidade existente
   * @param {Object} dados - Dados da oportunidade
   * @param {string} pais - País
   * @param {string} setor - Setor
   * @param {string} categoria - Categoria
   * @param {string} tipo - Tipo
   * @param {string} entidade - Entidade
   */
  editarExistente(dados, pais, setor, categoria, tipo, entidade) {
    this.editar(dados);
    this.preencherFormulario(dados, pais, setor, categoria, tipo, entidade, dados.Editar);
    this.validarEdicaoSucesso();
  }
}

export default new OportunidadesPage();
