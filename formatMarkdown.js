module.exports.formatMarkdown = function (boardData) {
    const markdown = [];

    // Add board title as a heading
    markdown.push(`# ${boardData.boardTitle}`);
    markdown.push('');

    // Iterate over lists
    boardData.lists.forEach((list) => {
        // Add section title as a heading
        markdown.push(`## ${list.section}`);
        markdown.push('');

        // Iterate over cards
        list.cards.forEach((card) => {
            // Add card text and vote count
            markdown.push(`- ${card.text} ${formatVoteCount(card.votes)}`);
        });

        markdown.push('');
    });

    return markdown.join('\n');
};

// Function to format vote count
const formatVoteCount = (votes) => (votes > 0 ? `(+${votes})` : '');
