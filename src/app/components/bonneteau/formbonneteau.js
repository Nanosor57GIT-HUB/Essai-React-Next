
import { useEffect, useState } from 'react';
import styles from "@/app/styles/modalWinnerGames.module.css"

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


      const [modalActive, setModalActive] = useState(false);

      useEffect(() => {
        let timer;
        if (show) {
          timer = setTimeout(() => {
            setModalActive(true);
          }, 2000); // Délai en millisecondes, ajustez-le selon vos besoins
        } else if (onClose) {
          setModalActive(false)
        }
    
        return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté avant la fin du délai
      }, [show, onClose]); // Déclenche l'effet lorsque la valeur de show change
    


    return (
        <div className={`${styles.modalgamegagné} ${modalActive ? styles.active : ""}`}>
            <div className={styles.closecontainerformwinner}>
          <div className={styles.closewinner}> Fermer</div>
          <span className={styles.closeformwinner} onClick={onClose}>X</span>
          </div> 
          <h2>Formulaire d&#39;Informations Personnelles</h2>
          <div className={styles.formcontainer}>
          {isSubmitted ? (
            <div className={styles.confirmationwinner}>
            <p className={styles.messageconfirmation}>Merci {formData.firstName} {formData.lastName} pour votre participation. Vous serez contacter dans un délai raisonnable à l&#39;adresse {formData.email} .</p>
            <button className={styles.btncloseconfirmationwinner} onClick={onClose}>Fermer</button>
          </div>
        ) : (
      <form className={styles.forwinner} onSubmit={handleSubmit}>
        <h3 className={styles.bravotexte}>Bravo! <span className={styles.bravotextesuite}>Vous avez gagner</span></h3>
        <div>
          <label htmlFor={styles.firstName}>Prénom :
          <input
            type="text"
            id={styles.firstName}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          /></label>
        </div>
        <div>
          <label htmlFor={styles.lastName}>Nom :
          <input
            type="text"
            id={styles.lastName}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          /></label>
        </div>
        <div>
          <label htmlFor={styles.email}>E-mail :
          <input
            type="email"
            id={styles.email}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          /></label>
        </div>
        <div className={styles.btnformwinner}>
          <button type="submit" className={styles.btnsubmitformwinner}>Soumettre</button>
        </div>
      </form> 
      )}
      </div>
        </div>
    );
};

export default FormBonneteau;