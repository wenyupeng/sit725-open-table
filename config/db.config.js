module.exports = {
    port: process.env.DB_PORT,
    // url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PWD}@cluster0.xo2dvru.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    // mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}
    url: process.env.MONGODB_URI
}