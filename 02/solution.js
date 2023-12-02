
import { inputs } from './inputs.js';

export const testInputs = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
]

// ================ PART 1 =============================

const solution1 = (inputs) => {
    const regex = new RegExp(/Game\s(\d+)|(\d+)\sred|(\d+)\sgreen|(\d+)\sblue/g)
    let solution = 0
    for (let i of inputs) {
        let gameId, match,
            valid = true 
        while (valid && (match = regex.exec(i)) !== null ) {
            const [, id, red, green, blue] = match
            if (id) gameId = +id;
            if (red > 12 || green > 13 || blue > 14) {
                valid = false;
                regex.lastIndex = 0;
            }
        }
        if (!valid) continue;

        solution += gameId 
    }
    return solution;
}

// console.log(solution1(testInputs))
console.log('Part 1:', solution1(inputs));

// ================ PART 2 =============================

const testInputs2 = [
    // SAME INPUTS AS PART 1
]

const solution2 = (inputs) => {
    const regex = new RegExp(/(\d+)\sred|(\d+)\sgreen|(\d+)\sblue/g)
    let solution = 0
    for (let i of inputs) {
        let match,
            maxRed = 0,
            maxGreen = 0,
            maxBlue = 0
        while ((match = regex.exec(i)) !== null ) {
            const [, red, green, blue] = match
            if (+red >= maxRed) maxRed = +red;
            if (+green >= maxGreen) maxGreen = +green;
            if (+blue >= maxBlue) maxBlue = +blue;
        }
        const power = maxRed * maxGreen * maxBlue
        solution += power 
    }
    return solution;
}

// console.log(solution2(testInputs))
console.log('Part 2:', solution2(inputs));

