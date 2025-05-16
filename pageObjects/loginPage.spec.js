const {test, expect} = require('@playwright/test');

class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.signInbutton = page.locator("//form[@action='/login']/button[contains(text(),'Login')]");
        this.userName = page.locator("//form[@action='/login']/input[@placeholder='Email Address']");
        this.passWord = page.locator("//form[@action='/login']/input[@placeholder='Password']");
    }

   
    async validLogin(username, password)
    {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInbutton.click();
        await expect (this.page.locator("//*[starts-with(@class,'nav navbar-nav')]")).toContainText(" Logged in as");        
    }

    async invalidPasswordLogin(username, password)
    {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInbutton.click();
        await expect (this.page.locator("//form[@action='/login']/p")).toContainText("Your email or password is incorrect!");        
    }

}
module.exports = {LoginPage};