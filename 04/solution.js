
import { inputs } from './inputs.js';

// ================ PART 1 =============================

const testInputs = [
    'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
    'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
]

const regex = /Card\s+\d+:\s+([\d\s]+)\s\|\s([\d\s]+)/

const solution1 = (inputs) => {
    let result = 0
    for (let input of inputs) {
        let total = 0
        const winners = new Set(input.match(regex)[1].split(/\s+/))
        input.match(regex)[2].split(/\s+/).forEach(guess => {
            if (!winners.has(guess)) return;

            total = total === 0 ? 1 : total *= 2
        })  
        result += total
    }
    return result
};

// ================ PART 2 =============================
const newCard = (index, matches) => ({id: index + 1, copies: 1, matches})

const solution2 = (inputs) => {
    let numberOfCards = 0
    const record = new Array(inputs.length)
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        let hits = 0
        const winners = new Set(input.match(regex)[1].split(/\s+/))
        input.match(regex)[2].split(/\s+/).forEach(guess => {
            console.log('guess', guess, winners.has(guess));
            if (!winners.has(guess)) return;
            hits += 1
        })
        record[i] = newCard(i, hits)
    }
    
    // loop over and add copies to cards
    for (let i = 0; i < record.length; i++) {
        const {id, matches, copies} = record[i]
        let forwardIndex = i + 1;
        while (forwardIndex < id + matches) {
            let forwardCard = record[forwardIndex]
            forwardCard.copies += copies
            forwardIndex++
        }
        numberOfCards += copies
    }
    
    return numberOfCards
}

// console.log(solution2(testInputs2))
console.log('Part 2:', solution2(inputs));

