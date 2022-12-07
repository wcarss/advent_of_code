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

let common_char = (str1, str2, str3) => {
  let set_one = new Set(str1.split(''));
  let set_two = new Set(str2.split(''));
  let set_three = new Set(str3.split(''));

  let first_intersection = intersect(set_one, set_two);
  let full_intersection = intersect(first_intersection, set_three);
  return [...full_intersection.values()][0];
}

let calculate_priority = (data) => {
  let sum = 0;
  for (let i = 0; i < data.length-2; i += 3) {
    let common = common_char(data[i], data[i+1], data[i+2]);
    // console.log('common char:', common);
    sum += priority(common);
  }
  return sum;
}

console.log(calculate_priority(read_data('data')));