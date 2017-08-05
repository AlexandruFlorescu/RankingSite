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

// module.exports.additem = (item, callback) => {
//   Item.create(item, callback);
// }

// module.exports.addUserToCrew = (user, crew, callback) => {
//   item.update({_id: crew._id}, {$set: {users:[]}}, callback  )
// }

// {$set: {users:[]}}
// {$push: {users: user.user_id}}
