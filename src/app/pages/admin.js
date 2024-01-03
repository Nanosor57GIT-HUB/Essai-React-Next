"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(router); // Log de l'objet router dans la console
  }, [router]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      localStorage.setItem('loggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  };

  return (
    <main className="mainpages">
      <h1>Page d&#39;administration</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Nom d&#39;utilisateur:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Mot de passe:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Se connecter</button>
        {error && <p>{error}</p>}
      </form>
    </main>
  );
};

export default Admin;
