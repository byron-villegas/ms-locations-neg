const Cache = require('../cache/Cache');

class LocationService {
  constructor(locationRepository, locationMapper, cache) {
    this.locationRepository = locationRepository;
    this.locationMapper = locationMapper;
    this.cache = cache;
  }

  async save(req, location) {
    console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationService] [save] [START] Save [${JSON.stringify(location)}]`);

    await this.locationRepository.save(req,location);

    console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationService] [save] [END] Save`);
  }

  async findAll(req) {
    console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationService] [findAll] [START] Find All`);

    const cachedLocations = this.cache.get('locations');

    if (cachedLocations) {
      console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationService] [findAll] [END] Find All from Cache [${cachedLocations.length}]`);
      return cachedLocations;
    }

    const locations = await this.locationRepository.findAll(req);

    this.cache.set('locations', locations);

    console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationService] [findAll] [END] Find All [${locations.length}]`);

    return locations;
  }
}

module.exports = LocationService;