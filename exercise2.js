const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

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

        await driver.get('https://en.wikipedia.org/wiki/Selenium_(software)');

        let header = await driver.findElement(By.id('firstHeading')).getText();


    
        console.log("Header:", header);

    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();
