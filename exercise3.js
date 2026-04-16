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

        await driver.get('https://www.w3schools.com/html/html_forms.asp');

        await driver.findElement(By.id('fname')).clear();
        await driver.findElement(By.id('fname')).sendKeys('Tanel');

        await driver.findElement(By.id('lname')).clear();
        await driver.findElement(By.id('lname')).sendKeys('Kirss');

        let originalTabs = await driver.getAllWindowHandles();

        await driver.findElement(By.css('input[type="submit"]')).click(); 

        await driver.wait(async () => {
            let newTabs = await driver.getAllWindowHandles();
            return newTabs.length > originalTabs.length;
        }, 5000);

        let allTabs = await driver.getAllWindowHandles();

        let newTab = allTabs.find(tab => !originalTabs.includes(tab));

        // Switch to it
        await driver.switchTo().window(newTab);

        console.log("Switched to new tab, form was submitted!");

    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();