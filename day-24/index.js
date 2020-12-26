const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

//

const DIMENSION = 500; // Random number big enough to cover the hex grid

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
  return index + (DIMENSION / 2); // The starting point in the hex grid
}

function tilesSetup(dimension) {
  const tiles = Array.from(Array(dimension), () => Array.from(Array(dimension)));

  tiles.forEach((tilesRow, x) => {
    tilesRow.forEach((tile, y) => {
      if ((x + y) % 2 === 0) {
        tiles[x][y] = false;
      }
    });
  });

  return tiles;
}

function initialTilesSetup(input) {
  const tiles = tilesSetup(DIMENSION); // Bidimensional array to hold tiles status

  input.forEach((instructions) => {
    const directions = identifyDirections(instructions);

    const tileToFlip = directions.reduce((tile, direction) => {
      return navigate(tile, direction);
    }, [0, 0]);

    tiles[inc(tileToFlip[0])][inc(tileToFlip[1])] = !tiles[inc(tileToFlip[0])][inc(tileToFlip[1])];
  });

  return tiles;
}

function countBlackTiles(tiles) {
  return tiles.reduce((total, tileRow) => {
    return total + tileRow.filter(tile => tile === true).length;
  }, 0);
}

//

function findTile(tiles, x, y) {
  if (x > 0 && y > 0 && x < DIMENSION && y < DIMENSION ) {
    return tiles[x][y];
  }
}

function countAdjacentBlackTiles(tiles, x, y) {
  const e = navigate([x, y], 'e');
  const se = navigate([x, y], 'se');
  const sw = navigate([x, y], 'sw');
  const w = navigate([x, y], 'w');
  const nw = navigate([x, y], 'nw');
  const ne = navigate([x, y], 'ne');

  const adjacentTiles = [
    findTile(tiles, e[0], e[1]),
    findTile(tiles, se[0], se[1]),
    findTile(tiles, sw[0], sw[1]),
    findTile(tiles, w[0], w[1]),
    findTile(tiles, nw[0], nw[1]),
    findTile(tiles, ne[0], ne[1]),
  ];


  return adjacentTiles.filter(tile => tile === true).length;
}

function flipTile(tiles, x, y) {
  const adjacentBlackTiles = countAdjacentBlackTiles(tiles, x, y);
  const tile = tiles[x][y];

  if (tile && (adjacentBlackTiles === 0 || adjacentBlackTiles > 2)) {
    return false; // Turn to white
  }

  if (!tile && adjacentBlackTiles === 2) {
    return true; // Turn to black
  }

  return tile;
}

function transformTilesSetup(tiles) {
  const newTiles = tilesSetup(DIMENSION);

  tiles.forEach((tileRow, x) => {
    tileRow.forEach((tile, y) => {
      newTiles[x][y] = flipTile(tiles, x, y);
    });
  });

  return newTiles;
}

//

function calcResultA(input) {
  const tiles = initialTilesSetup(input);
  return countBlackTiles(tiles);
}

function calcResultB(input) {
  let tiles = initialTilesSetup(input);

  for (let index = 0; index < 100; index++) {
    tiles = transformTilesSetup(tiles);
  }

  return countBlackTiles(tiles);
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();