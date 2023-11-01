import React, { useState } from 'react';
import { useTheme } from '@/app/context/themecontext';

function ContactForm() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
    // Vous pouvez ajouter ici la logique pour envoyer les données du formulaire à votre serveur ou API.
    console.log(formData);
  };

  return (
    <form className='contactForm' onSubmit={handleSubmit}>
      <div>
        <label  htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          className='name'
          name="name"
          placeholder='Mettre votre nom et prénom'
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </div>
      <div>
        <label  htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          className='email'
          name="email"
          placeholder='Mettre votre adresse Email'
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message <span className='maxmessage' style={{
          color: theme.color5,
        }}>(350 mots maximum.)</span> :</label>
        <textarea
          id="message"
          className='message'
          name="message" 
          rows="7"
          placeholder='Laisser moi un message ...'
          value={formData.message}
          onChange={handleChange}
          minLength={30}
          maxLength={350}
          required
        ></textarea>
      </div>
      <div className='btncontainercontact'>
        <button className='btncontact' type="submit">Envoyer</button>
      </div>
    </form>
  );
}

export default ContactForm;
