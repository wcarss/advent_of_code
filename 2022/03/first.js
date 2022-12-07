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
}

let split_string = (str) => {
  let [left, right] = [
    str.slice(0, parseInt(Math.floor(str.length/2))),
    str.slice(parseInt(Math.ceil(str.length/2)), str.length)
  ];
  return [left, right];
}

let intersect = (s1, s2) => {
  let s3 = new Set();
  for (c of s1) {
    if (s2.has(c)) {
      s3.add(c);
    }
  }
  for (c of s2) {
    if (s1.has(c)) {
      s3.add(c);
    }
  }
  return s3;
}

let common_char = (str1, str2) => {
  let set_one = new Set(str1.split(''));
  let set_two = new Set(str2.split(''));

  let intersection = intersect(set_one, set_two);
  return [...intersection.values()][0];
}

let calculate_priority = (data) => {
  let sum = 0;
  for (const line of data) {
    let [left, right] = split_string(line);
    let common = common_char(left, right);
    // console.log('common char:', common);
    sum += priority(common);
  }
  return sum;
}

console.log(calculate_priority(read_data('data')));