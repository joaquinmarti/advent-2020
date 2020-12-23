//

function game(input, totalTurns) {
  // Creating the whole empty array makes much faster accessing later the
  // the elements inside
  const numbers = new Array(totalTurns);

  input.slice(0, input.length - 1).forEach((number, index) => {
    numbers[number] = index + 1;
  });

  let number = input[input.length - 1];

  for (let x = input.length; x < totalTurns; x++) {
    if (number in numbers) {
      const previous = numbers[number];
      numbers[number] = x;
      number = x - previous;
    } else {
      numbers[number] = x;
      number = 0;
    }
  }

  return number;
}

//

function calcResultA(input, totalTurns) {
  return game(input, totalTurns);
}

function calcResultB(input, totalTurns) {
  return game(input, totalTurns);
}

async function start() {
  const input = [2, 0, 1, 9, 5, 19];
  console.log(calcResultA(input, 2020));
  console.log(calcResultB(input, 30000000));
}

start();