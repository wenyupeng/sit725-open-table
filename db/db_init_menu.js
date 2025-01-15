import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

let menu = [{
    merchantId: 1,
    list: [
        {
            categoryName: 'Appetizers', items: [
                {
                    foodId: 1,
                    img: "https://ai-public.mastergo.com/ai/img_res/02a7539e09dbbe5d1e55be92037d3310.jpg",
                    name: "Grilled Atlantic Salmon",
                    price: 28.99,
                    desc: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
                    star: 4.5,
                    reviews: 128
                },
                {
                    foodId: 2,
                    img: "https://ai-public.mastergo.com/ai/img_res/a38c1ff75b852cb3dc0d28d822dcb978.jpg",
                    name: "Beef Tenderloin",
                    price: 34.99,
                    desc: "Premium cut tenderloin steak cooked to your preference, served with truffle mashed potatoes and red wine reduction.",
                    star: 5.0,
                    reviews: 156
                }
            ]
        },
        {
            categoryName: 'Main Courses', items: [{
                foodId: 1,
                img: "https://ai-public.mastergo.com/ai/img_res/02a7539e09dbbe5d1e55be92037d3310.jpg",
                name: "Grilled Atlantic Salmon",
                price: 28.99,
                desc: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
                star: 4.5,
                reviews: 128
            }]
        },
        {
            categoryName: 'Seafood', items: [{
                foodId: 1,
                img: "https://ai-public.mastergo.com/ai/img_res/02a7539e09dbbe5d1e55be92037d3310.jpg",
                name: "Grilled Atlantic Salmon",
                price: 28.99,
                desc: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
                star: 4.5,
                reviews: 128
            }]
        },
        {
            categoryName: 'Desserts', items: [{
                foodId: 2,
                img: "https://ai-public.mastergo.com/ai/img_res/a38c1ff75b852cb3dc0d28d822dcb978.jpg",
                name: "Beef Tenderloin",
                price: 34.99,
                desc: "Premium cut tenderloin steak cooked to your preference, served with truffle mashed potatoes and red wine reduction.",
                star: 5.0,
                reviews: 128
            }]
        },
        {
            categoryName: 'Beverages', items: [{
                foodId: 1,
                img: "https://ai-public.mastergo.com/ai/img_res/a38c1ff75b852cb3dc0d28d822dcb978.jpg",
                name: "Beef Tenderloin",
                price: 34.99,
                desc: "Premium cut tenderloin steak cooked to your preference, served with truffle mashed potatoes and red wine reduction.",
                star: 5.0,
                reviews: 128
            }]
        }
    ]
}]

async function run() {
    try {
        const database = client.db("sit725-skipy");
        const menuCollection = database.collection("menus");

        // Prevent additional documents from being inserted if one fails
        const options = { ordered: true };
        const result1 = await menuCollection.insertMany(menu, options);

        // Print the results
        console.log(`${result1.insertedCount} documents were inserted`);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}
// Run the function and handle any errors
run().catch(console.dir);


