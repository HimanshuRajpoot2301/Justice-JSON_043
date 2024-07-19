import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import ReviewPage from './pages/ReviewPage';
import PaymentPage from './pages/PaymentPage';
import MapPage from './pages/MapPage';
import DealPage from './pages/DealPage';
import NotificationPage from './pages/NotificationPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/deals" element={<DealPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
