const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    item: {
      type: String,
    },
    writer:{
      type: String,
    },
    text:{
      type: String,
    },
    create_date:{
      type: Date,
      default: Date.now
    }
});

const Post = module.exports = mongoose.model('post', postSchema);

module.exports.getPosts = (callback) => {
  Post.find(callback);
}

module.exports.setPost = (post, callback) => {
  Post.create(post, callback);
}

module.exports.removePost = (post, callback) => {
  Post.remove(post, callback);
}

module.exports.findPost = (post,callback) => {
  Post.find(post, callback);
}

// module.exports.cleanItem = (payload,callback) => {
//   Item.update({_id : payload.item}, {$set: {voted_by: [], votes: [], votes_count:0, score: 0}}, callback);
// }
//
// module.exports.voteItem = (payload,callback) => {
  // Item.find(payload.item._id, callback);
  // if()
  // Item.update({_id : payload.item}, {$inc: {score: payload.score, votes_count: 1}, $push: {voted_by: payload.userId, votes: {user: payload.userId, score:payload.score}}}, callback);
  // else
    // Item.update(payload.item, {$inc: {score: payload.score}, $push: {voted_by: payload.userId}}, callback);
  // Item.update(payload.item, {$inc: {score: payload.score}, $push: {voted_by: payload.userId}, $pushAll: {votes: [{user: payload.userId, score:payload.score}] }}, callback);
// }
//
// module.exports.deVoteItem = (payload,callback) => {
//   Item.update({_id : payload.item}, {$inc: {score: -payload.vote.score, votes_count:-1}, $pull: {voted_by: payload.vote.user, votes: payload.vote}}, callback);
// }
// module.exports.decrementItem = (item,callback) => {
//   Item.update(item, {$inc: {score: -1}}, callback);
// }

// module.exports.additem = (item, callback) => {
//   Item.create(item, callback);
// }

// module.exports.addUserToCrew = (user, crew, callback) => {
//   item.update({_id: crew._id}, {$set: {users:[]}}, callback  )
// }

// {$set: {users:[]}}
// {$push: {users: user.user_id}}
