import puppeteer from 'puppeteer';

describe('It must be able to show/hide an events details', () => {
    
    let browser;
    let page; 
    jest.setTimeout(30000);

    beforeAll(async () => {
    
        browser = await puppeteer.launch({
            // headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();

        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        browser.close();
    });

    test('An event element is collapsed by default.', async () => {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn');

        const eventDetails = await page.$('.event .event_Details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details.', async () => {
        await page.click('.event .details-btn');

        const eventDetails = await page.$('.event .event_Details');
        expect(eventDetails).toBeNull();

    })
});
