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
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com o campo e-mail com formatação errada', function(){
    
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail,com')
    cy.get('#open-text-area').type('Texto')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone permace vazio quando digitado valor nao numerico', function(){
    
    cy.get('#phone').type('abcdefghijklmnopqrstuvxz').should('have.value', '')

  })

  it('exibe mensagem de erro quando o campo telefone é obrigatorio e nao e preenchido', function () {
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('gugabarros@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Texto')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })
})