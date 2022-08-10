/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = "Lorem ipsum, blah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morum"

    cy.clock()

    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com o campo e-mail com formatação errada', function(){
    cy.clock()

    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail,com')
    cy.get('#open-text-area').type('Texto')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('campo telefone permace vazio quando digitado valor nao numerico', function(){
    
    cy.get('#phone').type('abcdefghijklmnopqrstuvxz').should('have.value', '')

  })

  it('exibe mensagem de erro quando o campo telefone é obrigatorio e nao e preenchido', function () {
    cy.clock()
    
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Texto')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

    cy.get('#firstName')
      .type('Gustavo')
      .should('have.value', 'Gustavo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Barros')
      .should('have.value', 'Barros')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('gugabarros5@gmail.com')
      .should('have.value', 'gugabarros5@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado', function(){
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (Youtube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu indice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento Feedback', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should("have.value", "feedback")
  })

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos os checkboxes, depois desmarca o ultimo', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function(){
    cy.fixture('example').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
   cy.get('#privacy a').should('have.attr', 'target', '_blank') 
  })

  it('acessa a pagina de politica de privacidade removendo o target do link', function(){
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function() {
    const longText = Cypress._.repeat('1234567890', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('faz uma requisicao http', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })

  it('encontra o gato', function(){
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')
  })
  
})