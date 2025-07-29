import PointsHistory from "../models/pointsHistory.js";
import User from "../models/user.js";

export const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.log("Error in get users controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const CreateUser=async(req,res)=>{
    try {
        const {name}=req.body;
        const user=await User.find({name});
        if(user.length>0){
            return res.status(400).json({message:"User already exists"})
        }
        const newUser=await User.create({name});
        return res.status(201).json({message:"User created successfully",user:newUser})
    } catch (error) {
        console.log("Error in create new user controoler",error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const generateRewardsPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { claimPoints: randomPoints } },
      { new: true }
    );
    console.log(user);

    const pastPoints = await PointsHistory.create({
      userId,
      name: user.name,
      pointsRedemed: randomPoints,
      claimAt: new Date(),
    });

    const updatedUsers=await User.find().sort({claimPoints:-1});
  // Emit updated leaderboard
       const io=req.app.get("io"); // get io instance
       io.emit("leaderBoardUpdate",updatedUsers)

    return res.status(200).json({message:`${randomPoints} points claimed!`, user, pointsRedemed:randomPoints,LeaderBoard:updatedUsers });
  } catch (error) {
    console.log("Error in generate random points controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const leaderboard=async(req,res)=>{
    try {
        const users= await User.find().sort({claimPoints:-1});
        return res.status(200).json({leaderboard:users})
    } catch (error) {
        console.log("Error in leaderboard controller",error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const pointsHistory=async(req,res)=>{
   const {userId} = req.params;
  try {
    const historyPoints=await PointsHistory.find({userId}).sort({claimAt:-1});
    return res.status(200).json({historyPoints});
  } catch (error) {
    console.log("Error in get History points controller",error.message);
   return res.status(500).json({ message: "Internal server error" });
  }
}