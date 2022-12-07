let fs = require('fs');

const data = fs.readFileSync("./data").toString().split("\n").filter(e => e !== "");
//console.log(data[3]);//.split("\n");

let score_row = (left_play, right_play) => {
  let left = {
    A: {
      name: "rock",
      value: 1,
      beats: "scissors",
      loses: "paper",
    },
    B: {
      name: "paper",
      value: 2,
      beats: "rock",
      loses: "scissors",
    },
    C: {
      name: "scissors",
      value: 3,
      beats: "paper",
      loses: "rock",
    }
  };

  let right = {
    X: {
      name: "rock",
      value: 1,
      beats: "scissors",
      loses: "paper",
    },
    Y: {
      name: "paper",
      value: 2,
      beats: "rock",
      loses: "scissors",
    },
    Z: {
      name: "scissors",
      value: 3,
      beats: "paper",
      loses: "rock",
    }
  };

  let score = 0;
  console.log('left_play:', left_play);
  console.log('right_play:', right_play);
  if (left[left_play].beats == right[right_play].name) {
    score += 0; // lose
  } else if (left[left_play].name == right[right_play].beats) {
    score += 6; // win
  } else if (left[left_play].name == right[right_play].name) {
    score += 3; // draw
  } else {
    console.log('orphan else');
    console.log('left_play', left_play);
    console.log('right_play', right_play);
  }

  score += right[right_play].value;
  return score;
};

let score_all = (play_rows) => {
  let sum = 0;
  for (const row of play_rows) {
    let [left_play, right_play] = row.split(" ");
    sum += score_row(left_play, right_play);
    console.log('sum: ', sum);
  }
  console.log('total score:', sum);
}

score_all(data);

