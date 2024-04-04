module.exports.formatMarkdown = function (boardData) {
    const markdown = [];
    // add boardtitle
    markdown.push(`# ${boardData.boardTitle}`);
    markdown.push('');
    // add lists
    boardData.lists.forEach((list) => {
      // add list title
      markdown.push(`## ${list.section}`);
      markdown.push('');
      // add list cards
      list.cards.forEach((card) => {
        markdown.push(`- ${card.text} ${formatVoteCount(card.votes)}`);
      });
  
      markdown.push('');
    });
  
    return markdown.join('\n');
  };
  
  const formatVoteCount = (votes) => (votes > 0 ? `(+${votes})` : '');