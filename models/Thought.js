const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const { formatDate } = require('../utils/helpers'); //needed?

//const moment = require('moment')

// const reactionSchema = new Schema(
//     {
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId(),

//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxLength: 280,
//         },
//         username: {
//             type: String,
//             required: true,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: formatDate, // ??????? //FIX THIS
//         },
//     }
// )
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date, // ?
            default: () => Date.now, // timestamp?
            get: formatDate, // getter method? //FIX THIS
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction] //replies
    },
    {
        toJSON: {
            getters: true, // ?
            virtuals: true,
        },
        id: false // is this needed?
    } 
);

//create virtual property
thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

//initialize model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;