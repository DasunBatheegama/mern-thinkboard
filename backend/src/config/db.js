import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://dasunbathee256_db_user:KhpmJZgFxhOpugmH@cluster0.pa7fciu.mongodb.net/notes_db?appName=Cluster0"
        );

        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // exit with failure
    }
};