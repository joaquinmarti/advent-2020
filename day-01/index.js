const fs = require('fs');

function readExpenses() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((n) => parseInt(n)).sort((a, b) => a - b));
    })
  })
}

//

function calcResultDay1A(expenses) {
  let result = [];
  expenses.every(n => {
    if (expenses.indexOf(2020 - n) >= 0) {
      result.push(n);
      result.push(2020 - n);
      return false;
    }
  });

  return result;
}

function calcResultDay1B(expenses) {
  let result = [];
  expenses.every((x, index) => {
    return expenses.slice(index + 1).every((y) => {
      if (expenses.indexOf(2020 - x - y) >= 0) {
        result.push(x);
        result.push(y);
        result.push(2020 - x - y);
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