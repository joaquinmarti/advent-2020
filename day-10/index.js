const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((n) => parseInt(n)).sort((a, b) => a - b));
    })
  })
}

//

function countConnectable(joltToConnect, nextJolts) {
  return nextJolts.filter((jolt) => {
    return jolt - joltToConnect <= 3;
  });
}

//

function calcResultA(input) {
  const total = input.reduce((result, jolt) => {
    result.difference[jolt - result.current - 1] += 1;
    result.current = jolt;
    return result;
  }, {
    current: 0,
    difference: [0, 0, 1], // Third number starts with 1 because of the last jolt/device difference
  });

  return total.difference[0] * total.difference[2];
}

function calcResultB(input) {
  let totalBranches = 1;

  const allNodes = [0, ...input];

  allNodes.reduce((nodes, jolt, index) => {
    const connectable = countConnectable(jolt, allNodes.slice(index + 1, index + 4));

    // Count the occurrences of each node
    connectable.forEach((child) => {
      nodes[child.toString()] = (nodes[child.toString()] || 0) + nodes[jolt.toString()];
    });

    // Increase the branchs number when node has more than one child
    if (connectable.length > 1) {
      totalBranches += nodes[jolt.toString()] * (connectable.length - 1);
    }

    return nodes;
  }, {'0': 1}); // 0 is the starting node

  return totalBranches;
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();