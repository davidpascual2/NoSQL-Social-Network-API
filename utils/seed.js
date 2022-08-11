const connection = require('../config/connection');
const { User, Video } = require('..models');
const { getRandomName , getRandomThoughts  } = require('./data');
const { Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = getRandomThoughts(10);

    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName();
        const first = fullName.split(" ")[0];
        const last = fullName.split(' ')[1];

        users.push({
            first,
            last,
            age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
        });
    }

    await User.collection.insertMany
})