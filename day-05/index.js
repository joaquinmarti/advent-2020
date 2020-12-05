const fs = require('fs');

function readBoardingPasses() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

//

const calcID = (bp) => parseInt(bp.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2);

//

function calcResultDay5A(bps) {
  return bps.reduce((highest, bp) => {
    const id = calcID(bp);
    return id > highest ? id : highest;
  }, 0);
}

function calcResultDay5B(bps) {
  return bps.map((bp) => calcID(bp))
  .sort((a, b) => a - b)
  .find((id, index, ids) => id - ids[index - 1] > 1) - 1;
}

async function start() {
  const bps = await readBoardingPasses();
  console.log(calcResultDay5A(bps));
  console.log(calcResultDay5B(bps));
}

start();