// Function to extract data for each list, including section title and cards
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
  
  // Function to extract the section title from a list
  const getListTitle = async (list) => {
    try {
      return await list.$eval('.column-header > h2', getFileText);
    } catch (error) {
      console.error('Error in getListTitle:', error);
      throw error;
    }
  };
  
  // Function to extract card data from a list
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
  
  // Function to extract card text from a card element
  const getCardText = async (card) => {
    try {
      return await card.$eval('.easy-card-body .text', getFileText);
    } catch (error) {
      console.error('Error in getCardText:', error);
      throw error;
    }
  };
  
  // Function to extract card votes from a card element
  const getCardVotes = async (card) => {
    try {
      const voteString = await card.$eval('.easy-card-votes-container span.easy-badge-votes', getFileText);
      return parseInt(voteString);
    } catch (error) {
      console.error('Error in getCardVotes:', error);
      throw error;
    }
  };
  
  // Function to get content for each card in the board
  module.exports.getCardContent = async function (lists) {
    try {
      return await getListData(lists);
    } catch (error) {
      console.error('Error in getCardContent:', error);
      throw error;
    }
  };
  