"use client";

import styles from "@/app/styles/admin.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// https://nextjs.org/docs/app/api-reference/next-config-js/env

// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables

// https://nextjs.org/docs/app/building-your-application/routing/colocation

const Admin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      router.push("/pages/dashboard");
    }
  }, [router]);

  const handleClick = () => {
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if 
      (username === ADMIN_USERNAME && password === ADMIN_PASSWORD
        ) {
      localStorage.setItem("loggedIn", "true");
      router.push("/pages/dashboard");
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <div className={styles.adminPages}>
      <h1 className={styles.titlePageAdmin}>Connection administrateur</h1>
      <form className={styles.formAdminConnect} onSubmit={handleLogin}>
        <div>
          <label className={styles.labelAdminConnect}>
            Nom d&#39;utilisateur:
            <input
              className={styles.inputAdmin}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onClick={handleClick}
            />
          </label>
        </div>
        <div>
          <label className={styles.labelAdminConnect}>
            Mot de passe:
            <input
              className={styles.inputAdmin}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={handleClick}
            />
          </label>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnAdmin} type="submit">
            Se connecter
          </button>
        </div>
        <div className={styles.errorAdmin}>
          {error && <p className={styles.errorMessageAdmin}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Admin;
