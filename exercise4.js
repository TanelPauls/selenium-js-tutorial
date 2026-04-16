const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function basicSearch() {
    let options = new chrome.Options();

    // critical flags
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-background-networking');
    options.addArguments('--disable-background-timer-throttling');
    options.addArguments('--disable-backgrounding-occluded-windows');
    options.addArguments('--disable-renderer-backgrounding');
    options.addArguments('--user-data-dir=/tmp/selenium-brave');
    // Tell Selenium to use Brave instead of Chrome
    options.setChromeBinaryPath('/usr/bin/brave-browser');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        //console.log("Before search");
        await driver.get('https://www.duckduckgo.com');

        await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.ENTER);

        //console.log("Waiting for result...");

 /*        let firstResult = await driver.wait(
            until.elementLocated(By.id('r1-1')),
            10000
        );

        let secondResult = await driver.wait(
            until.elementLocated(By.id('r1-2')),
            10000
        );

        let thirdResult = await driver.wait(
            until.elementLocated(By.id('r1-3')),
            10000
        ); */

        await driver.wait(until.elementsLocated(By.css('article')), 10000);

        let results = await driver.findElements(By.css('article'));

        for (let i = 0; i < 3; i++) {
            let text = await results[i].getText();
            console.log(`Result ${i + 1}:`, text);
        }

        let image = await driver.takeScreenshot();
        fs.writeFileSync('exercise4.png', image, 'base64');

        //console.log("Found result");
    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();