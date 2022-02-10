import puppeteer from 'puppeteer';
import mockData from '../mock-data';

describe('filter events by city (feature 1)', () => {

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
    });

    afterAll(async () => {
        browser.close();
    });


    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        const eventListLength = await page.$$eval('.event', events => events.length);
        expect(eventListLength).toBe(6);
    });


    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', 'Berlin', {delay: 75});
        const suggestionListLength = await page.$$eval('.suggestions li', suggestions => suggestions.length);
        expect(suggestionListLength).toBe(2);
    });


    test('User can select a city from the suggested list', async () => {
        await page.click('.suggestions li');

        const eventListLength = await page.$$eval('.event', events => events.length);
        expect(eventListLength).toBe(3);
    });

});



describe('It must be able to show/hide an events details (feature 2)', () => {
    
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

