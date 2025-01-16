import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://admin:rUjWflR5hDq8WquA@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

let merchant = [{
    _id: "1",
    backgroundImg: "https://ai-public.mastergo.com/ai/img_res/bfabcd58cd873e7a00f6b876a90e843f.jpg",
    name: "The Grand Bistro",
    category: "restaurant",
    type: "Romantic Dining",
    description: "Fine Dining Excellence",
    location: "123 Gourmet Street, Culinary District",
    contactPhone: "+1 (555) 123-4567",
    hours: "Mon-Sun: 11:00 AM - 11:00 PM",
    photoGallery: ["https://ai-public.mastergo.com/ai/img_res/2883e652a65f97a74be85f9cb560f988.jpg",
        "https://ai-public.mastergo.com/ai/img_res/6c7d036e513a2b1374762280ce8adaa0.jpg",
        "https://ai-public.mastergo.com/ai/img_res/ead2a58ce7e423f56e495503f2516b27.jpg",
        "https://ai-public.mastergo.com/ai/img_res/2ebd8f7fb19ed793bd8c1da1c149950b.jpg"
    ],
    openHours: {
        Monday: ["11:00 AM - 11:00 PM"],
        Tuesday: ["11:00 AM - 11:00 PM"],
        Wednesday: ["11:00 AM - 11:00 PM"],
        Thursday: ["11:00 AM - 11:00 PM"],
        Friday: ["11:00 AM - 12:00 AM"],
        Saturday: ["11:00 AM - 12:00 AM"],
        Sunday: ["11:00 AM - 10:00 PM"],
    }
}]

async function run() {
    try {
        const database = client.db("sit725-skipy");
        const popularMerCol = database.collection("merchants");

        // Prevent additional documents from being inserted if one fails
        const options = { ordered: true };
        const result1 = await popularMerCol.insertMany(merchant, options);

        // Print the results
        console.log(`${result1.insertedCount} documents were inserted`);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}
// Run the function and handle any errors
run().catch(console.dir);


