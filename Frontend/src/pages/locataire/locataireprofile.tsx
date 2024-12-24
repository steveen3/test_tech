import React, { useState } from 'react';
import { FaUser, FaPhone, FaLock, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaEnvelope, FaIdCard, FaImage } from 'react-icons/fa';
import loginImg from '../../../src/assets/images/admin-signin.png';

function LocataireProfile() {
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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-600 to-purple-800">
      {/* En-tête */}
      <div className="flex items-center justify-center bg-gray-200" style={{ height: '25%' }}>
        <h1 className="text-3xl font-bold">Profile Locataire</h1>
      </div>

      {/* Conteneur principal */}
      <div className="flex flex-1">
        {/* Formulaire */}
        <div className="w-1/2 p-4 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md bg-gradient-to-b from-pink-500 to-purple-600 p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaUser className="text-gray-600 mr-2" />
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
                <FaPhone className="text-gray-600 mr-2" />
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
                <FaLock className="text-gray-600 mr-2" />
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
                <FaBirthdayCake className="text-gray-600 mr-2" />
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
                <FaVenusMars className="text-gray-600 mr-2" />
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
                <FaMapMarkerAlt className="text-gray-600 mr-2" />
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
                <FaEnvelope className="text-gray-600 mr-2" />
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
                <FaIdCard className="text-gray-600 mr-2" />
                <input
                  type="file"
                  name="identityDocument"
                  placeholder="Document d'identité"
                  value={formData.identityDocument}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaImage className="text-gray-600 mr-2" />
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-white"
                  accept="image/*"
                />
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

        {/* Image */}
        <div className="w-1/2 p-4">
          <img src={loginImg} alt="Login" className="w-full h-auto rounded-2xl shadow-lg bg-white" /> {/* Fond de l'image en blanc */}
        </div>
      </div>
    </div>
  );
}

export default LocataireProfile;