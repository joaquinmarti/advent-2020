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
  return passwords.reduce((total, p) => {
    const match = new RegExp(`${p.char}`, 'g');
    const count = (p.pass.match(match) || []).length;

    if (count >= p.first && count <= p.last) {
      return ++total;
    }

    return total;
  }, 0);
}

function calcResultDay2B(passwords) {
  return passwords.reduce((total, p) => {
    if (p.pass.charAt(p.first - 1) === p.char ^ p.pass.charAt(p.last - 1) === p.char) {
      return ++total;
    }

    return total;
  }, 0);
}


async function start() {
  const passwords = await readPasswords();
  console.log(calcResultDay2A(passwords));
  console.log(calcResultDay2B(passwords));
}

start();