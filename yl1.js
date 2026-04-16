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

        await driver.get('https://practice.expandtesting.com/add-remove-elements');

        await driver.wait(
            until.elementLocated(By.css("button[onclick='addElement()']")),
            10000
        );        

        let addButton = await driver.wait(
            until.elementLocated(By.css("button[onclick='addElement()']")),
            10000
        );

        await driver.wait(until.elementIsVisible(addButton), 5000);
        
        for (let i = 0; i < 5; i++) {
            await addButton.click();

            await driver.wait(async () => {
                let buttons = await driver.findElements(By.css("#elements button"));
                return buttons.length === i + 1;
            }, 5000);

        }

        for (let i = 5; i > 0; i--) {

        let buttons = await driver.findElements(By.css("#elements button"));
        await buttons[0].click();

        await driver.wait(async () => {
            let updated = await driver.findElements(By.css("#elements button"));
            return updated.length === i - 1;
        }, 5000);
    }

        
        


    } catch (e) {
        console.log("ERROR:", e);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}

basicSearch();