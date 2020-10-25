const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    quote: { type: String, required: true, unique: true }
})

schema.plugin(uniqueValidator);

module.exports = mongoose.model('quote', schema);