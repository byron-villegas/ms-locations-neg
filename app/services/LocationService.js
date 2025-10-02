const namespace = require('../utils/requestContext');
const LogUtil = require('../utils/LogUtil');

class LocationService {
  constructor(locationRepository, locationMapper, cache) {
    this.locationRepository = locationRepository;
    this.locationMapper = locationMapper;
    this.cache = cache;
  }

  async save(location) {
    LogUtil.info(`[LocationService] [save] [START] Save [${JSON.stringify(location)}]`);

    await this.locationRepository.save(location);

    LogUtil.info(`[LocationService] [save] [END] Save`);
  }

  async findAll() {
    LogUtil.info(`[LocationService] [findAll] [START] Find All`);

    const cachedLocations = this.cache.get('locations');

    if (cachedLocations) {
      LogUtil.info(`[LocationService] [findAll] [END] Find All from Cache [${cachedLocations.length}]`);
      return cachedLocations;
    }

    const locations = await this.locationRepository.findAll();

    this.cache.set('locations', locations);

    LogUtil.info(`[LocationService] [findAll] [END] Find All [${locations.length}]`);

    return locations;
  }
}

module.exports = LocationService;