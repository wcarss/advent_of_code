let fs = require('fs');
let readData = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}

let load = data => {
  const trees = [];
  let i = 0;
  for (const line of data) {
    trees.push([]);
    for (const c of line) {
      trees[i].push({h:parseInt(c), v: false});
    }
    i += 1;
  }
  return trees;
}

let calculate_tree_visibility = (trees, x, y) => {
  // to the west
  if (x === 0 || (trees[x-1][y].wv && trees[x-1][y].h < trees[x][y].h)) {
    trees[x][y].wv = true;
    trees[x][y].hw = trees[x][y].h;
    trees[x][y].v = true;
  }
  // to the east
  if (x === trees.length - 1 || (trees[x+1][y].ev && trees[x+1][y].h < trees[x][y].h)) {
    trees[x][y].ev = true;
    trees[x][y].hw = trees[x][y].h;
    trees[x][y].v = true;
  }
  // to the north
  if (y === 0 || (trees[x][y-1].nv && trees[x][y-1].h < trees[x][y].h)) {
    trees[x][y].nv = true;
    trees[x][y].hn = trees[x][y].h;
    trees[x][y].v = true;
  }
  // to the south (we check both in the center)
  if (y === trees[0].length - 1 || (trees[x][y+1].sv && trees[x][y+1].h < trees[x][y].h)) {
    trees[x][y].sv = true;
    trees[x][y].hs = trees[x][y].h;
    trees[x][y].v = true; 
  }
  return trees[x][y].v;
}

let check_horizontal_line = (trees, x, x2, y) => {
  for (let i = x; i < x2; i++) {
    calculate_tree_visibility(trees, i, y);
  }
}

let check_vertical_line = (trees, x, y, y2) => {
  for (let i = y; i < y2; i++) {
    calculate_tree_visibility(trees, x, i);
  }
}

let check_ring = (trees, x, y) => {
  // top
  check_horizontal_line(trees, x, (trees.length)-x, y);
  // bottom
  check_horizontal_line(trees, x, (trees.length)-x, (trees[0].length-1)-y);
  // left
  check_vertical_line(trees, x, y, (trees[0].length)-y);
  // right
  check_vertical_line(trees, (trees.length-1)-x, y, (trees[0].length)-y);
}

let round_up = num => {
  return parseInt(Math.ceil(num));
}

let check_forest = (trees) => {
  let i = 0;
  let j = 0;
  while (i <= trees.length/2 && j <= trees[0].length/2) {
    console.log('checking ring:', i, ', ', j);
    check_ring(trees, i, j);
    if (i <= trees.length/2) i++;
    if (j <= trees[0].length/2) j++;
  }
};

let count_forest = (trees) => {
  let sum = 0;
  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees.length; j++) {
      if (trees[i][j].v) sum++;
    }
  }
  return sum;
}

let print_forest = (trees, filter_by_vis) => {
  let sum = 0;
  for (let i = 0; i < trees.length; i++) {
    let out = [];
    for (let j = 0; j < trees.length; j++) {
      if (filter_by_vis) {
        if (trees[i][j].v) {
          out.push(trees[i][j].h);
        } else {
          out.push(' ');
        }
      } else {
        out.push(trees[i][j].h);
      }
    }
    console.log(out.join(''));
  }
  return sum;
}


let trees = load(readData('beta'));
console.log(trees);
print_forest(trees, false);

console.log('\n===========\n');

check_forest(trees);
let count = count_forest(trees);
print_forest(trees, true);
console.log('count: ', count);