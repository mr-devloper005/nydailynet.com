/**
 * Wraps a PNG buffer in a valid .ico container (Windows Vista+ PNG-in-ICO).
 * @see https://learn.microsoft.com/en-us/previous-versions/ms997538(v=msdn.10)
 */
import fs from 'node:fs'
import path from 'node:path'

const pngPath = process.argv[2] || path.join('public', 'favicon.png')
const icoPath = process.argv[3] || path.join('public', 'favicon.ico')

const png = fs.readFileSync(pngPath)
if (png[0] !== 0x89 || png.toString('ascii', 1, 4) !== 'PNG') {
  console.error('Input must be a PNG file:', pngPath)
  process.exit(1)
}

const width = png.readUInt32BE(16)
const height = png.readUInt32BE(20)
const wField = width >= 256 ? 0 : width
const hField = height >= 256 ? 0 : height

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // Reserved
header.writeUInt16LE(1, 2) // Type: icon
header.writeUInt16LE(1, 4) // Image count

const entry = Buffer.alloc(16)
entry.writeUInt8(wField, 0)
entry.writeUInt8(hField, 1)
entry.writeUInt8(0, 2) // no palette
entry.writeUInt8(0, 3) // reserved
entry.writeUInt16LE(1, 4) // color planes
entry.writeUInt16LE(32, 6) // bits per pixel (ignored for PNG)
entry.writeUInt32LE(png.length, 8) // size of PNG data
entry.writeUInt32LE(6 + 16, 12) // offset to PNG from start of file

const ico = Buffer.concat([header, entry, png])
fs.writeFileSync(icoPath, ico)
console.log('Wrote', icoPath, `(${ico.length} bytes, ${width}x${height} PNG embedded)`)
