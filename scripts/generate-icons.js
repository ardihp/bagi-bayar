/**
 * Script to generate PWA placeholder icons for Bagi Bayar app
 * Creates simple colored squares with "B" initial
 * 
 * Run with: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Theme color: #0ea5e9 (sky blue)
// RGB: 14, 165, 233

/**
 * Creates a minimal PNG file with a solid color background
 * This creates a valid PNG without external dependencies
 */
function createPNG(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk (image header)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);   // width
  ihdrData.writeUInt32BE(height, 4);  // height
  ihdrData.writeUInt8(8, 8);          // bit depth
  ihdrData.writeUInt8(2, 9);          // color type (RGB)
  ihdrData.writeUInt8(0, 10);         // compression
  ihdrData.writeUInt8(0, 11);         // filter
  ihdrData.writeUInt8(0, 12);         // interlace
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // IDAT chunk (image data)
  // Create raw image data (filter byte + RGB for each pixel per row)
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter byte (none)
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b);
    }
  }
  
  // Compress using zlib (deflate)
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  
  // IEND chunk (image end)
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

/**
 * Creates a PNG chunk with type, data, and CRC
 */
function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);
  
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);
  
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

/**
 * CRC32 calculation for PNG chunks
 */
function crc32(data) {
  let crc = 0xffffffff;
  const table = makeCRCTable();
  
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff];
  }
  
  return crc ^ 0xffffffff;
}

function makeCRCTable() {
  const table = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}

// Icon configurations
const icons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-icon.png', size: 180 },
];

// Theme color RGB values (#0ea5e9)
const themeColor = { r: 14, g: 165, b: 233 };

// Ensure icons directory exists
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate icons
icons.forEach(({ name, size }) => {
  const png = createPNG(size, size, themeColor.r, themeColor.g, themeColor.b);
  const filePath = path.join(iconsDir, name);
  fs.writeFileSync(filePath, png);
  console.log(`Created: ${filePath} (${size}x${size})`);
});

console.log('\nAll PWA icons generated successfully!');
