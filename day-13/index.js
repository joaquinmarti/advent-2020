const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      const input = {};
      const [timestamp, buses] = data.split('\n');

      //
      input.timestamp = parseInt(timestamp);
      input.buses = buses.split(',').map(b => {
        if (b !== 'x') {
          return parseInt(b);
        }
        else {
          return b;
        }
      });

      resolve(input);
    })
  })
}

//

function bruteForce(input) {
  const buses = input.buses.slice(1);
  let counter = 0;
  let found = 0;

  while(!found) {
    let now = counter * input.buses[0];

    for (let index = 0; index < buses.length; index++) {
      const b = buses[index];

      if (b !== 'x') {
        if ((now + index + 1) % b === 0) {
          if (index === buses.length -1) {
            return counter * input.buses[0];
          }
          continue;
        } else {
          break;
        }
      }
    }

    //
    counter++;
  }
}

function calcTimestamp(input) {
  const buses = input.buses.slice(1);
  let counter = 0;
  let now = input.buses[0];

  buses.forEach((bus, index) => {
    let found = false;

    while(!found) {
      if (bus !== 'x') {
        // console.log('-------------------------');
        // console.log('bus', bus);
        // console.log('counter', counter);
        // console.log('index + 1', index + 1);
        // console.log('counter', counter);
        // console.log('mod', (counter + index + 1) % bus === 0);
        // console.log('--');

        if ((counter + index + 1) % bus === 0) {
          // console.log('multiply!');
          // console.log('now', now);
          // console.log('now', bus);
          // console.log('now * bus', now * bus);
          now = now * bus;
          found = true;
        } else {
          // console.log('counter', counter);
          // console.log('counter + now', counter + now);
          counter = counter + now;
        }
      }
      else {
        found = true;
      }
    }
  });

  return counter;
}

//

function calcResultA(input) {
  let counter = input.timestamp;
  let found = false;
  let busFound = [];

  while (!found) {
    busFound = input.buses.filter((b => {
      return b !== 'x' && counter % b === 0;
    }));

    if (busFound.length > 0) {
      found = true;
      return (counter - input.timestamp) * busFound[0];
    }

    counter++;
  }
}

function calcResultB(input) {
  // Caclc the number using brute force, don't do this! Works fine on small examples but it will burn
  // your processor on the real input.
  // return bruteForce(input);

  // Calc solution
  return calcTimestamp(input);
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();