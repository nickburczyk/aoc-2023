import { inputs } from "./inputs.js";

// ================ PART 1 =============================

const testInputs = [
    '1abc2',
    'pqr3stu8vwx',
    'a1b2c3d4e5f',
    'treb7uchet',
]

const findValue = (value) => {
    const regex = new RegExp(/\d/, 'g');
    const digits = value.match(regex);
    const numeric = +[digits[0], digits[digits.length -1]].join('');
    return numeric
}

const solution1 = (inputs) => 
    inputs.reduce((acc, curr) => acc + findValue(curr), 0)

// console.log(solution1(testInputs))
console.log('Part 1: ',solution1(inputs))


// ================ PART 2 =============================

const testInputs2 = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen'
]

const valueMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

const findValueIncludingNumberNames = (string) => {
    const regex = new RegExp(/\d|one|two|three|four|five|six|seven|eight|nine/, 'g');
    const matches = [];
    let next = regex.exec(string)
    while (next) {
        matches.push(next[0]);
        regex.lastIndex = next.index + 1;
        next = regex.exec(string);
    }
    const a = valueMap[matches[0]] ?? matches[0]
    const b = valueMap[matches[matches.length -1]] ?? matches[matches.length -1]
    return +(a + b)
}

const solution2 = (inputs) => 
    inputs.reduce((acc, curr) => acc + findValueIncludingNumberNames(curr), 0)


// testInputs2.forEach(input => findValueIncludingNumberNames(input))
console.log('Part 2: ',solution2(inputs))