var c = require('./../constants.js')

let crewReducer = function(categories=[], action){

  switch (action.type) {

    case c.INIT_CATEGORIES:
      return action.payload || categories;

    case c.CREATE_CATEGORY:
      return [{
          name: action.payload.name,
          image: action.payload.image,
          description: action.payload.description,
          private: action.payload.private,
          owner: action.payload.owner,
          items: action.payload.items,
          items_count: action.payload.items_count,
        }, ...categories];

    case c.DELETE_CATEGORY:
      return categories.filter(category=>action.payload !== category);

    // case c.CREATE_CATEGORY:

    // case c.ADD_USER_TO_CREW:
    //   return crews.map(crew=>{
    //     return crew._id === action.payload.crew._id ?
    //           { ...crew, users: [...crew.users, action.payload.user.user_id] }
    //           : crew
    //   })

    default:
      return categories;
    }

  }

export default crewReducer
