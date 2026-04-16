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

        await driver.get('https://www.saucedemo.com/');

        await driver.wait(
            until.elementLocated(By.id("login-button")),
            10000
        );

        await driver.wait(
            until.elementLocated(By.id("user-name")),
            10000
        );

        await driver.wait(
            until.elementLocated(By.id("password")),
            10000
        );

        await driver.wait(
            until.elementLocated(By.id("login_credentials")),
            10000
        );

        let credsElement = await driver.findElement(By.className("login_credentials"));
        let credsText = await credsElement.getText();

        let usernames = credsText
            .replace("Accepted usernames are:", "")
            .split("\n")
            .map(u => u.trim())
            .filter(u => u.length > 0);

        console.log(usernames);

        let passwordsElement = await driver.findElement(By.className("login_password"));
        let passwordText = await passwordsElement.getText();

        let passwords = passwordText
            .replace("Password for all users:", "")
            .split("\n")
            .map(u => u.trim())
            .filter(u => u.length > 0);

        console.log(passwords);

        await driver.findElement(By.id('user-name')).sendKeys(usernames[0]);

        await driver.findElement(By.id('password')).sendKeys(passwords[0]);

        await driver.findElement(By.css('input[type="submit"]')).click(); 

        await driver.wait(
            until.elementLocated(By.className('inventory_list')),
            10000
        );


        let products = await driver.findElements(By.className('inventory_item'));

        for (let product of products) {
            let name = await product.findElement(By.className('inventory_item_name')).getText();

            console.log(name);
        }

    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();