const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
    const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
    const pngPath = path.join(__dirname, '..', 'public', 'favicon.png');
    const ico32Path = path.join(__dirname, '..', 'public', 'favicon-32x32.png');
    const ico16Path = path.join(__dirname, '..', 'public', 'favicon-16x16.png');

    // Read the SVG file
    const svgBuffer = fs.readFileSync(svgPath);

    // Generate main PNG favicon
    await sharp(svgBuffer)
        .resize(192, 192)
        .png()
        .toFile(pngPath);

    // Generate 32x32 favicon
    await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toFile(ico32Path);

    // Generate 16x16 favicon
    await sharp(svgBuffer)
        .resize(16, 16)
        .png()
        .toFile(ico16Path);

    console.log('Favicons generated successfully!');
}

generateFavicon().catch(console.error);
