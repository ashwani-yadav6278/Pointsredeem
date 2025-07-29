import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        console.error(error.message);

    }
}

export default connectDb;