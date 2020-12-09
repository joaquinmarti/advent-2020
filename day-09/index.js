const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((n) => parseInt(n)));
    })
  })
}

//

function canSum(preamble, number) {
  return !preamble.every(x => !~preamble.indexOf(number - x));
}

function sumArray(numbers) {
  return numbers.reduce((total, number) => total + number);
};

//

const PREAMBLE_SIZE = 25;

function calcResultA(input) {
  for (let i = PREAMBLE_SIZE; i < input.length; i++) {
    const number = input[i];

    if (!canSum(input.slice(i - PREAMBLE_SIZE, i), number)) {
      return number;
    }
  }
}

function calcResultB(input) {
  const numberToFind = calcResultA(input);
  const result = [];

  initialLoop: for (let x = 0; x < input.length; x++) {
    contiguousLoop: for (let y = x + 1; y < input.length; y++) {
      let numbersToSum = input.slice(x, y);
      let sumContiguous = sumArray(numbersToSum);

      if (sumContiguous > numberToFind) {
        break contiguousLoop;
      }

      if (sumContiguous === numberToFind) {
        result.push(...numbersToSum);
        break initialLoop;
      }
    }
  }

  //
  result.sort((a, b) => a - b);

  return result[0] + result[result.length - 1];
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();