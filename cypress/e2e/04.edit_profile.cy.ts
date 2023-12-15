describe("Edit profile", () => {


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

        //cy.get('#nav-tools span').contains("Bonjour") 

        cy.get('[data-csa-c-content-id="nav_youraccount_btn"]').trigger('mouseover')
        cy.get('.nav-text').contains("Votre compte").click()

        // Click on [Connexion & Securite] button
        cy.get('div[data-card-identifier="SignInAndSecurity_C"]').click()
             
    })
    
    context('Update Profile',() => {

        // Function to get the date
        function DateDay(){
            let EntireDate: string = ""

            let date = new Date();

            // Get hours, minutes, seconds
            let hours = (date.getHours()).toString();
            let minutes = (date.getMinutes()).toString();
            let seconds = (date.getSeconds()).toString();

            // Get day, month, year
            let day = (date.getDate()).toString();  // Prefers getDate to getDay()
            let month = (date.getMonth()+1).toString();   // Because from 1 to 11
            let year = (date.getFullYear()).toString();
            
            EntireDate = day.concat(month,year,"_",hours,minutes)

            return EntireDate
        }

        // Function to generate random strings
        // declare all characters
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        function generateRandomString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        it('View Profile', () => {
            // Verify correct redirection
            cy.get('h1[id="ap_cnep_header"]').contains("Connexion et Sécurité").should("be.visible");               
        })

        it('New name: empty => Error', () => {  
            // Click on [modifier] button
            cy.get('#auth-cnep-edit-name-button').click()

            // Type Empty New name
            cy.get ('#ap_customer_name').clear().type('  ')

            // Save changes
            cy.get('#cnep_1C_submit_button').click()

            // Verify Error message displayed       
            cy.get('h4[class="a-alert-heading"]').contains('Un problème est survenu').should("be.visible");
                
        })

        it('New name: special caracters => Error', () => {  

            // Type Empty New name
            cy.get ('#ap_customer_name').clear().type('Test|Toto')

            // Save changes
            cy.get('#cnep_1C_submit_button').click()

            // Verify Error message displayed       
            cy.get('h4[class="a-alert-heading"]').contains('Un problème est survenu').should("be.visible");
                
        })

        it('New name: long string => Error', () => {  

            // Type Empty New name
            cy.get ('#ap_customer_name').clear().type(generateRandomString(80))

            // Save changes
            cy.get('#cnep_1C_submit_button').click()

            // Verify Error message displayed       
            cy.get('h4[class="a-alert-heading"]').contains('Un problème est survenu').should("be.visible");
                
        })

        it('Change Name', () => {

            // Concat New Name with Date Now
            const now = DateDay();
            let NewName = 'NewName_'.concat(now)

            // Type New name
            cy.get ('#ap_customer_name').clear().type(NewName)

            // Save changes
            cy.get('#cnep_1C_submit_button').click()

            //Verify Success message alert
            cy.get('h4[class="a-alert-heading"]').contains('Succès').should("be.visible");

            // Variable ou const à rajourter pour le nom (old et new)        
            cy.get('#cnep_1a_name_form').contains(NewName).should("be.visible");
            
        })

    })


    after(() => {
         
        cy.get('[data-nav-role="signin"]').trigger('mouseover')
 
        cy.get('#nav-item-signout').click({force: true})
        cy.visit("https://www.amazon.fr/")
        
   })

  })
