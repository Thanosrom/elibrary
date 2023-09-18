import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const loginUser = (userData) => {
    setUsername(userData.username);
    setUserId(userData.id);
    setUserImage(userData.image);
    setUserEmail(userData.email);
    setUserPassword(userData.password);
  };

  const logoutUser = () => {
    setUsername('');
    setUserId('');
    setUserImage('');
    setUserEmail('');
    setUserPassword('');
  };

  const userContextValue = {
    username,
    userId,
    userImage,
    userEmail,
    userPassword,
    loginUser,
    logoutUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;