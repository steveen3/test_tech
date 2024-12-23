import React, { useState,ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
//import InputField from './InputField'; // Assurez-vous que ce composant existe
//import { Camera, ChevronDown, Phone, Calendar, MapPin, Mail, X } from 'react-icons/all'; // Importez les icônes nécessaires
import { FaCamera } from 'react-icons/fa'; // Par exemple pour Font Awesome
import { FiChevronDown } from 'react-icons/fi'; // Par exemple pour Feather Icons
import { MdPhone } from 'react-icons/md'; // Par exemple pour Material Design
import { IoCalendar } from 'react-icons/io5'; // Par exemple pour Ionicons
import { MapPin } from 'lucide-react'; // Par exemple pour Bootstrap Icons
import { FaEnvelope } from 'react-icons/fa'; // Par exemple pour Ant Design Icons
import { X } from 'lucide-react'; // Par exemple pour Remix Icons
//import Footer from './Footer'; // Assurez-vous que ce composant existe
import loginImg from '../../../src/assets/images/admin-signin.png'; 

function Locataire() {
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    birthday: '',
    address: '',
    socialLinks: '',
    images:[]
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Afficher les données en JSON dans la console avant l'envoi
    console.log('Données soumises:', JSON.stringify(formData, null, 2));

    try {
        const response = await fetch('http://localhost:5000/locataires', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la soumission des données');
        }

        const data = await response.json();
        console.log('Données soumises avec succès:', data);
    } catch (error) {
        console.error('Erreur:', error);
    }
};

  interface FormData {
    name: string;
    phoneNumber: string;
    password: string;
    birthday: string;
    
    address: string;
    email: string;
    
    images: string[];
   
  }

  // Définir les props pour InputField
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    icon?: React.ElementType;
    formData: FormData;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  }

  const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    type = "text",
    icon: Icon,
    formData,
    handleInputChange,
    ...props
  }) => (
    <motion.div 
      className="col-span-12 sm:col-span-6"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <label htmlFor={name} className="text-lg font-semibold block mb-2 text-white">{label}:</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />}
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name as keyof FormData]}
          onChange={handleInputChange}
          className="w-full bg-white border border-purple-300 focus:outline-none rounded-full py-3 pl-10 pr-5 shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          {...props}
        />
      </div>
    </motion.div>
  );

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const imagePromises = filesArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      
    }
  };



  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
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
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-12 gap-4">
                      <InputField name="name" label="Name" icon={FiChevronDown} placeholder="Enter Your Name" formData={formData} handleInputChange={handleInputChange} />
                      <InputField name="phoneNumber" label="Phone Number" icon={MdPhone} placeholder="Enter Your Phone Number" formData={formData} handleInputChange={handleInputChange} />
                      <InputField name="password" label="Password" type="password" icon={FiChevronDown} placeholder="Enter Your Password" formData={formData} handleInputChange={handleInputChange} />
                      <InputField name="birthday" label="Birthday" type="date" icon={IoCalendar} formData={formData} handleInputChange={handleInputChange} />
                      <InputField name="address" label="Address" icon={MapPin} placeholder="Enter Your Address" formData={formData} handleInputChange={handleInputChange} />
                      <InputField name="email" label="Email" type="email" icon={FaEnvelope} placeholder="Enter Your Email" formData={formData} handleInputChange={handleInputChange} />
                      <InputField
                        name="socialLinks"
                        label="Social Links"
                        placeholder="Enter your social media links"
                        formData={formData}
                        handleInputChange={handleInputChange}
                      />

                    

                      <motion.div 
                        className="col-span-12"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <label htmlFor="images" className="text-lg font-semibold block mb-2 text-white">Images:</label>
                        <div className="relative">
                          <input
                            type="file"
                            name="images"
                            id="image-upload"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label htmlFor="image-upload" className="flex items-center justify-center w-full bg-white border border-purple-300 focus:outline-none rounded-full py-3 px-5 shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300 cursor-pointer">
                            <FaCamera className="mr-2" size={20} />
                            <span>Upload Images</span>
                          </label>
                        </div>
                        {formData.images.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      <motion.div 
                        className="col-span-12 text-center mt-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-pink-500 border border-purple-700 rounded-full py-3 px-6 md:px-8 text-lg md:text-xl font-medium text-white hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700 transition-all duration-300"
                        >
                          Submit
                        </button>
                      </motion.div>
                    </div>
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