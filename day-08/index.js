const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((i) => {
        const [name, parameter] = i.split(' ');
        return {
          name,
          parameter: parseInt(parameter),
        }
      }));
    })
  });
}

//

function calcAcc(input) {
  const commandsExecuted = [];
  let pointer = 0;
  let acc = 0;

  function excuteCommand(command) {
    if (command) {
      switch (command.name) {
        case 'jmp':
          pointer += command.parameter;
          break;
        case 'acc':
          acc += command.parameter;
        default:
          pointer += 1;
      }
    }
  }

  while (!~commandsExecuted.indexOf(pointer)) {
    commandsExecuted.push(pointer)
    excuteCommand(input[pointer]);
  }

  return [
    acc,
    pointer - 1
  ];
}

function* changeCommand(input) {
  let changed = -1;

  while (true) {
    const commands = input.map(c => ({ ...c })); // Clone array avoiding references to objects

    const replaceCommand = {
      'nop': 'jmp',
      'jmp': 'nop',
    };

    const indexToChange = commands.findIndex((i, index) => {
      return ((i.name === 'nop' && i.parameter !== 0) || i.name === 'jmp') && index > changed;
    });

    if (~indexToChange) {
      commands[indexToChange].name = replaceCommand[commands[indexToChange].name];
      changed = indexToChange;
    }

    yield commands;
  }
}

//

function calcResultA(input) {
  return calcAcc(input)[0];
}

function calcResultB(input) {
  const commandIndexToTerminate = input.length - 1;
  const executeCommandsChange = changeCommand(input);
  let lastCommand = -1;
  let acc = 0;

  while (lastCommand !== commandIndexToTerminate) {
    [acc, lastCommand] = calcAcc(executeCommandsChange.next().value);
  }

  return acc;
}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();