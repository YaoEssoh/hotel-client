import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../Services/api";
import { FaBed, FaBath, FaWifi, FaCheck, FaTimes } from "react-icons/fa";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await api.getRoomById(id);
        setRoom(res.data.getOne);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);
  const fetchRooms = async () => {
    try {
      const res = await api.getRooms();
      // Vérifie que la réponse contient bien listeData
      if (res.data && res.data.listeData) {
        // Si vous voulez filtrer pour exclure une chambre spécifique (par ID)
        const filteredRooms = res.data.listeData.filter(
          (room) => room._id !== id
        );
        setRooms(filteredRooms);
      } else {
        console.error("Invalid response format:", res);
        setRooms([]); // Met un tableau vide si le format est invalide
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]); // Met un tableau vide en cas d'erreur
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

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

  if (!room) {
    return (
      <div className="container-xxl py-5">
        <div className="text-center">
          <h4>Room not found</h4>
          <Link to="/chambre" className="btn btn-primary mt-3">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  // Extraire les équipements
  const equipments = room.equipement ? room.equipement.split(",") : [];

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
              {room.status}
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/chambre">Rooms</Link>
                </li>
                <li className="breadcrumb-item text-white active">
                  Room Details
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            {/* Image Gallery */}
            <div className="col-lg-6">
              <div className="position-relative h-100">
                {room.image ? (
                  <img
                    className="img-fluid rounded w-100"
                    src={`http://localhost:3000/uploads/${room.image}`}
                    alt={room.status}
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    className="img-fluid rounded w-100"
                    src="img/room-1.jpg"
                    alt="Default room"
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>

            {/* Room Info */}
            <div className="col-lg-6">
              <div className="h-100">
                <h2 className="mb-4">{room.status}</h2>
                <h2 className="mb-4">{room?.view}</h2>

                <div className="d-flex align-items-center mb-3">
                  <span className="text-primary me-2">Room Number:</span>
                  <span className="fw-bold">{room.numero}</span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span className="text-primary me-2">Price for adults:</span>
                  <span className="fw-bold">${room.prix} per night</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="text-primary me-2">Price for child:</span>
                  <span className="fw-bold">
                    ${room.prixForChild} per night
                  </span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span className="text-primary me-2">Capacity:</span>
                  <span className="fw-bold">{room.capacite} persons</span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span className="text-primary me-2">Availability:</span>
                  {room.disponibilité ? (
                    <span className="badge bg-success">
                      <FaCheck className="me-1" /> Available
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      <FaTimes className="me-1" /> Booked
                    </span>
                  )}
                </div>

                {room.views && (
                  <div className="d-flex align-items-center mb-3">
                    <span className="text-primary me-2">View:</span>
                    <span className="fw-bold">{room.views}</span>
                  </div>
                )}

                <div className="mb-4">
                  <h5 className="mb-3">Description</h5>
                  <p>{room.description}</p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Amenities</h5>
                  <div className="row g-2">
                    {equipments.map((item, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="d-flex align-items-center">
                          {item.trim().includes("Bed") && (
                            <FaBed className="text-primary me-2" />
                          )}
                          {item.trim().includes("Bath") && (
                            <FaBath className="text-primary me-2" />
                          )}
                          {item.trim().includes("Wifi") && (
                            <FaWifi className="text-primary me-2" />
                          )}
                          <span>{item.trim()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-between border-top pt-4 mt-4">
                  <Link
                    to={`/chambre/booking/${room._id}`}
                    className={`btn btn-primary py-3 px-5 ${
                      !room.disponibilité ? "disabled" : ""
                    }`}
                  >
                    Book Now
                  </Link>
                  <Link
                    to="/chambre"
                    className="btn btn-outline-primary py-3 px-5"
                  >
                    Back to Rooms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Rooms Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Similar Rooms
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Other Rooms</span>
            </h1>
          </div>
          {rooms.length > 0 ? (
            <>
              <div className="row g-4">
                {rooms.map((chambre, index) => (
                  <div
                    key={chambre._id}
                    className="col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay={`${0.1 + (index % 3) * 0.2}s`}
                  >
                    <div className="room-item shadow rounded overflow-hidden">
                      <div className="position-relative">
                        <img
                          className="img-fluid w-100"
                          src={
                            chambre.images?.[0]
                              ? `http://localhost:3000/uploads/${chambre.images[0]}`
                              : "img/room-1.jpg"
                          }
                          alt={chambre.nom}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                          ${chambre.prix}/Night
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
                        <div className="d-flex mb-3 align-items-center flex-wrap">
                          {chambre.equipement
                            ?.split(", ")
                            .map((item, idx, arr) => (
                              <React.Fragment key={idx}>
                                <small className="d-flex align-items-center">
                                  <i
                                    className={`fa fa-${
                                      item.includes("Bed")
                                        ? "bed"
                                        : item.includes("Bath")
                                        ? "bath"
                                        : "wifi"
                                    } text-primary me-2`}
                                  />
                                  {item.trim()}
                                </small>
                                {idx < arr.length - 1 && (
                                  <span className="text-muted mx-2">|</span>
                                )}
                              </React.Fragment>
                            ))}
                        </div>
                        <p className="text-body mb-3">
                          {chambre.description?.length > 100
                            ? `${chambre.description.substring(0, 100)}...`
                            : chambre.description}
                        </p>
                        <div className="d-flex justify-content-between">
                          <Link
                            to={`/rooms/${chambre._id}`}
                            className="btn btn-sm btn-primary rounded py-2 px-4"
                          >
                            View Detail
                          </Link>
                          <Link
                            to={`/booking?room=${chambre._id}`}
                            className={`btn btn-sm ${
                              chambre.disponibilité
                                ? "btn-dark"
                                : "btn-secondary disabled"
                            } rounded py-2 px-4`}
                          >
                            {chambre.disponibilité
                              ? "Book Now"
                              : "Not Available"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">
                No rooms found matching your criteria
              </h4>
            </div>
          )}
        </div>
      </div>
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

export default RoomDetails;
