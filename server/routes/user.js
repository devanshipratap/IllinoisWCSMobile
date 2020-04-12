var express = require('express'),
    router = express.Router(),
    users = require('../models/user'),
    events = require('../models/event'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

/**
* Returns the document that matches <login>
*/
router.get('/:login', async (req, res) => {
    try {
        const doc = await users.findOne({login: req.params.login});
        if (!doc) {
            res.status(404).send({
                message: 'User not found',
                data: null
            });
        }
        res.status(200).send({
            message: 'Success',
            data: doc
        });
    } catch (e) {
        res.status(500).send({
            message: 'Server error',
            data: null
        });
    }
});

/**
* Updates the document that matches <name>
*
* Requires 'event' field in request body
*/
router.put('/:login', async (req, res) => {
    // Validate request body
    if (!req.body.event) {
        res.status(400).send({
            message: 'Must include event name',
            data: null
        });
    }
    try {
        // Verify user exists
        const user = await users.findOne({login: req.params.login});
        if (!user) {
            res.status(404).send({
                message: 'User not found',
                data: null
            });
        }
        // Verify event exists
        const event = await events.findOne({name: req.body.event});
        if (!event) {
            res.status(400).send({
                message: 'Invalid event name',
                data: null
            });
        }
        // Update user's total points and events attended
        user.pointsEarned += event.points;
        user.eventsAttended.push(event.name);
        await user.save();
        // Update event's attendees
        event.attendees.push(user.login);
        await event.save();
        res.status(200).send({
            message: 'Success',
            data: null
        });
    } catch (e) {
        res.status(500).send({
            message: 'Server error',
            data: null
        });
    }
});

/**
* Creates the document from request body
*/
router.post('/', async (req, res) => {
    // Validate request body
    if (!req.body.login || !req.body.name) {
        res.status(400).send({
            message: 'Must include login and name',
            data: null
        });
    }
    try {
        // Verify user does not already exist
        const doc = await users.findOne({login: req.body.login});
        if (doc) {
            res.status(400).send({
                message: 'User already exists',
                data: null
            });
        }
        // Construct new entry and save to database
        const item = new users(req.body);
        await item.save();
        res.status(201).send({
            message: 'New user created',
            data: null
        });
    } catch (e) {
        res.status(500).send({
            message: 'Server error',
            data: null
        });
    }
});

module.exports = router;
