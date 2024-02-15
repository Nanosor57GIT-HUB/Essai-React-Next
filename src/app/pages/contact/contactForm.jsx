"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/app/styles/contact.module.css";
import { useTheme } from "@/app/context/themecontext";
import emailjs from "@emailjs/browser";
import Link from "next/link";

function ContactForm() {
  const { theme } = useTheme();

  const formRef = useRef(null);
  const firstNameRef = useRef(null);
  const [formData, setFormData] = useState({
    first_name: "",
    user_email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [submittedName, setSubmittedName] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "message") {
      if (value.length < 30) {
        setErrorMessage("");
      }
    }
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const { message, first_name, user_email } = formData;
      let errorMessage = "";

      if (first_name.length === 0) {
        errorMessage = "Veuillez entrer votre nom et prénom.";
      } else if (user_email.length === 0) {
        errorMessage = "Votre email est requis.";
      } else if (!/^\S+@\S+\.\S+$/.test(user_email)) {
        errorMessage = "Veuillez entrer une adresse email valide.";
      } else if (message.length === 0) {
        errorMessage = "Votre message est requis.";
      } else if (message.length < 30) {
        errorMessage = "Votre message doit contenir au moins 30 caractères.";
      }

      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      sendEmail(); // Envoi du formulaire si les conditions sont remplies
    }
  };

  const sendEmail = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const { message } = formData;
    if (message.length < 30) {
      setErrorMessage("Votre message doit contenir au moins 30 caractères.");
      return; // Empêcher l'envoi du formulaire si la validation échoue
    }
    setSubmitted(true);
    const submittedName = formData.first_name;
    console.log("data contact:", formData);
    console.log("Form is valid!");
    try {
      await emailjs.sendForm(
        "service_19k8uap",
        "template_j7t2nmd",
        formRef.current,
        "MMxU-Ki_LKRNh3M4q"
      );
      console.log("message send");
      setFormData({
        first_name: "",
        user_email: "",
        message: "",
      });
    } catch (error) {
      console.log(error.text);
    }
    setSubmittedName(submittedName);
  };

  // sync appearance first_name in modal confirmation
  useEffect(() => {
    if (submittedName) {
      setDisplayModal(true);
    }
  }, [submittedName]);

  return (
    <div className={styles.formulaireContact} onKeyDown={handleKeyDown}>
      {/* <p className={styles.ok}>OK</p> */}
      {!submitted ? (
        <form ref={formRef} className={styles.contactForm} onSubmit={sendEmail}>
          <p className={styles.asterisqueSpecifie}>
            (<span className={styles.specifieIndicator}>*</span>) Obligatoire.
          </p>
          <div>
            <label
              htmlFor={styles.first_name}
              className={styles.labelFormContact}
            >
              Nom<span className={styles.requiredIndicator}>*</span> :
              <input
                type="text"
                id={styles.name}
                className={styles.name}
                name="first_name"
                placeholder="Mettre votre Nom et Prénom"
                value={formData.first_name}
                onChange={handleChange}
                autoComplete="name"
                ref={firstNameRef}
                required
              />
            </label>
          </div>
          <div>
            <label
              htmlFor={styles.user_email}
              className={styles.labelFormContact}
            >
              Email<span className={styles.requiredIndicator}>*</span> :
              <input
                type="email"
                id={styles.email}
                className={styles.email}
                name="user_email"
                placeholder="Mettre votre adresse Email"
                value={formData.user_email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>
          </div>
          <div className={styles.blockTextarea}>
            <label htmlFor={styles.message} className={styles.labelFormContact}>
              Message<span className={styles.requiredIndicator}>*</span>{" "}
              <span
                className={styles.maxChars}
                style={{
                  color: theme.color5,
                }}
              >
                (350 caractères max.)
              </span>{" "}
              :
              <textarea
                id="message"
                className={`${styles.message}`}
                name="message"
                rows="6"
                placeholder="Laissez moi un message ..."
             
                value={formData.message}
                onChange={handleChange}
                maxLength={350}
                required
              ></textarea>
            </label>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
          </div>
          <div className={styles.btncontainercontact}>
            <button type="submit" className={styles.btncontact}>
              Envoyer
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.containerConfirmModal}>
          {displayModal && (
            <div className={styles.modalConfirmContact}>
              <Link
                rel="preload"
                href="/"
                className={styles.closeConfirmContact}
                as="/"
              >
                X
              </Link>
              <Image
                priority={true}
                as="image"
                src="/images/logo/logoPortfolioName.png"
                alt="MyPortfolioInline logoName"
                className={styles.logoName}
                width={1608}
                height={908}
              />
              <h2 className={styles.textConfirmContact}>
                Merci <span style={{ color: "#2c75ff" }}>{submittedName}</span>{" "}
                pour votre message !
              </h2>
              <p className={styles.textConfirmContact}>
                Nous vous répondrons dans les meilleurs délais.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactForm;
