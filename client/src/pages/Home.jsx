import Users from '../components/Users'
import LeaderBoard from '../components/LeaderBoard'
import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-4 py-2 '>
      
      <div className='flex md:flex-row gap-4 flex-col'>

        <div className='md:w1/2 w-full bg-white rounded-xl p-4 shadow-lg'>
            <Users/>
        </div>
        <div className='md:w1/2 w-full bg-white rounded-xl p-4 shadow-lg'>
            <LeaderBoard/>
        </div>


      </div>
    </div>
  )
}

export default Home
