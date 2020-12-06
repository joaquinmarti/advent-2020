const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(
        data.split('\n\n').map(p => p.replace(/(?:\r\n|\r|\n)/g, ' ').split(' '))
      );
    })
  })
}

//

function calcResultDay6A(input) {
  return input.reduce((total, group) => {
    const yesCount = [];
    group.forEach(questions => {
      yesCount.push(...questions.split('').filter(letter => !~yesCount.indexOf(letter)));
    });

    return total + yesCount.length;
  }, 0);
}

function calcResultDay6B(input) {
  return input.reduce((total, group) => {
    const join = group.join('');

    const groupValue = [...new Set(join.split(''))].reduce((total, letter) => {
      const match = new RegExp(letter, 'g');
      return total + ((join.match(match) || []).length === group.length ? 1 : 0);
    }, 0);

    return total + groupValue;
  }, 0);
}

async function start() {
  const input = await readInput();
  console.log(calcResultDay6A(input));
  console.log(calcResultDay6B(input));
}

start();