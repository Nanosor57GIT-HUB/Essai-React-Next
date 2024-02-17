"use client";

import React from "react";
//import { metadata } from "../layout";
import styles from "@/app/styles/reglementGames.module.css";

const ModaleReglementGames = ({ isOpen, onClose, gameType }) => {
  
  const renderGameRules = () => {
    switch (gameType) {
      case "LotoReglement":
        return (
          <div className={styles.blockTextReglement}>
            <h2 className={styles.titleGameReglement}>Règlement Loto</h2>
            <p className={styles.textReglement}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
              orci et urna ultricies hendrerit et a felis. Vivamus ut facilisis
              felis. Nunc non eros diam. Nunc quis vehicula quam. Etiam id justo
              non purus sagittis feugiat. Cras sodales egestas urna, eget mattis
              sem venenatis eu. Aenean posuere condimentum eros id euismod.
              Nulla sit amet pharetra nisl. Quisque sed semper turpis, sed
              congue lectus. Maecenas eu nibh risus. Cras lacinia, erat ac
              suscipit fringilla, est turpis vulputate mauris, finibus feugiat
              mauris ante id turpis. Aliquam nec sodales odio. Proin tincidunt
              nisi hendrerit magna aliquet, non molestie ligula pulvinar.
            </p>

            <p className={styles.textReglement}>
              Morbi accumsan, arcu vel egestas placerat, velit dolor suscipit
              leo, sed venenatis ante ante vitae arcu. Etiam lobortis quis leo
              in laoreet. Donec pretium, est ac facilisis condimentum, elit
              felis placerat urna, ac scelerisque urna lectus sit amet quam.
              Vivamus porttitor semper velit in hendrerit. Fusce cursus in
              ligula sit amet feugiat. Suspendisse finibus tortor velit, sit
              amet cursus orci gravida vitae. Quisque interdum, neque venenatis
              imperdiet pulvinar, erat leo tristique dui, eu ullamcorper orci
              felis eu ligula. Curabitur sit amet scelerisque elit. Aenean nulla
              quam, viverra at lectus non, mollis cursus massa. Donec iaculis
              rutrum blandit. Morbi gravida ultrices mi, ut hendrerit ex
              fringilla ut.
            </p>

            <p className={styles.textReglement}>
              Integer molestie mi justo, sollicitudin accumsan metus maximus
              vel. Cras eu finibus leo. In tristique, ipsum vitae pretium
              aliquam, orci velit fermentum quam, in euismod lectus metus vel
              odio. Morbi ac magna nunc. Donec urna urna, consequat et lorem sit
              amet, imperdiet aliquet dui. Fusce sit amet egestas ante. Nullam
              egestas enim eu imperdiet euismod.
            </p>

            <p className={styles.textReglement}>
              Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel
              tempor. Curabitur orci urna, blandit eget semper sit amet, maximus
              non nibh. Suspendisse blandit finibus mauris, et iaculis dui
              varius ac.
            </p>

            <p className={styles.textReglement}>
              Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel
              tempor. Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi
              non imperdiet facilisis, diam enim pellentesque massa, ac commodo
              metus dui tincidunt felis.
            </p>

            <p className={styles.textReglement}>
              Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel
              tempor. Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi
              non imperdiet facilisis, diam enim pellentesque massa, ac commodo
              metus dui tincidunt felis. Mauris metus nisi, pharetra vel tortor
              in, vestibulum ultrices quam. Pellentesque at fringilla urna.
              Nulla rhoncus elit quis volutpat malesuada. Curabitur orci urna,
              blandit eget semper sit amet, maximus non nibh. Suspendisse
              blandit finibus mauris, et iaculis dui varius ac.
            </p>
          </div>
        );
      case "BonneteauReglement":
        return (
          <div className={styles.blockTextReglement}>
            <h2 className={styles.titleGameReglement}>
              Règlement Three-shell game
            </h2>
            <p className={styles.textReglement}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
              orci et urna ultricies hendrerit et a felis. Vivamus ut facilisis
              felis.
            </p>

            <p className={styles.textReglement}>
              Morbi accumsan, arcu vel egestas placerat, velit dolor suscipit
              leo, sed venenatis ante ante vitae arcu. Etiam lobortis quis leo
              in laoreet. Donec pretium, est ac facilisis condimentum, elit
              felis placerat urna, ac scelerisque urna lectus sit amet quam.
              Vivamus porttitor semper velit in hendrerit. Fusce cursus in
              ligula sit amet feugiat. Suspendisse finibus tortor velit, sit
              amet cursus orci gravida vitae. Quisque interdum, neque venenatis
              imperdiet pulvinar, erat leo tristique dui, eu ullamcorper orci
              felis eu ligula. Curabitur sit amet scelerisque elit. Aenean nulla
              quam, viverra at lectus non, mollis cursus massa. Donec iaculis
              rutrum blandit. Morbi gravida ultrices mi, ut hendrerit ex
              fringilla ut.
            </p>

            <p className={styles.textReglement}>
              Integer molestie mi justo, sollicitudin accumsan metus maximus
              vel. Cras eu finibus leo. In tristique, ipsum vitae pretium
              aliquam, orci velit fermentum quam, in euismod lectus metus vel
              odio. Morbi ac magna nunc. Donec urna urna, consequat et lorem sit
              amet, imperdiet aliquet dui. Fusce sit amet egestas ante. Nullam
              egestas enim eu imperdiet euismod.
            </p>

            <p className={styles.textReglement}>
              Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel
              tempor. Curabitur orci urna, blandit eget semper sit amet, maximus
              non nibh. Suspendisse blandit finibus mauris, et iaculis dui
              varius ac.
            </p>

            <p className={styles.textReglement}>
              Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel
              tempor. Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi
              non imperdiet facilisis, diam enim pellentesque massa, ac commodo
              metus dui tincidunt felis.
            </p>

            <p className={styles.textReglement}>
              Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel
              tempor. Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi
              non imperdiet facilisis, diam enim pellentesque massa, ac commodo
              metus dui tincidunt felis. Mauris metus nisi, pharetra vel tortor
              in, vestibulum ultrices quam. Pellentesque at fringilla urna.
              Nulla rhoncus elit quis volutpat malesuada. Curabitur orci urna,
              blandit eget semper sit amet, maximus non nibh. Suspendisse
              blandit finibus mauris, et iaculis dui varius ac.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    isOpen && (
    <div>
       {/* <title>{metadata[gameType].title}</title>
          <meta
            name="description"
            content={metadata[gameType].description}
          /> */}
      <div className={styles.modalReglementGames}>
        {renderGameRules()}
        <button className={styles.btnReglementGames} onClick={onClose}>
          Retour au jeu
        </button>
        {/* </div> */}
      </div>
      </div>
    )
  );
};

export default ModaleReglementGames;
