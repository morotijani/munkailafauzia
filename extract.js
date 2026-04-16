const fs = require('fs');
const path = require('path');

const sourceFile = 'C:\\Users\\tijan\\.gemini\\antigravity\\brain\\d628f417-ba44-4fae-bc79-bb7eb1122b1b\\scratch\\source.html';
const htmlContent = fs.readFileSync(sourceFile, 'utf8');

// 1. EXTRACT CSS
let css = '';
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
while ((match = styleRegex.exec(htmlContent)) !== null) {
    css += match[1] + '\n';
}
fs.writeFileSync(path.join(__dirname, 'assets', 'css', 'styles.css'), css);

// 2. EXTRACT BODY
let bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
let bodyMatch = bodyRegex.exec(htmlContent);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// 3. STRIP GATSBY REACT SCRIPTS
bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

// 4. FIND & REPLACE NAMES
// Exact string replacements prioritizing larger sets first
bodyContent = bodyContent.replace(/Michelle &amp; Tonye/g, 'Munkaila &amp; Fauzia');
bodyContent = bodyContent.replace(/Michelle and Tonye/g, 'Munkaila and Fauzia');
bodyContent = bodyContent.replace(/michelle \+ tonye/g, 'munkaila + fauzia');
bodyContent = bodyContent.replace(/michelle&amp;tonye/g, 'munkaila&amp;fauzia');

// Individual fallbacks (careful not to over-replace classes)
bodyContent = bodyContent.replace(/Michelle/g, 'Fauzia');
bodyContent = bodyContent.replace(/Tonye/g, 'Munkaila');
bodyContent = bodyContent.replace(/michelle/g, 'fauzia');
bodyContent = bodyContent.replace(/tonye/g, 'munkaila');
// Except for css classes that might be "tonye-michelle", let's fix them if broken later.
// The CSS has `.tonye-michelle` classes. We swapped them.
// Wait, we swapped "tonye" -> "munkaila" and "michelle" -> "fauzia".
// That means the class `.tonye-michelle` turned into `.munkaila-fauzia`.
// We need to swap the CSS classes as well to match!
let patchedCss = fs.readFileSync(path.join(__dirname, 'assets', 'css', 'styles.css'), 'utf8');
patchedCss = patchedCss.replace(/tonye-michelle/g, 'munkaila-fauzia');
patchedCss = patchedCss.replace(/tonye-gallery/g, 'munkaila-gallery');
fs.writeFileSync(path.join(__dirname, 'assets', 'css', 'styles.css'), patchedCss);

bodyContent = bodyContent.replace(/tonye-gallery/g, 'munkaila-gallery');

// 5. INJECT OUR PLACEHOLDER IMAGES
// Replacing their main CDN images with our generated placeholders
bodyContent = bodyContent.replace(/https:\/\/d33wubrfki0l68\.cloudfront\.net[^"']*\.(jpg|webp|jpeg|png)/gi, 'assets/images/wedding_hero_1776355849744.png');

// 6. BUILD FINAL STATIC HTML
const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Munkaila & Fauzia | Wedding Day</title>
    <!-- We link their EXACT styles plus ours for safety -->
    <link rel="stylesheet" href="assets/css/styles.css">
    
    <!-- Locomotive Scroll Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css">
</head>
<body>
    ${bodyContent}
    
    <!-- Locomotive Scroll & Custom Logic -->
    <script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), newHtml);

console.log("Extraction complete!");
