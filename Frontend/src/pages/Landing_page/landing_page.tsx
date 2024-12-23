import React from 'react'
import './landing_page.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const landing_page = () => {
  return (
    <>
    <div className='div'>
    <Navbar/>
    
    <section className='div1'>
        <div>
          <h1> LocaTrust : Votre rental platform.</h1>
          <p>

            Découvrez notre plateforme web innovante qui transforme la gestion des profils de locataires.
            Bailleurs et locataires se rencontrent dans un espace sécurisé où la transparence règne.
            Pour un voyage dans un univers innovante
            Évaluez et certifiez les profils pour instaurer la confiance, tout en accédant à des offres de location exclusives.
            Rejoignez-nous pour faire de chaque location une expérience enrichissante et sécurisée !</p>

          <a href='/locataire' className='start-btn'>Commencer</a>
        </div>

      </section>
     
        
    </div>

    <Footer/>
  </>

  )
}

export default landing_page