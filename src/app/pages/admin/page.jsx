"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



// https://nextjs.org/docs/app/api-reference/next-config-js/env

// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables


// https://nextjs.org/docs/app/building-your-application/routing/colocation 


const Admin = () => {
  const router = useRouter();
  console.log("router const:", router);
  const [username, setUsername] = useState('');
  console.log("usestate name:", username);
  const [password, setPassword] = useState('');
  console.log("usestate pwd:", password);
  const [error, setError] = useState('');
console.log("usstate err:", error);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    console.log("useeffect isloggedin:", isLoggedIn);
    if (isLoggedIn) {
      console.log("if in useeffect loggedin:", isLoggedIn);
      router.push('/admin/dashboard');
    }
  }, [router]);



  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Fonction handleLogin appelée !");
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      console.log(process.env.ADMIN_USERNAME);
      console.log(password === process.env.ADMIN_PASSWORD);
      console.log("username dans if:", username);
   localStorage.setItem('loggedIn', 'true');
      console.log("setitem loggedin:", localStorage); // Vérifiez ici si 'loggedIn' a été défini
      router.push('/admin/dashboard');
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
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
