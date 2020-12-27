function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function findDestination(current, picked, last) {
  let destination = current - 1;

  while(true) {
    if (destination <= 0) {
      destination = last;
    }

    if (!~picked.indexOf(destination)) {
      break;
    }

    destination -= 1;
  }

  return destination;
}

function splitCups(input) {
  return input.split('').map((n) => +n);
}

function move(cups) {
  const length = cups.length;
  const current = cups.slice(0, 1)[0];
  const picked = cups.splice(1, 3);
  const destination = findDestination(current, picked, length);
  const indexOfDestination = cups.indexOf(destination);

  cups.splice(indexOfDestination + 1, 0, ...picked);
  cups.push(cups.splice(0, 1)[0]);

  return cups;
}

function sortFinalCups(cups) {
  const indexOf1 = cups.indexOf(1);
  return cups.substr(indexOf1 + 1) + cups.substr(0, indexOf1);
}

function prepareReferences(cups) {
  let cupsArray = cups.split('');

  cupsArray = cupsArray.concat(range(999991, 10));

  const references = [];

  cupsArray.forEach((cup, index) => {
    let nextNumber = +cupsArray[index + 1] || +cupsArray[0];

    references[cup] = nextNumber;
  });

  return references;
}

function changeReferences(cups, currentIndex = 0) {
  const current = cups[currentIndex];
  const next1 = cups[current];
  const next2 = cups[next1];
  const next3 = cups[next2];
  const destination = findDestination(current, [next1, next2, next3], cups.length - 1);

  cups[current] = cups[next3];
  cups[next3] = cups[destination];
  cups[destination] = next1;

  return [cups, current];
}

function findNextCups(cups) {
  const next1 = cups[1];
  const next2 = cups[next1];
  return [next1, next2];
}

//

function calcResultA(input) {
  let cups = splitCups(input);

  for (let index = 0; index < 100; index++) {
    cups = move(cups);
  }

  return sortFinalCups(cups.join(''));
}

function calcResultB(input) {
  let cups = [prepareReferences(input), 1000000];

  for (let index = 0; index < 10000000; index++) {
    cups = changeReferences(cups[0], cups[1]);
  }

  const [nextCup1, nextCup2] = findNextCups(cups[0]);

  return nextCup1 * nextCup2;
}

async function start() {
  const input = '123487596';
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();