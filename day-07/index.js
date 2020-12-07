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

  function findParents(bagToFind, allBags) {
    return Object.keys(allBags).filter((node) => {
      return allBags[node].some((child) => child.bag === bagToFind && child.number > 0);
    });
  }

  function findAllParents(bagToFind, allBags) {
    findParents(bagToFind, allBags).forEach((parent) => {
      if (!~nodesVisited.indexOf(parent)) {
        nodesVisited.push(parent);
        findAllParents(parent, allBags);
      }
    });
  }

  //
  findAllParents('shiny gold', input);

  //
  return nodesVisited.length;
}

function calcResultDay5B(input) {
  function getBagsForChild(bag, child, allBags) {
    return allBags[bag].find((childBag) => childBag.bag === child.bag).number;
  }

  function findChildren(bag) {
    return input[bag].filter((childBag) => childBag.number > 0);
  }

  function calcTotalBags(rootBag, allBags) {
    let totalBags = 0;

    function calcChildrenBags(bag, parentBags) {
      findChildren(bag).forEach((child) => {
        const totalBagsForChild = parentBags * getBagsForChild(bag, child, allBags)

        //
        totalBags += totalBagsForChild;

        //
        calcChildrenBags(child.bag, totalBagsForChild);
      });
    }

    //
    calcChildrenBags(rootBag, 1);

    return totalBags;
  }

  //
  return calcTotalBags('shiny gold', input);
}

async function start() {
  const input = await readInput();
  console.log(calcResultDay5A(input));
  console.log(calcResultDay5B(input));
}

start();