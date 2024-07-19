import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../api/profile';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({});

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profile);
      console.log(response);
      // Handle profile update success
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={profile.user?.name || ''}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={profile.user?.email || ''}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* Add other profile fields */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileEdit;
