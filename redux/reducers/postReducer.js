var c = require('./../constants.js')

let postsReducer = function(posts = [], action){

  switch(action.type){
    case c.INIT_POSTS:
      return action.payload;
    case c.ADD_POST:
      return [action.payload, ...posts];
    case c.DELETE_POST:
      return posts.filter(post=>action.payload !== post);
    default:
      return posts;
  }
}

export default postsReducer;
