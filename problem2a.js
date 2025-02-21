const fs = require("fs");

function readingFile(fileName, cb) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      cb(data);
    }
  });
}

function conversionUpper(data, cb) {
  let upperCaseContent = data.toUpperCase();
  fs.writeFile("upperCase.txt", upperCaseContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`upperCase.txt Created successfully`);
    }
    fs.writeFile("filenames.txt", "upperCase.txt\n", (err) => {
      if (err) {
        console.log(err);
      }
      cb();
    });
  });
}

function conversionLower(cb) {
  fs.readFile("upperCase.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    let lowerCase = data.toLowerCase();
    let splitContent = lowerCase
      .split(".")
      .map((e) => e.trim())
      .join(".\n");

    fs.writeFile("lowerCase.txt", splitContent, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`lowerCase.txt Created successfully`);
      }
      fs.appendFile("filenames.txt", "lowerCase.txt\n", (err) => {
        if (err) {
          console.log(err);
        }
        cb();
      });
    });
  });
}

function sortedContent(cb) {
  fs.readFile("lowerCase.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    let sortedRes = data
      .split(".")
      .map((e) => e.trim())
      .sort()
      .join(".\n");

    fs.writeFile("sortedFile.txt", sortedRes, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`sortedFile.txt Created successfully`);
      }
      fs.appendFile("filenames.txt", "sortedFile.txt\n", (err) => {
        if (err) {
          console.log(err);
        }
        cb();
      });
    });
  });
}

function deleteFiles() {
  fs.readFile("filenames.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let files = data
      .split("\n")
      .map((file) => file.trim())
      .filter((file) => file !== "");

    files.forEach((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("files deleted successfully");
        }
      });
    });
  });
}



module.exports = {readingFile,conversionUpper,conversionLower,sortedContent,deleteFiles}