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
    return map.filter((row, index) => index % down === 0 && row[index * right / down % row.length] === '#').length;
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