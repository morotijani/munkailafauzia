const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The gallery images are div elements with class "tiles__line-img gallery-img" 
// and an inline style for background-image. 
// Let's replace them with img tags and add the missing 'expand-gallery' class!

html = html.replace(/<div class="tiles__line-img gallery-img"\s*style="background-image:url\(([^)]+)\)"><\/div>/g, 
    '<img class="tiles__line-img gallery-img expand-gallery" src="$1" style="object-fit:cover; aspect-ratio:3/4; display:block;">');

fs.writeFileSync('index.html', html);
console.log('Fixed Gallery HTML');
