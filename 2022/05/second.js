let fs = require('fs');
let read_data = (filename) => {
  return fs.readFileSync(filename).toString().split("\n");
}

let read_crate_stacks = (data) => {
  let num_stacks = data[0].length/4;
  let crate_stacks = [];
  for (let i = 0; i < num_stacks; i++) {
    crate_stacks.push([]);
  }
  for (line of data) {
    if (line.indexOf("[") === -1) {
      break;
    }
    for (i = 0; i < num_stacks; i++) {
      let crate = line[i*4+1];
      if (crate != ' ') {
        crate_stacks[i].unshift(crate);
      }
    }
  }
  console.log(crate_stacks);
  return crate_stacks;
};

let move_crates = (crate_stacks, src, dest, count) => {
  let d = crate_stacks[dest - 1];
  let s = crate_stacks[src - 1];

  d.push(...s.splice(s.length-count));
}

let read_move = (line) => {
  let [_m, count, _f, src, _t, dest] = line.split(" ");
  console.log('read move as:', count, ', ', src, ', ', dest);
  return [count, src, dest];
}

let top_crates = (crate_stacks) => {
  let output = [];
  for (const stack of crate_stacks) {
    output.push(stack.slice(-1));
  }
  return output.join('');
}

let execute_moves = (data) => {
  let crate_stacks = read_crate_stacks(data);
  for (const line of data) {
    if (line.indexOf("move") === -1) continue;
    let [count, src, dest] = read_move(line);
    move_crates(crate_stacks, src, dest, count);
  }
  return top_crates(crate_stacks);
}

console.log(execute_moves(read_data('data')));