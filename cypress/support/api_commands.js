import '@shelex/cypress-allure-plugin';
import './commands'; //

const headers = {
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'en-US',
    'Content-Type': 'application/x-www-form-urlencoded',
};
 
const apiUrl = Cypress.env('api_url_token');
Cypress.Commands.add('loginAPI', (user, senha) => {
    const client_id = Cypress.env('client_id');
    const scope = Cypress.env('scope');
    const grant_type = Cypress.env('grant_type');
    const username = user;
    const password = senha;

    return cy.api({ // Add `return` here
        method: 'POST',
        url: apiUrl,
        headers: headers,
        body: {
            client_id,
            scope,
            grant_type,
            username,
            password,
        }
    }).then((response) => {
        return response.body; // Ensure the response body is returned
        //console.log(response.access_token)
    });
});

Cypress.Commands.add('apiPostRequestWithToken', (data, urlApiServicos, token, expectedStatus) => {
  return cy.api({
    method: 'POST',
    url: urlApiServicos,
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    body: data,
    failOnStatusCode: false
  })
});



// Cypress.Commands.add('apiPostRequestWithToken', (data, urlApiServicos, headers, token, expectedStatus) => {
//   const headersWithAuth = {
//    // ...headers,
//     'Authorization': `Bearer ${token}`,
//   };
//   return cy.request({
//     method: 'POST',
//     url: urlApiServicos,
//     headers: headersWithAuth,
//     body: data,
//     form: true,
//     failOnStatusCode: false
//   }).then((response) => {
//     expect(response.status).to.equal(expectedStatus);
//     return response.body;
//   });
// });

// Cypress.Commands.add('apiPostRequestWithToken', (formData, urlApiServicos, token, expectedStatus) => {
//   return cy.request({
//     method: 'POST',
//     url: urlApiServicos,
//     headers: {
//       accept: '*/*',
//       'Authorization': `Bearer ${token}`,
//     },
//     body: formData,
//     // faz o Cypress tratar como multipart
//     form: true,
//     failOnStatusCode: false
//   }).then((response) => {
//     expect(response.status).to.equal(expectedStatus);
//     return response;
//   });
// });



