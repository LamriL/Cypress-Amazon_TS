describe("Add Items", () => {

    before(() => {
        cy.visit("https://www.amazon.fr/")

        //Authentification
        cy.get('[data-csa-c-content-id="nav_ya_signin"]').trigger('mouseover')
        cy.get('.nav-action-inner').contains("Identifiez-vous").click()
        cy.get("h1").contains("S'identifier").should("be.visible");

        cy.get('input[name="email"]').type("llamri.test@gmail.com")
        cy.get('form[name="signIn"]').submit() 

        cy.get('input[name="password"]').type("xlamrix")
        cy.get('form[name="signIn"]').submit()

        cy.get('#nav-tools span').contains("Bonjour") 

      
        // Reset Cart 
        cy.get('#nav-cart-count').then(($NbItem) => {
                if ($NbItem.text() != '0') {
                    cy.get('#nav-cart-count').click()

                    const selector = '[data-name="Active Items"] .sc-list-item-content input[value="Supprimer"]'
                    cy.get(selector).each(($el, index) => {                   
                        cy.get(selector).first()
                        .click({ force: true })
                        cy.wait(2000)    
                    })
                }
            })             
         
    })

 
    context('Add Products in Cart',() => {

        const FirstResult = 'div[data-asin] h2 a'
        const MajQte = '#addToCart select[id="quantity"]'
        const AddItem = '#addToCart input[id="add-to-cart-button"]'
        const NoThanksBtn = 'div[id="attach-warranty-display"] span[id="attachSiNoCoverage"]'
        

        it('Add an item XXX => Quantity: 1', () => {
            cy.get('#twotabsearchtextbox').type("Seagate Basic, 2 To", { force: true })
            cy.get('#nav-search-submit-button').click()

            // Refine criteria
            cy.get('#brandsRefinements ul li').contains("Seagate").click()

            // Click on 1st result
            cy.get(FirstResult).first().click()
            
            // Click on [Ajouter au panier] button
            cy.get(AddItem).click()
            
            // Click on [Non, Merci] button
            cy.get(NoThanksBtn).click()
            cy.wait(2000) 
            
        })
       
        it('Add an item YYY => Quantity: 3', () => {
            cy.get('#twotabsearchtextbox').type("Ravensburger - Puzzle Enfant - Pat'Patrouille", { force: true })
            cy.get('#nav-search-submit-button').click()

            // Refine criteria
            cy.get('#brandsRefinements ul li').contains("Ravensburger").click()

            cy.get(FirstResult).first().click()
            
            cy.get(MajQte).select('3')

            cy.get(AddItem).click()
            cy.wait(2000) 
            
        })

        it('Add an item ZZZ => Quantity: 5', () => {
            cy.get('#twotabsearchtextbox').type("Tintin : Les Cigares du pharaon", { force: true })
            cy.get('#nav-search-submit-button').click()

            // Refine criteria
            cy.get('#filters ul li').contains("Hergé").click()

            cy.get(FirstResult).first().click()
            
            cy.get(MajQte).select('5')
            
            cy.get(AddItem).click()
            
            cy.wait(2000) 
            
        })

        it('Display Cart Content', () => {
            cy.get('#nav-cart-count').click()
        })
    })


    after(() => {
        cy.get('[data-nav-role="signin"]').trigger('mouseover')
 
        cy.get('#nav-item-signout').click()
        cy.visit("https://www.amazon.fr/")
    })

  })
