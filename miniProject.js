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
        
        await driver.get('https://www.demoblaze.com/');

        await driver.wait(
            until.elementsLocated(By.css('#tbodyid .card')),
            10000
        );
        let oldItems = await driver.findElements(By.css('#tbodyid .card'));
        await driver.findElement(By.linkText('Laptops')).click();
        await driver.wait(until.stalenessOf(oldItems[0]), 10000);

        await driver.wait(async () => {
            let items = await driver.findElements(By.css('#tbodyid .card'));
            return items.length >= 5;
        }, 10000);

        let products = await driver.findElements(By.css('#tbodyid .card'));
        let firstFive = products.slice(0, 5);
        for (let i = 0; i < 5; i++) {
            let products = await driver.findElements(By.css('#tbodyid .card'));
            let product = products[i];

            let title = await product.findElement(By.css('.hrefch')).getText();
            console.log(title);
        }

        let image = await driver.takeScreenshot();
        fs.writeFileSync('miniProject.png', image, 'base64');

        
    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();