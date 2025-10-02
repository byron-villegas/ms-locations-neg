const LogUtil = require('../utils/LogUtil');

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
      LogUtil.info(`[LocationController] [save] [START] Save`);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        LogUtil.error(`[LocationController] [save] [ERROR] Validation errors: ${JSON.stringify(errors.array())}`);
        throw ParametersError.fromValidationErrors(errors.array());
      }

      const data = req.body;

      const locationDTO = new LocationDTO(data.id, data.name, data.latitude, data.longitude);

      await this.locationService.save(this.locationMapper.toDomain(locationDTO));

      LogUtil.info(`[LocationController] [save] [END] Save`);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      LogUtil.info(`[LocationController] [findAll] [START] Find All`);

      const locations = await this.locationService.findAll();

      const locationsDTO = locations.map(location => this.locationMapper.toDTO(location));

      LogUtil.info(`[LocationController] [findAll] [END] Find All [${locationsDTO.length}]`);

      res.status(200).json(locationsDTO);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      LogUtil.info(`[LocationController] [findById] [START] Find By Id`);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        LogUtil.error(`[LocationController] [findById] [ERROR] Validation errors: ${JSON.stringify(errors.array())}`);
        throw ParametersError.fromValidationErrors(errors.array());
      }

      const { id } = req.params;

      LogUtil.info(`[LocationController] [findById] [END] Find By Id [${id}]`);

      res.status(200).json(locationDTO);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LocationController;