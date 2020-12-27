const { log } = require('console');
const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

function to36bit(value) {
  return String('000000000000000000000000000000000000' + value.toString(2)).slice(-36).split('');
}

function processValue(value, mask) {
  let binaryValue = to36bit(value);

  [...mask].forEach((char, index) => {
    if (char === '0' || char === '1') {
      binaryValue[index] = char;
    }
  });

  return parseInt(binaryValue.join(''), 2);
}

function processAddress(address, mask) {
  const addresses = [];
  let binaryValue = to36bit(address);

  [...mask].forEach((char, index) => {
    if (char === 'X' || char === '1') {
      binaryValue[index] = char;
    }
  });

  let binaryString = binaryValue.join('');

  const countX = (binaryString.match(/X/g) || []).length;
  const posibleValues = Array(countX).fill([0, 1]);
  const combinations = posibleValues.reduce((a, b) => a.flatMap(x => b.map(y => x + y)), ['']);

  combinations.map((combination) => {
    let counter = -1;
    let addressArray = binaryString.split('');
    let address = addressArray.map((char) => {
      if (char === 'X') {
        counter += 1;
        return combination[counter];

      }

      return char;
    }).join('');

    addresses.push(parseInt(address, 2));
  });

  return addresses;
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
  const mem = {};
  let mask = '';

  const maskStart = 'mask = ';
  const memStart = 'mem[';

  input.forEach((line, index) => {
    const isLine = line.indexOf(maskStart);
    const isMask = line.indexOf(memStart);

    if (isLine === 0) {
      mask = line.substr(maskStart.length);
    }

    if (isMask === 0) {
      let address = +line.substring(memStart.length, line.indexOf(']'));
      let value = +line.substr(line.indexOf('=') + 2);
      let posibleAddresses = processAddress(address, mask);

      posibleAddresses.forEach((address) => {
        mem[parseInt(address, 10)] = value;
      })
    }
  });

  let result = 0;

  for (const prop in mem) {
    result += mem[prop];
  }

  return result;
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();