const {
  dates,
  createNoticias,
  createOportunidade,
  createEvento,
  createServico,
  createProduto,
  createContato,
  createLive,
  createEmpresa,
} = require('../support/factories/testDataFactory');

const cadastroNoticias = createNoticias();
const cadastroOportunidade = createOportunidade();
const cadastroEventos = createEvento();
const cadastroServico = createServico();
const cadastroProduto = createProduto();
const cadastroContatos = createContato();
const cadastroLives = createLive();
const dadosDaEmpresa = createEmpresa();

const servicoAPI = {
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  name: 'Serviço via API - AUTOMAÇÃO',
  categoryId: 1,
  subCategoryId: 10,
  description: 'descrição comercial',
  pictures: '',
  subcategoryName: 'Stealing',
};

const produtoAPI = {
  customerId: 'a1c1946b-1768-4867-aae2-5218cab97a17',
  hsCode: '01013000',
  internalCode: 'AUTO12345',
  name: 'Produto via API - AUTOMAÇÃO',
  description: 'Produto de teste para automação',
  categoryId: 3,
  subCategoryId: 15,
  pictures: '',
  type: 'exporter',
};

const eventoAPI = {
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  title: 'Evento via API - AUTOMAÇÃO',
  description: 'Descrição do evento de teste',
  type: 'ownEvent',
  modality: 'online',
  startDate: dates.todayDate + 'T10:00:00Z',
  endDate: dates.futureDate + 'T18:00:00Z',
  eventType: 1,
  businessType: 4,
  categoryId: 2,
  address: {
    street: 'Rua Teste',
    number: '123',
    neighborhood: 'Centro',
    city: 'Brasília',
    state: 'DF',
    zipCode: '70000-000',
    country: 'Brasil',
  },
  fullPrice: 1000,
  discount: 10,
  registrationLink: 'https://www.evento-teste.com',
  contactName: 'Contato Teste',
  contactEmail: 'contato@teste.com',
  contactPhone: '61999999999',
  pictures: '',
};

const noticiaAPI = {
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  title: 'Notícia via API - AUTOMAÇÃO',
  content: 'Conteúdo da notícia de teste para automação',
  publicationDate: dates.futureDate + 'T10:00:00Z',
  categoryId: 1,
  pictures: '',
};

const oportunidadeAPI = {
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  companyName: 'Empresa AUTOMAÇÃO',
  contactName: 'Contato Oportunidade',
  contactEmail: 'oportunidade@teste.com',
  productName: 'Produto Oportunidade - AUTOMAÇÃO',
  productDescription: 'Descrição do produto para oportunidade',
  hsCode: '12345678',
  type: 'Importação',
  country: 'Brasil',
  categoryId: 3,
  subCategoryId: 1,
  startDate: dates.todayDate,
  endDate: dates.futureDate,
};

const liveAPI = {
  customerId: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  title: 'Live via API - AUTOMAÇÃO',
  description: 'Descrição da live de teste',
  startDate: dates.futureDate + 'T15:00:00Z',
  streamingLink: 'https://www.youtube.com/watch?v=test123',
  status: 'A Realizar',
  pictures: '',
};

const exclusaoMassas = {};

module.exports = {
  dates,
  cadastroNoticias,
  cadastroOportunidade,
  cadastroEventos,
  cadastroServico,
  cadastroProduto,
  exclusaoMassas,
  cadastroContatos,
  servicoAPI,
  produtoAPI,
  eventoAPI,
  noticiaAPI,
  oportunidadeAPI,
  liveAPI,
  cadastroLives,
  dadosDaEmpresa,
};
  