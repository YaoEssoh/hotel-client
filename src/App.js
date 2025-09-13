import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Views/Home/Home';
import Layout from './Views/Home/Layout';
import Room from './Views/Room/Room';
import Hotel from './Views/Hotel/Hotel';
import Contact from './Views/Home/Contact';
import HotelDetails from './Views/Hotel/HotelDetails';
import RoomDetails from './Views/Room/RoomDetails';
import Login from './Views/Auth/Login';
import Register from './Views/Auth/Register';
import ForgotPassword from './Views/Auth/ForgotPassword';
import ResetPassword from './Views/Auth/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import BookingHotel from './Views/Hotel/BookingHotel';
import Paiment from './Views/Hotel/Paiment';
import Booking from './Views/Room/Booking';
import ReservationList from './Views/Home/ReservationList';
import Profil from './Views/Home/Profil';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
        
          
              <Home />
        
          }
        >
          <Route path="/" element={<Layout />} />
          <Route path="/chambre" element={<Room />} />
          <Route path="/chambre/:id" element={<RoomDetails />} />

          <Route path="/hotel" element={<Hotel />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/hotel/booking/:id" element={<BookingHotel />} />
          <Route path="/chambre/booking/:id" element={<Booking />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/profile" element={<Profil />} />

          <Route path="/paiement/:id" element={<Paiment />} />

          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route
          path="/login"
          element={
      
              <Login />
        
          }
        />
        <Route
          path="/register"
          element={
        
              <Register />
        
          }
        />
        <Route
          path="/forgot-password"
          element={
        
              <ForgotPassword />
          
          }
        />
        <Route
          path="/auth/reset/:token"
          element={
      
              <ResetPassword />
        
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
