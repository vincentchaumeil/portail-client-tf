import React from 'react';
import AppTopbar from '@/components/layout/AppTopbar';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';

const Treatments = () => {
  return (
    <AppLayout>
      <AppTopbar title="Traitements" />
      <motion.div 
        className="flex-1 overflow-auto p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Traitements disponibles</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentOptions.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

// Treatment data
const treatmentOptions = [
  {
    id: 1,
    name: "Anodisation",
    description: "Traitement électrochimique de surface qui permet de créer une couche d'oxyde protectrice sur l'aluminium.",
    duration: "3-5 jours",
    materials: ["Aluminium", "Alliages d'aluminium"],
    icon: "⚡"
  },
  {
    id: 2,
    name: "Chromage",
    description: "Dépôt électrolytique de chrome sur une surface métallique pour améliorer sa résistance à la corrosion et à l'usure.",
    duration: "4-7 jours",
    materials: ["Acier", "Cuivre", "Laiton"],
    icon: "🔧"
  },
  {
    id: 3,
    name: "Phosphatation",
    description: "Traitement chimique qui crée une couche de phosphate sur les métaux pour améliorer l'adhérence de la peinture.",
    duration: "2-3 jours",
    materials: ["Acier", "Zinc", "Aluminium"],
    icon: "🧪"
  },
  {
    id: 4,
    name: "Nickelage",
    description: "Dépôt électrolytique de nickel pour protéger contre la corrosion et améliorer l'aspect esthétique.",
    duration: "3-6 jours",
    materials: ["Acier", "Cuivre", "Laiton", "Zinc"],
    icon: "✨"
  },
  {
    id: 5,
    name: "Zingage",
    description: "Application d'une couche de zinc pour protéger les métaux ferreux contre la corrosion.",
    duration: "2-4 jours",
    materials: ["Acier", "Fer"],
    icon: "🛡️"
  },
  {
    id: 6,
    name: "Peinture poudre",
    description: "Application électrostatique de poudre qui est ensuite cuite pour former un revêtement durable.",
    duration: "1-3 jours",
    materials: ["Acier", "Aluminium", "MDF"],
    icon: "🎨"
  }
];

// Treatment card component
const TreatmentCard = ({ treatment }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">{treatment.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800">{treatment.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">{treatment.description}</p>
        
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Durée</p>
              <p className="font-medium">{treatment.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Matériaux</p>
              <p className="font-medium">{treatment.materials.slice(0, 2).join(", ")}{treatment.materials.length > 2 ? "..." : ""}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 px-6 py-3 flex justify-between items-center">
        <span className="text-primary text-sm font-medium">Voir détails</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
};

export default Treatments;
