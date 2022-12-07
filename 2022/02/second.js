let fs = require('fs');

const data = fs.readFileSync("./data").toString().split("\n").filter(e => e !== "");
//console.log(data[3]);//.split("\n");

let score_row = (left_play, right_play) => {
  let left = {
    A: {
      name: "rock",
      value: 1,
      beats: "C",
      loses: "B",
    },
    B: {
      name: "paper",
      value: 2,
      beats: "A",
      loses: "C",
    },
    C: {
      name: "scissors",
      value: 3,
      beats: "B",
      loses: "A",
    }
  };

  let right = {
    X: {
      name: "lose",
    },
    Y: {
      name: "draw",
    },
    Z: {
      name: "win",
    }
  };

  let score = 0;
  console.log('left_play:', left_play);
  console.log('right_play:', right_play);
  if (right[right_play].name === 'win') {
    score += left[left[left_play].loses].value;
    score += 6;
  } else if (right[right_play].name === 'draw') {
    score += left[left_play].value;
    score += 3;
  } else if (right[right_play].name === 'lose') {
    score += left[left[left_play].beats].value;
    score += 0;
  } else {
    console.log('orphan else');
    console.log('left_play', left_play);
    console.log('right_play', right_play);
  }

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

