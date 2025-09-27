const express = require('express');
const { body } = require('express-validator');

const LocationRepository = require('../repositories/LocationRepository');
const LocationService = require('../services/LocationService');
const LocationController = require('../controllers/LocationController');
const LocationMapper = require('../mappers/LocationMapper');
const Cache = require('../cache/Cache');

module.exports = (mongoClient) => {
    const router = express.Router();
    const cache = new Cache();
    const locationMapper = new LocationMapper();
    const locationRepository = new LocationRepository(mongoClient);
    const locationService = new LocationService(locationRepository, locationMapper, cache);
    const locationController = new LocationController(locationService, locationMapper);

    router.post(
        '/',
        [
            body('id').notEmpty().withMessage('id is required'),
            body('name').notEmpty().withMessage('name is required'),
            body('latitude').exists({ checkNull: true }).withMessage('latitude is required'),
            body('latitude').isFloat().withMessage('latitude must be a number'),
            body('longitude').exists({ checkNull: true }).withMessage('longitude is required'),
            body('longitude').isFloat().withMessage('longitude must be a number')
        ],
        (req, res, next) => locationController.save(req, res, next)
    );
    router.get('/', (req, res, next) => locationController.findAll(req, res, next));

    return router;
};