// /@$*#=-&+%
import { inputs } from './inputs.js';

// ================ PART 1 =============================

const testInputs = [

    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.*...+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..',
    '...44.755.',
    '*..44*755.',
]

const charRegex = new RegExp(/[^.^\d^\\\\]/, 'g')
const numberRegex = new RegExp(/\d+/, 'g')

const solution1 = (inputs) => {
    let solution = 0;
    for (let i in inputs) {
        const row = inputs[i]
        const above = inputs[i-1]
        const below = inputs[+i+1]
        let match
        while ((match = numberRegex.exec(row)) !== null) {
            const [num] = match

            const loc = match.index
            const leftIndex = loc === 0 ? loc : loc - 1
            const rightIndex = loc + num.length

            const leftChar = leftIndex === 0 ? '' : row[leftIndex]
            const rightChar = rightIndex === row.length? '' : row[rightIndex]
            const aboveString = above?.substring(leftIndex, rightIndex +1) || ''
            const belowString = below?.substring(leftIndex, rightIndex +1) || ''

            const check = leftChar + rightChar + aboveString + belowString
            const matchCheck = check.match(charRegex)

            if (matchCheck) {
                solution += +num
            }
        }
    }
    return solution
}

// console.log(solution1(testInputs))
// console.log('Part 1:', solution1(inputs));

// ================ PART 2 =============================

const findNums = (str) => {
    if ()
    return (str.match(numberRegex) || [])
}

const asterRegex = new RegExp(/\*/, 'g')

const solution2 = (inputs) => {
    // 1. FIND EVERY *
    // 2. Look left for a number
    // 3. Look right for a number
    // ***ABOVE AND BELOW WILL ONLY BE 3 CHARS LONG ***
    // 4. Look up/down for a number. If:
    //    - . 9 .
    //    - . . 9 
    //    - 9 . .
    //    - 9 9 .
    //    - . 9 9
    //    - 9 9 9  
    //    - ADD one.
    //    - 9 . 9  --  ADD two
    //    - . . .  --  DO NOTHING   

    // IF counter BUSTS 2, continue to next gear.
    // IF at end, counter is 2, add gear ratio

    let solution = 0;
    for (let i in inputs) {
        const row = inputs[i]
        const above = inputs[i-1]
        const below = inputs[+i+1]
        let match
        while ((match = asterRegex.exec(row)) !== null) {
            console.log('match', match);
            // const touches = [];
            const [num] = match

            const loc = match.index

            // bounding box
            let up = above?.substring(loc - 1, loc + 2) || ''
            let down = below?.substring(loc - 1, loc + 2) || ''
            let left = row.substring(loc - 1, loc) || ''
            let right = row.substring(loc + 1, loc + 2) || ''

            let touches = 0
            const upTouches = (up.match(numberRegex) || []).length
            const downTouches = (down.match(numberRegex) || []).length
            const rightTouches = right.match(numberRegex)
            const leftTouches = left.match(numberRegex)

            if (rightTouches) touches++
            if (leftTouches) touches++
            if (upTouches) touches += upTouches
            if (downTouches) touches += downTouches

            // console.log('touches', touches, {upTouches, downTouches, left: left.match(numberRegex),right: right.match(numberRegex),})
            if (touches != 2) continue;
            console.log('match found. proceed to calculation');
            
            let ratios = [];
            if (upTouches !== 0) {
                // if all three digits are above
                if (up.match(numberRegex)[0].length === 3) {
                    ratios.push(+up.match(numberRegex)[0]);
                    console.log('UPPER', up.match(numberRegex));
                }
                // ratios = findNums(above.substring(loc - 3, loc + 4))
            }
            if (downTouches !== 0) {
                console.log('2 below');
                // ratios = findNums(below.substring(loc - 3, loc + 4))
            }
            if (leftTouches) {
                console.log('left');
                ratios.push(findNums(row.substring(loc - 3, loc))[0])
            }
            if (rightTouches) {
                console.log('right');
                ratios.push(findNums(row.substring(loc +1, loc + 4))[0])
            }
            console.log('ratios', ratios);
            const leftIndex = loc - 3
            const rightIndex = loc + num.length

            // const leftChars = row.substring(leftIndex, loc)
            // const rightChars = row.substring(rightIndex, rightIndex + 3)
            // const aboveString = above?.substring(leftIndex, rightIndex +1) || ''
            // const belowString = below?.substring(leftIndex, rightIndex +1) || ''

            
            // const aboveMatchesCount = [...aboveString.matchAll(numberRegex)].length
            // console.log('aboveMatchesCount', aboveMatchesCount, aboveString, [...aboveString.matchAll(numberRegex)])
            // const belowMatchesCount = [...belowString.matchAll(numberRegex)].length
            // console.log('belowMatchesCount', belowMatchesCount, belowString, [...belowString.matchAll(numberRegex)])
            // const leftMatchCount = [...leftChar.matchAll(numberRegex)].length
            // console.log('leftMatchCount', leftMatchCount, leftChar, [...leftChar.matchAll(numberRegex)])
            // const rightMatchCount = [...rightChar.matchAll(numberRegex)].length
            // console.log('rightMatchCount', rightMatchCount, rightChar, [...rightChar.matchAll(numberRegex)])
            // const twoTouches = aboveMatchesCount + belowMatchesCount + leftMatchCount + rightMatchCount === 2
            // console.log('twoTouches', twoTouches, {aboveMatchesCount, belowMatchesCount, leftMatchCount, rightMatchCount}, aboveMatchesCount + belowMatchesCount + leftMatchCount + rightMatchCount);

            /**
             * Instead of 1 on the LEFT and RIGHT, get 3 chars, 
             * and check to see if the first (on the right) or last (on the left) is a numeral.
             * Then do a regex match and get the number.
             * 
             * For the top and the bottom, split by '.'
             */

            // if (!twoTouches) {
            //     console.log('nope');

            //     continue;
            // }
            // console.log('matches', matches);
            // console.log('check', aboveString, [...aboveString.matchAll(numberRegex)].length)

            // if (matchCheck) {
            //     solution += +num
            // }
        }
    }
    return solution
}

console.log(solution2(testInputs))
// console.log('Part 2:', solution2(testInputs2));

