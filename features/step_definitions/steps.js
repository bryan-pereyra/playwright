const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('a login  to E-commerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('add {string} to Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();

    await this.dashboardPage.searchProductAndAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();

    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();

    await ordersReviewPage.searchCountryAndSelect("mex", "Mexico");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
});

Then('verify order is present in the Order History', { timeout: 100 * 1000 }, async function () {
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();

    await this.dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});