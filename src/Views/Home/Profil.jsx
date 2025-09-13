import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

function Profil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",

    email: "",
    telephone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("user");
        const userParsed = JSON.parse(user);

        if (!userParsed?.utilisateur?._id) {
          navigate("/login");
          return;
        }

        const response = await api.getUserProfile(userParsed.utilisateur._id);
        setUserData({
          nom: response.data.getOne.nom,
          prenom: response.data.getOne.prenom,

          email: response.data.getOne.email,
          telephone: response.data.getOne.numero || "",
        });
        setLoading(false);
      } catch (err) {
        setError("Échec du chargement des données utilisateur");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("user");
      const userParsed = JSON.parse(user);

      const res =await api.updateUserProfile(userParsed.utilisateur._id, userData);

      // Mettre à jour le localStorage
if(res){
  const updatedUser = {
    ...userParsed,
    utilisateur: {
      ...userParsed.utilisateur,
      ...userData,
    },
  };
  localStorage.setItem("user", JSON.stringify(updatedUser));

  setSuccess("Profil mis à jour avec succès !");
  setTimeout(() => setSuccess(""), 3000);
}
    } catch (err) {
      setError("Échec de la mise à jour du profil");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl bg-white p-0">
      {/* En-tête de page */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Profil
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Profil
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Contenu du profil */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
Your            </h6>
            <h1 className="mb-5">Profil</h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Messages d'erreur/succès */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError("")}
                  ></button>
                </div>
              )}
              {success && (
                <div className="alert alert-success alert-dismissible fade show">
                  {success}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccess("")}
                  ></button>
                </div>
              )}

              {/* Formulaire de profil */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={userData.nom}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        value={userData.prenom}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="telephone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                        value={userData.telephone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Mettre à jour
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section témoignages */}
      <div
        className="container-xxl testimonial mt-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
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
            {/* Autres témoignages... */}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div
        className="container newsletter mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row justify-content-center">
          <div className="col-lg-10 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  Abonnez-vous à notre{" "}
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
                    placeholder="Votre email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    S'abonner
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

export default Profil;
