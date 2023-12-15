describe("Temp", () => {

    before(() => {
        cy.visit("https://www.amazon.fr/")
          
    })             

        it('Add an item ZZZ => Quantity: 5', () => {
            cy.get('#twotabsearchtextbox').type("Tintin : Les Cigares du pharaon", { force: true })
            cy.get('#nav-search-submit-button').click()

            // Refine criteria
            cy.get('#filters ul li').contains("Hergé").click()

            const FirstResult = 'div[data-asin] h2 a'
            cy.get(FirstResult).first().click()
            
            const MajQte = '#addToCart select[id="quantity"]'
            cy.get(MajQte).select('5')
            
            const AddItem = '#addToCart input[id="add-to-cart-button"]'
            cy.get(AddItem).click()
            
            cy.wait(2000) 
            
        })

    after(() => {
       
    })

  })
