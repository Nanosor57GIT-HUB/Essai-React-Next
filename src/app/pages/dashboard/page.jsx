"use client";

// pages/admin/dashboard.js
import { useEffect } from "react";
//import { metadata } from "@/app/layout";
import styles from "@/app/styles/dashboard.module.css";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  // const [tableData, setTableData] = useState(["12/2356", "01/01/2024", "loto", "Gagné", "2", "1, 2, 3, 4, 5, 6", "1, 28, 12, 14, 5", "3"]);

  const tableData = [
    [
      "00001",
      "2022-01-01",
      "Loto",
      "Gagné",
      3,
      "1,2,3,4,5,6",
      "1,24,2,12,8,3",
      3,
    ],
    [
      "00256",
      "2022-01-01",
      "Bonneteau",
      "Gagné",
      3,
      null,
      null,
      null,
    ],
    // ... Ajoutez d'autres lignes selon vos besoins
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.push("/pages/admin"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/pages/admin"); // Redirige vers la page de connexion après la déconnexion
  };

  return (
    <div>
        {/* <title>{metadata.Dashboard.title}</title> */}
    <div className={styles.pageDashboard}>
      <div className={styles.headPage}>
        <h1 className={styles.titleDashboard}>Dashboard Games</h1>
        <button className={styles.btnDeconnectDashboard} onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <div className={styles.wrapperTable}>
        <table className={styles.blockTable}>
          <thead>
            <tr>
              <th>ID joueur</th>
              <th>Date</th>
              <th>Jeu joué</th>
              <th>Gagné/Perdu</th>
              <th>Nbre de tirages</th>

              <th>Numéros sélectionnés</th>
              <th>Numéros tirages</th>
              <th>Nombre correpondant</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0 ? styles["even-row"] : styles["odd-row"]
                }
              >
                {rowData.map((item, colIndex) => (
                  <td key={colIndex}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
