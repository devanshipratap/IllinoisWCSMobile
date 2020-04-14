var express = require('express'),
    router = express.Router(),
    users = require('../models/user'),
    events = require('../models/event'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

/**
* Returns all events in database
*
* TODO: Add filtering based on event date
*/
router.get('/', async (req, res) => {
    try {
        const doc = await events.find({});
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
* Returns the document that matches <name>
*/
router.get('/:name', async (req, res) => {
    try {
        const doc = await events.findOne({name: req.params.name});
        if (!doc) {
            res.status(404).send({
                message: 'Event not found',
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
* Creates the document from request body
*/
router.post('/', async (req, res) => {
    // Validate request body
    if (!req.body.name || !req.body.eventDate) {
        res.status(400).send({
            message: 'Must include event name and date',
            data: null
        });
    }
    // Construct new Date object
    req.body.eventDate = new Date(req.body.eventDate);
    try {
        // Verify event does not already exist
        const doc = await events.findOne({name: req.body.name});
        if (doc) {
            res.status(400).send({
                message: 'Event already exists',
                data: null
            });
        }
        // Construct new entry and save to database
        const item = new events(req.body);
        await item.save();
        res.status(201).send({
            message: 'New event created',
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
