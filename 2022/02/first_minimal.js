let fs = require('fs');

const data = fs.readFileSync("./data").toString().split("\n").filter(e => e !== "");

let score_row = (left_play, right_play) => {
  const R = "rock";
  const S = "scissors";
  const P = "paper";

  let rock = {
    name: R,
    value: 1,
    beats: S,
    loses: P,
  };
  let paper = {
    name: P,
    value: 2,
    beats: R,
    loses: S,
  };
  let scissors = {
    name: S,
    value: 3,
    beats: P,
    loses: R
  };
  let left = {
    A: rock,
    B: paper,
    C: scissors,
  };
  let right = {
    X: rock,
    Y: paper,
    Z: scissors,
  };

  let score = 0;
  if (left[left_play].beats === right[right_play].name) {
    score += 0; // lose
  } else if (left[left_play].name === right[right_play].beats) {
    score += 6; // win
  } else if (left[left_play].name === right[right_play].name) {
    score += 3; // draw
  } else {
    console.log('uh oh:');
    console.log('  left_play', left_play);
    console.log('  right_play', right_play);
  }

  // each play has a value independent of result
  score += right[right_play].value;
  return score;
};

let score_all = (play_rows) => {
  let sum = 0;
  for (const row of play_rows) {
    let [left_play, right_play] = row.split(" ");
    sum += score_row(left_play, right_play);
  }
  return sum;
}

console.log('total score:', score_all(data));

