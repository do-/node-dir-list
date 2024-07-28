![workflow](https://github.com/do-/node-dir-list/actions/workflows/main.yml/badge.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

`dir-list` is a zero dependency node.js library implementing [file system](https://nodejs.org/api/fs.html) [iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) over given sets or root paths with functions as filtering conditions.

It features two classes: 
* [DirList](https://github.com/do-/node-dir-list/wiki/DirList), the directory tree iterator;
* [FilePaths](https://github.com/do-/node-dir-list/wiki/FilePaths), the files iterator.

# Installation
```sh
npm install dir-list
```

# Usage
```js
const {DirList} = require ('dir-list')

const myDir = new DirList ({
  root: ['/opt/myProject'], 
  filter: (str, arr) => 
    /src/.test (str)            // contains 'src'
    && arr.at (-2) === 'Model', // **/Model/*
// live: true,                  // avoid caching, scan every time
})

for (const dir of myDir.paths) console.log ({dir})

for (const file of myDir.files ()) console.log ({file})
for (const file of myDir.files ('index.js')) console.log ({file})
for (const file of myDir.files (_ => /js$/.test (_))) console.log ({file})
```

# See also
* [fs-iterator](https://www.npmjs.com/package/fs-iterator) seems to solve a pretty similar problem, with some restrictions (e. g. a single root path instead of multiple ones);
* [filelist](https://www.npmjs.com/package/filelist) is a much more popular solution, but it implements the complete [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) interface instead of only Iterator and uses masks (globs) instead of functional filters.
