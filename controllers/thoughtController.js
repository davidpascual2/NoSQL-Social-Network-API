const { User, Thought } = require('../models');

module.exports = {

    getThoughts(req, res) { // DONE
        User.find({})
            .then((thoughts) => {
            console.log(thoughts) // ta added 
            return res.json(thoughts) // ta added
             res.json(thoughts)}) 
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) { // DONE
        Thought.findOne({ _id: req.params.thoughtId })
        // .select('__v')
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "no user with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    // createThought(req, res) { // done?
    //     Thought.create(req.body)
    //         .then((thought) => res.json(thought))
    //         .catch((err) => res.status(500).json(err));
    // },
    createThought(req, res) { // DONE
        Thought.create(req.body)
            .then((thought) => {  //dbThoughtData? 
                return User.findOneAndUpdate(
                    { _id: req.body.userId }, // ?
                    { $addToSet: { thoughts: thought._id} }, //thoughtId? 
                    { new: true } 
                );
            })
            .then(user => 
            !user
                ? res.status(404).json({ message: ' thought created, but no user with that ID'})
                : res.json('thought created')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    updateThought(req, res) { // DONE
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId}, //userId? or thoughtId or id
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ messages: 'no user with that ID'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    deleteThought(req, res) { // DONE
        Thought.deleteOne({ _id: req.params.thoughtId}) //findOneAndRemove?
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'no user with that ID'})
                    : User.findOneAndUpdate( //why not deleteMany?
                        {thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId} },
                        { new: true },
                    )
            )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'thought created but no yser with this ID'})
                : res.json({message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    //  add REACTION response
    createReaction(req, res) { //DONE
        Thought.findOneAndUpdate( //thought or reaction?  //create or find one and update?
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true },
        ) 
            .then((thought) =>
            !thought
                ? res.status(404).json({ messages: ' no thought with this ID'})
                : res.json(thought) //thought or reaction?
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete REACTION
    deleteReaction(req,res) { //DONE
        Thought.findOneAndUpdate( // Thought or Reaction //deleteOne or find one and update?
            { _id: req.params.thoughtId },
            {},
            {},
        ) 
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'no thought with that ID'})
                    : res.json(thought)
            )
            // .then(() => res.json( { message: 'reaction deleted!'} ))
            .catch((err) => res.status(500).json(err));
    },
};

//module.exports = thoughtController;