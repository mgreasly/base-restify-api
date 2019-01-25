const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const DogSchema = new mongoose.Schema(
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
DogSchema.plugin(timestamps);
DogSchema.plugin(mongooseStringQuery);

const Dog = mongoose.model('Dog', DogSchema);
module.exports = Dog;
