export const EnvConfiguration = () => ({
	environment: process.env.NODE_ENV || 'dev',
	mongodb: process.env.MONGO_DB_CONNECTION,
	port: process.env.PORT || 3005,
});
