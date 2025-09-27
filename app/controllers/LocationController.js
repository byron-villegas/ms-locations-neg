const { validationResult } = require('express-validator');

const ParametersError = require('../errors/ParametersError');
const LocationDTO = require('../dtos/LocationDTO');

class LocationController {
  constructor(locationService, locationMapper) {
    this.locationService = locationService;
    this.locationMapper = locationMapper;
  }

  async save(req, res, next) {
    try {
      console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationController] [save] [START] Save`);

      const errors = validationResult(req);

      console.log(errors);

      if (!errors.isEmpty()) {
        throw ParametersError.fromValidationErrors(errors.array());
      }

      const data = req.body;

      const locationDTO = new LocationDTO(data.id, data.name, data.latitude, data.longitude);

      await this.locationService.save(req, this.locationMapper.toDomain(locationDTO));

      console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationController] [save] [END] Save`);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationController] [findAll] [START] Find All`);

      const locations = await this.locationService.findAll(req);

      const locationsDTO = locations.map(location => this.locationMapper.toDTO(location));

      console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationController] [findAll] [END] Find All [${locationsDTO.length}]`);

      res.status(200).json(locationsDTO);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LocationController;