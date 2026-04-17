const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace Registry -> RSVP in navigation
html = html.replace(/>Registry<\/span>/g, '>RSVP</span>');

// 2. Replace the #registry text block with RSVP text
const oldTextRegex = /We have <em>most things<\/em> we need for life and love\.\s*If you want to bless us with a gift, we can always use cash gifts as we move to our new\s*place\. That said, we know some people prefer to buy gifts off a<!-- -->\s*<em>registry<\/em>\. We created ours at Bed Bath &amp; Beyond\. Either way, we would\s*appreciate your prayers and well wishes as we start this journey together!<!-- -->/g;

const newText = `Please let us know if you can make it! To RSVP, please contact the numbers below:<br><br><strong>RSVP:</strong><br><a href="tel:0240220468" style="color: inherit; text-decoration: underline;">0240220468</a><br><a href="tel:0266356418" style="color: inherit; text-decoration: underline;">0266356418</a>`;

html = html.replace(oldTextRegex, newText);

// 3. Replace "Our wedding registry" with Google Maps "View Directions"
const oldLinkRegex = /<a class="bb-link"[\s\n]*href="[^"]*"[\s\n]*target="_blank"[\s\n]*data-scroll="true"[\s\n]*data-scroll-speed="3"[\s\n]*data-scroll-target="#registry">Our wedding registry<\/a>/g;

const newLink = `<a class="bb-link" href="https://www.google.com/maps/search/?api=1&query=Garu+-+Sabongari+Braimah%27s+House" target="_blank" data-scroll="true" data-scroll-speed="3" data-scroll-target="#registry">View Directions</a>`;

html = html.replace(oldLinkRegex, newLink);

fs.writeFileSync('index.html', html);
console.log('Update successful!');
