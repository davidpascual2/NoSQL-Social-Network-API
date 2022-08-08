const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


//aggregate function? 

module.exports = { 
    
    getUsers(req, res) { // done?
        User.find({})
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    getSingleUser(req, res) { // done ?
        User.findOne({ _id: req.params.userId })
            .select('__v')
            .then((user) =>
            !user
                ? res.status(404).json({message: "no user with that ID" })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    createUser(req, res) { // done? 
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    updateUser(req, res) { // done? 
        User.findOneAndUpdate(
            { _id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((user) =>
                !user
                ? res.status(404).json({ messages: 'no user with that ID'})
                : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    deleteUser(req, res) { // done?
        User.deleteOne({ _id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'no user with that ID'})
                    : Thought.deleteMany({ _id: { $in: user.thoughts} })
        )
            .then(() => res.json( {message: 'user and thoughts Deleted!'} ))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    //add friend
    addFriend(req, res) {
        console.log('adding friend')
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.params.friendsId } },
            { runValidators: true, new: true },
        )
            .then((user) =>
                !user 
                ? res.status(404).json({ message: 'no friend with that ID'}) 
                : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    //delete friend
    deleteFriend(req, res) {
        console.log('deleting friend')
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendsId } },
            {runValidators: true, new: true},
        )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'no friend with that ID'})
                : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    },
};

module.exports = userController;