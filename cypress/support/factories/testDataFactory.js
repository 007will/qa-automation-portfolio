const { faker } = require('@faker-js/faker');
const { gerarCpfUnico } = require('../utils');

function getDateFormatted(daysFromNow = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

const dates = {
  pastDate: getDateFormatted(-10),
  futureDate: getDateFormatted(7),
  todayDate: getDateFormatted(0),
};

function createNoticias(overrides = {}) {
  const base = {
    tituloNoticia: 'Notícia Teste - AUTOMAÇÃO',
    dataNoticia: dates.futureDate,
    dataNoticiaPassada: dates.pastDate,
    dataNoticiaFutura: dates.futureDate,
    dataNoticiaHoje: dates.todayDate,
    noticiaTexto: faker.lorem.words(5),
    SPCC: 1,
    BS: 2,
    CECIEx: 3,
    CadastroNews: 'Cadastrar Notícia',
    EdicaoNews: 'Salvar Edição',
  };
  return { ...base, ...overrides };
}

function createOportunidade(overrides = {}) {
  const hsCode = faker.number.int({ max: 100000 }).toString();
  const base = {
    nomeEmpresa: 'AUTOMAÇÃO TESTE',
    nomeContato: 'User Teste',
    email: faker.internet.email(),
    Brasil: 'Brasil',
    Argentina: 'Argentina',
    nomeProduto: 'AUTOMAÇÃO TESTE',
    dataPassada: dates.pastDate,
    dataInicio: dates.todayDate,
    dataFinal: dates.futureDate,
    PetCare: 'Pet Care',
    Defesa: 'Defesa',
    Moda: 'Moda',
    Commodities: 'Commodities',
    Racoes: 'Rações',
    Armas: 'Armas',
    Fertilizantes: 'Fertilizantes',
    Calcados: 'Calçados',
    hsCode,
    tipoImportacao: 'Importação',
    tipoExportacao: 'Exportação',
    descricaoProduto: faker.lorem.words(5),
    SPCC: 3,
    CECIEx: 4,
    Salvar: 'Cadastrar Oportunidade',
    Editar: 'Salvar Edição',
  };
  return { ...base, ...overrides };
}

function createEvento(overrides = {}) {
  const base = {
    EventoSPCC: 'ownEvent',
    EventoParceiro: 'thirdPartyEvent',
    tituloEvento: 'Evento Teste - AUTOMAÇÃO',
    Presencial: 'inPerson',
    Online: 'online',
    Hibrido: 'hibryd',
    dataInicio: dates.todayDate,
    dataFinal: dates.futureDate,
    SPCC: 'SPCC',
    BS: 'BRSUPPLIERS',
    CECIEx: 'CECIEX',
    Moda: 2,
    Commodities: 12,
    Veiculos: 7,
    Feiras: 1,
    Negocios: 4,
    Missao: 2,
    localEvento: 'Parque',
    endereco: 'Rua demo',
    cidade: 'Brasília',
    Numero: '01',
    bairro: 'Riacho',
    uf: 'DF',
    cep: '71825-300',
    Brasil: 'Brasil',
    Argentina: 'Argentina',
    Burundi: 'Burundi',
    descricaoEvento: faker.lorem.words(5),
    foto: 'riacho.png',
    valorCheio: '50000',
    desconto: '10',
    linkInscricao: 'https://www.r7.com/',
    nomeContato: 'User Teste Evento',
    email: faker.internet.email(),
    telefone: faker.phone.number(),
    mensagemOpcional: faker.lorem.words(5),
  };
  return { ...base, ...overrides };
}

function createServico(overrides = {}) {
  const base = {
    nomeServico: 'Serviço Teste - AUTOMAÇÃO',
    nomeServicoAlterado: 'Serviço AUTOMAÇÃO Editado',
    OpFinanceira: 'Operações Financeiras',
    OpAduaneiras: 'Operações Aduaneiras',
    Negocio: 'Negócios',
    ACC: 'ACC | ACE | FINIMP',
    Despachante: 'Despachante Aduaneiro',
    Sourcing: 'Sourcing',
    descricaoServico: faker.lorem.words(5),
    Cadastrar: 'Cadastrar Serviço',
    Editar: 'Salvar Edição',
  };
  return { ...base, ...overrides };
}

function createProduto(overrides = {}) {
  const numero5digitos = faker.number.int({ min: 0, max: 99999 }).toString().padStart(5, '0');
  const base = {
    tipoImport: 'importer',
    tipoExport: 'exporter',
    nomeProduto: 'Produto Teste - AUTOMAÇÃO',
    Descricao: faker.lorem.words(5),
    Foto: 'produto.jpg',
    hsCode: '01013000',
    CodigoInterno: numero5digitos,
    Hig: 3,
    Def: 11,
    Condicionador: 15,
    Muni: 53,
    Cadastrar: 'Cadastrar Produto',
    Editar: 'Salvar Edição',
  };
  return { ...base, ...overrides };
}

function createContato(overrides = {}) {
  const base = {
    nomeContato: 'Contato de Teste',
    sobrenomeContato: 'da AUTOMAÇÃO',
    email: faker.internet.email(),
    telefone: faker.phone.number(),
    celular: faker.phone.number(),
    areaImport: 'Importação',
    areaExport: 'Exportação',
    areaImportExport: 'Importação e Exportação',
    gerarCpfUnico: gerarCpfUnico(),
    CPF: gerarCpfUnico(),
    dataContato: dates.todayDate,
    CadastroContato: 'Adicionar Contato',
    EditarContato: 'Salvar Edição',
    ExcluirContato: 'Excluir Contato',
  };
  return { ...base, ...overrides };
}

function createLive(overrides = {}) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  const currentDateTime = now.toISOString().slice(0, 16);

  const base = {
    nomeLives: 'Live Teste - AUTOMAÇÃO',
    dataInicio: currentDateTime,
    descricao: faker.lorem.words(5),
    ARealizar: 'A Realizar',
    Realizado: 'Realizado',
    linkLive: 'https://www.youtube.com/watch?v=bf2tFixliMA',
    CadastrarLive: 'Cadastrar Live',
    EditarLive: 'Salvar Edição',
    ExcluirLive: 'Excluir Live',
  };
  return { ...base, ...overrides };
}

function createEmpresa(overrides = {}) {
  const base = {
    nomeFantasia: 'Teste',
    razaoSocial: 'Teste',
    cnpj: '12.345.678/0001-90',
    email: faker.internet.email(),
    telefone: faker.phone.number(),
    categoria: 'Commodities',
    endereco: 'Rua demo',
    cep: '71825-300',
    numero: '01',
    bairro: 'Riacho',
    cidade: 'Brasília',
    uf: 'DF',
    pais: 'Brasil',
  };
  return { ...base, ...overrides };
}

module.exports = {
  getDateFormatted,
  dates,
  createNoticias,
  createOportunidade,
  createEvento,
  createServico,
  createProduto,
  createContato,
  createLive,
  createEmpresa,
};
