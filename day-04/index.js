const fs = require('fs');

function readPassports() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(
        data.split('\n\n')
        .map(p => p.replace(/(?:\r\n|\r|\n)/g, ' ').split(' '))
        .map(p => {
          const object = {};
          p.forEach(i => {
            let [key, value] = i.split(':');

            if (['byr', 'iyr', 'eyr'].includes(key)) {
              value = parseInt(value);
            }

            object[key] = value;
          });

          return object;
        })
      );
    })
  })
}

//

function calcResultDay4A(passports) {
  const mandatoryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const isValid = (passport) => mandatoryFields.every(f => f in passport);
  return passports.filter(isValid).length;
}

function calcResultDay4B(passports) {
  const isBetween = (value, min, max) => value >= min && value <= max;
  const mandatoryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const validateField = {
    byr: value => isBetween(value, 1920, 2002),
    iyr: value => isBetween(value, 2010, 2020),
    eyr: value => isBetween(value, 2020, 2030),
    hgt: (value) => {
      const unit = value.slice(-2);
      const height = value.slice(0, value.length - 2);
      const isUnitValid = ['cm', 'in'].includes(unit);
      const isHeightValid = {
        cm: value => isBetween(value, 150, 193),
        in: value => isBetween(value, 59, 76),
      };

      return isUnitValid && isHeightValid[unit](height)
    },
    hcl: value => value.match(/^#[a-f0-9]{6}$/i),
    ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: value => value.match(/^\d{9}$/),
  };
  const isValid = (passport) => mandatoryFields.every(f => f in passport && validateField[f](passport[f]));

  return passports.filter(isValid).length;
}

async function start() {
  const passports = await readPassports();
  console.log(calcResultDay4A(passports));
  console.log(calcResultDay4B(passports));
}

start();