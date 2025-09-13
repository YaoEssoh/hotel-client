import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";
import Swal from "sweetalert2";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    nights: 1,
    roomId: id,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);
  const clientId = userParsed?.utilisateur?._id;
  const clientName = userParsed?.utilisateur?.nom;
  const clientEmail = userParsed?.utilisateur?.email;

  // Charger les détails de la chambre
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await api.getRoomById(id);
        setRoom(response.data.getOne);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des détails de la chambre");
        setLoading(false);
        console.error(err);
      }
    };

    fetchRoomDetails();
  }, [id]);

  useEffect(() => {
    if (clientName && clientEmail) {
      setFormData((prev) => ({
        ...prev,
        name: clientName,
        email: clientEmail,
      }));
    }
  }, [clientName, clientEmail]);

  // Calculer les nuits et le prix quand les dates changent
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      calculateNights();
    }
  }, [formData.checkIn, formData.checkOut]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    const startDate = new Date(formData.checkIn);
    const endDate = new Date(formData.checkOut);

    if (startDate >= endDate) {
      setFormData((prev) => ({ ...prev, nights: 1 }));
      updateTotalPrice(1);
      return 1;
    }

    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setFormData((prev) => ({ ...prev, nights: diffDays }));
    updateTotalPrice(diffDays);
    return diffDays;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "adults" || name === "children") {
      updateTotalPrice();
    }
  };

  const updateTotalPrice = (nights = formData.nights) => {
    if (!room) return;

    const prixAdulte = Number(room.prix) || 0;
    const prixEnfant = Number(room.prixForChild) || prixAdulte / 2;
    const nbAdultes = Math.max(Number(formData.adults) || 1, 1);
    const nbEnfants = Math.max(Number(formData.children) || 0, 0);
    const nbNuits = Math.max(Number(nights) || 1, 1);

    const total =
      prixAdulte * nbAdultes * nbNuits + prixEnfant * nbEnfants * nbNuits;
    setTotalPrice(total);
  };

  const checkRoomAvailability = async () => {
    if (!formData.checkIn || !formData.checkOut) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez sélectionner des dates de check-in et check-out",
      });
      return false;
    }

    try {
      setCheckingAvailability(true);
      const response = await api.checkRoomAvailability({
        roomId: id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
      });

      return response.data.isAvailable;
    } catch (error) {
      console.error("Error checking availability:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de la vérification de disponibilité",
      });
      return false;
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId) {
      Swal.fire({
        icon: "error",
        title: "Non connecté",
        text: "Veuillez vous connecter pour effectuer une réservation",
        confirmButtonText: "Se connecter",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    // Vérifier la disponibilité avant de continuer
    const isAvailable = await checkRoomAvailability();

    if (!isAvailable) {
      Swal.fire({
        icon: "error",
        title: "Non disponible",
        text: "Désolé, la chambre n'est pas disponible pour les dates sélectionnées. Veuillez choisir d'autres dates.",
      });
      return;
    }

    try {
      const reservationData = {
        client: clientId,
        chambre: formData.roomId,
        dateDebut: formData.checkIn,
        dateFin: formData.checkOut,
        nombreAdultes: formData.adults,
        nombreEnfants: formData.children,
        nombreDeNuits: formData.nights,
        total: totalPrice,
      };

      const response = await api.createReservation(reservationData);
      if (response) {
        await Swal.fire({
          icon: "success",
          title: "Disponible",
          text: "La chambre est disponible. Vous allez être redirigé vers le paiement.",
          timer: 2000,
          showConfirmButton: false,
        });
       //navigate(`/paiement/${response.data.newData._id}`);
       navigate(`/reservations`);

      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text:
          "Une erreur est survenue lors de la réservation: " +
          (error.response?.data?.message || error.message),
      });
    }
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

  if (error) {
    return (
      <div className="container-xxl py-5">
        <div className="text-center">
          <h4>{error}</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container-xxl py-5">
        <div className="text-center">
          <h4>Chambre non trouvée</h4>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Reservation
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Rooms</a>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Reservation
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Hotel reservation
            </h6>
            <h1 className="mb-5">
              Book a{" "}
              <span className="text-primary text-uppercase">
                Luxurious Room
              </span>
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end w-100">
                  <img
                    className="img-fluid rounded wow zoomIn"
                    data-wow-delay="0.3s"
                    src={`http://localhost:3000/uploads/${room.image}`}
                    alt="Room"
                    style={{ maxHeight: "400px", objectFit: "cover", margin: "0 auto", display: "block" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="email"> Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating date" id="date3">
                        <input
                          type="date"
                          className="form-control"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleDateChange}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                        <label htmlFor="checkin">checkIn</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating date" id="date4">
                        <input
                          type="date"
                          className="form-control"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleDateChange}
                          min={
                            formData.checkIn ||
                            new Date().toISOString().split("T")[0]
                          }
                          required
                        />
                        <label htmlFor="checkout">checkOut</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="adults"
                          name="adults"
                          placeholder="Nombre d'adultes"
                          min="1"
                          max={room.capacite}
                          value={formData.adults}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="adults">Number of adults</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="children"
                          name="children"
                          placeholder="Nombre d'enfants"
                          min="0"
                          value={formData.children}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="children">Number of child</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="nights"
                          name="nights"
                          placeholder="Nombre de nuits"
                          min="1"
                          value={formData.nights}
                          readOnly
                        />
                        <label htmlFor="nights">Number if nights</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="total"
                          placeholder="Prix total"
                          value={
                            totalPrice
                              ? `${totalPrice.toFixed(2)}$`
                              : "Calculation in progress..."
                          }
                          readOnly
                        />
                        <label htmlFor="total">Total price</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                        disabled={checkingAvailability}
                      >
                        {checkingAvailability ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Verification...
                          </>
                        ) : (
                          "Book now"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Booking;
