import React from "react";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let baseUrl = "http://localhost:5000/api";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [history,setHistory]=useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(baseUrl + "/users");
      console.log(res.data.users);
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error in  getUsers:", err.message);
    }
  };

const addUser=async(name)=>{
    if(!name) return;
    try {
        const res=await axios.post(baseUrl+"/newuser",{name});
        console.log("User created successfully",res.data);
        getUsers();
    } catch (error) {
        console.log("error in adding new user",error.message)
    }
}
  const generateRandom = async (userId) => {
    try {
      const res = await axios.post(baseUrl + `/users/${userId}`);
       const { pointsRedemed } = res.data;

    toast.success(`You just claimed ${pointsRedemed} points!`);
      
      getUsers(); // refresh the leaderboard after redeem new points
    } catch (err) {
        console.error("Error claiming points:", err.message);
    }
  };
  const historyPoints=async(userId)=>{
         try {
            const res=await axios.get(baseUrl+`/user/history/${userId}`);
            setHistory(res.data.historyPoints)
            setShowHistory(true);
            console.log(res.data);
         } catch (error) {
             console.error("Error fetching user history:", error.message);
         }
  }

  return (
     <div className=" min-h-screen bg-gray-100 py-3 px-4">
      <h2 className="text-3xl font-bold text-center mb-4 text-black">All Users</h2>
      <div className="flex justify-center my-2">
  <button
    onClick={() => addUser(prompt("Enter user name"))}
    className="btn btn-primary"
  >
    Add New User
  </button>
</div>
      <div className="max-w-2xl mx-auto space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center bg-white shadow-lg rounded-xl p-3 hover:shadow-xl transition"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm font-semibold text-green-600">
                Points Redeem: <span className="text-red-600 font-bold">{user.claimPoints || 0}</span>
              </p>
            </div>
            <button className="btn btn-info" onClick={() => historyPoints(user._id)}>Show History</button>
            <button
              onClick={() => generateRandom(user._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Claim
            </button>
          </div>
        ))}
      </div>'
      {showHistory && history.length > 0 && (
  <div className="max-w-2xl mx-auto mt-6 bg-white rounded-xl p-4 shadow-md">
    <h3 className="text-xl font-bold mb-3 text-gray-800">Claim History</h3>
    <ul className="divide-y divide-gray-200">
      {history.map((item, index) => (
        <li key={item._id || index} className="py-2 flex justify-between">
          <span>{item.pointsRedemed} points</span>
          <span className="text-sm text-gray-500">
            {new Date(item.claimAt).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
    
  );
};
export default Users;
