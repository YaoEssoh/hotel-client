import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { register } from "../../Services/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motsDePass: "",
    confirmPassword: "",
    numero: "",
    adress: "",
    role: "client",
    profil: "client",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (formData.motsDePass !== formData.confirmPassword) {
      MySwal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    try {
      // Préparer les données pour l'API (enlever confirmPassword)
      const { confirmPassword, ...apiData } = formData;

      const response = await api.register(apiData);

      MySwal.fire({
        title: "Success!",
        text: "Registration successful",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        // Redirection après inscription réussie
        navigate("/login");
      });
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "An error occurred during registration";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Validation error";
        } else if (error.response.status === 409) {
          errorMessage = "Email already exists";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }

      MySwal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

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
              Register
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/register">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Register
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Create Account
            </h6>
            <h1 className="mb-5">
              <span className="text-primary text-uppercase">Register</span> New
              Account
            </h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        placeholder="Your Last Name"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="nom">Last Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        placeholder="Your First Name"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="prenom">First Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        id="numero"
                        name="numero"
                        placeholder="Phone Number"
                        value={formData.numero}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="numero">Phone Number</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="motsDePass"
                        name="motsDePass"
                        placeholder="Password"
                        value={formData.motsDePass}
                        onChange={handleChange}
                        minLength="6"
                        required
                      />
                      <label htmlFor="motsDePass">Password (min 6 chars)</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="adress"
                        name="adress"
                        placeholder="Your Address"
                        value={formData.adress}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="adress">Address</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Processing...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                  <div className="col-12 text-center">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
