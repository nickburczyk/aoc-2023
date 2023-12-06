
import { inputs } from './inputs.js';

const testInputs = [
  'seeds: 79 14 55 13',
  '',
  'seed-to-soil map:',
  '50 98 2',
  '52 50 48',
  '',
  'soil-to-fertilizer map:',
  '0 15 37',
  '37 52 2',
  '39 0 15',
  '',
  'fertilizer-to-water map:',
  '49 53 8',
  '0 11 42',
  '42 0 7',
  '57 7 4',
  '',
  'water-to-light map:',
  '88 18 7',
  '18 25 70',
  '',
  'light-to-temperature map:',
  '45 77 23',
  '81 45 19',
  '68 64 13',
  '',
  'temperature-to-humidity map:',
  '0 69 1',
  '1 0 69',
  '',
  'humidity-to-location map:',
  '60 56 37',
  '56 93 4',
]
// ================ PREPARE ============================
const MAP_ORDER = [
  'seed-to-soil',
  'soil-to-fertilizer', 
  'fertilizer-to-water', 
  'water-to-light', 
  'light-to-temperature', 
  'temperature-to-humidity', 
  'humidity-to-location'
]

const mapInputs = (lines) => {
  const result ={}
  let currentKey
  lines.forEach((line, i, lines) =>{
    if (line === '') return;

    if (i === 0) {
      currentKey = 'seeds'
      result[currentKey] = line.substring(7).trim().split(/\s+/).map(Number)
      return;
    }
    if (line.includes(':')) {
      currentKey = line.split(' map:')[0];
      result[currentKey] = []
      return
    }

    result[currentKey].push(line.trim().split(/\s+/).map(Number))
  })
  return result
}
const data = mapInputs(inputs)

// ================ PART 1 =============================

const findPlantingLocation = (query, mapIndex) => {
  if (mapIndex === MAP_ORDER.length) return query
  const guide = MAP_ORDER[mapIndex]
  let nextDestination
  data[guide].forEach((line, lineIndex) => {
    if (nextDestination !== undefined) return;

    const [location, source, range] = line
    if (query >= source && query <= source + range) {
      nextDestination = location + (query - source)
      return
    } else if (lineIndex === data[guide].length - 1 && !nextDestination) {
      nextDestination = query
    }
  })
  return findPlantingLocation(nextDestination, mapIndex + 1)
}

const solution1 = (data) => {
  let closestLocation
  for (let seed of data.seeds) {
    const plantingLocation = findPlantingLocation(seed, 0)
    if (closestLocation === undefined || plantingLocation < closestLocation) {
      closestLocation = plantingLocation
    }
  }
  return closestLocation
}

// console.log(solution1(data))
console.log('Part 1:', solution1(data));

// // ================ PART 2 =============================

// const testInputs2 = [

// ]

// const solution2 = (inputs) => {
//     console.log(inputs)
//     // CODE GOES HERE
// }

// // console.log(solution2(testInputs2))
// console.log('Part 2:', solution2(testInputs2));

