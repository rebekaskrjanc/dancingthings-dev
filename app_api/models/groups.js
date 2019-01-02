'use strict';
var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  groupName: {type: String, required: true, unique: true, dropDups: true},
  groupAdmin: {type: String},
  about: {type: String}
});

mongoose.model('Group', groupSchema, 'Groups');