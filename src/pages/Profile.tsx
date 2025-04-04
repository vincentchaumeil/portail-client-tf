import React from 'react';
import AppTopbar from '@/components/layout/AppTopbar';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';

// Update this component with your actual implementation
const Profile = () => {
  return (
    <AppLayout>
      <AppTopbar title="Profil" />
      <motion.div 
        className="flex-1 overflow-auto p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  defaultValue="Admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  defaultValue="admin@surfacetreatment.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input 
                  type="tel" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  defaultValue="+33 1 23 45 67 89"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Administrateur</option>
                  <option>Utilisateur</option>
                  <option>Technicien</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Préférences d'affichage</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taille de police</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="fontSize" className="mr-2" defaultChecked />
                    <span>Normal</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="fontSize" className="mr-2" />
                    <span>Grand</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="fontSize" className="mr-2" />
                    <span>Petit</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode d'affichage</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Vue compacte</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Afficher le logo</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                <input 
                  type="password" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                <input 
                  type="password" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                />
              </div>
              
              <div className="pt-2">
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                  Mettre à jour le mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Profile;
