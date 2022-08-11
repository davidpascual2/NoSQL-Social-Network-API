const { Schema, model } = require('mongoose');
//const { isEmail } = require('validator') ??????

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true, //true?
            trim: true,
        },
        email: {
            type: String,
            required: true, //true?
            unique: true,
            lowercase: true,
            // validate: [isEmail] 
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,30})$/, "Your email was Wrong,please enter a valid email address",]
        },
        thoughts: [ // thoughts is reference to another object based on the id (id of another user object)
            {
                type: Schema.Types.ObjectId,
                ref: 'thought', //capital?
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user' //capital?
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//create a virtual property
userSchema
.virtual('friendCount')
.get(function() {
    return this.friends.length;
});

//initialize user model
const User = model('user', userSchema);


module.exports = User;