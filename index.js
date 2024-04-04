const { chromium } = require('playwright');
const { format } = require('./format');
const { getCardContent } = require('./getCardContent');
const { getFileText } = require('./getFileText');
const { writeToFile } = require('./writeToFile');
const path = require('path');

const DEFAULT_FORMAT = 'csv';
const ACCEPTED_FORMATS = ['csv', 'markdown'];

async function run() {
  const [url, file, _formatOption] = process.argv.slice(2);
  const formatOption = _formatOption ? _formatOption.trim() : DEFAULT_FORMAT;

  if (!ACCEPTED_FORMATS.includes(formatOption)) {
    throw new Error(`Invalid format specified. Accepted formats: ${ACCEPTED_FORMATS.join(',')}`);
  }

  if (!url) {
    throw new Error('Please provide a URL as the first argument.');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await page.waitForSelector('.easy-board');
    await page.waitForSelector('.board-name');

    const boardTitle = await page.$eval('.board-name', getFileText);

    if (!boardTitle) {
      throw new Error('Board title does not exist. Please check if provided URL is correct.');
    }

    const listElements = await page.$$('.easy-card-list');
    const lists = await getCardContent(listElements);
    const boardData = { boardTitle, lists };

    const content = format(formatOption, boardData);
    const resolvedPath = path.resolve(file || `../${boardTitle.replace(/\//g, '').replace(/\s/g, '_')}.${formatOption}`);

    return { content, resolvedPath, formatOption };
  } catch (error) {
    handleError(error);
  } finally {
    await browser.close();
  }
}

function handleError(error) {
  console.error(error);
  process.exit(1);
}

run()
  .then(({ content, resolvedPath, formatOption }) => {
    writeToFile(resolvedPath, { content }, formatOption);
  })
  .catch(handleError);
