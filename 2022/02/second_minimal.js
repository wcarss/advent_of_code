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
  let natural = {
    [R]: rock,
    [P]: paper,
    [S]: scissors,
  }
  let right = {
    X: "lose",
    Y: "draw",
    Z: "win",
  };

  let score = 0;
  let strat = right[right_play];
  let play = left[left_play];
  if (strat === "lose") {
    score += 0; // lose
    score += natural[play.beats].value; // value of the move the play'd beat, which would lose
  } else if (strat === "win") {
    score += 6; // win
    score += natural[play.loses].value; // value of the move the play'd lose to, which would win
  } else if (strat === "draw") {
    score += 3; // draw
    score += play.value; // same value as the play
  } else {
    console.log('uh oh:');
    console.log('  left_play', left_play);
    console.log('  right_play', right_play);
  }

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

