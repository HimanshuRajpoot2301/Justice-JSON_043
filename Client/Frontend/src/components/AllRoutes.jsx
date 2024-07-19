import React from 'react';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import BookingPage from '../pages/BookingPage';
import ReviewPage from '../pages/ReviewPage';
import PaymentPage from '../pages/PaymentPage';
import MapPage from '../pages/MapPage';
import DealPage from '../pages/DealPage';
import NotificationList from '../components/Notification/NotificationList';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import { Route, Routes } from 'react-router-dom';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/deals" element={<DealPage />} />
      <Route path="/notifications" element={<NotificationList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
