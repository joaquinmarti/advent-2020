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
    const singature = group.join('');

    return total + [...new Set(singature.split(''))].filter((letter) => {
      const match = new RegExp(letter, 'g');
      return(singature.match(match) || []).length === group.length;
    }).length;
  }, 0);
}

async function start() {
  const input = await readInput();
  console.log(calcResultDay6A(input));
  console.log(calcResultDay6B(input));
}

start();