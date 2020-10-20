const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    author: {
      type: String,
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    WorkImages: {
      type: Array,
      default: [],
    },
    AuthorImage: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Work = mongoose.model('Work', workSchema);

module.exports = { Work };
