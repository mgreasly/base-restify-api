const defaultName = 'base-restify-api';
const defaultPort = 3001;
const defaultEnvironment = 'development';
const defaultBaseUrl = `http://localhost:${defaultPort}`;
const defaultMongoUrl = `mongodb://127.0.0.1:27017/${defaultName}`;

module.exports = {
	name: defaultName,
	env: process.env.NODE_ENV || defaultEnvironment,
	port: process.env.PORT || defaultPort,
	base_url: process.env.BASE_URL || defaultBaseUrl,
	db: { uri: process.env.MONGODB_URI || defaultMongoUrl }
};
