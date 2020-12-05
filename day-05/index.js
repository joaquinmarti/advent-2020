const fs = require('fs');

function readBoardingPasses() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

//

function sliceBP(bp) {
  return [bp.slice(0, 7), bp.slice(-3)];
}

function calcID(row, column) {
  const rowNumber = parseInt(row.replace(/F/g, '0').replace(/B/g, '1'), 2);
  const columnNumber = parseInt(column.replace(/L/g, '0').replace(/R/g, '1'), 2);
  return rowNumber * 8 + columnNumber;
}

//

function calcResultDay5A(bps) {
  return bps.reduce((highest, bp) => {
    const id = calcID(...sliceBP(bp));
    return id > highest ? id : highest;
  }, 0);
}

function calcResultDay5B(bps) {
  return bps.map((bp) => calcID(...sliceBP(bp)))
  .sort((a, b) => a - b)
  .find((id, index, ids) => id - ids[index - 1] > 1) - 1;
}

async function start() {
  const bps = await readBoardingPasses();
  console.log(calcResultDay5A(bps));
  console.log(calcResultDay5B(bps));
}

start();