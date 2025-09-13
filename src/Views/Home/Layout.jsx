import React, { useEffect, useState } from 'react'
import api from '../../Services/api';
import { Link } from 'react-router-dom';

function Layout() {
  const [stats, setStats] = useState({
    hotels: 0,
    rooms: 0,
    clients: 0,
    Gethotels:[],
    Getchambre:[]


  });

  const fetchData = async () => {
    try {
      const [clientsRes, hotelsRes, roomsRes] = await Promise.all([
        api.getClients(),
        api.getHotels(),
        api.getRooms(),
      ]);
console.log("hotel nbre", hotelsRes.data.listeData.length);
console.log("hotel nbre", roomsRes.data.listeData.length);
console.log("hotel nbre", clientsRes.data.listeData.length);
      setStats({
        hotels: hotelsRes.data.listeData.length,
        rooms: roomsRes.data.listeData.length,
        clients: clientsRes.data.listeData.length,
        Gethotels: hotelsRes.data.listeData,
        Getchambre: roomsRes.data.listeData,
      });
      console.log("data",roomsRes.data.listeData);
    } catch (error) {
      setStats((prev) => ({
        ...prev,
    
      }));
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      {/* Carousel Start */}
      <div className="container-fluid p-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: 700 }}>
                  <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                    Luxury Living
                  </h6>
                  <h1 className="display-3 text-white mb-4 animated slideInDown">
                    Discover A Brand Luxurious Hotel
                  </h1>
                  <a
                    href
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Our Rooms
                  </a>
                  <a
                    href
                    className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                  >
                    Book A Room
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: 700 }}>
                  <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                    Luxury Living
                  </h6>
                  <h1 className="display-3 text-white mb-4 animated slideInDown">
                    Discover A Brand Luxurious Hotel
                  </h1>
                  <a
                    href
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Our Rooms
                  </a>
                  <a
                    href
                    className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                  >
                    Book A Room
                  </a>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}
      {/* Booking Start */}

      {/* Booking End */}
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start text-primary text-uppercase">
                About Us
              </h6>
             <h1 className="mb-4">
                Welcome to <span className="text-primary">TounesRaha</span>
              </h1>

              {/* Français */}
              <div className="mb-4">
                <p className="mb-2">
                  Bienvenue sur <strong>TounesRaha</strong> 🇹🇳<br />
                  Réservez facilement des hôtels authentiques et confortables à travers toute la Tunisie.<br />
                  Que vous cherchiez le calme du désert ou le charme des côtes, nous avons l’hébergement qu’il vous faut.<br />
                  <em>TounesRaha, votre plateforme de réservation hôtelière 100% tunisienne.</em>
                </p>
              </div>

              {/* Tunisien translittéré */}
              <div className="mb-4">
                <p className="mb-2">
                  <strong>Ahlan bik fi TounesRaha</strong> 🇹🇳<br />
                  Ahna hné bach tsawwer w ta7jez a7sen l’hôtels fi Tounes — men Tozeur 7atta Tabarka.<br />
                  Ajred, a7jez, w estara7... TounesRaha m3ak fi kull makan.
                </p>
              </div>
              <div className="row g-3 pb-4">
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-hotel fa-2x text-primary mb-2" />
                      <h2 className="mb-1" data-toggle="counter-up">
                        {stats.hotels}
                      </h2>
                      <p className="mb-0">Hotels</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-bed fa-2x text-primary mb-2" />{" "}
                      <h2 className="mb-1" data-toggle="counter-up">
                        {stats.rooms}
                      </h2>
                      <p className="mb-0">Rooms</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users fa-2x text-primary mb-2" />
                      <h2 className="mb-1" data-toggle="counter-up">
                        {stats.clients}{" "}
                      </h2>
                      <p className="mb-0">Clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.1s"
                    src="img/about-1.jpg"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    src="img/about-2.jpg"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    src="img/about-3.jpg"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    src="img/about-4.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
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
          <div className="row g-4">
            {stats.Gethotels.slice(0, 6).map((hotel) => (
              <div
                key={hotel._id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    {/* Afficher la première image de l'hôtel ou une image par défaut */}
                    {hotel.images && hotel.images.length > 0 ? (
                      <div>
                        <img
                          className="img-fluid"
                          src={`https://hotel-api-ywn8.onrender.com/uploads/${hotel.images[0]}`}
                          alt={hotel.nom}
                            style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          className="img-fluid"
                          src="img/default-hotel.jpg"
                          alt="Default hotel"
                        />
                      </div>
                    )}
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      {hotel.tarifMoyen
                        ? `$${hotel.tarifMoyen}/night`
                        : "Price on request"}
                    </small>
                    {/* <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      {hotel.nombreEtoiles} <i className="fa fa-star" />
                    </small> */}
                    {/* <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      {hotel.nombreEtoiles} <i className="fa fa-star" />
                    </small> */}
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
          {/* Bouton View More au-dessus de la liste */}
          <div className="text-center mt-5 wow fadeInUp" data-wow-delay="0.3s">
            <Link
              to={"/hotel"}
              className="btn btn-primary px-4 py-2 rounded-pill view-more-btn"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
      {/* Hotel End */}
      {/* Testimonial Start */}
      <div
        className="container-xxl testimonial my-5 py-5 bg-dark wow zoomIn"
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
      {/* Room Start */}
      
      {/* Room End */}
      {/* Video Start */}
      {/* <div className="container-xxl py-5 px-0 wow zoomIn" data-wow-delay="0.1s">
        <div className="row g-0">
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5">
              <h6 className="section-title text-start text-white text-uppercase mb-3">
                Luxury Living
              </h6>
              <h1 className="text-white mb-4">
                Discover A Brand Luxurious Hotel
              </h1>
              <p className="text-white mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <a href className="btn btn-primary py-md-3 px-md-5 me-3">
                Our Rooms
              </a>
              <a href className="btn btn-light py-md-3 px-md-5">
                Book A Room
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="video">
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                data-bs-target="#videoModal"
              >
                <span />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="videoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src
                  id="video"
                  allowFullScreen
                  allowscriptaccess="always"
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Video Start */}
      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Services
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Services</span>
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <a className="service-item rounded" href>
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-hotel fa-2x text-primary" />
                  </div>
                </div>
                <h5 className="mb-3">Rooms &amp; Appartment</h5>
                <p className="text-body mb-0">
                 Découvrez nos hotels et chambres alliant confort moderne et charme local. 
                 Chaque espace est soigneusement aménagé pour vous offrir une expérience unique, 
                 avec des équipements complets.
                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <a className="service-item rounded" href>
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-utensils fa-2x text-primary" />
                  </div>
                </div>
                <h5 className="mb-3">Food &amp; Restaurant</h5>
                <p className="text-body mb-0">
                    Savourez une cuisine tunisienne authentique et des spécialités internationales préparées avec des ingrédients frais. 
                    Nos restaurants et services de room-service vous accueillent dans un cadre convivial pour un moment de plaisir et de découverte culinaire.

                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <a className="service-item rounded" href>
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-spa fa-2x text-primary" />
                  </div>
                </div>
                <h5 className="mb-3">Spa &amp; Fitness</h5>
                <p className="text-body mb-0">
                   Offrez-vous un moment de détente absolue dans notre espace Spa, avec massages relaxants, 
                   hammam et soins du corps. Pour les plus actifs, notre salle de fitness moderne est équipée pour
                    répondre à tous vos besoins en bien-être et remise en forme.

                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <a className="service-item rounded" href>
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-swimmer fa-2x text-primary" />
                  </div>
                </div>
                <h5 className="mb-3">Sports &amp; Gaming</h5>
                <p className="text-body mb-0">
                   Profitez de nos installations sportives pour vous dépenser et vous divertir : 
                   terrains de sport, salle de jeux, baby-foot, consoles, et bien plus encore. 
                   Que vous soyez amateur de compétition ou de fun entre amis, il y en a pour tous les goûts !

                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <a className="service-item rounded" href>
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-glass-cheers fa-2x text-primary" />
                  </div>
                </div>
                <h5 className="mb-3">Event &amp; Party</h5>
                <p className="text-body mb-0">
                   Vivez des soirées inoubliables avec nos événements festifs :
                    pool party, concerts live, animations DJ et spectacles traditionnels. 
                    Que ce soit pour célébrer, se détendre ou faire de nouvelles rencontres, 
                    nos soirées ajoutent une touche magique à votre séjour.

                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <a className="service-item rounded" href>
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-dumbbell fa-2x text-primary" />
                  </div>
                </div>
                <h5 className="mb-3">GYM &amp; Yoga</h5>
                <p className="text-body mb-0">
                    Restez en forme et détendez votre esprit avec nos installations de fitness modernes et nos séances de yoga. 
                    Que vous soyez adepte de musculation ou en quête de sérénité, notre espace bien-être s'adapte à vos besoins.

                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}

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
    </div>
  );
}

export default Layout