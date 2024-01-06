"use client"

// pages/admin/dashboard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();


  useEffect(() => {
    console.log(router); // Log de l'objet router dans la console
  }, [router]);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      router.push('/admin'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/admin'); // Redirige vers la page de connexion après la déconnexion
  };

  return (
    <main className="mainpages">
      <h1>Tableau de bord</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </main>
  );
};

export default Dashboard;

