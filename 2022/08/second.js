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

let calculate_visibility_score = (trees, x, y) => {
  let max = trees[x][y].h;
  console.log('max height is ', trees[x][y].h);
  let ecount = 0;
  let wcount = 0;
  let scount = 0;
  let ncount = 0;
  for (let i = x+1; i < trees.length; i++) {
    ecount++;
    console.log('east: tree at ', i, ', ', y, ', has height ', trees[i][y].h);

    if (trees[i][y].h >= max) {
      console.log('breaking');
      break;
    }
  }
  for (let i = x-1; i >= 0; i--) {
    wcount++;
    console.log('west: tree at ', i, ', ', y, ', has height ', trees[i][y].h);
    if (trees[i][y].h >= max) {
      console.log('breaking');
      break;
    }
  }
  for (let i = y+1; i < trees[0].length; i++) {
    scount++;
    console.log('south: tree at ', x, ', ', i, ', has height ', trees[x][i].h);
    if (trees[x][i].h >= max) {
      console.log('breaking');
      break;
    }
  }
  for (let i = y-1; i >= 0; i--) {
    ncount++;
    console.log('north: tree at ', x, ', ', i, ', has height ', trees[i][x].h);
    if (trees[i][x].h >= max) {
      console.log('breaking');
      break;
    }
  }
  console.log('e:', ecount);
  console.log('w:', wcount);
  console.log('n:', ncount);
  console.log('s:', scount);
  if (ecount * wcount * ncount * scount > 10000) {
    console.log('>>>>>');
  }
  console.log('total is ', ecount * wcount * ncount * scount)
  return ecount * wcount * ncount * scount;
}

let count_forest = (trees) => {
  let max = -Infinity;
  let score = null;
  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
      score = calculate_visibility_score(trees, i, j);
      if (score > max) {
        max = score;
      }
    }
  }
  return max;
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
let count = count_forest(trees);
console.log('count: ', count);
//console.log('dbg: ', calculate_visibility_score(trees, 2, 1));