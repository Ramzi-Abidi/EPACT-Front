import React from 'react';
import { Link } from 'react-router-dom';
import girl from "../images/girl.jpg";

const Apropos = () => {
  return (
    <div class="wrapper">

      {/*colorful background */}
      <div class="background-container" style={{ background: "rgb(247 247 247 / 95%)" }}>
        {/*        <div class="bg-1"></div>
        <div class="bg-2"></div> */}
      </div>

      <div class="about-container">

        <div class="image-container">
          <img src={girl} alt="" />

        </div>

        <div class="text-container">
          <h1 className='title'>À propos de nous</h1>
          <p>   Je suis Siwar Ben kraiem, une jeune entrepreneuse extrêmement motivée pour constamment développer mes compétences et évoluer professionnellement. Je suis toujours à la recherche de nouvelles opportunités, sortant toujours de ma zone de confort. Actuellement, je suis étudiante en 2ème année de Mastère professionnel en génie de l’environnement. J’ai également obtenu une licence appliquée en protection de l’environnement parcours gestion et valorisation des bioressources à l’ISSBAT.
            A l'âge de 23 ans, j’ai décidé de faire une étude de projet comme projet de fin d’étude au sein de l'Institut National de la Recherche agronomique de Tunis (INRAT).
          </p>
          <br />    <p>L’idée du projet a été conçue lors de ce stage, où j'ai décidé de faire la valorisation des travaux de recherche à l’INRAT pour améliorer la qualité de l’aliment concentré et réduire son prix.
            Puis en Mars 2021, j’ai participé à une compétition d’entrepreneuriat, et c’est là où EPACT a vu la lumière.
          </p>
          {/*     <Link to="">Read More</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Apropos;