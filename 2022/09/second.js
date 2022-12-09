let fs = require('fs');
let readData = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}
let getKey = (x, y) => `${x},${y}`;
const NUM_KNOTS = 10;
// read the line instructions
// move the head accordingly
// for each step,
//  store the head's last position
//  move the head to the new position
//  if the distance is >= 2:
//    set tail to last head position
//    save tail position for later
let distanceBetween = (p1, p2) => {
  let x = p2.x - p1.x;
  let y = p2.y - p1.y;
  result = Math.sqrt(x*x+y*y);
  //let result = (p2.x - p1.x) + Math.abs(p2.y - p1.y);
  console.log(`(${p1.x},${p1.y})->(${p2.x},${p2.y}) = ${result}`);
  return result;
};

let midway = (p1, p2) => {
  let x = 0;
  let y = 0;
  if (p2.x - p1.x >= 2) {
    x = p2.x - 1;
  } else if (p1.x - p2.x >= 2) {
    x = p2.x + 1;
  } else if (p2.x - p1.x >= 1) {
    x = p2.x;
  } else if (p1.x - p2.x >= 1) {
    x = p2.x;
  } else {
    x = p2.x;
  }

  if (p2.y - p1.y >= 2) {
    y = p2.y - 1;
  } else if (p1.y - p2.y >= 2) {
    y = p2.y + 1;
  } else if (p2.y - p1.y >= 1) {
    y = p2.y;
  } else if (p1.y - p2.y >= 1) {
    y = p2.y;
  } else {
    y = p2.y;
  }
  //let x = parseInt(Math.round((p2.x+p1.x)/2));
  //let y = parseInt(Math.round((p2.y+p1.y)/2));
  return [x, y];
}

let printout = (knots) => {
  for (let i = -20; i < 20; i++) {
    let outline = [];
    for (let j = -20; j < 20; j++) {
      out = '.';
      for (let k = NUM_KNOTS-1; k >= 0; k--) {
        if (i === knots[k].y && j === knots[k].x) {
          out = k === 0 ? 'H' : `${k}`;
        }
      }
      outline.push(out);
    }
    console.log(outline.join(''));
  }
}

let execute = (lines) => {
  let knots = [];
  let last_knots = [];
  for (let i = 0; i < NUM_KNOTS; i++) {
    knots.push({x: 0, y: 0});
    last_knots.push({x: 0, y: 0});
  }
  let tailPos = new Set();
  tailPos.add(getKey(0, 0));

  for (const line of lines) {
    let [dir, dist] = line.split(" ");
    for (let i = 0; i < dist; i++) {
      console.log(`== ${dir} ${dist} == \n\n`);
      printout(knots);
      console.log("\n");
      last_knots[0].x = knots[0].x;
      last_knots[0].y = knots[0].y;
      if (dir === "L") {
        knots[0].x -= 1;
      } else if (dir === "R") {
        knots[0].x += 1;
      } else if (dir === "U") {
        knots[0].y -= 1;
      } else if (dir === "D") {
        knots[0].y += 1;
      } else {
        console.log('bad dir');
      }

      for (let j = 1; j < NUM_KNOTS; j++) {
        console.log(`knot ${j-1}: (${knots[j-1].x},${knots[j-1].y})`);
        if (distanceBetween(knots[j], knots[j-1]) >= 2) {
          last_knots[j].x = knots[j].x;
          last_knots[j].y = knots[j].y;
          // knots[j].x = last_knots[j-1].x;
          // knots[j].y = last_knots[j-1].y;
          [knots[j].x, knots[j].y] = midway(knots[j], knots[j-1])
          console.log(`-knot ${j}: (${knots[j].x},${knots[j].y})`)
          if (j === NUM_KNOTS - 1) {
            tailPos.add(getKey(knots[j].x, knots[j].y));            
          }
        } else {
          console.log('dist < 2; break...');
          break;
        }   
      }
    }
  }

  console.log(tailPos);
  return tailPos.size;
};

console.log(execute(readData('data')))