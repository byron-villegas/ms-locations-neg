# ms-locations-neg

Microservice for location management built with Node.js, Express, and MongoDB.

## Project Structure

```
ms-locations-neg/
│
├── app/
|   ├── cache/          # Caching layer
|   ├── clients/        # MongDB client
│   ├── configs/        # App configuration
|   ├── constants/      # Application constants
|   ├── controllers/    # Route controllers
|   ├── docs/           # Sawagger API documentation
|   ├── domains/        # Business logic
|   ├── errors/         # Custom error classes
|   ├── mappers/        # Data mappers
|   ├── middlewares/    # Express middlewares
|   ├── repositories/   # Data access layer
|   ├── routes/         # Express routes
|   |── services/       # Service layer
│   └── app.js          # Express configuration
├── index.js            # Entry point
├── .env                # Environment variables
├── package.json
└── vercel.json           # Vercel deployment config
```

## Prerequisites
``json
  "dependencies": {
    "axios": "^1.12.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "js-yaml": "^4.1.0",
    "mongodb": "^6.20.0",
    "node-fetch": "^2.7.0",
    "swagger-ui-express": "^5.0.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "jest": "^30.1.3",
    "nodemon": "^3.0.1"
  },
``

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ms-locations-neg
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory:
```env
MONGO_USER=your_mongo_user
MONGO_PASSWORD=your_mongo_password
MONGO_HOST=your_mongo_host
MONGO_DB=your_database_name
```

## Available Scripts

### Install dependencies
```bash
npm install
```

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

## API Endpoints

### Locations

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| GET    | /api/locations | Get all locations   |
| POST   | /api/locations | Create new location |

### Request Examples

**Create Location:**
```json
POST /api/locations
{
    "id": 1,
    "name": "DUOC UC",
    "latitude": 3242344.232,
    "longitude": 2343212.123
}
```

## Environment Variables

| Variable       | Description           | Default |
|----------------|-----------------------|---------|
| MONGO_USER     | MongoDB username      | -       |
| MONGO_PASSWORD | MongoDB password      | -       |
| MONGO_HOST     | MongoDB host URL      | -       |
| MONGO_DB       | MongoDB database name | -       |

## Deployment

### Local Development
1. Start MongoDB
2. Set up environment variables
3. Run `npm run dev`

### Vercel Deployment
Configure `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "index.js" }
  ]
}
```

## Error Handling

The service includes standard error responses:

- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Logging

Logs are handled through console with timestamps and include:
- Request information
- Database operations
- Error details

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to the branch
4. Create a Pull Request

## License

[MIT License](LICENSE)