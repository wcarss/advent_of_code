let fs = require('fs');
let readData = (filename) => {
  return fs.readFileSync(filename).toString().split("\n").filter(e => e !== "");
}

const createRoot = () => {
  let root = {
    name: '/',
    parent: null,
    files: {},
    dirs: {},
    size: null,
  };
  return root;
};

const addDirToNodeFromLine = (node, line) => {
  const [_dir, dirName] = line.split(" ");
  const dir = {
    name: dirName,
    parent: node,
    files: {},
    dirs: {},
    size: null,
  };
  node.dirs[dirName] = dir;
}

const addDirToNode = (node, dirName) => {
  const dir = {
    name: dirName,
    parent: node,
    files: {},
    dirs: {},
    size: null,
  };
  node.dirs[dirName] = dir;
}

const addFileToNode = (node, fileName, fileSize) => {
  const file = {
    name: fileName,
    parent: node,
    files: null,
    dirs: null,
    size: parseInt(fileSize),
  };
  node.files[fileName] = file;
}

const changeToDir = (node, dirName) => {
  if (dirName === "..") {
    return node.parent;
  } else if (!node.dirs[dirName]) {
    addDirToNode(node, dirName);
  }
  return node.dirs[dirName];
};

const buildTree = (lines) => {
  let root = null;
  let node = null;
  for (const line of lines) {
    if (line.startsWith("$ cd /")) {
      root = createRoot();
      node = root;
    } else if (line.startsWith("$ cd")) {
      const [_ps1, _cd, dirName] = line.split(" ");
      node = changeToDir(node, dirName);
    } else if (line.startsWith("$ ls")) {
      // skip -- these carry no info
    } else if (line.startsWith("dir")) {
      const [_dir, dirName] = line.split(" ");
      addDirToNode(node, dirName);
    } else {
      const [fileSize, fileName] = line.split(" ");
      addFileToNode(node, fileName, fileSize);
    }
  }
  return root;
}

const printTree = (node) => {
  console.log("node: ", node.name, "size: ", node.size, ", dirs: ", node.dirs ? Object.keys(node.dirs) : node.dirs, ", files: ", node.files ? Object.keys(node.files) : node.files);
  for (const dir in node.dirs) {
    printTree(node.dirs[dir]);
  }
}

let potentials = [];

const sumSizes = (node) => {
  const MIN_SUM_SIZE = 3629016;
  let sum = 0;
  let intermediary = 0;
  for (const file in node.files) {
    sum += node.files[file].size;
  }
  for (const dir in node.dirs) {
    intermediary = sumSizes(node.dirs[dir]);
    console.log(node.name + '.' + dir, ', size:', intermediary);
    sum += intermediary;
  }
  if (sum > MIN_SUM_SIZE) {
    potentials.push([node.name, sum]);
  }
  return sum;
}

const root = buildTree(readData('data'));
printTree(root);
const throwawaySum = sumSizes(root);
potentials.sort((a, b) => a[1] - b[1]);
console.log(potentials);