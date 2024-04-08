/// <reference types="Cypress" />

describe('Home Page Test Suite', () => {

    it('Should be able to search for a specific item and get the appropriate result', () => {
        cy.visit('https://www.giant-bicycles.com/us');

        let searchTerm = 'FASTROAD E+ EX 28MPH';

        cy.get(".toggle-megamenu").type(searchTerm).get(".tt-input").type('{enter}');
        cy.url().should('contain',searchTerm.split(' ')[0]);
        cy.get(".tile").first().click();
        cy.get("h1").first(($el, index, $list) => {

            let elementText = $el.text().toLowerCase()
            expect(elementText).to.include(searchTerm.split(' ')[0].toLowerCase());
            expect(elementText).to.include(searchTerm.split(' ')[1].toLowerCase());

        })
    })

    it('User should be able to add an item to their cart', () => {
        cy.visit('https://www.giant-bicycles.com/us');

        let searchTerm = 'TRANCE 29 1';

        cy.get(".toggle-megamenu").type(searchTerm).get(".tt-input").type('{enter}');
        cy.url().should('contain',searchTerm.split(' ')[0]);
        cy.get(".tile").first().click();
        cy.get("h1").first(($el, index, $list) => {

            let elementText = $el.text().toLowerCase()
            expect(elementText).to.include(searchTerm.split(' ')[0].toLowerCase());
            expect(elementText).to.include(searchTerm.split(' ')[1].toLowerCase());
            expect(elementText).to.include(searchTerm.split(' ')[2].toLowerCase());

        })
        cy.get(".name-and-stockinfo").first().click();
        cy.get("div.add-to-cart > button.btn.btn-addtocart").click();
        cy.get("#summary-NumberOfItems").first(($el, index, $list) => {

            let elementText = $el.text().toLowerCase()
            expect(elementText).to.include("1");

        })
    })


    it('User is able to delete an item from their cart', ()=> {
        cy.visit('https://www.giant-bicycles.com/us');

        let searchTerm = 'TRANCE 29 1';

        cy.get(".toggle-megamenu").type(searchTerm).get(".tt-input").type('{enter}');
        cy.url().should('contain',searchTerm.split(' ')[0]);
        cy.get(".tile").first().click();
        cy.get("h1").first(($el, index, $list) => {

            let elementText = $el.text().toLowerCase()
            expect(elementText).to.include(searchTerm.split(' ')[0].toLowerCase());
            expect(elementText).to.include(searchTerm.split(' ')[1].toLowerCase());
            expect(elementText).to.include(searchTerm.split(' ')[2].toLowerCase());

        })
        cy.get(".name-and-stockinfo").first().click();
        cy.get("div.add-to-cart > button.btn.btn-addtocart").click();
        cy.get("#summary-NumberOfItems").first(($el, index, $list) => {

            let elementText = $el.text().toLowerCase()
            expect(elementText).to.include("1");

        })
        cy.get("a.btn.btn-success").click();
        cy.get(".product-name-only").last().should("be.visible");
        cy.get("button.btn-link.remove-cart-item").last().click();
        cy.get('#cart-summary').should('be.visible').contains('Cart is empty');
        


    })
})