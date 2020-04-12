const mongoose = require('mongoose');
const EventModel = require('../models/event');
const eventData = { name: 'React Workshop', eventDate: new Date(), points: 2 };

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save event successfully', async () => {
        const validUser = new EventModel(eventData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(eventData.name);
        expect(savedUser.date).toBe(eventData.login);
        expect(savedUser.points).toBe(eventData.points);
        expect(savedUser.attendees.length).toBe(0);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert event successfully, but the field does not defined in schema should be undefined', async () => {
        const eventWithInvalidField = new EventModel({ name: 'Intro to NERD Stack', eventDate: new Date(), time: '13:30:00' });
        const savedUserWithInvalidField = await eventWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.time).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create event without required field should failed', async () => {
        const eventWithoutRequiredField = new EventModel({ name: 'Coffee Break' });
        let err;
        try {
            const savedUserWithoutRequiredField = await eventWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.eventDate).toBeDefined();
    });

    // Close connection to MongoDB Memory Server
    afterAll(() => {
        mongoose.connection.close();
    });

});
