const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    // Create assets directory if it doesn't exist
    if (!fs.existsSync('assets')) {
      fs.mkdirSync('assets');
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({ width: 1240, height: 1754 });
    
    // Go to your GitHub Pages URL
    await page.goto('https://joedunn123456789.github.io/Bootstrap5-Resume/', {
      waitUntil: 'networkidle0'
    });
    
    // Wait a bit more for any dynamic content
    await page.waitForTimeout(2000);
    
    // Generate PDF
    await page.pdf({
      path: 'assets/resume.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    console.log('PDF generated successfully!');
    await browser.close();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();