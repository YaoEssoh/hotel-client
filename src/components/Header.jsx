import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();
  // Récupérer les informations de l'utilisateur depuis le localStorage
  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);

  const nom = userParsed?.utilisateur?.nom;
  const prenom = userParsed?.utilisateur?.prenom;

  const handleLogout = () => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous allez être déconnecté du système",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, se déconnecter !",
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer les informations de connexion
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Rediriger vers la page de connexion
        navigate("/login");

        Swal.fire(
          "Déconnecté !",
          "Vous avez été déconnecté avec succès.",
          "success"
        );
      }
    });
  };

  return (
    <div className="container-fluid bg-dark px-0">
      <div className="row gx-0">
        <div className="col-lg-3 bg-dark d-none d-lg-block">
          <Link
            to={"/"}
            className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
          >
            <h1 className="m-0 text-primary">TounesRaha</h1>
          </Link>
        </div>
        <div className="col-lg-9">
          <div className="row gx-0 bg-white d-none d-lg-flex">
            <div className="col-lg-7 px-5 text-start">
              <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                <i className="fa fa-envelope text-primary me-2" />
                <p className="mb-0">info@TounesRaha.com</p>
              </div>
              <div className="h-100 d-inline-flex align-items-center py-2">
                <i className="fa fa-phone-alt text-primary me-2" />
                <p className="mb-0">+012 345 6789</p>
              </div>
            </div>
            <div className="col-lg-5 px-5 text-end">
              <div className="d-inline-flex align-items-center py-2">
                <a className="me-3" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="me-3" href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a className="me-3" href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="me-3" href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
            <a href="index.html" className="navbar-brand d-block d-lg-none">
              <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <Link to="/" className="nav-item nav-link active">
                  Accueil
                </Link>
                <Link to="/hotel" className="nav-item nav-link">
                  Hôtels
                </Link>
                <Link to="/chambre" className="nav-item nav-link">
                  Chambres
                </Link>
                {user ? (
                  <>
                    <Link to="/reservations" className="nav-item nav-link">
                      Vos réservations
                    </Link>
                    <Link to="/profile" className="nav-item nav-link">
                      Votre profil
                    </Link>
                     <Link to="/contact" className="nav-item nav-link">
                      Contact
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="d-flex align-items-center">
                {user ? (
                  <>
                    <div className="text-white me-3">
                      <i className="fa fa-user me-2 text-primary" />
                      {nom}
                      {"   "}
                      {prenom}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-danger rounded-0 py-2 px-4 d-none d-lg-block"
                    >
                      <i className="fa fa-sign-out-alt me-2" /> Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-outline-primary me-2 rounded-0 py-2 px-4 d-none d-lg-block"
                    >
                      <i className="fa fa-sign-in-alt me-2" /> Connexion
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary rounded-0 py-2 px-4 d-none d-lg-block"
                    >
                      <i className="fa fa-user-plus me-2" /> Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
