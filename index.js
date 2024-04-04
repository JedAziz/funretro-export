const { chromium } = require('playwright');
const { format } = require('./format');
const { getCardContent } = require('./getCardContent');
const { getFileText } = require('./getFileText');
const { writeToFile } = require('./writeToFile');
const path = require('path');

// Default format option and accepted formats for the exported data.
const DEFAULT_FORMAT = 'csv';
const ACCEPTED_FORMATS = ['csv', 'markdown'];

// Main function that orchestrates the entire process of data extraction, formatting, and exporting.
async function run() {
  // Extracting command line arguments for URL, output file path, and format option.
  const [url, file, _formatOption] = process.argv.slice(2);
  const formatOption = _formatOption ? _formatOption.trim() : DEFAULT_FORMAT;

  // Validating the specified format option against the accepted formats.
  if (!ACCEPTED_FORMATS.includes(formatOption)) {
    throw new Error(`Invalid format specified. Accepted formats: ${ACCEPTED_FORMATS.join(',')}`);
  }

  // Ensuring that a URL is provided as the first argument.
  if (!url) {
    throw new Error('Please provide a URL as the first argument.');
  }

  // Launching a browser instance and initializing a new page.
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigating to the provided URL and waiting for necessary elements to load.
    await page.goto(url);
    await page.waitForSelector('.easy-board');
    await page.waitForSelector('.board-name');

    // Extracting the board title from the loaded page.
    const boardTitle = await page.$eval('.board-name', getFileText);

    // Ensuring that the board title exists.
    if (!boardTitle) {
      throw new Error('Board title does not exist. Please check if provided URL is correct.');
    }

    // Extracting the content of different sections and cards from the board.
    const listElements = await page.$$('.easy-card-list');
    const lists = await getCardContent(listElements);
    const boardData = { boardTitle, lists };

    // Formatting the extracted data based on the specified format option.
    const content = format(formatOption, boardData);

    // Resolving the output file path.
    const resolvedPath = path.resolve(file || `../${boardTitle.replace(/\//g, '').replace(/\s/g, '_')}.${formatOption}`);

    // Returning the formatted content, resolved file path, and format option.
    return { content, resolvedPath, formatOption };
  } catch (error) {
    // Handling any errors that occur during the process.
    handleError(error);
  } finally {
    // Closing the browser instance once the operation is complete.
    await browser.close();
  }
}

// Function to handle errors by logging them and exiting the process.
function handleError(error) {
  console.error(error);
  process.exit(1);
}

// Executing the main function, writing the formatted content to the output file,
// and handling any errors that may occur.
run()
  .then(({ content, resolvedPath, formatOption }) => {
    writeToFile(resolvedPath, { content }, formatOption);
  })
  .catch(handleError);