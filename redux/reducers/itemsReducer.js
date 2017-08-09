var c = require('./../constants.js')

let itemsReducer = (items = [], action) => {
  switch (action.type) {
    case c.INIT_ITEMS:
      return (action.payload || items).sort((a,b)=>{return a.score < b.score;} );
    case c.CREATE_ITEM:
      return [{
        category: action.payload.category,
        score: action.payload.score,
        name: action.payload.name,
        image: action.payload.image,
        description: action.payload.description,
        votes_count: action.payload.votes_count,
        voted_by: action.payload.voted_by,
        votes: action.payload.votes,
      }, ...items];
    case c.DELETE_ITEM:
      return items.filter(item=>action.payload !== item);

    case c.VOTE_ITEM:
      return items.map( item => {
        return item._id === action.payload.item._id ? {...item, score: item.score + action.payload.score, votes_count: item.votes_count+1,
                                                                voted_by: [...item.voted_by, action.payload.userId],
                                                                votes: [...item.votes, {user:action.payload.userId, score:action.payload.score}]} : item
      });
    case c.DEVOTE_ITEM:
      return items.map( item => {
        return item._id === action.payload.item._id ? {...item, score: item.score - action.payload.vote.score, votes_count: item.votes_count-1,
                                                                voted_by: item.voted_by.filter(voter=> {return action.payload.vote.user !== voter }),
                                                                votes: item.votes.filter(vote=> {return action.payload.vote.user!==vote.user})  } : item
                              });

    default:
      return items;
  }
}

export default itemsReducer



// case c.DECREMENT_ITEM:
//   return items.map( item => {
//     return item._id === action.payload._id ? {...item, score: item.score-1} : item
//   })
