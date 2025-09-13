import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../Services/api";

const MySwal = withReactContent(Swal);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.login({ email, motsDePass: password });

      // Stocker les informations utilisateur
      localStorage.setItem("user", JSON.stringify(response.data.data));

      // Extraire le rôle de l'utilisateur
      const userRole =
        response.data.data?.utilisateur?.role || response.data.data?.role;

      // Vérifier le rôle et rediriger en conséquence
      if (userRole === "client") {
        MySwal.fire({
          title: "Connexion réussie!",
          text: "Vous êtes maintenant connecté en tant que client",
          icon: "success",
          confirmButtonText: "Continuer",
        }).then(() => {
          navigate("/"); // Redirection vers la page d'accueil pour les clients
        });
      } else {
        // Cas où le rôle n'est pas reconnu
        MySwal.fire({
          title: "Connexion échouée!",
          text: "Rôle utilisateur non reconnu",
          icon: "Echec",
          confirmButtonText: "Cancel",
        });
        throw new Error("Rôle utilisateur non reconnu");
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Une erreur est survenue lors de la connexion";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Email ou mot de passe incorrect";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.message === "Rôle utilisateur non reconnu") {
        errorMessage = "Votre compte n'a pas les permissions nécessaires";
      }

      MySwal.fire({
        title: "Erreur!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Réessayer",
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
              Login
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/login">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Login
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Member Login
            </h6>
            <h1 className="mb-5">
              <span className="text-primary text-uppercase">Sign In</span> To
              Your Account
            </h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-primary">
                      Forgot Password?
                    </Link>
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
                          Loading...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                  <div className="col-12 text-center">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary">
                        Sign Up
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

export default Login;
