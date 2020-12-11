const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map(s => s.split('')));
    })
  })
}

//

function countAdjacent(seatsLayout, x, y) {
  const previousColumn = y > 0 ? y - 1 : 0;
  const nextColumn = y < seatsLayout[0].length - 1 ? y + 2 : y + 1; // + 2 because we use it in slice function later

  const seats = [];

  // Previous row
  if (x > 0) {
    seats.push(...seatsLayout[x - 1].slice(previousColumn, nextColumn));
  }

  seats.push(seatsLayout[x][y - 1], seatsLayout[x][y + 1]);

  // Next row
  if (x < seatsLayout.length - 1) {
    seats.push(...seatsLayout[x + 1].slice(previousColumn, nextColumn));
  }

  return seats.filter(s => s === '#').length;
}

function countDiagonal(seatsLayout, x, y) {
  const rowsNumber = seatsLayout.length - 1;
  const colsNumber = seatsLayout[0].length - 1;

  // Calculate directions
  const up = [...Array(x).keys()].map((z => [z, y])).reverse();
  const down = [...Array(rowsNumber - x).keys()].map((z => [x + z + 1, y]));
  const left = [...Array(y).keys()].map((z => [x, z])).reverse();
  const right = [...Array(colsNumber - y).keys()].map((z => [x, y + z + 1]));
  const upleft = [...Array(Math.min(x, y)).keys()].map((z => [x - z - 1, y - z - 1]));
  const downleft = [...Array(Math.min(rowsNumber - x, y)).keys()].map((z => [x + z + 1, y - z - 1]));
  const upright = [...Array(Math.min(x, colsNumber - y)).keys()].map((z => [x - z - 1, y + z + 1]));
  const downright = [...Array(Math.min(rowsNumber - x, colsNumber - y)).keys()].map((z => [x + z + 1, y + z + 1]));

  // Count seats for every direction
  return [up, down, left, right, upleft, downleft, upright, downright].filter(direction => {
    for (let index = 0; index < direction.length; index++) {
      let coordinates = direction[index];
      let seat = seatsLayout[coordinates[0]][coordinates[1]];
      if (seat === '#') {
        return true;
      } else if (seat === 'L') {
        return false;
      }
    }

    return false;
  }).length;
}

function round(seatsLayout, countOccupied, threshold) {
  const newLayout = copyLayout(seatsLayout);

  for (let x = 0; x < seatsLayout.length; x++) {
    for (let y = 0; y < seatsLayout[x].length; y++) {
      let occupied = countOccupied(seatsLayout, x, y);

      if (seatsLayout[x][y] === 'L' && occupied === 0) {
        newLayout[x][y] = '#';
      } else if (seatsLayout[x][y] === '#' && occupied >= threshold) {
        newLayout[x][y] = 'L';
      }
    }
  }

  return newLayout;
}

//

function serializeLayout(seatsLayout) {
  return seatsLayout.map(r => r.join('')).join('');
}

function copyLayout(seatsLayout) {
  return seatsLayout.map(r => r.map(c => c)); // Clone deep the array
}

function countLayoutSeats(serializedLayout) {
  return (serializedLayout.match(/\#/g) || []).length;
}

//

function processLayouts(seatsLayout, countOccupied, threshold) {
  const serializedLayouts = [];
  let repeated = false;
  let layout = copyLayout(seatsLayout);
  let serialized = '';

  while (!repeated) {
    layout = round(layout, countOccupied, threshold);
    serialized = serializeLayout(layout);

    if (~serializedLayouts.indexOf(serialized)) {
      repeated = true;
    }

    serializedLayouts.push(serialized);
  }

  return countLayoutSeats(serializedLayouts[serializedLayouts.length - 1]);
}

//

function calcResultA(input) {
  return processLayouts(input, countAdjacent, 4);
}

function calcResultB(input) {
  return processLayouts(input, countDiagonal, 5);
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();