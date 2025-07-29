import mongoose from "mongoose";

const pointsHistorySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    pointsRedemed:{
        type:Number,
        required:true
    },
    claimAt:{
        type:Date,
        default:Date.now
    },
});
const PointsHistory=mongoose.model("PointsHistory",pointsHistorySchema);
export default PointsHistory;