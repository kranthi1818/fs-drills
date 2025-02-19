/*
    Problem 1:
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");
const path = require("path");

function createDirect(dirName, cb) {
  const dir = path.join(__dirname, dirName);

  fs.mkdir(dir, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("folder creation of " + dirName + "  is successful");
    }

    const filePaths = [];
    for (let i = 1; i <= 5; i++) {
      filePaths.push(path.join(dir, `${i + "-file.json"}`));
    }
    cb(filePaths);
  });
}

function createFiles(arrayOfFiles, cb) {
  let counter = 0;
  arrayOfFiles.forEach((element) => {
    fs.writeFile(element, "", "utf8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Files created" + element + "successfully");
      }
      counter++;
      if (counter === arrayOfFiles.length) {
        cb(arrayOfFiles);
      }
    });
  });
}

function deleteFiles(arrayOfFiles) {
  arrayOfFiles.forEach((element) => {
    fs.unlink(element, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("files deleted " + element + " successfully");
      }
    });
  });
}

module.exports = { createDirect, createFiles, deleteFiles };
