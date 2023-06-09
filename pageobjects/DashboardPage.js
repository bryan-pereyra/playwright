class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.titles = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='cart']");
        this.ordersButton = page.locator("[routerlink*='myorders']").first();
        this.body = page.locator("tbody");
    };

    async searchProductAndAddToCart(productName) {
        const titles = await this.titles.allTextContents();
        console.log(titles);

        /* Dynamically find a product (For loop) */
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            };
        };
    };

    async navigateToCart(){
        await this.cartButton.click();
    };

    async navigateToOrders(){
        await this.ordersButton.click();
        await this.body.waitFor();
    }
};

module.exports = {DashboardPage};