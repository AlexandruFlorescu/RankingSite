const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    owner: {
      type: String,
    },
    public: {
      type: Boolean,
      default: true,
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
    items_count:{
      type: Number,
      min: 0,
      default: 0,
    },
    items: [''],
    create_date:{
      type: Date,
      default: Date.now
    }
});

const Category = module.exports = mongoose.model('category', categorySchema);

module.exports.getCategories = (callback) => {
  Category.find(callback);
}

module.exports.setCategory = (category, callback) => {
  Category.create(category, callback);
}

module.exports.removeCategory = (category, callback) => {
  Category.remove(category, callback);
}

module.exports.findCategory = (category,callback) => {
  Category.find(category, callback);
}

// module.exports.addCategory = (category, callback) => {
//   Category.create(category, callback);
// }

// module.exports.addUserToCrew = (user, crew, callback) => {
//   Category.update({_id: crew._id}, {$set: {users:[]}}, callback  )
// }

// {$set: {users:[]}}
// {$push: {users: user.user_id}}
