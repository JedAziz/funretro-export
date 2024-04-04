const readlineSync = require('readline-sync');
const { spawn } = require('child_process');

// Get user input
const url = readlineSync.question('Enter the URL: ');
const filePath = readlineSync.question('Enter the file path: ');
const fileFormat = readlineSync.question('Enter the file format (csv/markdown): ');

// Validate file format
if (fileFormat !== 'csv' && fileFormat !== 'markdown') {
  console.error('Invalid file format. Please enter "csv" or "markdown".');
  process.exit(1);
}

// Run yarn start with provided data
const child = spawn('yarn', ['start', url, filePath, fileFormat]);

// Log output of yarn start
child.stdout.on('data', (data) => {
  console.log(data.toString());
});

// Log errors, if any
child.stderr.on('data', (data) => {
  console.error(data.toString());
});

// Handle process exit
child.on('exit', (code) => {
  console.log(`Yarn start process exited with code ${code}`);
});
