import mongoose from "mongoose";

import User from "../models/user.js";
import connectDb from "../utils/db.js";

const seedUsers= [
    {
        name:"Ashwani yadv",
    },
    {
        name:"Rahul yadv",
    },
    {
        name:"Shyam yadv",
    },
    {
        name:"Vaibhavi yadav",
    },{
        name:"Shreyansh yadav"
    },{
        name:"Priyansh yadav"
    },
    {
        name:"Trilok pandit",
    },{
        name:"Manish shah"
    },
    {
        name:"Mausam verma",
    },{
        name:"Aaryan yadav"
    }
];

const saveInDb=async()=>{
    try {
        await connectDb();
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}
    
saveInDb();
