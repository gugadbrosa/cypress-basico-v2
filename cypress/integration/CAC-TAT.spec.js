/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = "Lorem ipsum, blah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morumblah blah blah irum dirum morum"

    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com o campo e-mail com formatação errada', function(){
    
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail,com')
    cy.get('#open-text-area').type('Texto')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone permace vazio quando digitado valor nao numerico', function(){
    
    cy.get('#phone').type('abcdefghijklmnopqrstuvxz').should('have.value', '')

  })

  it('exibe mensagem de erro quando o campo telefone é obrigatorio e nao e preenchido', function () {
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Texto')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

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
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
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
    
  })

  

})