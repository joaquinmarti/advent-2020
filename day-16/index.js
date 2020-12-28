const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      const input = {};
      const split = data.split('\n\n');

      input.rules = split[0].split('\n').map((rule) => {
        const colon = ': '
        const or = ' or ';
        const colonIndex = rule.indexOf(colon);
        const orIndex = rule.indexOf(or);

        const smallRange = rule.substring(colonIndex + colon.length, orIndex);
        const bigRange = rule.substring(orIndex + or.length);

        return [
          rule.substring(0, colonIndex),
          smallRange.split('-').map(n => parseInt(n)),
          bigRange.split('-').map(n => parseInt(n))
        ]
      });

      input.yourTicket = split[1].split('\n')[1].split(',').map(n => parseInt(n));

      input.otherTickets = split[2].split('\n').filter((n, i) => i > 0).map(line => line.split(',').map(n => parseInt(n)));

      resolve(input);
    })
  })
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}


function processRanges(rules) {
  const firstRange = [[...rules[0][1]], [...rules[0][2]]];

  return rules.slice(1).reduce((ranges, rule) => {
    const [name, smallRange, bigRange] = rule;

    if (smallRange[0] < ranges[0][0]) { ranges[0][0] = smallRange[0] }
    if (smallRange[1] > ranges[0][1]) { ranges[0][1] = smallRange[1] }
    if (bigRange[0] < ranges[1][0]) { ranges[1][0] = bigRange[0] }
    if (bigRange[1] < ranges[1][1]) { ranges[1][1] = bigRange[1] }

    return ranges;
  }, firstRange);
}

function isInvalidField(field, ranges) {
  return (field < ranges[0][0] || field > ranges[0][1]) && (field < ranges[1][0] || field > ranges[1][1]);
}

//

function calcResultA(input) {
  const { rules, otherTickets } = input;
  const invalidValues = [];

  const ranges = processRanges(rules);

  otherTickets.forEach(ticket => {
    ticket.forEach(field => {
      if (isInvalidField(field, ranges)) {
        invalidValues.push(field);
      }
    });
  });

  return invalidValues.reduce((total, value) => total + value, 0);
}

function calcResultB(input) {
  const { rules, yourTicket, otherTickets } = input;
  const matches = rules.map(rule => ({
    name: rule[0],
    values: range(20, 0),
  }));

  const ranges = processRanges(rules);

  const validTickets = otherTickets.filter(ticket => {
    return !ticket.some(field => isInvalidField(field, ranges));
  });

  // Remove invalid rules
  rules.forEach((rule, ruleIndex) => {
    validTickets.forEach((ticket) => {
      ticket.forEach((field, fieldIndex) => {
        if (isInvalidField(field, [rule[1], rule[2]])) {
          delete matches[ruleIndex].values[fieldIndex];
        }
      });
    });
  });

  // Clean rule matches
  for (let index = 0; index < 20; index++) {
    const singleMatch = matches.filter((rule) => rule.values.filter(n => n > 0).length === 1);
    const severaltMatches = matches.filter((rule) => rule.values.filter(n => n > 0).length > 1);

    singleMatch.forEach((match) => {
      const value = match.values.filter(n => n > 0)[0];

      severaltMatches.forEach((rule) => {
        delete rule.values[value];
      })
    });
  }

  // Get departure indexes
  const departureIndexes = matches.filter((rule) => rule.name.indexOf('departure') === 0).map((rule) => rule.values.filter(n => n > 0)[0]);

  // Calc value
  return yourTicket.filter((field, index) => ~departureIndexes.indexOf(index)).reduce((acc, total) => acc * total, 1);
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();