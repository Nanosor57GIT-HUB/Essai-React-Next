import React from 'react';
import { useState } from 'react';

const FormBonneteau = ({ show, onClose }) => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ajouter votre logique de gestion des données ici, par exemple, envoyer les données à un serveur.
        console.log("Données soumises :", formData);
       // onClose();
        setIsSubmitted(true)
      };


    return (
        <div className={`modalgamegagné ${show ? "active" : ""}`}>
            <div className='closecontainerformwinner'>
          <div className='closewinner'> Fermer</div>
          <span className='closeformwinner' onClick={onClose}>X</span>
          </div> 
          <h2>Formulaire d&#39;Informations Personnelles</h2>
          <div className='formcontainer'>
          {isSubmitted ? (
            <div className="confirmationwinner">
            <p className='messageconfirmation'>Merci {formData.firstName} {formData.lastName} pour votre participation. Vous serez contacter dans un délai raisonnable à cette adresse {formData.email} .</p>
            <button className='btncloseconfirmationwinner' onClick={onClose}>Fermer</button>
          </div>
        ) : (
      <form className='forwinner' onSubmit={handleSubmit}>
        <h3 className='bravotexte'>Bravo! <span className='bravotextesuite'>Vous avez gagner</span></h3>
        <div>
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='btnformwinner'>
          <button type="submit" className='btnsubmitformwinner'>Soumettre</button>
        </div>
      </form> 
      )}
      </div>
        </div>
    );
};

export default FormBonneteau;