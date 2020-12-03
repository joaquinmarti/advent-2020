const fs = require('fs');

function readMap() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n'));
    })
  })
}

//

function findTrees(map) {
  return function(right, down) {
    let position = 0;
    return map.reduce((total, row, index) => {
      // Avoid processing rows depending on the "down" value
      if (index % down !== 0) {
        return total;
      }

      // Back to the beginning of the string if position excedes the limit
      if (position >= row.length) {
        position = position - row.length;
      }

      const sumTree = row.charAt(position) === '#' ? 1 : 0;

      //
      position = position + right;

      return total + sumTree;
    }, 0);
  }
}

//

function calcResultDay3A(map) {
  const jump = findTrees(map);
  return jump(3, 1);
}

function calcResultDay3B(map) {
  const jump = findTrees(map);
  return jump(1, 1) * jump(3, 1) * jump(5, 1) * jump(7, 1) * jump(1, 2);
}

async function start() {
  const map = await readMap();
  console.log(calcResultDay3A(map));
  console.log(calcResultDay3B(map));
}

start();