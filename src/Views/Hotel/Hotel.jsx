import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { Link } from "react-router-dom";

function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(6); // 6 hôtels par page
  const [filters, setFilters] = useState({
    adress: "", 
    nom: "",
    tarif: "",
    etoiles: "",
  });

  const fetchHotels = async () => {
    try {
      const res = await api.getHotels();
      setHotels(res.data.listeData);
      setFilteredHotels(res.data.listeData); // Initialiser les hôtels filtrés
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    let results = hotels.filter((hotel) => {
      const matchesAdresse =
        filters.adress === "" ||
        hotel.adress.toLowerCase().includes(filters.adress.toLowerCase());
      const matchesNom =
        filters.nom === "" ||
        hotel.nom.toLowerCase().includes(filters.nom.toLowerCase());
      const matchesTarif =
        filters.tarif === "" ||
        (hotel.tarifMoyen && hotel.tarifMoyen <= Number(filters.tarif));
      const matchesEtoile =
        filters.etoiles === "" ||
        (hotel.nombreEtoiles && hotel.nombreEtoiles >= Number(filters.etoiles));

      return matchesAdresse && matchesNom && matchesTarif && matchesEtoile;
    });
    setFilteredHotels(results);
    setCurrentPage(1);
  }, [filters, hotels]);
  // Appliquer les filtres


  // Gérer le changement des inputs de filtre
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Pagination
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const resetFilters = () => {
    setFilters({
      adress: "",
      nom: "",
      tarif: "",
      etoiles: "",
    });
  };
  return (
    <div>
      {" "}
      <div className="container-xxl bg-white p-0">
        {/* Page Header Start */}
        <div
          className="container-fluid page-header mb-5 p-0"
          style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
        >
          <div className="container-fluid page-header-inner py-5">
            <div className="container text-center pb-5">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Hotels
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
                    Hotels
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        {/* Page Header End */}
        <div
          className="container-fluid booking pb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="bg-white shadow" style={{ padding: 35 }}>
              <div className="row g-2">
                <div className="col-md-10">
                  <div className="row g-2">
                    <div className="col-md-3">
                      <div
                        className="Adresse"
                        id="date1"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          placeholder="Adresse"
                          name="adresse"
                          value={filters.adresse}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="Nom"
                        id="date2"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          placeholder="Nom"
                          name="nom"
                          value={filters.nom}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="Tarif"
                        id="date1"
                        data-target-input="nearest"
                      >
                        <input
                          type="number"
                          className="form-control datetimepicker-input"
                          placeholder="Tarif maximum"
                          name="tarif"
                          value={filters.tarif}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="EtoileNumber"
                        id="date2"
                        data-target-input="nearest"
                      >
                        <input
                          type="number"
                          className="form-control datetimepicker-input"
                          placeholder="Nombre d'étoiles min"
                          name="etoiles"
                          value={filters.etoiles}
                          onChange={handleFilterChange}
                          min="1"
                          max="5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title text-center text-primary text-uppercase">
                Our Hotels
              </h6>
              <h1 className="mb-5">
                Explore Our{" "}
                <span className="text-primary text-uppercase">Hotels</span>
              </h1>
            </div>
            {currentHotels.length === 0 ? (
              <div className="text-center py-5">
                <h4>Aucun hôtel ne correspond à vos critères de recherche</h4>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {currentHotels.map((hotel) => (
                    <div
                      key={hotel._id}
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="room-item shadow rounded overflow-hidden">
                        <div className="position-relative">
                          {/* Afficher la première image de l'hôtel ou une image par défaut */}
                          {hotel.images && hotel.images.length > 0 ? (
                            <img
                              className="img-fluid"
                              src={`http://localhost:3000/uploads/${hotel.images[0]}`}
                              alt={hotel.nom}
                              style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            />
                          ) : (
                            <img
                              className="img-fluid"
                              src="img/default-hotel.jpg"
                              alt="Default hotel"
                            />
                          )}
                          <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                            {hotel.tarifMoyen
                              ? `${hotel.tarifMoyen} TND/nuit`
                              : "Prix sur demande"}
                          </small>
                        </div>
                        <div className="p-4 mt-2">
                          <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">{hotel.nom}</h5>
                            <div className="ps-2">
                              {/* Afficher les étoiles selon la classification */}
                              {[...Array(5)].map((_, i) => (
                                <small
                                  key={i}
                                  className={`fa fa-star ${
                                    i < hotel.nombreEtoiles
                                      ? "text-primary"
                                      : "text-secondary"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="d-flex mb-3">
                            <small className="border-end me-3 pe-3">
                              <i className="fa fa-map-marker-alt text-primary me-2" />
                              {hotel.adress}
                            </small>
                            <small>
                              <i className="fa fa-phone text-primary me-2" />
                              {hotel.telephone}
                            </small>
                          </div>
                          <p className=" text-body mb-3">
                            {hotel.description?.substring(0, 100)}...
                          </p>

                          <div className="d-flex justify-content-between">
                            <Link
                              to={`/hotel/${hotel._id}`}
                              className="btn btn-sm btn-primary rounded py-2 px-4"
                            >
                              View Detail
                            </Link>
                            {/* <Link
                              to={`/hotel/booking/${hotel._id}`}
                              className="btn btn-sm btn-dark rounded py-2 px-4"
                            >
                              Book Now
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                          >
                            Précédent
                          </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                          >
                            Suivant
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* Service End */}
        {/* Testimonial Start */}
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
              <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
                <p>
                  Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                  ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                  est kasd kasd et erat magna eos
                </p>
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid flex-shrink-0 rounded"
                    src="img/testimonial-2.jpg"
                    style={{ width: 45, height: 45 }}
                  />
                  <div className="ps-3">
                    <h6 className="fw-bold mb-1">Client Name</h6>
                    <small>Profession</small>
                  </div>
                </div>
                <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1" />
              </div>
              <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
                <p>
                  Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                  ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                  est kasd kasd et erat magna eos
                </p>
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid flex-shrink-0 rounded"
                    src="img/testimonial-3.jpg"
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
        {/* Testimonial End */}
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
        <a
          href="#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up" />
        </a>
      </div>
    </div>
  );
}

export default Hotel;
