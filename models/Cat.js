const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const CatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            enum: ['happy', 'sad', 'confused'],
            default: 'confused'
        },
    },
    { minimize: false }
);
CatSchema.plugin(timestamps);
CatSchema.plugin(mongooseStringQuery);

const Cat = mongoose.model('Cat', CatSchema);
module.exports = Cat;
