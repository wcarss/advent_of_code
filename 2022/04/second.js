let fs = require('fs');
let read_data = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}

let ranges = line => {
  let [one, two] = line.split(",");
  return [...one.split('-'), ...two.split('-')].map(e => parseInt(e));
}

let count_overlaps = data => {
  let count = 0;
  for (const line of data) {
    let [l1,h1,l2,h2] = ranges(line);
    if (l1 >= l2 && l1 <= h2) {
      console.log('a: ', line, `${l1}-${h1},${l2}-${h2}`);
      count += 1;
    } else if (l2 >= l1 && l2 <= h1) {
      console.log('b: ', line, `${l1}-${h1},${l2}-${h2}`);
      count += 1;
    }
  }
  return count;
}

console.log(count_overlaps(read_data('data')));