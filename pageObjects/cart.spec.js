const {test, expect} = require('@playwright/test');
class Cart
{
    
constructor(page)
{
    this.page = page;
    
    this.cartProducts = page.locator("//td[@class='cart_description']/h4");
    this.checkout = page.locator("//a[@class='btn btn-default check_out']");   
}

async VerifyProductIsDisplayed(productName)
{
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("a:has-text('"+productName+"')");
}

}
module.exports = {Cart};