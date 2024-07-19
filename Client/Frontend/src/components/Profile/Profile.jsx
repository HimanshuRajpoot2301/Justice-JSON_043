import React, { useState, useEffect } from 'react';
import { getProfile } from '../../api/profile';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return profile ? (
    <div>
      <h1>{profile.user.name}</h1>
      <p>{profile.user.email}</p>
      {/* Display other profile information */}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Profile;
