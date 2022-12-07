let fs = require('fs');
let read_data = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}

let priority = (c) => {
  if (c >= "a" && c <= "z") {
    offset = -96;
  } else if (c >= "A" && c <= "Z") {
    offset = -64 + 26;
  }
  return c.charCodeAt(0) + offset;

  /* priority tests
  console.log(priority("p"), 16);
console.log(priority("L"), 38);
console.log(priority("P"), 42);
console.log(priority("v"), 22);
console.log(priority('t'), 20);
console.log(priority('s'), 19);
  */
}

let split_string = (str) => {
  let [left, right] = [
    str.slice(0, parseInt(Math.floor(str.length/2))),
    str.slice(parseInt(Math.ceil(str.length/2)), str.length)
  ];
  // console.log("left:", left);
  // console.log("right:", right);
  return [left, right];
}

let seen_check = (seen, check, str) => {
  for (const c of str) {
    if (check[c]) {
      return c;
    }
    seen[c] = true;
  } 
}

let common_char = (str1, str2) => {
  let left_seen = {};
  let right_seen = {};

  // build the first dict
  seen_check(left_seen, right_seen, str1);

  // check the second against the first
  let c = seen_check(right_seen, left_seen, str2);
  if (c) return c;

  // if no overlap yet, check the first against the second
  c = seen_check(left_seen, right_seen, str1);
  return c;
}

let calculate_priority = (data) => {
  let sum = 0;
  for (const line of data) {
    let [left, right] = split_string(line);
    let common = common_char(left, right);
    console.log('common char:', common);
    sum += priority(common);
  }
  return sum;
}

console.log(calculate_priority(read_data('data')));