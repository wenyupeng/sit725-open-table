const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

let popular_mer = [
    {
        merchantId:"1",
        img: "../../image/home/popular restaurant 1-5fbc8ba5752dea8c03dad9e1705cebc1.jpg",
        name: "The Grand Bistro",
        descriptions: "French • $$$ • Downtown",
        star: 4.5,
        reviews: 324
    },
    {
        merchantId: "1",
        img: "../../image/home/popular restaurant 2-2aa05309b66e98a682252ee638d0b5bc.jpg",
        name: "Sakura Fusion",
        descriptions: "French • $$$ • Downtown",
        star: 5,
        reviews: 456
    },
    {
        merchantId: "1",
        img: "../../image/home/popular restaurant 3-7e0258fd15b4cbad06dfa93e428249e5.jpg",
        name: "Bella Italia",
        descriptions: "Italian • $$ • West End",
        star: 4,
        reviews: 324
    },
];

let featured_col = [
    {
        img:"../../image/home/Romantic Dining-b3908f65073954273dedfc7b5db75d6e.jpg",
        type :"Romantic Dining",
        description:"Perfect for date night"
    },
    {
        img:"../../image/home/Outdoor-Dining-ad12dfa5120aedec19caaacececfed67.jpg",
        type :"Outdoor Dining",
        description:"Best all fresco spots"
    },
    {
        img:"../../image/home/Best Brunch-bb33baa494f153f2dc78fbfad0ed92b9.jpg",
        type :"Best Brunch",
        description:"Weekend favorites"
    },
    {
        img:"../../image/home/Chefs table-e0981a413a5461b1ae818f27125425fb.jpg",
        type :"Chef's Table",
        description:"Unique experiences"
    }

];

async function run() {
  try {
    const database = client.db("sit725-skipy");
    const popularMerCol = database.collection("popular-merchants");
    const featuredCollection = database.collection("featured-collections");

    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };
    const result1 = await popularMerCol.insertMany(popular_mer,options);
    const result2 = await featuredCollection.insertMany(featured_col,options);

    // Print the results
    console.log(`${result1.insertedCount} documents were inserted`);
    console.log(`${result2.insertedCount} documents were inserted`);
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);


