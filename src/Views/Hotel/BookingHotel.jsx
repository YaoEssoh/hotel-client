import { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate, useParams } from "react-router-dom";

function BookingHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    nights: 1,
    roomId: "",
    specialRequests: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await api.getHotelById(id);
        const hotelData = res.data.getOne;
        setHotel(hotelData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'hôtel :", error);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);
  const clientId = userParsed.utilisateur._id;
  const clientName = userParsed.utilisateur.nom;
  const clientEmail = userParsed.utilisateur.email;

  useEffect(() => {
    if (clientName && clientEmail) {
      setFormData((prev) => ({
        ...prev,
        name: clientName,
        email: clientEmail,
      }));
    }
  }, [clientName, clientEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "roomId" || name === "adults" || name === "children") {
      updateTotalPrice();
    }
  };

  const updateTotalPrice = (nights = formData.nights) => {
    if (!formData.roomId || !hotel?.chambre?.length) {
      setTotalPrice(0);
      return;
    }

    const selectedRoom = hotel.chambre.find((room) => room._id === formData.roomId);

    if (!selectedRoom) {
      setTotalPrice(0);
      return;
    }

    const prixAdulte = Number(selectedRoom.prix) || 0;
    const prixEnfant = Number(selectedRoom.prixForChild) || prixAdulte / 2;
    const nbAdultes = Math.max(Number(formData.adults) || 1, 1);
    const nbEnfants = Math.max(Number(formData.children) || 0, 0);
    const nbNuits = Math.max(Number(nights) || 1, 1);

    const total =
      prixAdulte * nbAdultes * nbNuits + prixEnfant * nbEnfants * nbNuits;

    setTotalPrice(total);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (newFormData.checkIn && newFormData.checkOut) {
        const diffTime = Math.abs(
          new Date(newFormData.checkOut) - new Date(newFormData.checkIn)
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        newFormData.nights = diffDays;

        if (newFormData.roomId) {
          const selectedRoom = hotel.chambre.find(
            (room) => room._id === newFormData.roomId
          );
          if (selectedRoom) {
            const adultsPrice =
              Number(selectedRoom.prix) * Number(newFormData.adults) * diffDays;
            const childrenPrice =
              Number(selectedRoom.prixForChild) *
              Number(newFormData.children) *
              diffDays;
            setTotalPrice(adultsPrice + childrenPrice);
          }
        }
      }

      return newFormData;
    });
  };

  useEffect(() => {
    if (hotel?.chambre?.length) {
      setFormData((prev) => ({
        ...prev,
        roomId: hotel.chambre[0]._id,
      }));
    }
  }, [hotel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        navigate(`/paiement/${response.data.newData._id}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création de la réservation :", error);
    }
  };

  if (loading) {
    return (
      <div className="container-xxl py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
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

  return (
    <div>
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Réservation
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item"><a href="#">Accueil</a></li>
                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                <li className="breadcrumb-item text-white active" aria-current="page">
                  Réservation
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
              Réservation d'hôtel
            </h6>
            <h1 className="mb-5">
              Réservez une{" "}
              <span className="text-primary text-uppercase">chambre de luxe</span> dans notre hôtel
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              {/* Images */}
              {/* ... Les balises img restent inchangées ... */}
            </div>
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        <label htmlFor="name">Votre nom</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        <label htmlFor="email">Votre e-mail</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating date">
                        <input type="date" className="form-control" id="checkIn" name="checkIn" value={formData.checkIn} onChange={handleDateChange} min={new Date().toISOString().split("T")[0]} required />
                        <label htmlFor="checkIn">Date d’arrivée</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating date">
                        <input type="date" className="form-control" id="checkOut" name="checkOut" value={formData.checkOut} onChange={handleDateChange} min={formData.checkIn || new Date().toISOString().split("T")[0]} required />
                        <label htmlFor="checkOut">Date de départ</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="adults" name="adults" min="1" value={formData.adults} onChange={handleInputChange} required />
                        <label htmlFor="adults">Nombre d'adultes</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="children" name="children" min="0" value={formData.children} onChange={handleInputChange} />
                        <label htmlFor="children">Nombre d’enfants</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="nights" name="nights" value={formData.nights} readOnly />
                        <label htmlFor="nights">Nombre de nuits</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="total" value={totalPrice ? `${totalPrice} €` : "Sélectionnez une chambre"} readOnly />
                        <label htmlFor="total">Prix total</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <select className="form-select" id="roomId" name="roomId" value={formData.roomId} onChange={handleInputChange} required>
                          <option value="">Sélectionnez une chambre</option>
                          {hotel?.chambre?.map((room) => (
                            <option key={room._id} value={room._id}>
                              {room.status} - {room.type} (Capacité : {room.capacite}) - {room.prix} €/nuit
                            </option>
                          ))}
                        </select>
                        <label htmlFor="roomId">Choisir une chambre</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Réserver maintenant
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container newsletter mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="row justify-content-center">
          <div className="col-lg-10 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  Abonnez-vous à notre{" "}
                  <span className="text-primary text-uppercase">newsletter</span>
                </h4>
                <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                  <input className="form-control w-100 py-3 ps-4 pe-5" type="text" placeholder="Entrez votre email" />
                  <button type="button" className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">
                    Envoyer
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

export default BookingHotel;
