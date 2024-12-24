import React, { useState } from 'react';
import { motion } from 'framer-motion';

import loginImg from '../../../src/assets/images/admin-signin.png'; 
import { FaUser, FaPhone, FaLock, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaEnvelope, FaIdCard, FaImage } from 'react-icons/fa';

function Locataire() {
    
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    birthday: '',
    sexe: '',
    address: '',
    email: '',
    socialLinks: '',
    identityDocument: '',
    photo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement; // Cast pour gérer les fichiers uniquement pour les input
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Gère les fichiers uniquement si présents
    });
  };
  
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
  
    try {
      const response = await fetch('http://localhost:5000/locataires', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'envoi des données.');
      }
  
      const result = await response.json();
      console.log('Données envoyées avec succès:', result);
      alert(result);
    } catch (error) {
      console.error('Erreur:', error);
      
    }
  };
  

  return (
    <div className="bg-gradient-to-b from-purple-600 to-indigo-900 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-gradient-to-r from-indigo-800 to-purple-800 shadow-lg"
      >
        <h2 className="h2 text-white font-bold text-3xl md:text-4xl lg:text-5xl">Locataire profile</h2>
      </motion.div>
      <section className="grid z-[1] grid-cols-12 gap-4 mb-6 lg:gap-6 px-3 md:px-6 relative pb-10 xxl:pb-0">
        <div className="col-span-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-3 md:p-6 lg:p-10 rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex flex-wrap md:flex-nowrap items-start gap-6 xl:gap-8 mx-3">
              <div className="w-full md:w-7/12">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 border rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8 w-full  bg-gradient-to-b from-pink-500 to-purple-600 p-6 rounded-lg shadow-lg" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaUser className="text-white-600 mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaPhone className="text-white-600 mr-2" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Numéro de téléphone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaLock className="text-white-600 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaBirthdayCake className="text-white-600 mr-2" />
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaVenusMars className="text-white-600 mr-2" />
                <select
                  name="sexe"
                  value={formData.sexe}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                >
                  <option value="">Sélectionnez le sexe</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaMapMarkerAlt className="text-white-600 mr-2" />
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                < FaEnvelope className="text-white-600 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaIdCard className="text-white-600 mr-2" />
                <label>identityDocument: </label>
                <input
                  type="file"
                  name="identityDocument"
                  onChange={handleChange}
                  className="flex-1  outline-none bg-transparent text-white"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" // Types de fichiers acceptés
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaUser className="text-white-600 mr-2" />
                <input
                  type="text"
                  name="socialLinks"
                  placeholder="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2 relative">
                  <FaImage className="text-white-600 mr-2" />
                  <label className="flex-1 cursor-pointer bg-transparent text-red relative">
                    <input
                      type="file"
                      name="photo"
                      onChange={handleChange}
                      
                      accept="image/*"
                    />
                    <span className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center text-transparent hover:text-white">
                      profile picture
                    </span>
                  </label>
                </div>
                
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Soumettre
            </button>
          </form>
                </div>
              </div>
              <div className="md:block w-full md:w-5/12 relative">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src={loginImg} 
                    alt="Login Image" 
                    className="w-full h-auto rounded-2xl shadow-lg"
                  /> 
                </motion.div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
     
    </div>
  );
}

export default Locataire;