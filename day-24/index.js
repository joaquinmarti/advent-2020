const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

function navigate(coordinates, direction) {
  switch(direction) {
    case 'e':
      return [coordinates[0], coordinates[1] + 2]
    case 'w':
      return [coordinates[0], coordinates[1] - 2];
    case 'se':
      return [coordinates[0] + 1, coordinates[1] + 1];
    case 'sw':
      return [coordinates[0] + 1, coordinates[1] - 1];
    case 'ne':
      return [coordinates[0] - 1, coordinates[1] + 1];
    case 'nw':
      return [coordinates[0] - 1, coordinates[1] - 1];
  }
}

function identifyDirections(instructions) {
  const directions = [];
  let pointer = 0;

  while (pointer < instructions.length) {
    let slice1 = instructions.slice(pointer, pointer + 1);
    let slice2 = instructions.slice(pointer, pointer + 2);

    if (slice1 === 'e' || slice1 === 'w') {
      directions.push(slice1);
      pointer += 1;
    } else {
      directions.push(slice2);
      pointer += 2;
    }
  }

  return directions;
}

function inc(index) {
  return index + 50; // The starting point in the hex grid: (50, 50)
}

//

function calcResultA(input) {
  const tiles = [];

  input.forEach((instructions) => {
    const directions = identifyDirections(instructions);

    const tileToFlip = directions.reduce((tile, direction) => {
      return navigate(tile, direction);
    }, [0, 0]);

    if (!tiles[inc(tileToFlip[0])]) {
      tiles[inc(tileToFlip[0])] = [];
    }

    tiles[inc(tileToFlip[0])][inc(tileToFlip[1])] = !tiles[inc(tileToFlip[0])][inc(tileToFlip[1])];
  });

  return tiles.reduce((total, tileRow) => {
    return total + tileRow.filter(tile => tile === true).length;
  }, 0);
}

function calcResultB(input) {

}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();