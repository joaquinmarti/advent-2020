const fs = require('fs');

function readPasswords() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((password) => {
        const p = password.split(' ');
        const occurrence = p[0].split('-');
        return {
          first: parseInt(occurrence[0]),
          last: parseInt(occurrence[1]),
          char: p[1].replace(':', ''),
          pass: p[2]
        };
      }));
    })
  })
}

function calcResultDay2A(passwords) {
  return passwords.filter((p) => {
    const count = (p.pass.match(new RegExp(p.char, 'g')) || []).length;
    return count >= p.first && count <= p.last;
  }).length;
}

function calcResultDay2B(passwords) {
  return passwords.filter((p) => p.pass[p.first - 1] === p.char ^ p.pass[p.last - 1] === p.char).length;
}


async function start() {
  const passwords = await readPasswords();
  console.log(calcResultDay2A(passwords));
  console.log(calcResultDay2B(passwords));
}

start();