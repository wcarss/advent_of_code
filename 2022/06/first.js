let fs = require('fs');
let read_data = (filename) => {
  return fs.readFileSync(filename).toString()
}

let any_dupes = (chars) => {
  let holder = new Set();
  for (const c of chars) {
    holder.add(c);
  }
  return [...holder.values()].length < chars.length;
}

let find_marker = (line) => {
  for (let i = 14; i < line.length; i++) {
    if (any_dupes(line.slice(i-14, i))) continue;
    return i;
  }
}

console.log(find_marker("bvwbjplbgvbhsrlpgdmjqwftvncz"));
console.log(find_marker("nppdvjthqldpwncqszvftbrmjlhg"));
console.log(find_marker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"));
console.log(find_marker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"));
console.log(find_marker("mjqjpqmgbljsphdztnvjfqwrcgsmlb"));
console.log(find_marker(read_data('data')));