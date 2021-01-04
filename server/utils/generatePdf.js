const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const generatePdf = async ({ data, templateName, isLandscape }) => {
  const htmlTemp = path.join(
    __dirname,
    "../",
    "/assets",
    "template",
    templateName
  );
  const templateHtml = fs.readFileSync(htmlTemp, "utf8");
  const template = handlebars.compile(templateHtml);
  const finalHtml = template(data);

  const options = {
    format: "A4",
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
      top: "40px",
      bottom: "100px",
    },
    printBackground: true,
    landscape: isLandscape,
  };
  let browser;
  try {
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: true,
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(`data:text/html,${finalHtml}`, {
      waitUntil: "networkidle0",
    });
    await page.setContent(finalHtml);
    await page.emulateMediaType("screen");
    const createdPdf = await page.pdf(options);
    await context.close();
    return createdPdf;
  } catch (error) {
    throw error;
  }
};

module.exports = generatePdf;
