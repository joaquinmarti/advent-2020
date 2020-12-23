const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((i) => [i[0], parseInt(i.slice(1, i.length))]));
    })
  })
}


//

function calcResultA(input) {
}

function calcResultB(input) {

}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();