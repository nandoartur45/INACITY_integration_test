const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run () {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        args: [ "--start-maximized"],
        headless: false});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);


    await page.goto('http://localhost:8000');
    await page.evaluate(() => {
        window.scroll(0, 530);
    });
    
    const coordinates = await page.evaluate((param1) => {
        const element = document.querySelector(param1);
        const {x, y} = element.getBoundingClientRect();
        return [x, y];
    }, '#map');

    //await page.mouse.move(coordinates[0], coordinates[1]);
    let iniX = coordinates[0]+149;
    let iniY = coordinates[1]+147;
    let endX = coordinates[0]+198;
    let endY = coordinates[1]+169;
    await page.mouse.click(iniX, iniY);
    await sleep(3000);
    await page.mouse.click(endX, endY);
    //await page.mouse.move(+5, -15);
    //await page.mouse.click;
console.log(coordinates);

    const GETIMAGESBUTTON = '#btnCollectImages';
    await page.click(GETIMAGESBUTTON);
    
    page.on('console', (errormsg) => {
        console.log(errormsg._text);


      });
    

}

run ();