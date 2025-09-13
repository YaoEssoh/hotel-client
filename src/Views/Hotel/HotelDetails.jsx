import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../Services/api";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaConciergeBell,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapPosition, setMapPosition] = useState([36.8065, 10.1815]); // Position par défaut (Tunis)
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await api.getHotelById(id);
        const hotelData = res.data.getOne;
        setHotel(hotelData);

    

        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);
  useEffect(() => {
    const geocodeAddress = async () => {
      if (!hotel?.adress) return;

      try {
        setMapLoading(true);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            hotel.adress
          )}`
        );

        if (response.data && response.data[0]) {
          const { lat, lon } = response.data[0];
          setMapPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Erreur de géocodage:", error);
      } finally {
        setMapLoading(false);
      }
    };

    if (hotel) geocodeAddress();
  }, [hotel]);



  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length
    );
  };

  if (loading) {
    return (
      <div className="container-xxl py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container-xxl py-5">
        <div className="text-center">
          <h4>Hôtel non trouvé</h4>
        </div>
      </div>
    );
  }

  // Extraire les services
  const services = hotel.service ? hotel.service.split(",") : [];

  return (
    <div className="container-xxl bg-white p-0">
      {/* Page Header */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              {hotel.nom}
            </h1>
            <div className="d-flex justify-content-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < hotel.nombreEtoiles
                      ? "text-primary mx-1"
                      : "text-secondary mx-1"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="container-xxl py-5 mb-8">
        <div className="container">
          <div className="row g-5">
            {/* Image Gallery */}
            <div className="col-lg-6" style={{ marginBottom: "70px" }}>
              <div className="position-relative h-100">
                {hotel.images && hotel.images.length > 0 ? (
                  <>
                    <img
                      className="img-fluid rounded w-100 h-100"
                      src={`http://localhost:3000/uploads/${hotel.images[currentImageIndex]}`}
                      alt={hotel.nom}
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      className="btn btn-primary position-absolute top-50 start-0 translate-middle-y"
                      onClick={prevImage}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      className="btn btn-primary position-absolute top-50 end-0 translate-middle-y"
                      onClick={nextImage}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                ) : (
                  <img
                    className="img-fluid rounded w-100"
                    src="img/default-hotel.jpg"
                    alt="Default hotel"
                  />
                )}
              </div>
              {/* Thumbnail Gallery */}
              <div className="row mt-3 g-2">
                {hotel.images &&
                  hotel.images.map((image, index) => (
                    <div className="col-3" key={index}>
                      <img
                        src={`http://localhost:3000/uploads/${image}`}
                        alt={`${hotel.nom} ${index + 1}`}
                        className={`img-fluid rounded cursor-pointer ${
                          currentImageIndex === index
                            ? "border border-primary"
                            : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          height: "80px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="col-lg-6">
              <div className="h-100">
                <h2 className="mb-4">{hotel.nom}</h2>

                <div className="d-flex mb-3">
                  <div className="d-flex align-items-center me-4">
                    <FaMapMarkerAlt className="text-primary me-2" />
                    <small>{hotel.adress}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaPhone className="text-primary me-2" />
                    <small>{hotel.telephone}</small>
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <div className="d-flex align-items-center me-4">
                    <FaEnvelope className="text-primary me-2" />
                    <small>{hotel.email}</small>
                  </div>
                  {hotel.tarifMoyen && (
                    <div className="d-flex align-items-center">
                      <span className="text-primary me-2">Tarif moyen:</span>
                      <small>{hotel.tarifMoyen} TND/nuit</small>
                    </div>
                  )}
                </div>

                <p className="mb-4">{hotel.description}</p>

                <div className="mb-4">
                  <h5 className="mb-3">Services</h5>
                  <div className="row g-2">
                    {services.map((service, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="d-flex align-items-center">
                          <span>{service.trim()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-between border-top pt-4 mt-4">
                  {/* <Link
                    to={`/hotel/booking/${hotel._id}`}
                    className="btn btn-primary py-3 px-5"
                  >
                    Book now{" "}
                  </Link> */}
                  <Link
                    to="/hotel"
                    className="btn btn-outline-primary py-3 px-5"
                  >
                    Back to Hotels{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="row mt-5">
            <div className="col-12">
              <h3></h3>
              {mapLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                      Chargement de la carte...
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="rounded overflow-hidden shadow-sm mb-3"
                    style={{ height: "400px", marginTop: "60px" }}
                  >
                    <MapContainer
                      center={mapPosition}
                      zoom={15}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      />
                      <Marker position={mapPosition}>
                        <Popup>{hotel.nom}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.adress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    <FaMapMarkerAlt className="me-2" />
                    Show with OpenStreetMap
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial Start */}

      {/* Testimonial End */}
      {/* Room Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Rooms in this hotel
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Rooms</span>
            </h1>
          </div>
          <div className="row g-4">
            {hotel.chambre.slice(0, 6).map((chambre, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img className="img-" 
                    //src="img/room-1.jpg"
                    src={`http://localhost:3000/uploads/${chambre.image}`}
                    style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "cover",
                              borderRadius: "10px",
                     }}
                      />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      Price for Adults : ${chambre.prix}/Night || Price for
                      Child : ${chambre?.prixForChild}/Night
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{chambre.status}</h5>
                      <div className="ps-2">
                        <small
                          className={`fa ${
                            chambre.disponibilité
                              ? "fa-check text-success"
                              : "fa-times text-danger"
                          }`}
                        >
                          {chambre.disponibilité ? "Available" : "Booked"}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex mb-3 align-items-center">
                      {chambre.equipement
                        ?.split(", ")
                        .map((item, index, array) => {
                          // Déterminer l'icône en fonction du texte
                          let icon = "";
                          if (item.includes("Bed")) icon = "bed";
                          else if (item.includes("Bath")) icon = "bath";
                          else if (item.includes("Wifi")) icon = "wifi";

                          return (
                            <React.Fragment key={index}>
                              <small className="d-flex align-items-center">
                                <i
                                  className={`fa fa-${icon} text-primary me-2`}
                                />
                                {item.trim()}
                              </small>
                              {index < array.length - 1 && (
                                <span className="text-muted mx-2">|</span>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                    <p className="text-body mb-3">{chambre.description}</p>
                    <div className="d-flex justify-content-between">
                      <Link
                        className="btn btn-sm btn-primary rounded py-2 px-4"
                        to={`/chambre/${chambre._id}`}
                      >
                        View Detail
                      </Link>
                      <Link
                        to={`/chambre/booking/${chambre._id}`}
                        className="btn btn-sm btn-dark rounded py-2 px-4"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5 wow fadeInUp" data-wow-delay="0.3s">
            <Link
              to={"/chambre"}
              className="btn btn-primary px-4 py-2 rounded-pill view-more-btn"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
      {/* Room End */}
      {/* Newsletter Start */}
      <div
        className="container newsletter mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row justify-content-center">
          <div className="col-lg-10 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  Subscribe Our{" "}
                  <span className="text-primary text-uppercase">
                    Newsletter
                  </span>
                </h4>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: 400 }}
                >
                  <input
                    className="form-control w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Newsletter Start */}

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
}

export default HotelDetails;
