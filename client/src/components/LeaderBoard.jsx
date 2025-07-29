import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'


let baseUrl = "https://pointsredeem2.onrender.com/api";
const socket=io("https://pointsredeem2.onrender.com/");
const LeaderBoard = () => {
    const [users,setUsers]=useState([])

    useEffect(() => {
getLeaderboard();

socket.on("leaderBoardUpdate",(data)=>{
    setUsers(data)

});

return ()=>{
    socket.off("leaderBoardUpdate");
}
    },[])

    const getLeaderboard=async()=>{
        try {
            const res=await axios.get(baseUrl+"/leaderboard");
            setUsers(res.data.leaderboard.sort((a,b)=>b.claimPoints-a.claimPoints))
        } catch (error) {
            console.error("Error fetching leaderboard:", error.message);
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <h1 className='text-center text-3xl font-bold text-red-500 mb-6'>🏆 Leaderboard</h1>
      
      <div className='max-w-2xl mx-auto space-y-4'>
        {users.map((user, index) => (
          <div key={user._id} className='bg-white shadow-md p-4 rounded-lg flex justify-between items-center'>
            <div>
              <h2 className='text-lg font-semibold text-gray-800'>{index + 1}. {user.name}</h2>
            </div>
            <p className='text-green-600 font-bold text-md'> Total pts: <span className='text-red-500 font-bold text-lg'>{user.claimPoints} </span></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderBoard
