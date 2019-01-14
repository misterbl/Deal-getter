const puppeteer = require("puppeteer");

const captureDeal = async (deal, index) => {
  await deal.screenshot({ path: `public/deals/${index}.png` });
};

const getDeal = async index => {
  console.log(
    "\nPlease hold on while we are getting the deal.\nIt's only going to take a minute...\n"
  );
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });
    await page.goto("https://www.ebay.co.uk/deals", {
      waitUntil: "networkidle0"
    });
    await page.waitForSelector(".ebayui-dne-item-featured-card");
    const deals = await page.$$("div.dne-itemtile-medium");
    const deal = deals[index - 1];
    await captureDeal(deal, index, page);
    console.log("the deal has been found!");
    await browser.close();
  } catch (err) {
    console.error(err);
    browser.close();
  }
};
module.exports = getDeal;
