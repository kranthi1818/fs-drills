/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");
const path = require("path");

function problem2(inputfile,cb) {
  const file = path.join(__dirname, inputfile);

  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    let upperCase = data.toUpperCase();
    fs.writeFile("upper.txt", upperCase, "utf8", (err) => {
      if (err) {
        console.log(err);
      }else{
        console.log(`upper.txt Created successfully`)
      }

      fs.writeFile("filenames.txt", "upper.txt\n", (err) => {
        if (err) {
          console.log(err);
        }
        let lower = data.toLowerCase();
        let splitting = lower.split(".").map((element) => element.trim());
        let result = splitting.join(".\n");

        fs.writeFile("lower.txt", result, "utf8", (err) => {
          if (err) throw err;
        
            console.log(`lower.txt Created successfully`)

          fs.appendFile("filenames.txt", "lower.txt\n", (err) => {
            if (err) {
              console.log(err);
            }

            let splitContent = data
              .split(".")
              .map((element) => element.trim())
              .sort()
              .join("\n");

            fs.writeFile("sorted.txt", splitContent, "utf8", (err) => {
              if (err) {
                console.log(err);
              }else{
                console.log('sorted.txt file created successfully')
              }
              fs.appendFile('filenames.txt','sorted.txt' ,(err)=>{
                if(err) throw err
              })
              deleteFiles("filenames.txt")
            });
          });
        });
      });
    });
  });
}

function deleteFiles(filename){
  fs.readFile(filename,'utf8',(err,data)=>{
    if(err){
      console.log(err)
    }else{
      data.split('\n').forEach((file)=>{
        fs.unlink(file,(err)=>{
          if(err){
            console.log(err)
          }else{
            console.log(`${file} files deleted successfully`)
          }
        })
      })
    }
  })
}
problem2("lipsum.txt");


