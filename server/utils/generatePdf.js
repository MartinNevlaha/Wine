const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

const generatePdf = async (data) => {
    const htmlTemp = path.join(__dirname, '../', '/assets', 'template', 'cert-template.html')
    const templateHtml = fs.readFileSync(htmlTemp, 'utf8');
    const template = handlebars.compile(templateHtml);
    const finalHtml = template(data);

    const pdfPath = path.join(__dirname, '../', '/exports', `${data.place}.pdf`);
    const options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        landscape: true,
        path: pdfPath
    };
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html,${finalHtml}`, {
        waitUntil: 'networkidle0'
    })
    await page.pdf(options);
    await browser.close();
};


module.exports = generatePdf;