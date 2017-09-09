const puppeteer = require('puppeteer')
const promisify = require("es6-promisify");
const WiFiControl = require('wifi-control');
// const connectToAP = promisify(WiFiControl.connectToAP)

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectToWifi() {
    await connectToAP("Arriva Trains Wales WIFI")
    console.log("Recconected to Arriva Trains Wifi")
  }

async function main () {
  var browser = await puppeteer.launch({headless: false});
  var page = await browser.newPage();
//   await page.goto('http://atw.on.icomera.com/en/');
await page.goto('http://localhost:8000');

  async function logIn() {
      await page.reload()
  }

 

  while(true) {

    // setTimeout(function() {
    //     const isArrivaThrottlingMe = await page.evaluate(() => {
    //         return document.getElementsByClassName('quota-throttled')[0].children[0].innerHTML == "You are browsing with limited speed"
    //       });
            
        
    //       console.log(isArrivaThrottlingMe)
    // }, 2000);
    
    const isArrivaThrottlingMe = await page.evaluate(() => {
        return document.getElementsByClassName('quota-throttled')[0].children[0].innerHTML == "You are browsing with limited speed"
      });
        
      await timeout(5000);

      
    
      console.log(`${isArrivaThrottlingMe}:${new Date().getTime()}`)

  }

}

main()