import { test, expect } from '@playwright/test';

const {LoginPage} = require('../pageObjects/loginPage.spec');
const {Dashboard} = require('../pageObjects/dashBoard.spec');
const {Cart} = require('../pageObjects/cart.spec');
const {Payment} = require('../pageObjects/payment.spec');
const email = "mikko4325@gmail.com";
const passWord = "Kiisi#4576";
const incorrectEmail = "matti4352@gmail.com";
const invalidPassWord = "4576#Dcba";
const loginLocator = "//h2[normalize-space()='Login to your account']";
const productName = "Men Tshirt";
const name = "Mikko Testaa";
const cardNumber = "56364363357";
const cvc = "765";
const month = "08";
const year = "2027";
const dataset =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test.beforeEach(async({ page })=>
{
    await page.goto('https://automationexercise.com/');

    await expect(page.locator("//p[@class='pull-left']")).toContainText("Copyright © 2021 All rights reserved");
  
    
    //pop handling
     
    await page.addLocatorHandler(
      page.getByText("Welcome"),
      async () => {
          await page.locator("//div[@class='fc-footer-buttons']/button").nth(0).click();
      }
  );
  
    await page.locator("//a[normalize-space()='Signup / Login']").click();
    
    
    await expect(page.locator("//h2[normalize-space()='Login to your account']")).toContainText("Login to your account")
    
});

test('Login valid password test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(email, passWord);
});

test('Login- invalid password test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.invalidPasswordLogin(email, invalidPassWord);
});

test('Login- incorrect email test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.invalidPasswordLogin(incorrectEmail, passWord);
});


test('Login-Logout test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(email, passWord);
    await page.locator("//a[normalize-space()='Logout']").click();
    await expect(page.locator(loginLocator)).toContainText("Login to your account");    
  });

test('Order test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashBoard = new Dashboard(page);
    const cart = new Cart(page);
    const payment = new Payment(page);

    //login
    await loginPage.validLogin(email, passWord);

    //order
    await page.locator("//a[@href='/products']").click();

   
    await dashBoard.searchProductAddCart(productName);
    await dashBoard.navigateToCart();

    await cart.VerifyProductIsDisplayed(productName);
    await cart.Checkout();
    await dashBoard.navigateToOrders();

    await payment.CreditCardDetails(name, cardNumber, cvc, month, year);
    await payment.VerifyOrderIsPlaced();  
  });


  //order test using 2 different customer. 
  // Testdata is readed from JSON-file
  for(const data of dataset)
  {

  test(`Order test ${data.productName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashBoard = new Dashboard(page);
    const cart = new Cart(page);
    const payment = new Payment(page);
  
    //login
    await loginPage.validLogin(data.email, data.password);

    //order
    await page.locator("//a[@href='/products']").click();

   

    await dashBoard.searchProductAddCart(data.productName);
    await dashBoard.navigateToCart();

    await cart.VerifyProductIsDisplayed(data.productName);
    await cart.Checkout();
    await dashBoard.navigateToOrders();

    await payment.CreditCardDetails(data.name, data.cardNumber, data.cvc, data.month, data.year);
    await payment.VerifyOrderIsPlaced();    
  });

}


