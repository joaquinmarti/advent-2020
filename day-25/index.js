function transform(number, subject = 7) {
  return number * subject % 20201227;
}

function findSize(key) {
  let loopSize = 1;
  let value = 1;

  while (true) {
    value = transform(value);

    if (value === key) {
      break;
    }

    loopSize++;
  }

  return loopSize;
}

//

function calcResultA(cardKey, doorKey) {
  const doorLoopSize = findSize(doorKey);

  let result = 1;

  for (let index = 0; index < doorLoopSize; index++) {
    result = transform(result, cardKey);
  }

  return result;
}

function calcResultB(doorKey, cardKey) {

}

async function start() {
  const cardKey = 14082811;
  const doorKey = 5249543;

  console.log(calcResultA(cardKey, doorKey));
  console.log(calcResultB(cardKey, doorKey));
}

start();