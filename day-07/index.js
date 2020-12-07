const fs = require('fs');

function readInput() {
  const rules = {};
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      data.split('\n').forEach((rule) => {
        const [key, contains] = rule.split(' bags contain ');
        const bags = contains.split(', ').map(canContain => {
          const bag = canContain.substring(canContain.indexOf(' ') + 1, canContain.indexOf('bag') - 1);
          const number = parseInt(canContain.substring(0, canContain.indexOf(' '))) || 0;
          return {
            bag,
            number,
          }
        });

        rules[key] = bags;
      });

      resolve(rules);
    })
  })
}

//

function calcResultDay5A(input) {
  const nodesVisited = [];

  function findParents(bagToFind) {
    return Object.keys(input).filter((node) => {
      return input[node].some((child) => child.bag === bagToFind && child.number > 0);
    });
  }

  function findAllParents(bagToFind) {
    findParents(bagToFind, input).forEach((parent) => {
      if (!~nodesVisited.indexOf(parent)) {
        nodesVisited.push(parent);
        findAllParents(parent, input);
      }
    });
  }

  //
  findAllParents('shiny gold');

  //
  return nodesVisited.length;
}

function calcResultDay5B(input) {
  let individual = 0;

  //
  function getBagsForChild(bag, child) {
    return input[bag].find((childBag) => childBag.bag === child.bag).number;
  }

  function findChildren(bag) {
    return input[bag].filter((childBag) => childBag.number > 0);
  }

  function calcTotalBags(bag, parentBags) {
    findChildren(bag).forEach((child) => {
      const totalBags = parentBags * getBagsForChild(bag, child)

      //
      individual += totalBags;

      //
      calcTotalBags(child.bag, totalBags);
    });
  }

  //
  calcTotalBags('shiny gold', 1);

  return individual;
}

async function start() {
  const input = await readInput();
  console.log(calcResultDay5A(input));
  console.log(calcResultDay5B(input));
}

start();