const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // Go to the site and scroll down to the bottom to trigger intersection observers
        console.log("Navigating to site...");
        await page.goto('https://www.michelleandtonye.com/', { waitUntil: 'networkidle0' });
        
        console.log("Scrolling down to trigger gallery loading...");
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 500;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if(totalHeight >= scrollHeight - window.innerHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        // Give it a second to load the images
        await page.waitForTimeout(2000);
        
        const galleryHtml = await page.evaluate(() => {
            const el = document.querySelector('#grid3 .tiles__line');
            return el ? el.innerHTML : 'No grid3 tiles line found';
        });

        console.log("========== GALLERY HTML ==========");
        console.log(galleryHtml);
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer error:", e);
    }
})();
