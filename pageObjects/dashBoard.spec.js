const {test, expect} = require('@playwright/test');

class Dashboard
{
constructor(page)
{
    this.page = page;
    this.products = page.locator("//div[@class='productinfo text-center']");
    this.productsText = page.locator("//div[@class='productinfo text-center']/p");
    this.cart =  page.locator("//a[@href='/view_cart']/u");
    this.orders = page.locator("//a[@href='/payment']");    
}

async searchProductAddCart(productName)
{
    const titles = await this.productsText.allTextContents();
    const count = await this.products.count();


    for(let i =0; i < count; ++i)
        {
        if(await this.products.nth(i).locator("p").textContent() === productName)
        {
            //add to cart
            await this.products.nth(i).locator("a").click();
            break;
         }
        }

        await expect(this.page.locator("//p[@class='text-center']").first()).toContainText("Your product has been added to cart.");

}


async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{    
    await this.cart.click();
}


}
module.exports = {Dashboard};