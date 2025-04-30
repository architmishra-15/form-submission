// This script can be run after next build to obfuscate client-side JavaScript
// Usage: node scripts/obfuscate.js

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const NEXT_BUILD_DIR = path.join(__dirname, '..', '.next');
const STATIC_CHUNKS_DIR = path.join(NEXT_BUILD_DIR, 'static', 'chunks');

// Options for JavaScript obfuscator
const obfuscatorOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.5,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.2,
  debugProtection: false,
  debugProtectionInterval: 0,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};

/**
 * Recursively traverse directories and obfuscate JavaScript files
 */
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (
      stats.isFile() && 
      (file.endsWith('.js') && !file.endsWith('.server.js') && !file.includes('webpack-')) &&
      !file.endsWith('.js.map')
    ) {
      obfuscateFile(filePath);
    }
  }
}

/**
 * Obfuscate a single JavaScript file
 */
function obfuscateFile(filePath) {
  try {
    console.log(`Obfuscating: ${filePath}`);
    const code = fs.readFileSync(filePath, 'utf8');
    const result = JavaScriptObfuscator.obfuscate(code, obfuscatorOptions);
    fs.writeFileSync(filePath, result.getObfuscatedCode());
  } catch (error) {
    console.error(`Error obfuscating ${filePath}:`, error);
  }
}

console.log('Starting JavaScript obfuscation...');

// Make sure the build directory exists
if (!fs.existsSync(STATIC_CHUNKS_DIR)) {
  console.error(`Build directory not found: ${STATIC_CHUNKS_DIR}`);
  console.error('Please run "npm run build" first.');
  process.exit(1);
}

// Process client-side JavaScript files
processDirectory(STATIC_CHUNKS_DIR);

console.log('JavaScript obfuscation complete!'); 