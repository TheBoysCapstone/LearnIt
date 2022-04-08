const puppeteer = require('puppeteer');

describe('signup page', () => {
    let browser;
    let page;

    beforeAll( async () => {
        browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--disable-extensions'] });
        page = await browser.newPage();
        await page.goto('http://localhost:3000', {waitUntil: 'domcontentloaded'});
    });

    it('should show the signup text', async () => {
        const headerHandle = await page.$('.signup-header');
        const html = await page.evaluate(headerHandle => headerHandle.innerHTML, headerHandle);
        expect(html).toBe('Create an account'); 
    });
});