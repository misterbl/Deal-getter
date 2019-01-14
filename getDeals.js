const puppeteer = require("puppeteer");

const captureAllDeals = async elements => {
  let i = 1;
  for (const element of elements) {
    await element.screenshot({ path: `public/deals/${i}.png` });
    i += 1;
  }
};
const getDeals = async () => {
  console.log(
    "\nPlease hold on while we are getting the deals.\nIt's only going to take a minute or two....\n"
  );
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });
    await page.goto("https://www.ebay.co.uk/deals", {
      waitUntil: "networkidle0"
    });
    await page.waitForSelector(".ebayui-dne-item-featured-card");
    await page.screenshot({
      path: "public/deals/allDeals.png",
      fullPage: true
    });
    const deals = await page.$$("div.dne-itemtile-medium");
    await captureAllDeals(deals, page);
    console.log("deals are ready!");
    await browser.close();
  } catch (err) {
    console.error(err);
    browser.close();
  }
};

module.exports = getDeals;
