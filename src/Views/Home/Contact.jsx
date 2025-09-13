// src/components/Contact.jsx  (remplace ton fichier actuel)
import React, { useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

function getAuthHeaders() {
  // Si tu utilises un token JWT : décommente et adapte
  // const token = localStorage.getItem('token');
  // return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  return { 'Content-Type': 'application/json' };
}

function Contact() {
  // états pour le formulaire (on garde l'UI d'origine)
  const user = localStorage.getItem("user");
  const userParsed = JSON.parse(user);
  const clientId = userParsed?.utilisateur?._id;
  const userAuth = userParsed?.utilisateur
  console.log("userAuth : ", userAuth);
  
  const [name, setName] = useState(userAuth?.nom || '');
  const [email, setEmail] = useState(userAuth?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // envoi du formulaire → crée une réclamation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    


    // validations rapides
    if (!subject.trim() || !message.trim()) {
      setError("Le sujet et le message sont obligatoires.");
      return;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email invalide.");
      return;
    }

    const payload = {
      objet: subject.trim(),
      message: message.trim(),
      statut: 'open',
      // contactName/contactEmail sont facultatifs, utiles si client non authentifié
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      client: clientId
      // si l'utilisateur est authentifié et que tu as son id, envoie le champ `client`
      // client: 'OBJECTID_CLIENT_ICI'
    };

    try {
      setSending(true);
      const res = await fetch(`${API_BASE}/reclamation`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

     

      const json = await res.json();
      console.log('Réclamation créée →', json);
      setSuccess('Votre message a été envoyé. Nous vous répondrons bientôt.');
      // nettoyer le formulaire
      if(user === null){
        setName('');
        setEmail('');
      }
      
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Erreur envoi réclamation:', err);
      setError('Impossible d\'envoyer la réclamation. Vérifie le backend ou la connexion.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="container-xxl bg-white p-0">
        {/* Page Header Start */}
        <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: 'url(img/carousel-1.jpg)' }}>
          <div className="container-fluid page-header-inner py-5">
            <div className="container text-center pb-5">
              <h1 className="display-3 text-white mb-3 animated slideInDown">Contact</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">Pages</a></li>
                  <li className="breadcrumb-item text-white active" aria-current="page">Contact</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        {/* Page Header End */}

        {/* Booking Start (inchangé) */}
        <div className="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container">
           
          </div>
        </div>
        {/* Booking End */}

        {/* Contact Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title text-center text-primary text-uppercase">Contact Us</h6>
              <h1 className="mb-5"><span className="text-primary text-uppercase">Contact</span> For Any Query</h1>
            </div>
            <div className="row g-4">
              <div className="col-12">
                <div className="row gy-4">
                  <div className="col-md-4">
                    <h6 className="section-title text-start text-primary text-uppercase">Booking</h6>
                    <p><i className="fa fa-envelope-open text-primary me-2" />book@gmail.com</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="section-title text-start text-primary text-uppercase">General</h6>
                    <p><i className="fa fa-envelope-open text-primary me-2" />TounesRaha@gmail.com</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="section-title text-start text-primary text-uppercase">Technical</h6>
                    <p><i className="fa fa-envelope-open text-primary me-2" />tech@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                <iframe className="position-relative rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd" frameBorder={0} style={{ minHeight: 350, border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
              </div>

              <div className="col-md-6">
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  {/* -> onSubmit gère maintenant l'envoi */}
                  <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="name" placeholder="Your Name"
                            value={name} onChange={(e) => setName(e.target.value)} disabled={user !== null } />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="email" className="form-control" id="email" placeholder="Your Email" 
                            value={email} onChange={(e) => setEmail(e.target.value)} disabled={user !== null}/>
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="subject" placeholder="Subject"
                            value={subject} onChange={(e) => setSubject(e.target.value)} />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: 150 }}
                            value={message} onChange={(e) => setMessage(e.target.value)} />
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit" disabled={sending}>
                          {sending ? 'Envoi...' : 'Send Message'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* Contact End */}

        {/* Newsletter Start */}
        <div className="container newsletter mt-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="row justify-content-center">
            <div className="col-lg-10 border rounded p-1">
              <div className="border rounded text-center p-1">
                <div className="bg-white rounded text-center p-5">
                  <h4 className="mb-4">Subscribe Our <span className="text-primary text-uppercase">Newsletter</span></h4>
                  <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                    <input className="form-control w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter your email" />
                    <button type="button" className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter End */}

        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
      </div>
    </div>
  );
}

export default Contact;
