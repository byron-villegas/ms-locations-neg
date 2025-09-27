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

    const locations = await this.locationRepository.findAll(req);

    console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationService] [findAll] [END] Find All [${locations.length}]`);

    return locations;
  }
}

module.exports = LocationService;