const config = require('../configs/config');
const { MongoClient } = require('mongodb');

class MongoDBClient {
    constructor() {
        this.client = null;
        this.uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.db}`;
        this.collectionName = 'locations';
        this.isConnecting = false;
    }

    async connect() {
        console.info(`${new Date().toISOString()} [MongoDBClient] [connect] [START] Connecting to MongoDB...`);

        if (this.client && this.client.topology && this.client.topology.isConnected()) {
            console.info(`${new Date().toISOString()} [MongoDBClient] [connect] MongoDB is already connected`);
            return;
        }

        if (this.isConnecting) {
            // Wait until connection is established
            await this._waitForConnection();
            return;
        }

        this.isConnecting = true;
        try {
            this.client = await MongoClient.connect(this.uri);

            // Listen for close/error events to reset connection
            this.client.on('close', () => {
                this.client = null;
                console.warn(`${new Date().toISOString()} [MongoDBClient] [connect] MongoDB connection closed`);
            });

            this.client.on('error', (err) => {
                this.client = null;
                console.error(`${new Date().toISOString()} [MongoDBClient] [connect] [ERROR] Failed to connect to MongoDB:`, err);
            });

            console.info(`${new Date().toISOString()} [MongoDBClient] [connect] [END] Connected to MongoDB`);
        } catch (error) {
            console.error(`${new Date().toISOString()} [MongoDBClient] [connect] [ERROR] Failed to connect to MongoDB:`, error);
            throw error;
        } finally {
            this.isConnecting = false;
        }
    }

    async _waitForConnection() {
        const maxWait = 5000;
        const interval = 100;
        let waited = 0;
        while (this.isConnecting && waited < maxWait) {
            await new Promise(res => setTimeout(res, interval));
            waited += interval;
        }
        if (!this.client) throw new Error('MongoDB connection timeout');
    }

    async ensureConnection() {
        if (!this.client || !this.client.topology || !this.client.topology.isConnected()) {
            await this.connect();
        }
    }

    async close() {
        console.info(`${new Date().toISOString()} [MongoDBClient] [close] [START] Closing MongoDB connection...`);

        if (this.client) {
            await this.client.close();
            this.client = null;
        }

        console.info(`${new Date().toISOString()} [MongoDBClient] [close] [END] MongoDB connection closed`);
    }

    async getCollection(name) {
        if (!this.client) {
            await this.connect();
        }

        return this.client.db().collection(name);
    }
}

module.exports = MongoDBClient;