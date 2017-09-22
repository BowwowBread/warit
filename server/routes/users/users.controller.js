const mongoose = require('mongoose');

const model = require('../../models/users');

const User = mongoose.model('User');

module.exports = User;