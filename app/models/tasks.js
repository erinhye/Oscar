'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tasks = new Schema({
  email: {
    type: String,
    required: [true, '메일은 필수입니다.']
  },
  date: {
    type: Date,
    required: [true, '패스워드는 필수입니다.'],
    default: Date.now()
  },
  importance: {
    type: Number,
    required: [true, '별명은 필수입니다.']
  },
  title: {
    type: String,
    required: [true, '별명은 필수입니다.']
  },
  description: String,
  associate: String
});

mongoose.model('tasks', tasks);
