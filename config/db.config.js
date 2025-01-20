module.exports = {
    port: process.env.DB_PORT,
    // url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PWD}@cluster0.xo2dvru.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    url: `mongodb://admin:adminpwd@localhost:27017/sit725-skipy?authSource=admin`
    // url: process.env.MONGODB_URI
    // url: process.env.MONGODB_TEST_URI
}