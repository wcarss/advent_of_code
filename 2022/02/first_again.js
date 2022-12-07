let fs = require('fs');

let read_data = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}

let score_row = (left, right) => {
  let score = 0;
  if (left === 'A') {
    if (right === 'X') {
      score += 3;
      score += 1;
    } else if (right === 'Y') {
      score += 6;
      score += 2;
    } else if (right === 'Z') {
      score += 0;
      score += 3;
    } else {
      console.log('uh oh 1', left, ', ', right);
    } 
  } else if (left === 'B') {
    if (right === 'X') {
      score += 0;
      score += 1;
    } else if (right === 'Y') {
      score += 3;
      score += 2;
    } else if (right === 'Z') {
      score += 6;
      score += 3;
    } else {
      console.log('uh oh 2', left, ', ', right);
    }
  } else if (left === 'C') {
    if (right === 'X') {
      score += 6;
      score += 1;
    } else if (right === 'Y') {
      score += 0;
      score += 2;
    } else if (right === 'Z') {
      score += 3;
      score += 3;
    } else {
      console.log('uh oh 3', left, ', ', right);
    }
  } else {
    console.log('uh oh 4', left, ', ', right);
  }
  return score;
}

let score_rows = (rows) => {
  let score = 0;
  for (const row of rows) {
    let [l, r] = row.split(" ");
    score += score_row(l, r);
  }
  return score;
}

console.log(score_rows(read_data('data')));
