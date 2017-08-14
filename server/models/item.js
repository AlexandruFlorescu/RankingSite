const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    category: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      index: {unique: true}
    },
    author: {
      type: String,
      required: true,
      index: {unique: true}
    },
    image:{
      type: String,
      default: './../assets/matthew.png',
    },
    description:{
      type: String,
      default: 'No description added yet',
    },
    votes_count:{
      type: Number,
      min: 0,
      default: 0,
    },
    voted_by: [''],
    votes: {type: Array, default:[]},
    create_date:{
      type: Date,
      default: Date.now
    }
});

const Item = module.exports = mongoose.model('item', itemSchema);

module.exports.getItems = (callback) => {
  Item.find(callback);
}

module.exports.setItem = (item, callback) => {
  Item.create(item, callback);
}

module.exports.removeItem = (item, callback) => {
  Item.remove(item, callback);
}

module.exports.findItem = (item,callback) => {
  Item.find(item, callback);
}

module.exports.cleanItem = (payload,callback) => {
  Item.update({_id : payload.item}, {$set: {voted_by: [], votes: [], votes_count:0, score: 0}}, callback);
}

module.exports.voteItem = (payload,callback) => {
  // Item.find(payload.item._id, callback);
  // if()
  Item.update({_id : payload.item}, {$inc: {score: payload.score, votes_count: 1}, $push: {voted_by: payload.userId, votes: {user: payload.userId, score:payload.score}}}, callback);
  // else
    // Item.update(payload.item, {$inc: {score: payload.score}, $push: {voted_by: payload.userId}}, callback);
  // Item.update(payload.item, {$inc: {score: payload.score}, $push: {voted_by: payload.userId}, $pushAll: {votes: [{user: payload.userId, score:payload.score}] }}, callback);
}

module.exports.deVoteItem = (payload,callback) => {
  Item.update({_id : payload.item}, {$inc: {score: -payload.vote.score, votes_count:-1}, $pull: {voted_by: payload.vote.user, votes: payload.vote}}, callback);
}
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
