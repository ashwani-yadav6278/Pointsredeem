import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/leaderboard');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        console.error(error.message);

    }
}

export default connectDb;