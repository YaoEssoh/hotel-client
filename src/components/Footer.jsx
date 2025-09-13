import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="container-fluid bg-dark text-light footer wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container pb-5">
        <div className="row g-5">
          {/* Section de présentation de l'hôtel */}
          <div className="col-md-6 col-lg-4">
            <div className="bg-primary rounded p-4">
              <Link to="/" className="text-decoration-none">
                <h1 className="text-white text-uppercase mb-3">Luxury Haven</h1>
              </Link>
              <p className="text-white mb-0">
                Vivez le luxe inégalé dans notre hôtel haut de gamme. Réservez votre séjour dès aujourd’hui et profitez d’équipements de classe mondiale, d’une cuisine exquise et d’un service exceptionnel.
              </p>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="col-md-6 col-lg-3">
            <h6 className="section-title text-start text-primary text-uppercase mb-4">
              Contactez-nous
            </h6>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3" />
              123 Avenue du Luxe, New York, NY 10001
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3" />
              +1 (212) 555-0100
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3" />
              reservations@luxuryhaven.com
            </p>
            <div className="d-flex pt-2">
              <a
                className="btn btn-outline-light btn-social"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-outline-light btn-social"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-outline-light btn-social"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                className="btn btn-outline-light btn-social"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="col-lg-5 col-md-12">
            <div className="row gy-5 g-4">
              <div className="col-md-6">
                <h6 className="section-title text-start text-primary text-uppercase mb-4">
                  Liens rapides
                </h6>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/about"
                >
                  À propos
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/contact"
                >
                  Contact
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/privacy"
                >
                  Politique de confidentialité
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/terms"
                >
                  Conditions générales
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/faq"
                >
                  FAQ
                </Link>
              </div>
              <div className="col-md-6">
                <h6 className="section-title text-start text-primary text-uppercase mb-4">
                  Nos services
                </h6>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/dining"
                >
                  Restauration gastronomique
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/spa"
                >
                  Spa de luxe
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/events"
                >
                  Espaces pour événements
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/concierge"
                >
                  Service de conciergerie
                </Link>
                <Link
                  className="btn btn-link text-light text-decoration-none d-block mb-2"
                  to="/transport"
                >
                  Transferts aéroport
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" className="text-decoration-none border-bottom">
                Hôtel Luxury Haven
              </Link>
              . Tous droits réservés.
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <Link to="/" className="text-decoration-none me-3">
                  Accueil
                </Link>
                <Link to="/cookies" className="text-decoration-none me-3">
                  Cookies
                </Link>
                <Link to="/help" className="text-decoration-none me-3">
                  Aide
                </Link>
                <Link to="/contact" className="text-decoration-none">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
