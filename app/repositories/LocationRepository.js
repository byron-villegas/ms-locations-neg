class LocationRepository {
    constructor(mongoDBClient) {
        this.mongoDBClient = mongoDBClient;
    }

    async save(req, location) {
        console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationRepository] [save] [START] Save [${JSON.stringify(location)}]`);

        const collection = await this.mongoDBClient.getCollection('locations');

        await collection.insertOne(location);

        console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationRepository] [save] [END] Save`);
    }

    async findAll(req) {
        console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationRepository] [findAll] [START] Find All`);

        const collection = await this.mongoDBClient.getCollection('locations');

        const locations = await collection.find({}).toArray();

        console.info(`${new Date().toISOString()} [${req.trackingId}] [LocationRepository] [findAll] [END] Find All [${locations.length}]`);

        return locations;
    }
}

module.exports = LocationRepository;