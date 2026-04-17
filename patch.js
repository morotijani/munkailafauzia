const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace all Livestream links
html = html.replace(/href="https:\/\/fauziamunkaila\.app\.rsvpify\.com\/"\s*target="_blank">Livestream<\/span>/g, 'href="#gift-support">Gift Support</span>');

// Handle any edge cases where target="_blank" might be omitted or formatted differently
html = html.replace(/>Livestream<\/span>/g, '>Gift Support</span>');

// 2. Create the new section based on the registry structure
const newSection = `
                        <section data-scroll-section="true" class="content content--numbered2" id="gift-support">
                            <div class="navigation-cmp ">
                                <div class="navigation" data-scroll="true" data-scroll-speed="5"
                                    data-scroll-direction="vertical"><span class="item " href="#when">When &amp;
                                        Where</span><span class="item " href="#story">Our Story</span><span
                                        class="item ">Registry</span><span class="item active"
                                        href="#gift-support">Gift Support</span><span class="item " href="#gallery">Gallery</span></div>
                            </div><span class="happy" data-scroll="true" data-scroll-speed="7"
                                data-scroll-target="#gift-support"></span>
                            <p class="content__text" data-scroll="true" data-scroll-speed="2"
                                data-scroll-target="#gift-support">We have <em>most things</em> we need for life and love.
                                If you want to bless us with a gift, we can always use cash gifts as we move to our new
                                place.<br><br>
                                <strong>Abednego Teye Tetteh</strong><br>
                                MoMo Number<br>
                                0552711620<br><br>
                                <strong>Barbarah Ankomah</strong><br>
                                MoMo Number<br>
                                0248305750
                            </p>
                            <span class="number" data-scroll="true" data-scroll-speed="3">G S</span>
                        </section>
`;

if (!html.includes('id="gift-support"')) {
    html = html.replace('<section data-scroll-section="true" class="tiles tiles--columns" id="grid3">', newSection + '\n                        <section data-scroll-section="true" class="tiles tiles--columns" id="grid3">');
}

fs.writeFileSync('index.html', html);
console.log('Update successful!');
