function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function findDestination(current, picked) {
  let destination = current - 1;

  while(true) {
    if (destination <= 0) {
      destination = 9;
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

function move(cups, index) {
  const current = cups.slice(0, 1)[0];
  const picked = cups.splice(1, 3);
  const destination = findDestination(current, picked);
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

  console.log(cupsArray);

  // references[0] = +cupsArray[0];

  cupsArray.forEach((cup, index) => {
    let nextNumber = +cupsArray[index + 1] || +cupsArray[0];

    references[cup] = nextNumber;
  });

  // console.log(references[references.length - 1]);

  console.log(references);

  return references;
}

function changeReferences(cups, currentIndex = 0) {
  const current = cups[currentIndex];
  const next1 = cups[current];
  const next2 = cups[next1];
  const next3 = cups[next2];
  const destination = findDestination(current, [next1, next2, next3]);
  // const indexOfDestination = cups.indexOf(destination);

  // console.log(cups);

  // console.log('last current', currentIndex);
  // console.log('current', current);
  // console.log('picked', next1, next2, next3);
  // console.log('destination', destination);

  // console.log(indexOfDestination);


  cups[current] = cups[next3];
  cups[next3] = cups[destination];
  cups[destination] = next1;


  // console.log(cups);
  return [cups, current];
}

function buildString(cups, currentIndex) {
  const next1 = cups[currentIndex];
  const next2 = cups[next1];
  const next3 = cups[next2];
  const next4 = cups[next3];
  const next5 = cups[next4];
  const next6 = cups[next5];
  const next7 = cups[next6];
  const next8 = cups[next7];
  const next9 = cups[next8];

  // console.log(cups);

  const finalCups = `${next1}${next2}${next3}${next4}${next5}${next6}${next7}${next8}${next9}`;

  const indexOf1 = finalCups.indexOf(1);
  return finalCups.substr(indexOf1 + 1) + finalCups.substr(0, indexOf1);
}

function findNextCups(cups) {
  console.log(cups);
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

  // console.log(cups[0][cups[0].length - 1]);

  // console.log(cups[0]);
  // console.log('====================');

  for (let index = 0; index < 10000000; index++) {
    cups = changeReferences(cups[0], cups[1]);
    // buildString(cups[0], cups[1]);
    // console.log('-------');
  }

  // console.log(buildString(cups[0], cups[1]));


  const [nextCup1, nextCup2] = findNextCups(cups[0]);

  console.log(buildString(cups[0], cups[1]));
  console.log(nextCup1, nextCup2);

  return nextCup1 * nextCup2;

  // const nexCups = findNextCups(cups);

  // console.log(nexCups);

  // return nexCups[0] * nexCups[1];
}

async function start() {
  // const input = '123487596';
  const input = '389125467';
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();