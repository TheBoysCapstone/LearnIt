const puppeteer = require('puppeteer');

describe('signup page', () => {
    
    beforeAll( async () => {
        const browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--disable-extensions'] });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000', {waitUntil: 'domcontentloaded'});
    });

    it('should show the signup text', async () => {
        const headerHandle = await page.$('.login');
        const html = await page.evaluate(headerHandle => headerHandler.innerHTML, headerHandle);
        expect(html).toBe('Login to continue'); 
    });
});