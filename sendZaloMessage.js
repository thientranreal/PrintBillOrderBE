const puppeteer = require('puppeteer');

async function sendZaloMessage(phoneNumber, message) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to Zalo login page
    await page.goto('https://chat.zalo.me/', { waitUntil: 'networkidle2' });

    console.log('Please log in to Zalo manually.');

    // Wait for the input field that appears after login
    await page.waitForSelector('input[data-id="txt_Main_Search"]', { timeout: 120000 });

    // Search for the phone number
    await page.type('input[data-id="txt_Main_Search"]', phoneNumber);
    await page.waitForTimeout(2000); // Wait for search results to load
    await page.click()

    // Select the user from the search results
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000); // Wait for the chat to open

    // Type and send the message
    await page.type('textarea', message);
    await page.keyboard.press('Enter');

    console.log('Message sent successfully.');

    await browser.close();
}

// Example usage
const phoneNumber = '0971357432';
const orderNumber = '123';
const message = `You have order number ${orderNumber}`;
sendZaloMessage(phoneNumber, message).catch(console.error);
