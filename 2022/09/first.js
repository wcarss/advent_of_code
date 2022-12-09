let fs = require('fs');
let readData = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}
let getKey = (x, y) => `${x},${y}`;

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

let execute = (lines) => {
  let head = {x: 0, y: 0};
  let last_head = {x: 0, y: 0};
  let tail = {x: 0, y: 0};
  let tailPos = new Set();
  tailPos.add(getKey(tail.x, tail.y));

  for (const line of lines) {
    let [dir, dist] = line.split(" ");
    for (let i = 0; i < dist; i++) {
      last_head.x = head.x;
      last_head.y = head.y;
      if (dir === "L") {
        head.x -= 1;
      } else if (dir === "R") {
        head.x += 1;
      } else if (dir === "U") {
        head.y -= 1;
      } else if (dir === "D") {
        head.y += 1;
      } else {
        console.log('bad dir');
      }
      console.log(`head: (${head.x},${head.y})`);
      if (distanceBetween(tail, head) >= 2) {
        tail.x = last_head.x;
        tail.y = last_head.y;
        console.log(`tail: (${tail.x},${tail.y})`)
        tailPos.add(getKey(tail.x, tail.y));
      }
    }
  }

  return tailPos.size;
};

console.log(execute(readData('data')))