module.exports = {
    port: process.env.DB_PORT,
    url: process.env.MONGODB_URI,
    redisUrl: process.env.REDIS_URL
    // mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}
}