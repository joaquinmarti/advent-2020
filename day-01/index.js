const fs = require('fs');

function readExpenses() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((n) => parseInt(n)));
    })
  })
}

//

function calcResultDay1A(expenses) {
  let result = [];
  expenses.every(x => {
    const y = 2020 - x;
    if (expenses.indexOf(y) >= 0) {
      result.push(x, y);
      return false;
    }

    return true;
  });

  return result;
}

function calcResultDay1B(expenses) {
  let result = [];
  expenses.every((x, index) => {
    return expenses.slice(index + 1).every((y) => {
      const z = 2020 - x - y;
      if (z >= 0 && expenses.indexOf(z) >= 0) {
        result.push(x, y, z);
        return false;
      }

      return true;
    });
  });

  return result;
}

async function start() {
  const expenses = await readExpenses();
  console.log(calcResultDay1A(expenses));
  console.log(calcResultDay1B(expenses));
}

start();