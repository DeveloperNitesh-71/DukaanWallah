import React from 'react'
import ProfileContainer from './ProfileContainer'

const Profile = () => {
  return (
    <div className='flex flex-col w-full min-h-screen items-start justify-start gap-5 px-20 py-10'>
        <h1 className='text-2xl font-medium'>My Profile</h1>
        <ProfileContainer />
    </div>
  )
}

export default Profile