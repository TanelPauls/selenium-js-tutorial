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
        //console.log("Before search");
        await driver.get('https://www.duckduckgo.com');

        await driver.findElement(By.name('q')).sendKeys('WebDriver', Key.ENTER);

        //console.log("Waiting for result...");

        let firstResult = await driver.wait(
            until.elementLocated(By.css('h2 a')),
            10000
        );

        //console.log("Found result");

    
        console.log("First result:", await firstResult.getText());

    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        //console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();
