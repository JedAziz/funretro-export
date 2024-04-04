const path = require('path');
const fs = require('fs');

// Function to write content to a file with specified format
module.exports.writeToFile = function (
  filePath,            
  { boardTitle, content },
  formatOption        
) {
  const extensions = {
    markdown: 'txt',
    csv: 'csv',
  };

  // Determine the file extension based on the format option or default to 'txt'
  const extension = extensions[formatOption] || 'txt';

  // Resolve the file path, either from the provided path or generate a default path
  const resolvedPath = path.resolve(
    filePath ||
      `../${boardTitle.replace(/\//g, '').replace(/\s/g, '_')}.${extension}`
  );

  // Write content to the file
  fs.writeFile(resolvedPath, content, (error) => {
    if (error) {
      // If an error occurs during file write, handle it
      handleWriteError(error);
    } else {
      // If writing is successful, log the success message
      console.info(`Successfully written to file at: ${resolvedPath}`);
    }
  });
};

// Function to handle write errors
function handleWriteError(error) {
  console.error('Error writing to file:', error);
}
