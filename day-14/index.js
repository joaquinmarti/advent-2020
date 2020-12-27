const { log } = require('console');
const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

function processValue(value, mask) {
  let binaryValue = String('000000000000000000000000000000000000' + value.toString(2)).slice(-36).split('');

  [...mask].forEach((char, index) => {
    if (char === '0' || char === '1') {
      binaryValue[index] = char;
    }
  });

  return parseInt(binaryValue.join(''), 2);
}

//

function calcResultA(input) {
  const mem = [];
  let mask = '';

  const maskStart = 'mask = ';
  const memStart = 'mem[';

  input.forEach((line) => {
    const isLine = line.indexOf(maskStart);
    const isMask = line.indexOf(memStart);

    if (isLine === 0) {
      mask = line.substr(maskStart.length);
    }

    if (isMask === 0) {
      let address = line.substring(memStart.length, line.indexOf(']'));
      let value = +line.substr(line.indexOf('=') + 2);

      mem[address] = processValue(value, mask);
    }
  });

  return mem.reduce((total, value) => total + value, 0);
}

function calcResultB(input) {

}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();