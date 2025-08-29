import mongoose from 'mongoose'
import dbConfig from '../configs/db.config.js'
 const  dbConnection = async () => {
    try {
        const connecteddb = await mongoose.connect(dbConfig.url, dbConfig.Option);
        console.log("MongoDB connected successfully",);
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    };
};

export default dbConnection