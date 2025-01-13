module.exports = {
    port: process.env.DB_PORT,
    url: `mongodb://localhost:27017/skippy`
    // mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}
}