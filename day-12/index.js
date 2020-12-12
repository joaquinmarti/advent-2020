const fs = require('fs');

function readInput() {
  return new Promise((resolve) => {
    fs.readFile(`./input.txt`, 'utf8', function (err, data) {
      resolve(data.split('\n').map((i) => [i[0], parseInt(i.slice(1, i.length))]));
    })
  })
}

//

function move(position, direction, value) {
  const newPosition = {...position};
  switch (direction) {
    case 'N':
      newPosition.lat += value;
      break;
    case 'S':
      newPosition.lat -= value;
      break;
    case 'E':
      newPosition.long += value;
      break;
    case 'W':
      newPosition.long -= value;
      break;
  }

  return newPosition;
}

function turn(facing, turn, degrees) {
  const cardinal = 'ESWN';
  const degreesToPosition = degrees / 90;
  const gap = turn === 'L' ? degreesToPosition * -1 : degreesToPosition;
  const newIndex = cardinal.indexOf(facing) + gap;

  return cardinal.slice(newIndex % 4)[0];
}

function turnWaypoint(waypoint, turn, degrees) {
  let lat, long;

  if (degrees === 180) { // Move the waypoint the opposite direction
    lat = waypoint.lat * - 1;
    long = waypoint.long * - 1;
  } else if (turn === 'R' && degrees === 90 || turn === 'L' && degrees === 270) { // 90 degrees clockwise
    lat = waypoint.long * - 1;
    long = waypoint.lat;
  } else if (turn === 'L' && degrees === 90 || turn === 'R' && degrees === 270) { // 90 degrees counter clockwise
    lat = waypoint.long;
    long = waypoint.lat * - 1;
  }

  return {
    lat,
    long,
  }
}

function moveShipToWaypoint(ship, waypoint, times) {
  return {
    lat: ship.lat + waypoint.lat * times,
    long: ship.long + waypoint.long * times,
  }
}

//

function calcResultA(input) {
  const { lat, long } = input.reduce((position, command) => {
    const [action, value] = command;

    switch(action) {
      case  'N':
      case 'S':
      case 'E':
      case 'W':
        position = move(position, action, value);
        break;
      case 'R':
      case 'L':
        position.facing = turn(position.facing, action, value);
        break;
      case 'F':
        position = move(position, position.facing, value);
        break;
    }

    return position;
  }, { lat: 0, long: 0, facing: 'E' });

  return Math.abs(lat) + Math.abs(long);
}

function calcResultB(input) {
  const { ship } = input.reduce((navigation, command) => {
    let [action, value] = command;

    switch (action) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        navigation.waypoint = move(navigation.waypoint, action, value);
        break;
      case 'R':
      case 'L':
        navigation.waypoint = turnWaypoint(navigation.waypoint, action, value);
        break;
      case 'F':
        navigation.ship = moveShipToWaypoint(navigation.ship, navigation.waypoint, value);
        break;
    }

    return navigation;
  }, {
    ship: {
      lat: 0,
      long: 0,
    },
    waypoint: {
      lat: 1,
      long: 10,
    },
  });

  return Math.abs(ship.lat) + Math.abs(ship.long);

}

async function start() {
  const input = await readInput();
  console.log(calcResultA(input));
  console.log(calcResultB(input));
}

start();