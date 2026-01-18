/**
 * EXEMPLO PRÁTICO 2: Test Data Factory e Builders
 * Elimina duplicação de dados, melhora legibilidade
 */

import { faker } from '@faker-js/faker';

// ==========================================
// cypress/support/factories/testDataFactory.js
// ==========================================
export class TestDataFactory {
  /**
   * Cria dados de Oportunidade aleatória
   * @param {object} overrides - Campos para sobrescrever
   * @returns {object} Objeto com dados de oportunidade
   */
  static createOportunidade(overrides = {}) {
    const defaults = {
      nomeEmpresa: `Empresa ${faker.company.suffix()}`,
      nomeContato: faker.person.fullName(),
      email: faker.internet.email(),
      nomeProduto: faker.commerce.productName(),
      descricaoProduto: faker.lorem.sentence(8),
      dataInicio: this.getDateFormatted(7),
      dataFinal: this.getDateFormatted(14),
      hsCode: faker.number.int({ min: 10000, max: 99999 }).toString(),
      pais: 'Brasil',
      categoria: 'PetCare',
      subcategoria: 'Rações',
      tipoOperacao: 'Importação',
      entidade: 'SPCC',
      ...overrides
    };

    return defaults;
  }

  /**
   * Cria dados de Serviço aleatório
   */
  static createServico(overrides = {}) {
    return {
      nomeServico: `Serviço ${faker.company.buzzAdjective()}`,
      descricaoServico: faker.lorem.sentence(10),
      categoria: 'Operações Financeiras',
      subcategoria: 'Consultorias',
      ...overrides
    };
  }

  /**
   * Cria dados de Contato aleatório
   */
  static createContato(overrides = {}) {
    return {
      nomeContato: faker.person.firstName(),
      sobrenomeContato: faker.person.lastName(),
      email: faker.internet.email(),
      telefone: faker.phone.number('(##) ####-####'),
      celular: faker.phone.number('(##) #####-####'),
      cpf: this.generateValidCPF(),
      dataContato: this.getDateFormatted(-7000), // Data de nascimento passada
      area: 'Importação',
      ...overrides
    };
  }

  /**
   * Cria dados de Notícia aleatória
   */
  static createNoticia(overrides = {}) {
    return {
      tituloNoticia: `Notícia ${faker.lorem.words(3)}`,
      noticiaTexto: faker.lorem.paragraph(3),
      dataNoticia: this.getDateFormatted(0),
      entidades: ['SPCC'],
      ...overrides
    };
  }

  /**
   * Cria dados de Evento aleatório
   */
  static createEvento(overrides = {}) {
    return {
      tituloEvento: `Evento ${faker.company.buzzAdjective()}`,
      descricaoEvento: faker.lorem.sentence(15),
      dataInicio: this.getDateFormatted(7),
      dataFinal: this.getDateFormatted(14),
      localEvento: faker.location.city(),
      endereco: faker.location.streetAddress(),
      cidade: faker.location.city(),
      numero: faker.number.int({ min: 1, max: 999 }).toString(),
      bairro: faker.location.county(),
      uf: 'SP',
      cep: faker.location.zipCode('######'),
      pais: 'Brasil',
      nomeContato: faker.person.fullName(),
      email: faker.internet.email(),
      telefone: faker.phone.number('(##) ####-####'),
      ...overrides
    };
  }

  /**
   * Gera um CPF válido
   */
  static generateValidCPF() {
    const rand9 = () => Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    let base;
    do {
      base = rand9();
    } while (base.every((d) => d === base[0]));

    const calc = (digits, factor) => {
      const sum = digits.reduce((s, d) => s + d * factor--, 0);
      const res = sum % 11;
      return res < 2 ? 0 : 11 - res;
    };

    const d10 = calc(base.slice(), 10);
    const d11 = calc([...base, d10], 11);
    return base.join('') + String(d10) + String(d11);
  }

  /**
   * Formata uma data (dias relativos ao hoje)
   * @param {number} daysFromNow - Dias a partir de hoje (negativo = passado)
   * @returns {string} Data formatada yyyy-mm-dd
   */
  static getDateFormatted(daysFromNow = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);

    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Gera um CPF único por sessão (para evitar duplicação)
   */
  static generateUniqueCPF() {
    if (!window.__usedCPFs) {
      window.__usedCPFs = new Set();
    }

    let cpf;
    do {
      cpf = this.generateValidCPF();
    } while (window.__usedCPFs.has(cpf));

    window.__usedCPFs.add(cpf);
    return cpf;
  }
}

// ==========================================
// cypress/support/factories/builders/*.js
// ==========================================

/**
 * Builder para Oportunidade com API fluente
 */
export class OportunidadeBuilder {
  constructor() {
    this.data = TestDataFactory.createOportunidade();
  }

  withCompany(name) {
    this.data.nomeEmpresa = name;
    return this;
  }

  withImportation() {
    this.data.tipoOperacao = 'Importação';
    return this;
  }

  withExportation() {
    this.data.tipoOperacao = 'Exportação';
    return this;
  }

  withCategory(category) {
    this.data.categoria = category;
    return this;
  }

  withSubcategory(subcategory) {
    this.data.subcategoria = subcategory;
    return this;
  }

  withEntity(entity) {
    this.data.entidade = entity;
    return this;
  }

  withDates(daysFromStart = 7, daysFromEnd = 14) {
    this.data.dataInicio = TestDataFactory.getDateFormatted(daysFromStart);
    this.data.dataFinal = TestDataFactory.getDateFormatted(daysFromEnd);
    return this;
  }

  build() {
    return { ...this.data };
  }

  static quick(overrides = {}) {
    return new OportunidadeBuilder().build(overrides);
  }
}

export class ServicoBuilder {
  constructor() {
    this.data = TestDataFactory.createServico();
  }

  withName(name) {
    this.data.nomeServico = name;
    return this;
  }

  withCategory(category) {
    this.data.categoria = category;
    return this;
  }

  withSubcategory(subcategory) {
    this.data.subcategoria = subcategory;
    return this;
  }

  build() {
    return { ...this.data };
  }

  static quick(overrides = {}) {
    return new ServicoBuilder()
      .build()
      .with(overrides);
  }
}

// ==========================================
// Uso em testes
// ==========================================

// Exemplo 1: Criar com valores padrão
const oportunidade = TestDataFactory.createOportunidade();

// Exemplo 2: Criar com sobrescrita
const oportunidade2 = TestDataFactory.createOportunidade({
  nomeEmpresa: 'Empresa ABC',
  tipoOperacao: 'Importação'
});

// Exemplo 3: Usar builder (fluent API)
const oportunidade3 = new OportunidadeBuilder()
  .withCompany('Empresa XYZ')
  .withExportation()
  .withCategory('Commodities')
  .build();

// Exemplo 4: Builder quick (sem verbose)
const oportunidade4 = OportunidadeBuilder.quick({
  nomeEmpresa: 'Quick Company',
  tipoOperacao: 'Importação'
});

// Exemplo 5: Usar em teste (antes)
describe('Oportunidades', () => {
  it('Validar cadastro', () => {
    const data = new OportunidadeBuilder()
      .withCompany('Test Company ' + Date.now())
      .withImportation()
      .build();

    // Exemplo de uso - ajuste os parâmetros conforme necessário
    cy.preencherOportunidadeNegocios(
      data.nomeEmpresa,
      data.nomeContato,
      data.email,
      data.nomeProduto,
      data.descricaoProduto,
      data.dataInicio,
      data.dataFinal,
      data.hsCode,
      data.pais,
      data.categoria,
      data.subcategoria,
      data.tipoOperacao,
      data.entidade
    );
  });
});
