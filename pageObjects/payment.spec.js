const {test, expect} = require('@playwright/test');
class Payment
{
    
constructor(page)
{
    this.page = page;    
}

async CreditCardDetails(name, cardNumber, cvc, mm, year)
{
    await expect(this.page.locator("//label[@class='control-label']").first()).toContainText("Name on Card");

    //Name on card
    
    await this.page.locator("//input[@name='name_on_card']").fill(name);

    //Card number
    await this.page.locator("//input[@name='card_number']").fill(cardNumber);

    //cvc
    
    await this.page.locator("//input[@name='cvc']").fill(cvc);

    //expiry month
    await this.page.locator("//input[@name='expiry_month']").fill(mm);

    //expiry year
    
    await this.page.locator("//input[@name='expiry_year']").fill(year);

    //Pay and corfirm order
    
    await this.page.locator("//button[@class='form-control btn btn-primary submit-button']").click();    
}

async VerifyOrderIsPlaced()
{   
    await expect(this.page.locator("//h2/b")).toContainText("Order Placed!");
}


}
module.exports = {Payment};