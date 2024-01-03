"use client"

import React, { useEffect, useRef } from "react";
import styles from "@/app/styles/accueil.module.css"

const AccueilDescriptionProject = () => {

  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement.scrollHeight > textElement.clientHeight) {
      textElement.classList.add(styles.scroller); // Ajoute la classe si le défilement est nécessaire
    } else {
      textElement.classList.remove(styles.scroller); // Retire la classe si le défilement n'est pas nécessaire
    }
  }, []);


  return (
    <div className={styles.desciptionProject}>
      
<div className={styles.blockTextDescriptionProject}>
<p ref={textRef} >
        <span className={styles.titleDescription}>CV ...</span> ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae
        nulla tristique, semper nisi nec, varius dui. Nulla facilisi. Maecenas
        augue mauris, interdum vel felis at, consectetur imperdiet odio. Cras eu
        tincidunt augue. Duis tempus, elit quis maximus ultrices, turpis lorem
        elementum leo, quis congue arcu enim sit amet nibh. Nullam non posuere
        nibh. Mauris finibus neque ut tellus sodales euismod. Aliquam aliquet
        consectetur leo non blandit. Morbi ultricies elit nisl, sed tristique
        nibh lobortis sed.
      </p>
<p ref={textRef}>
        <span className={styles.titleDescription}>IMCREMENTATION ...</span> ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae
        nulla tristique, semper nisi nec, varius dui. Nulla facilisi. Maecenas
        augue mauris, interdum vel felis at, consectetur imperdiet odio. Cras eu
        tincidunt augue. Duis tempus, elit quis maximus ultrices, turpis lorem
        elementum leo, quis congue arcu enim sit amet nibh. Nullam non posuere
        nibh. Mauris finibus neque ut tellus sodales euismod. Aliquam aliquet
        consectetur leo non blandit. Morbi ultricies elit nisl, sed tristique
        nibh lobortis sed.
      </p>
      <p ref={textRef}>
        <span className={styles.titleDescription}>API ...</span> ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae
        nulla tristique, semper nisi nec, varius dui. Nulla facilisi. Maecenas
        augue mauris, interdum vel felis at, consectetur imperdiet odio. Cras eu
        tincidunt augue.
      </p>
      <p ref={textRef}>
        <span className={styles.titleDescription}>GAMES ...</span> Mise en place de 2 jeux basés sur des algorythmes différents. Three-Shell game 333, un bonnetaeau constitué d&#39;une boule et de trois gobelets avec un mélange et le choix du gobelet pour savoir si vous avez gagné, ou pas. 1 tirage, 3 chance de gagner un lot et 1 chance sur 3 de gagner le gros lot. Vous perdez, vous ne pouvez plus jouer. Vous gagnez, remplissez le formulaire qui me sera retransmis pour un contact ultèrieur avec le gagnant, après vérification. LotoSystem 6/28, un loto traditionnel ..... 
      </p>
      <p ref={textRef}>
        <span className={styles.titleDescription}>SEARCHBAR ...</span> leo eu imperdiet facilisis, lectus nulla efficitur
        sapien, eu imperdiet turpis nibh ac tellus. Suspendisse convallis non
        orci vitae tempor. Nam dignissim, sapien eget luctus ornare, odio lorem
        ullamcorper turpis, et tempus risus nisi ac metus. Aenean tempor vitae
        dui vel dictum. Sed sollicitudin nulla sapien, nec interdum urna euismod
        nec. Vestibulum in convallis enim. Donec cursus aliquet vehicula.
      </p>
      <p ref={textRef}>
        <span className={styles.titleDescription}>COMPTEUR ...</span> leo eu imperdiet facilisis, lectus nulla efficitur
        sapien, eu imperdiet turpis nibh ac tellus. Suspendisse convallis non
        orci vitae tempor. Nam dignissim, sapien eget luctus ornare, odio lorem
        ullamcorper turpis, et tempus risus nisi ac metus. Aenean tempor vitae
        dui vel dictum. Sed sollicitudin nulla sapien, nec interdum urna euismod
        nec. Vestibulum in convallis enim. Donec cursus aliquet vehicula. 
      </p>
      <p ref={textRef} >
        <span className={styles.titleDescription}>CONTACT ...</span> Formulaire de contact renvoyant une confirmation avec l&#39;email de l&#39;expéditeur.
      </p>
      </div>
    </div>
  );
};

export default AccueilDescriptionProject;
