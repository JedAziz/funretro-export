const HEADERS = ['list', 'text', 'votes'];
module.exports.formatCsv = function ({ lists }) {
  const csv = [];
  csv.push(HEADERS);
  lists.forEach((list) => {
    list.cards.forEach((card) => {
      if (card.votes > 0) {
        csv.push([list.section, card.text, card.votes]);
      }
    });
  });
  return csv.map((row) => row.join(',')).join('\n');
};