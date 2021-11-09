describe('Automation Assignment',() => {
    before(function(){
        cy.clearCookies();
    })
    beforeEach(function(){
        Cypress.Cookies.defaults({
            preserve: (cookieNew) => {
            return true;
            }
        })
        cy.fixture('registration/inputForm').then((credentials) => {
            this.credentials = credentials; 
        }) 
    })
    it('Loading website',function(){
        cy.visit('https://www.lookfantastic.com/');
        cy.wait(5000);
    })
    it('Accessing registration form', () => {
        cy.wait(5000);
        cy.get('body').then((body) => {
            if (body.find('[class="emailReengagement_close_button"]').length > 0) {
                cy.get('.emailReengagement_close_button').then($popin =>{
                    if($popin.is(':visible')){
                        cy.get('.emailReengagement_close_button').click();
                    }
                });
            } 
        })
        cy.wait(5000);            
        cy.get('.responsiveAccountHeader_openAccountButton').click({force:true});
        cy.wait(7000);
        cy.get('[aria-labelledby="guest-journey-title"] a').click();
        cy.wait(3000);
    })        
    it('Enter Fullname in registration form', function(){
        cy.wait(3000);       
        cy.xpath('(//input[@type="text"])[1]').type(this.credentials.fullname + " " + this.credentials.lastname);
    })
    it('Enter and confirm email', function(){
        cy.xpath('(//input[@type="email"])[1]').type(this.credentials.email);
        cy.xpath('(//input[@type="email"])[2]').type(this.credentials.email);
    })
    it('Enter and confirm password',function(){
        cy.xpath('(//input[@type="password"])[1]').type(this.credentials.password);
        cy.xpath('(//input[@type="password"])[2]').type(this.credentials.password);
    })
    it('Select radio button',function(){
        cy.wait(5000);
        cy.xpath('//div[@data-testid="radio-input-container-no-thanks"]').click();
    })
    it('Submit registration form',function(){
        cy.wait(3000);
        cy.xpath('//button[@type="submit"]').click();
        cy.xpath('//header').click();
    })      
    it('Navigate to Login Page', function(){
        cy.wait(5000)
        cy.get('body').then((body) => {
            if (body.find('[class="emailReengagement_close_button"]').length > 0) {
                cy.get('.emailReengagement_close_button').then($popin =>{
                    if($popin.is(':visible')){
                        cy.get('.emailReengagement_close_button').click();
                    }
                });
            } 
        })
        cy.get('.responsiveAccountHeader_openAccountButton').click();
        // cy.xpath('(//a[@class="responsiveAccountHeader_accountListLink"])[1]').click();
    })
    it('Assert Profile name',function(){
        //Asserting profile name 
        cy.get('.myAccountSection_header_welcome').should('include.text',this.credentials.fullname);
    })
    it('Logging out ', function(){
        cy.wait(2000);
        cy.get('.myAccount_logOutButton').click();
        // cy.get('.responsiveAccountHeader_openAccountButton').click();
        // cy.get('.responsiveAccountHeader_signOut').click();
        // cy.wait(5000);
        // cy.xpath('//a[@class="responsiveAccountHeader_accountLogin js-e2e-sign-in"]').should('have.value','login');
                
    })  
    it('Logging in with registered user ', function(){
        cy.wait(5000);
        cy.get('body').then((body) => {
            if (body.find('[class="emailReengagement_close_button"]').length > 0) {
                cy.get('.emailReengagement_close_button').then($popin =>{
                    if($popin.is(':visible')){
                        cy.get('.emailReengagement_close_button').click();
                    }
                });
            } 
        })
        cy.wait(7000);
        cy.get('.responsiveAccountHeader_openAccountButton').click({ force: true });
        // cy.xpath('//a[@class="responsiveAccountHeader_accountLogin js-e2e-sign-in"]').click()
    })
    it('Enter email of registered user',function(){
        cy.wait(2500);
        cy.xpath('(//input[@class="sc-bbmXgH gmEZCA"])[1]').type(this.credentials.email);
    })
    it('Enter password of registered user',function(){
        cy.xpath('(//input[@class="sc-bbmXgH gmEZCA"])[2]').type(this.credentials.password);
    })
    it('Submit Login form',function(){
        cy.wait(5000)
        cy.xpath('//button[@type="submit"]').click();
        cy.wait(5000)
        cy.xpath('//header').click({force:true});   
    })
    it('Select search bar', function(){
        cy.wait(5000);
        cy.get('body').then((body) => {
            if (body.find('[class="emailReengagement_close_button"]').length > 0) {
                cy.get('.emailReengagement_close_button').then($popin =>{
                    if($popin.is(':visible')){
                        cy.get('.emailReengagement_close_button').click();
                    }
                });
            } 
        })
        cy.wait(3000);
        cy.get('#header-search-input').click({force:true});
    })
    it('Type and search the word "SALT"',function(){
        cy.wait(3000);
        //type word in search bar
        cy.xpath('//input[@id="header-search-input"]').type("Salt",{force:true});
        //click on search icon
        cy.xpath('//button[@class="headerSearch_button"]').click({force:true});
        cy.get('body').then((body) => {
            if (body.find('[class="emailReengagement_close_button"]').length > 0) {
                cy.get('.emailReengagement_close_button').then($popin =>{
                    if($popin.is(':visible')){
                        cy.get('.emailReengagement_close_button').click();
                    }
                });
            } 
        })
    })
    it('Take a screenshot of the first product displayed',function(){
        cy.wait(3000);
        //taking screenshot
       cy.xpath('(//div[@class="productBlock_imageLinkWrapper"])[1]').screenshot();
    })
    it('Assertion: Checking if count of basket is zero',function(){
        let previousCount = 0;
        //clicking on Basket button
        cy.get('.responsiveFlyoutBasket_openBasketButton').click();
        cy.get('.responsiveFlyoutBasket_itemsCount').then(function(previousCount){
            expect(previousCount).to.contain('0')
        })   
    })
    it('Adding one item to basket', function(){
        //closing Basket popin
        //cy.get('#responsiveFlyoutBasket_openBasketButton').click({force:true});
        cy.wait(5000);
        //adding one item to basket
        //cy.xpath('(//div[@class="productBlock_button productBlock_button-productQuickbuySimple"])[1]').click();
        cy.get('.productListProducts_product:first-child button[class="productQuickbuySimple js-e2e-add-basket "]').click();
        cy.wait(3000);
        //closing product pop in
        cy.xpath("//button[@class='addedToBasketModal_closeContainer']").click();
    })
    it('Assertion: Checking if basket count has incremented by 1', function() {
        let newCount = 0;
        cy.get('.responsiveFlyoutBasket_itemsCount').then(function(newCount){
            expect(newCount).to.contain('1')        
        })
    })
    it('Deleting items from basket ',function(){
        cy.wait(3000);
        cy.get('.responsiveFlyoutBasket_openBasketButton').click({force:true});
        cy.get('.responsiveFlyoutBasket_viewBasketLink').click({force:true});
        cy.wait(3000);
        //removing items in basket
        cy.xpath('//a[@class="responsiveBasket_removeItem"]').click();
    })
    it('Checking of basket count has dropped to zero',function(){
        cy.wait(3000);
        //assert that count is back to zero
        cy.get('.responsiveFlyoutBasket_itemsCount').should('have.value','0');
    })
    it('Click on My Beauty Section', function(){
        //cy.login(Cypress.env("email"), Cypress.env("password"));
        cy.wait(3000)
        cy.get('.responsiveAccountHeader_openAccountButton').click({force:true});
        // cy.get('.responsiveAccountHeader_signOut').should('have.value','log out');
        //click on Edit In Beauty Section
        cy.wait(3000)
        cy.get('.responsiveBeautyProfileCard_button').click();   
    })
    it('Answering Question 1 to 11', function(){
        //start quiz
        cy.get('.profileService_headerWrapper-getStarted').click();
        cy.get('body').then((body) => {
            if (body.find('[class="emailReengagement_close_button"]').length > 0) {
                cy.get('.emailReengagement_close_button').then($popin =>{
                    if($popin.is(':visible')){
                        cy.get('.emailReengagement_close_button').click();
                    }
                });
            } 
        })
        //Answering Question 1
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[4]').click();
        //Go to next question 
        cy.get('body').then((body) => {
            if (body.find('[class="survey_formQuestions-primaryButton profileService_profileDescriptors-buttonNext"]').length > 0) {
                cy.get('.profileService_profileDescriptors-buttonNext').click()
            }
        })
    })
    it('Answering Question 2 out of 11',function(){
         //Answering Question 2
         cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[10]').click();   
         //Go to next question 
         cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 3 out of 11',function(){
        //Answering Question 3
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[13]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 4 out of 11',function(){
        //Answering Question 4
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[30]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 5 out of 11',function(){
        //Answering Question 5
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[33]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 6 out of 11',function(){
        //Answering Question 6
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[42]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 7 out of 11',function(){
        //Answering Question 7
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[49]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 8 out of 11',function(){
        //Answering Question 8
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[61]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 9 out of 11',function(){
        //Answering Question 9
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[68]').click();
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 10 out of 11',function(){
        //Answering Question 10
        cy.xpath('//input[@type="date"]').type('2000-09-11');
        cy.get('.profileService_profileDescriptors-buttonNext').click()
    })
    it('Answering Question 11 out of 11',function(){
        //Answering Question 11
        cy.xpath('(//span[@class="profileService_profileDescriptorsSection-labelText"])[73]').click();
        cy.xpath('(//button[@type="submit"])[3]').click(); 
    })
    it('verify success message', function(){
        cy.wait(3000);
        // verify success message
        cy.get('span[class="profileService_profileDescriptors_output-successfulMessage "]')
            .should('have.value', 'Has been submitted');
    });
    it('Logging out ', function(){
        cy.wait(2000);
        cy.get('.responsiveAccountHeader_openAccountButton').click({force:true});
        cy.wait(5000);
        cy.get('.myAccount_logOutButton').click();
        // cy.get('.responsiveAccountHeader_signOut').click();
    })
})