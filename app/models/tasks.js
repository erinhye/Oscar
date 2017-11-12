'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tasksSchema = new Schema({
  email: {
    type: String,
    required: [true, '메일은 필수입니다.']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  group: {
    type: String,
    required: [true, '패스워드는 필수입니다.'],
    default: ""
  },
  deadline: {
    type: String,
    required: [true, '패스워드는 필수입니다.']
  },
  importance: {
    type: String,
    required: [true, '별명은 필수입니다.']
  },
  title: {
    type: String,
    required: [true, '별명은 필수입니다.']
  },
  description: String,
  associate: String
});

mongoose.model('tasks', tasksSchema);
