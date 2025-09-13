import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Get logged-in client ID from localStorage
  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);
  const clientId = userParsed?.utilisateur?._id;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await api.getReservations();

        // Filter reservations for the logged-in client only
        const clientReservations = response.data.listeData.filter(
          (reservation) =>
            reservation.client.some((client) => client._id === clientId)
        );

        // Apply additional status filter if needed
        const filteredData =
          filter === "all"
            ? clientReservations
            : clientReservations.filter((res) => res.statut === filter);

        setReservations(filteredData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reservations");
        setLoading(false);
        console.error("Error:", err);
      }
    };

    if (clientId) {
      fetchReservations();
    } else {
      setError("Client not identified");
      setLoading(false);
    }
  }, [filter, clientId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Confirmed: "bg-success",
      Pending: "bg-warning",
      Cancelled: "bg-danger",
      Completed: "bg-info",
    };
    return (
      <span className={`badge ${statusClasses[status] || "bg-secondary"}`}>
        {status}
      </span>
    );
  };

  const handlePayment = (reservationId) => {
    navigate(`/paiement/${reservationId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
        <button
          className="btn btn-sm btn-link"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              My Reservations
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/rooms">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  My Reservations
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title text-center text-primary text-uppercase">
          Reservations{" "}
        </h6>
        <h1 className="mb-5">
          Your <span className="text-primary text-uppercase">Reservations</span>
        </h1>
      </div>
      <div className="container-fluid px-4 py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1></h1>
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Reservations</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
            </select>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Room</th>
                    <th>Dates</th>
                    <th>Nights</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                      <tr key={reservation._id}>
                        <td>
                          <div className="fw-bold">
                            {reservation.chambre?.status || "N/A"}
                          </div>
                          <div className="text-muted small">
                            Room #{reservation.chambre?.numero}
                          </div>
                        </td>
                        <td>
                          <div>{formatDate(reservation.dateDebut)}</div>
                          <div className="text-muted small">
                            to {formatDate(reservation.dateFin)}
                          </div>
                        </td>
                        <td>{reservation.nombreDeNuits}</td>
                        <td className="fw-bold">${reservation.total}</td>
                        <td>{getStatusBadge(reservation.statut)}</td>
                        <td>
                          {reservation.statut === "Confirmed" && (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                handlePayment(
                                  reservation._id,
                                  reservation.chambre?._id
                                )
                              }
                            >
                              Payer
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No reservations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {reservations.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Showing {reservations.length} of {reservations.length}{" "}
              reservations
            </div>
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div
        className="container-xxl testimonial mt-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
        style={{ marginBottom: 90 }}
      >
        <div className="container">
          <div className="owl-carousel testimonial-carousel py-5">
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  src="img/testimonial-1.jpg"
                  style={{ width: 45, height: 45 }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1" />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
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
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationList;
