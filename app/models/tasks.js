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
    default: "Unsorted"
  },
  deadline: {
    type: String
  },
  importance: {
    type: String
  },
  title: {
    type: String,
    required: [true, '별명은 필수입니다.']
  },
  description: String,
  associate: String
});

mongoose.model('tasks', tasksSchema);
