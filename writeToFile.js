const path = require('path');
const fs = require('fs');

module.exports.writeToFile = function (
  filePath,
  { boardTitle, content },
  formatOption
) {
  const extensions = {
    markdown: 'txt',
    csv: 'csv',
  };

  const extension = extensions[formatOption] || 'txt';

  const resolvedPath = path.resolve(
    filePath ||
      `../${boardTitle.replace(/\//g, '').replace(/\s/g, '_')}.${extension}`
  );

  fs.writeFile(resolvedPath, content, (error) => {
    if (error) {
      handleWriteError(error);
    } else {
      console.info(`Successfully written to file at: ${resolvedPath}`);
    }
  });
};

function handleWriteError(error) {
  console.error('Error writing to file:', error);
}
