"use client";

import React from "react";
import styles from "@/app/styles/reglementGames.module.css";
import Link from "next/link";

const Reglement = () => {
  return (
    <div className={styles.containerReglementGame}>
      <h1 className={styles.titleReglement}>Réglement des jeux</h1>
      <div className={styles.blockTextReglement}>
        <Link
          rel="preload"
          href="/pages/threeShellGame"
          as="/pages/threeShellGame"
          passHref
          id="threeShell"
          className={styles.titleGameReglement}
        >
          ThreeShell
        </Link>
        <p className={styles.textReglement}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in orci
          et urna ultricies hendrerit et a felis. Vivamus ut facilisis felis.
          Nunc non eros diam. Nunc quis vehicula quam. Etiam id justo non purus
          sagittis feugiat. Cras sodales egestas urna, eget mattis sem venenatis
          eu. Aenean posuere condimentum eros id euismod. Nulla sit amet
          pharetra nisl. Quisque sed semper turpis, sed congue lectus. Maecenas
          eu nibh risus. Cras lacinia, erat ac suscipit fringilla, est turpis
          vulputate mauris, finibus feugiat mauris ante id turpis. Aliquam nec
          sodales odio. Proin tincidunt nisi hendrerit magna aliquet, non
          molestie ligula pulvinar.
        </p>

        <p className={styles.textReglement}>
          Morbi accumsan, arcu vel egestas placerat, velit dolor suscipit leo,
          sed venenatis ante ante vitae arcu. Etiam lobortis quis leo in
          laoreet. Donec pretium, est ac facilisis condimentum, elit felis
          placerat urna, ac scelerisque urna lectus sit amet quam. Vivamus
          porttitor semper velit in hendrerit. Fusce cursus in ligula sit amet
          feugiat. Suspendisse finibus tortor velit, sit amet cursus orci
          gravida vitae. Quisque interdum, neque venenatis imperdiet pulvinar,
          erat leo tristique dui, eu ullamcorper orci felis eu ligula. Curabitur
          sit amet scelerisque elit. Aenean nulla quam, viverra at lectus non,
          mollis cursus massa. Donec iaculis rutrum blandit. Morbi gravida
          ultrices mi, ut hendrerit ex fringilla ut.
        </p>

        <p className={styles.textReglement}>
          Integer molestie mi justo, sollicitudin accumsan metus maximus vel.
          Cras eu finibus leo. In tristique, ipsum vitae pretium aliquam, orci
          velit fermentum quam, in euismod lectus metus vel odio. Morbi ac magna
          nunc. Donec urna urna, consequat et lorem sit amet, imperdiet aliquet
          dui. Fusce sit amet egestas ante. Nullam egestas enim eu imperdiet
          euismod.
        </p>

        <p className={styles.textReglement}>
          Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel tempor.
          Curabitur orci urna, blandit eget semper sit amet, maximus non nibh.
          Suspendisse blandit finibus mauris, et iaculis dui varius ac.
        </p>

        <p className={styles.textReglement}>
          Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel tempor.
          Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi non
          imperdiet facilisis, diam enim pellentesque massa, ac commodo metus
          dui tincidunt felis.
        </p>

        <p className={styles.textReglement}>
          Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel tempor.
          Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi non
          imperdiet facilisis, diam enim pellentesque massa, ac commodo metus
          dui tincidunt felis. Mauris metus nisi, pharetra vel tortor in,
          vestibulum ultrices quam. Pellentesque at fringilla urna. Nulla
          rhoncus elit quis volutpat malesuada. Curabitur orci urna, blandit
          eget semper sit amet, maximus non nibh. Suspendisse blandit finibus
          mauris, et iaculis dui varius ac.
        </p>
        <Link
          rel="preload"
          href="/pages/lotoGame"
          as="/pages/lotoGame"
          passHref
          id="loto"
          className={styles.titleGameReglement}
        >
          Loto
        </Link>
        <p className={styles.textReglement}>
          Aliquam porttitor vel purus vitae vulputate. Sed pharetra augue eget
          velit sagittis, in elementum dolor cursus. Maecenas auctor nunc velit,
          eget porttitor sem porta in. Nulla sollicitudin libero non odio
          ornare, id ultrices mauris ornare. Quisque finibus pretium erat
          tristique mattis. Sed sodales justo ac quam ultrices, in pretium
          tortor maximus. Integer vehicula erat massa, sed bibendum risus mollis
          id. Sed pulvinar felis nulla. Maecenas scelerisque imperdiet justo, at
          consectetur nulla commodo non. Duis ultrices et quam eget efficitur.
        </p>

        <p className={styles.textReglement}>
          Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel tempor.
          Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi non
          imperdiet facilisis, diam enim pellentesque massa, ac commodo metus
          dui tincidunt felis. Mauris metus nisi, pharetra vel tortor in,
          vestibulum ultrices quam. Pellentesque at fringilla urna. Nulla
          rhoncus elit quis volutpat malesuada.
        </p>

        <p className={styles.textReglement}>
          Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel tempor.
          Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi non
          imperdiet facilisis, diam enim pellentesque massa, ac commodo metus
          dui tincidunt felis. Mauris metus nisi, pharetra vel tortor in,
          vestibulum ultrices quam. Pellentesque at fringilla urna. Nulla
          rhoncus elit quis volutpat malesuada. Curabitur orci urna, blandit
          eget semper sit amet, maximus non nibh. Suspendisse blandit finibus
          mauris, et iaculis dui varius ac.
        </p>

        <p className={styles.textReglement}>
          Sed sodales ut lectus sed ultricies. Nunc congue ac augue vel tempor.
          Sed vitae nibh ut arcu aliquam faucibus. Donec varius, mi non
          imperdiet facilisis, diam enim pellentesque massa, ac commodo metus
          dui tincidunt felis. Nulla rhoncus elit quis volutpat malesuada.
          Curabitur orci urna, blandit eget semper sit amet, maximus non nibh.
          Suspendisse blandit finibus mauris, et iaculis dui varius ac.
        </p>

        <p className={styles.textReglement}>
          Donec varius, mi non imperdiet facilisis, diam enim pellentesque
          massa, ac commodo metus dui tincidunt felis. Mauris metus nisi,
          pharetra vel tortor in, vestibulum ultrices quam. Pellentesque at
          fringilla urna. Nulla rhoncus elit quis volutpat malesuada. Curabitur
          orci urna, blandit eget semper sit amet, maximus non nibh. Suspendisse
          blandit finibus mauris, et iaculis dui varius ac.
        </p>
      </div>
      <div className={styles.returnLinkAccueil}>
        <Link
          rel="preload"
          href="/"
          as="/"
          passHref
          className={styles.linkReturnAccueil}
        >
          Retour à l&#39;accueil 👉
        </Link>
      </div>
    </div>
  );
};

export default Reglement;
