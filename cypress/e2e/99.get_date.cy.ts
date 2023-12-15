describe("Get Date", () => {

    it('clock',() => {

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
        
        const now = DateDay();
        cy.log(now)

    })

})