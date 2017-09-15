var c = require('./constants.js')

let actions = {
//USERS
  initializeUsers: function() {
    // console.log(localStorage.getItem('manageToken'));
    return dispatch =>{
      fetch('https://seastar.eu.auth0.com/api/v2/users',{
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        }
      }).then(resp=>resp.json())
      .then(respJson=>dispatch({type:c.INIT_USERS, payload:respJson}))
    }
  },
  updateUser: function(user_id, body) {
    console.log(user_id);
    return dispatch => {
      fetch('https://seastar.eu.auth0.com/api/v2/users/' + user_id, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body:JSON.stringify(body)
      }).then(resp=>resp.json())
      .then(respJson=>{dispatch({type: c.UPDATE_USER,
                                payload: {user_id: user_id, body}
                              })
                       dispatch({type: c.LOGIN_UPDATE,
                                payload: body })
                     }
            )
    }
  },
  getUser: function(userId) {
    return dispatch => {
      fetch('https://seastar.eu.auth0.com/api/v2/users/' + userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        }
      }).then(resp=>resp.json())
      .then(respJson=>
              dispatch({type: c.LOGIN_SUCCESS,
                      payload: respJson })
                    )
    }
  },
  loginUser: function(userId) {
    return dispatch => {
      fetch('https://seastar.eu.auth0.com/api/v2/users/' + userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        }
      }).then(resp=>resp.json())
      .then(respJson=>{
              dispatch({type: c.LOGIN_SUCCESS,
                      payload: respJson })
                    } )
    }
  },
  logOff: function(){
    return {type: c.LOG_OFF, payload: {}};
  },
//CATEGORIES
  initializeCategories: function(){
    // console.log('initializeCrews')
    return dispatch=>{
      fetch('/api/getCategories', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        }
      }).then(resp=>resp.json())
      .then(respJson => dispatch({type: c.INIT_CATEGORIES,
                                  payload: respJson})
            )
    }
  },
  addCategory: function(category){
    return dispatch=>{
      fetch('/api/setCategories', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(category)
      }).then(resp => resp.json())
      .then(respJson => dispatch({type: c.CREATE_CATEGORY,
                                  payload: category})
            )
    }
  },
  deleteCategory: function(category){
    return dispatch=>{
      fetch('/api/deleteCategory', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(category)
      }).then(resp => resp.json())
      .then(respJson => dispatch({type: c.DELETE_CATEGORY,
                                  payload: category})
            )

      // fetch('/api/clearCategory', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': localStorage.getItem('manageToken'),
      //   },
      //   body: JSON.stringify(category)
      // }).then(resp => resp.json())
      // .then(respJson => console.log(respJson));
    }
  },
//ITEEEEMS
  initializeItems: function(){
    return dispatch=>{
      fetch('/api/getItems', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        }
      }).then(resp=>resp.json())
      .then(respJson => dispatch({type: c.INIT_ITEMS,
                                  payload: respJson})
            )
    }
  },
  addItem: function(item){
    return dispatch=>{
      fetch('/api/setItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(item)
      }).then(resp => resp.json())
      .then(respJson => dispatch({type: c.CREATE_ITEM,
                                  payload: item})
            )
    }
  },
  deleteItem: function(item){
    return dispatch=>{
      fetch('/api/deleteItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(item)
      }).then(resp => resp.json())
      .then(respJson => dispatch({type: c.DELETE_ITEM,
                                  payload: item})
            )
    }
  },
  voteItem: function(item, userId, score){
    return dispatch => {
      fetch('/api/voteItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify({item: item, userId: userId, score: score})
      })
    dispatch({type: c.VOTE_ITEM,
            payload: {item: item, userId: userId, score: score}});
          }
  },
  deVoteItem: function(item, vote){
    return dispatch => {
      fetch('/api/devoteItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify({item: item, vote: vote})
      })
    dispatch({type: c.DEVOTE_ITEM,
            payload: {item: item, vote: vote}});
          }
  },
  cleanItem: function(item, userId, score){
    return dispatch => {
      fetch('/api/cleanItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify({item: item, userId: userId, score: score})
      })
    // dispatch({type: c.VOTE_ITEM,
    //         payload: {item: item, userId: userId, score: score}});
          }
  },
  updateItem: function(item) {
    return dispatch => {
      fetch('/api/updateItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(item)
      }).then(resp => resp.json() )
      .then(respJson => dispatch({type: c.UPDATE_ITEM,
                                  payload: item})
          )
    }
  },
//POSTS
  initializePosts: function(){
    return dispatch=>{
      fetch('/api/getPosts', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        }
      }).then(resp=>resp.json())
      .then(respJson => dispatch({type: c.INIT_POSTS,
                                  payload: respJson})
            )
    }
  },
  addPost: function(post){
    return dispatch=>{
      console.log(post);
      fetch('/api/setPost', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(post)
      }).then(resp => resp.json())
      .then(respJson => dispatch({type: c.ADD_POST,
                                  payload: post})
            )
    }
  },
  deletePost: function(post){
    return dispatch=>{
      fetch('/api/deletePost', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('manageToken'),
        },
        body: JSON.stringify(post)
      }).then(resp => resp.json())
      .then(respJson => dispatch({type: c.DELETE_POST,
                                  payload: post})
            )
    }
  },
  
  changeColor: function(color){
    return {type: c.CHANGE_COLOR, payload: color};
  },
  // decrementItem: function(item, userId){
  //   return dispatch => {
  //     fetch('/api/decrementItem', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': localStorage.getItem('manageToken'),
  //       },
  //       body: JSON.stringify({item: item, userId: userId})
  //     });
  //   dispatch({type: c.DECREMENT_ITEM,
  //           payload: item})
  //         }
  // },
  // addUserToCrew: function(user, crew){
  //   console.log('addUserToCrew');
  //   return dispatch=>{
  //     fetch('/api/alterCrew', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': localStorage.getItem('manageToken'),
  //       },
  //       body: JSON.stringify({user: user, crew: crew})
  //     }).then(resp=> resp.json())
  //     .then(respJson => dispatch({
  //                   type: c.ADD_USER_TO_CREW,
  //                   payload: {user: user, crew: crew}
  //                 })
  //           )
  //   }
  // },
}

export default actions;
