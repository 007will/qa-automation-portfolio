/**
 * Fixture: Endpoints da API
 * Extraído do backup Insomnia_2026-01-14.yaml
 * 
 * @description Centraliza todas as URLs de API do projeto
 */

const API_BASE_URLS = {
  // Ambiente DEV
  DEV: {
    identity: 'https://dev-gsidentity.azurewebsites.net/api',
    service: 'https://msservice-dev.azurewebsites.net',
    product: 'https://msproduct-dev.azurewebsites.net',
    event: 'https://msevent-dev.azurewebsites.net',
    news: 'https://msnews-dev.azurewebsites.net',
    opportunity: 'https://msopportunity-dev.azurewebsites.net',
    customer: 'https://mscustomer-dev.azurewebsites.net',
    transmission: 'https://msevent-dev.azurewebsites.net' // Lives
  },
  
  // Ambiente TEST (HML)
  TEST: {
    identity: 'https://dev-gsidentity.azurewebsites.net/api', // Mesmo do DEV
    service: 'https://msservice-test.azurewebsites.net',
    product: 'https://msproduct-test.azurewebsites.net',
    event: 'https://msevent-test.azurewebsites.net',
    news: 'https://msnews-test.azurewebsites.net',
    opportunity: 'https://msopportunity-test.azurewebsites.net',
    customer: 'https://mscustomer-test.azurewebsites.net',
    transmission: 'https://msevent-test.azurewebsites.net'
  }
};

/**
 * Retorna base URL baseada no ambiente configurado
 */
function getBaseUrl(service) {
  const ambiente = Cypress.env('ambiente') || 'hml';
  const env = ambiente === 'hml' ? 'TEST' : 'DEV';
  return API_BASE_URLS[env][service];
}

/**
 * Endpoints organizados por módulo
 */
export const API_ENDPOINTS = {
  
  // ========== IDENTITY (Usuários/Admin) ==========
  IDENTITY: {
    LOGIN: `${Cypress.env('api_url_token')}`,
    USERS: () => `${getBaseUrl('identity')}/users`,
    USER_BY_ID: (id) => `${getBaseUrl('identity')}/users/${id}`,
    USER_BY_EMAIL: (email) => `${getBaseUrl('identity')}/users/email/${email}`,
    ROLES: () => `${getBaseUrl('identity')}/roles`,
  },

  // ========== PRODUTOS ==========
  PRODUCTS: {
    BASE: () => `${getBaseUrl('product')}/product`,
    BY_ID: (id) => `${getBaseUrl('product')}/product/${id}`,
    BY_CUSTOMER: (customerId) => `${getBaseUrl('product')}/product/customer/${customerId}`,
    CATEGORIES: () => `${getBaseUrl('product')}/category`,
    SUBCATEGORIES: (categoryId) => `${getBaseUrl('product')}/subcategory/${categoryId}`,
  },

  // ========== SERVIÇOS ==========
  SERVICES: {
    BASE: () => `${getBaseUrl('service')}/service`,
    BY_ID: (id) => `${getBaseUrl('service')}/service/${id}`,
    BY_CUSTOMER: (customerId) => `${getBaseUrl('service')}/service/customer/${customerId}`,
    CATEGORIES: () => `${getBaseUrl('service')}/category`,
    SUBCATEGORIES: (categoryId) => `${getBaseUrl('service')}/subcategory/${categoryId}`,
  },

  // ========== EVENTOS ==========
  EVENTS: {
    BASE: () => `${getBaseUrl('event')}/event`,
    BY_ID: (id) => `${getBaseUrl('event')}/event/${id}`,
    BY_CUSTOMER: (customerId) => `${getBaseUrl('event')}/event/customer/${customerId}`,
    UPCOMING: () => `${getBaseUrl('event')}/event/upcoming`,
    PAST: () => `${getBaseUrl('event')}/event/past`,
  },

  // ========== NOTÍCIAS ==========
  NEWS: {
    BASE: () => `${getBaseUrl('news')}/news`,
    BY_ID: (id) => `${getBaseUrl('news')}/news/${id}`,
    BY_CUSTOMER: (customerId) => `${getBaseUrl('news')}/news/customer/${customerId}`,
    PUBLISHED: () => `${getBaseUrl('news')}/news/published`,
    DRAFT: () => `${getBaseUrl('news')}/news/draft`,
  },

  // ========== OPORTUNIDADES ==========
  OPPORTUNITIES: {
    BASE: () => `${getBaseUrl('opportunity')}/opportunity`,
    BY_ID: (id) => `${getBaseUrl('opportunity')}/opportunity/${id}`,
    BY_CUSTOMER: (customerId) => `${getBaseUrl('opportunity')}/opportunity/customer/${customerId}`,
    ACTIVE: () => `${getBaseUrl('opportunity')}/opportunity/active`,
    EXPIRED: () => `${getBaseUrl('opportunity')}/opportunity/expired`,
  },

  // ========== LIVES/TRANSMISSÕES ==========
  TRANSMISSIONS: {
    BASE: () => `${getBaseUrl('transmission')}/transmission`,
    BY_ID: (id) => `${getBaseUrl('transmission')}/transmission/${id}`,
    SCHEDULED: () => `${getBaseUrl('transmission')}/transmission/scheduled`,
    COMPLETED: () => `${getBaseUrl('transmission')}/transmission/completed`,
  },

  // ========== CUSTOMER (Dados da Empresa) ==========
  CUSTOMER: {
    BASE: () => `${getBaseUrl('customer')}/customer`,
    BY_ID: (id) => `${getBaseUrl('customer')}/customer/${id}`,
    TERMS: (customerId) => `${getBaseUrl('customer')}/customer/${customerId}/terms`,
    ACCEPT_TERMS: (customerId) => `${getBaseUrl('customer')}/customer/${customerId}/accept-terms`,
  }
};

/**
 * IDs de referência comuns (do Insomnia)
 */
export const REFERENCE_IDS = {
  // Customer ID padrão para testes
  DEFAULT_CUSTOMER_ID: 'd0c00d8c-29ea-48fc-b09b-0d71d11d8663',
  
  // Customer ID alternativo
  ALT_CUSTOMER_ID: 'a1c1946b-1768-4867-aae2-5218cab97a17',
  
  // Categorias de Produtos
  PRODUCT_CATEGORIES: {
    CATEGORIA_1: 1,
    CATEGORIA_2: 2,
    CATEGORIA_3: 3,
  },
  
  // Subcategorias de Produtos
  PRODUCT_SUBCATEGORIES: {
    SUBCATEGORIA_10: 10,
    SUBCATEGORIA_15: 15,
  },
  
  // Categorias de Serviços
  SERVICE_CATEGORIES: {
    CATEGORIA_1: 1,
  },
  
  // Subcategorias de Serviços
  SERVICE_SUBCATEGORIES: {
    STEALING: 10,
  }
};

/**
 * Headers comuns extraídos do Insomnia
 */
export const COMMON_HEADERS = {
  JSON: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  
  MULTIPART: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'multipart/form-data',
  },
  
  TEXT: {
    'Accept': 'text/plain',
  }
};

/**
 * Parâmetros de query comuns
 */
export const QUERY_PARAMS = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  
  SORTING: {
    ASC: 'asc',
    DESC: 'desc',
  }
};
