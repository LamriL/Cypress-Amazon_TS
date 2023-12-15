describe("Update Cart", () => {


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

        cy.get('#nav-cart-count').click()
             
    })
    
    context('Update Cart',() => {

        it('Add an item to Product XXX => Quantity: n+1', () => {
        
              cy.get('[class="sc-item-content-group"]')
                .filter(':contains("Seagate")')
                .within(($result) => {
                    const MajQte = 'select[name="quantity"]'

                    cy.get('select[name="quantity"] option:selected').then(($option) => {
                        const num1 = parseFloat($option.text())
                        const num2 = num1 +1
                      
                        cy.get(MajQte).select(num2, { force: true })

                    })
                })
                
                
        })

        it('Remove an item from Product ZZZ => Quantity: n-1', () => {
               
            cy.get('[class="sc-item-content-group"]')
            .filter(':contains("Tintin")')
            .within(($result) => {
                const MajQte = 'select[name="quantity"]'

                cy.get('select[name="quantity"] option:selected').then(($option) => {
                    const num1 = parseFloat($option.text())
                    const num2 = num1 -1
                  
                    cy.get(MajQte).select(num2, { force: true })

                })
            })
            
         
        })
    })


    after(() => {
        cy.get('[data-nav-role="signin"]').trigger('mouseover')
 
        cy.get('#nav-item-signout').click()
        cy.visit("https://www.amazon.fr/")

    
    })

  })
