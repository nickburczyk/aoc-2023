import fs from 'fs';
import path from 'path';

// Get input file path from command line args
const dir = process.argv[2];

// Rest of logic remains the same
const lines = fs.readFileSync(`${dir}/inputs.txt`, 'utf8').split('\n');
const linesAsStrings = lines.map(line => `'${line}'`)
const output = `
export const inputs = [
    ${linesAsStrings.join(',\n    ')}
];
`

// Output file name is input filename + .js
const outputFile = path.join(dir, 'inputs.js'); 

// Write output 
fs.writeFileSync(outputFile, output);
