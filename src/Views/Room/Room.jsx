import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";

function Room() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    prix: "",
    capacite: "",
    status: "",
    views: "",
  });
  const roomsPerPage = 6;

  const fetchRooms = async () => {
    try {
      const res = await api.getRooms();
      setRooms(res.data.listeData);
      //setFilteredRooms(res.data.listeData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Filtrage des chambres
  useEffect(() => {
    let results = rooms.filter((room) => {
      const matchesPrix =
        filters.prix === "" || room.prix <= Number(filters.prix);
      const matchesCapacite =
        filters.capacite === "" || room.capacite >= Number(filters.capacite);
      const matchesStatus =
        filters.status === "" || room.status === filters.status;
        const matchesViews =
          filters?.views === "" || room?.views === filters?.views;

      return matchesPrix && matchesCapacite && matchesStatus && matchesViews;
    });

    setFilteredRooms(results);

    console.log("setFilteredRooms : ", filteredRooms);
    console.log("results : ", results);
    console.log("rooms : ", rooms);
    
    setCurrentPage(1);
  }, [filters, rooms]);

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const resetFilters = () => {
    setFilters({
      prix: "",
      capacite: "",
      status: "",
    });
  };

  return (
    <div>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Rooms
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
                  Rooms
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Filtres de recherche */}
      <div
        className="container-fluid booking pb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="bg-white shadow" style={{ padding: 35 }}>
            <form>
              <div className="row g-2">
                <div className="col-md-10">
                  <div className="row g-2">
                    <div className="col-md-3">
                      <div
                        className="number"
                        id="date1"
                        data-target-input="nearest"
                      >
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Max Price"
                          name="prix"
                          value={filters.prix}
                          onChange={handleFilterChange}
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div
                        className="number"
                        id="date2"
                        data-target-input="nearest"
                      >
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Min Capacity"
                          name="capacite"
                          value={filters.capacite}
                          onChange={handleFilterChange}
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-select"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                      >
                        <option value="">All Types</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Twin">Twin</option>
                        <option value="Junior Suite">Junior Suite</option>
                        <option value="Executive Suite">Executive Suite</option>
                        <option value="Presidential Suite">
                          Presidential Suite
                        </option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-select"
                        value={filters?.views}
                        name="view"
                        onChange={handleFilterChange}
                      >
                        <option value="">All Views</option>
                        <option value="Sea View">Sea View</option>
                        <option value="Garden View">Garden View</option>
                        <option value="City View">City View</option>
                        <option value="Pool View">Pool View</option>
                      </select>
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
            </form>
          </div>
        </div>
      </div>

      {/* Room Listing */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Rooms
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Rooms</span>
            </h1>
          </div>

          {currentRooms.length > 0 ? (
            <>
              <div className="row g-4">
                {currentRooms.map((chambre, index) => (
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
                            chambre.image
                              ? `http://localhost:3000/uploads/${chambre.image}`
                              : "img/room-1.jpg"
                          }
                          alt={chambre.nom}
                          style={{ height: "250px", objectFit: "cover" }}
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
                            to={`/chambre/${chambre._id}`}
                            className="btn btn-sm btn-primary rounded py-2 px-4"
                          >
                            View Detail
                          </Link>
                          <Link
                            to={`/chambre/booking/${chambre._id}`}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-5 wow fadeIn" data-wow-delay="0.3s">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                      >
                        &laquo; Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            currentPage === number ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </button>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                      >
                        Next &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">
                No rooms found matching your criteria
              </h4>
              <button className="btn btn-primary mt-3" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Room End */}
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
    </div>
  );
}

export default Room;
