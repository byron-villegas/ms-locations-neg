const namespace = require('../utils/requestContext');
const LogUtil = require('../utils/LogUtil');

class LocationRepository {
    constructor(mongoDBClient) {
        this.mongoDBClient = mongoDBClient;
    }

    async save(location) {
        LogUtil.info(`[LocationRepository] [save] [START] Save [${JSON.stringify(location)}]`);

        const collection = await this.mongoDBClient.getCollection('locations');

        await collection.insertOne(location);

        LogUtil.info(`[LocationRepository] [save] [END] Save`);
    }

    async findAll() {
        LogUtil.info(`[LocationRepository] [findAll] [START] Find All`);

        const collection = await this.mongoDBClient.getCollection('locations');

        const locations = await collection.find({}).toArray();

        LogUtil.info(`[LocationRepository] [findAll] [END] Find All [${locations.length}]`);

        return locations;
    }
}

module.exports = LocationRepository;