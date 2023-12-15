describe("Login", () => {

    before(() => {
        // Connexion website
        cy.visit("https://www.amazon.fr/")

        // If presence button => Click
       /* if (cy.get("a").contains("Continuer sans accepter"))
        {
            cy.get("a").contains("Continuer sans accepter").click();
        }*/
       
    })
 
    context('login',() => {

        it('Authentification', () => {
            // Mousover nav signin
            cy.get('[data-csa-c-content-id="nav_ya_signin"]').trigger('mouseover')

            // Click on [Identifiez-vous]
            cy.get('.nav-action-inner').contains("Identifiez-vous").click()

            // Verify correct redirection
            cy.get("h1").contains("S'identifier").should("be.visible");

            // Enter email + Click on [Continuer] button
            cy.get('input[name="email"]').type("llamri.test@gmail.com")
            cy.get('form[name="signIn"]').submit() // or cy.get("#continue").click()

            // Enter password
            cy.get('input[name="password"]').type("xlamrix")
            cy.get('form[name="signIn"]').submit() // or cy.get("#signInSubmit").click()

            /*if (cy.get("h1").contains("Protégez-vous des pirates informatiques"))
            {
                cy.get("a").contains("Pas maintenant").click()
            }*/

            // Verify correct redirection
            cy.get('#nav-tools span').contains("Bonjour") 

        })
       
        it('Reset Cart', () => 
        {
             
            cy.get('#nav-cart-count').then(($NbItem) => {
                // If Cart not empty => Delete all items
                if ($NbItem.text() != '0') {

                    cy.get('#nav-cart-count').click()

                    const selector = '[data-name="Active Items"] .sc-list-item-content input[value="Supprimer"]'
                    cy.get(selector).each(($el, index) => 
                    {                   
                        cy.get(selector).first()
                        .click({ force: true })
                        cy.wait(2000)    
                    })
                }
            })             
        })
        
    })

    after(() => {
        // Mouseover Header
        cy.get('[data-nav-role="signin"]').trigger('mouseover')
 
        // Click on [Deconnexion]
        cy.get('#nav-item-signout').click()
        cy.visit("https://www.amazon.fr/")
  
    })

  })