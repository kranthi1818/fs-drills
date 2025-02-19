const {readingFile,conversionUpper,conversionLower,sortedContent,deleteFiles} = require('../problem2a')


readingFile("lipsum.txt", (data) => {
    conversionUpper(data, () => {
      conversionLower(() => {
        sortedContent(() => {
          deleteFiles();
        });
      });
    });
  });