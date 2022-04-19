const puppeteer = require('puppeteer');

describe('Login page', () => {
    let browser;
    let page;

    beforeAll( async () => {
        browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--disable-extensions'] });
        page = await browser.newPage();
    });
    
    
    jest.setTimeout(10000);
    it('should navigate to the login page', async () => {
        await page.goto('http://localhost:3000', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector(".signup-header")
        await page.click(".group-btn")
        await page.waitForSelector(".login")
        const headerHandler = await page.$('.login');
        const html = await page.evaluate(headerHandle => headerHandle.innerHTML, headerHandle);
        expect(html).toBe('Login to continue');
    });
});