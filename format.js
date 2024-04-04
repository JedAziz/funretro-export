const { formatCsv } = require('./formatCsv');
const { formatMarkdown } = require('./formatMarkdown');

module.exports.format = function (format, boardData) {
  if (format === 'csv') {
    const csvFile = formatCsv(boardData);
    return csvFile;
  }
  if (format === 'markdown') {
    const mdFile = formatMarkdown(boardData);
    return mdFile;
  }
};