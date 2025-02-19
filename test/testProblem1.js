const {createDirect,createFiles,deleteFiles} = require('../problem1.js')

createDirect("folder1", (filePaths) => {
    createFiles(filePaths,(data)=>{
      deleteFiles(data)
    });
  });