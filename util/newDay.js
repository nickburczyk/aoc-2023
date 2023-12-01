// newDay.js
import fs from 'fs';
import path from 'path';

// Get folder name from command line arg
const folderName = process.argv[2];

// Folder paths
const folderPath = path.join(process.cwd(), folderName);
const files = {
  solution: path.join(folderPath, 'solution.js'),
  inputs: path.join(folderPath, 'inputs.txt'), 
  puzzle: path.join(folderPath, 'puzzle.md')
};

const solutionBoilerplate = `
import { inputs } from './inputs.js';

// ================ PART 1 =============================

const testInputs = [

]

const solution1 = (inputs) => {
    console.log(inputs)
    // CODE GOES HERE
}

// console.log(solution1(testInputs))
console.log('Part 1:', solution1(testInputs));

// ================ PART 2 =============================

const testInputs2 = [

]

const solution2 = (inputs) => {
    console.log(inputs)
    // CODE GOES HERE
}

// console.log(solution2(testInputs2))
console.log('Part 2:', solution2(testInputs2));

`

// Create folder 
fs.mkdirSync(folderPath);

// Create empty files
for(let file in files) {
    if (file === 'solution') {
        fs.writeFileSync(files[file], solutionBoilerplate);
        continue;
    }
    fs.writeFileSync(files[file], '');
}
