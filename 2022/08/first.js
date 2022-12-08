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

let check_horizontal_line = (trees, y) => {
  let max = -Infinity;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i][y].h > max) {
      trees[i][y].v = true;
      max = trees[i][y].h;
    }
  }
  max = -Infinity;
  for (let i = trees.length-1; i >= 0; i--) {
    if (trees[i][y].h > max) {
      trees[i][y].v = true;
      max = trees[i][y].h;
    }
  }
}

let check_vertical_line = (trees, x) => {
  let max = -Infinity;
  for (let i = 0; i < trees.length; i++) {
    if (trees[x][i].h > max) {
      trees[x][i].v = true;
      max = trees[x][i].h;
    }
  }
  max = -Infinity;
  for (let i = trees.length-1; i >= 0; i--) {
    if (trees[x][i].h > max) {
      trees[x][i].v = true;
      max = trees[x][i].h;
    }
  }
}

let check_forest = (trees) => {
  for (let i = 0; i < trees[0].length; i++) {
    check_horizontal_line(trees, i);
  }
  for (let i = 0; i < trees.length; i++) {
    check_vertical_line(trees, i);
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


let trees = load(readData('data'));
console.log(trees);
print_forest(trees, false);

console.log('\n===========\n');

check_forest(trees);
let count = count_forest(trees);
print_forest(trees, true);
console.log('count: ', count);