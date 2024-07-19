import React from 'react';
import Profile from '../components/Profile/Profile';
import ProfileEdit from '../components/Profile/ProfileEdit';

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Profile />
      <ProfileEdit />
    </div>
  );
};

export default ProfilePage;
