const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(
        data.split('\n\n').map(p => p.replace(/(?:\r\n|\r|\n)/g, ' ').split(' '))
      );
    })
  })
}

//

function calcResultDay6A(input) {
  return input.reduce((total, group) => total + new Set(group.join('').split('')).size, 0);
}

function calcResultDay6B(input) {
  return input.reduce((total, group) => {
    const signature = group.join('');

    return total + [...new Set(signature.split(''))].filter((letter) => {
      return signature.match(new RegExp(letter, 'g')).length === group.length;
    }).length;
  }, 0);
}

async function start() {
  const input = await readInput();
  console.log(calcResultDay6A(input));
  console.log(calcResultDay6B(input));
}

start();