import axiosContext from "./axiosContext";
const getHotels = () => {
  return axiosContext.get("/hotel");
};
const getHotelById = (id) => {
  return axiosContext.get(`/hotel/${id}`);
};
const getRooms = () => {
  return axiosContext.get("/chambre");
};
const getRoomById = (id) => {
  return axiosContext.get(`/chambre/${id}`);
};
const createReservation = (data) => {
  return axiosContext.post(`/reservation`, data);
};
const getReservations = () => {
  return axiosContext.get(`/reservation`);
};
const updateReservationStatus = (id , data) => {
  return axiosContext.put(`/reservation/${id}`, data);
};
const getClients = () => {
  return axiosContext.get("/client");
};
const getUserProfile = (id) => {
  return axiosContext.get(`/client/${id}`);
};
const updateUserProfile = (id , data) => {
  return axiosContext.put(`/client/${id}`,data);
};
const login = (data) => {
  return axiosContext.post("/auth/signin" , data);
};
const Forgot = (data) => {
  return axiosContext.post("/auth/forget", data);
};
const Reset = (token , pass) => {
  
  return axiosContext.post(`/auth/resetMotsDePass/${token}`, pass);
};
const register = (data) => {
  return axiosContext.post("/client", data);
};

const checkRoomAvailability = (data) => {
  return axiosContext.post("/reservation/check-availability", data);
};





export default {
  getHotels,
  Reset,
  login,
  Forgot,
  getUserProfile,
  updateUserProfile,
  updateReservationStatus,
  register,
  checkRoomAvailability,
  getRooms,
  getClients,
  getHotelById,
  getRoomById,
  createReservation,
  getReservations,
};
