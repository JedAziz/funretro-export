const { getFileText } = require('./getFileText.js');

const getListData = async (lists) => {
  try {
    return await Promise.all(
      lists.map(async (list) => {
        const listData = {};
        listData.section = await getListTitle(list);
        listData.cards = await getListCards(list);
        return listData;
      })
    );
  } catch (error) {
    console.error('Error in getListData:', error);
    throw error;
  }
};

const getListTitle = async (list) => {
  try {
    return await list.$eval('.column-header > h2', getFileText);
  } catch (error) {
    console.error('Error in getListTitle:', error);
    throw error;
  }
};

const getListCards = async (list) => {
  try {
    const cards = await list.$$('.column > li');
    return await Promise.all(
      cards.map(async (card) => {
        const cardData = {};
        cardData.text = await getCardText(card);
        cardData.votes = await getCardVotes(card);
        return cardData;
      })
    );
  } catch (error) {
    console.error('Error in getListCards:', error);
    throw error;
  }
};

const getCardText = async (card) => {
  try {
    return await card.$eval('.easy-card-body .text', getFileText);
  } catch (error) {
    console.error('Error in getCardText:', error);
    throw error;
  }
};

const getCardVotes = async (card) => {
  try {
    const voteString = await card.$eval('.easy-card-votes-container span.easy-badge-votes', getFileText);
    return parseInt(voteString);
  } catch (error) {
    console.error('Error in getCardVotes:', error);
    throw error;
  }
};

module.exports.getCardContent = async function (lists) {
  try {
    return await getListData(lists);
  } catch (error) {
    console.error('Error in getCardContent:', error);
    throw error;
  }
};
