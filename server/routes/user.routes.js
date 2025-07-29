import express from "express";
import { CreateUser, generateRewardsPoints, getAllusers, leaderboard, pointsHistory } from "../controllers/user.controller.js";

const routes=express.Router();

routes.get("/users",getAllusers);
routes.post("/newuser",CreateUser);
routes.post("/users/:userId",generateRewardsPoints);
routes.get("/leaderboard",leaderboard);
routes.get('/user/history/:userId',pointsHistory)

export default routes;