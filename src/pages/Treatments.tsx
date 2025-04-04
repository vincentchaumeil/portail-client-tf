
import React, { useState } from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppTopbar from '@/components/layout/AppTopbar';
import { mockTreatments, treatmentTypes } from '@/data/mockTreatments';
import { Treatment, TreatmentType } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { usePreferences } from '@/hooks/use-preferences';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Treatments = () => {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType | 'all'>('all');
  const { preferences } = usePreferences();
  
  const filteredTreatments = selectedTreatment === 'all' 
    ? mockTreatments 
    : mockTreatments.filter(t => t.name === selectedTreatment);

  const getFontSizeClass = () => {
    switch(preferences.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/70 backdrop-blur-sm overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Traitements de Surface" />
        
        <main className={`flex-1 overflow-auto p-8 ${getFontSizeClass()}`}>
          <div className="animate-fade-in mb-6">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Traitements disponibles</h1>
                <TabsList className="mb-2 sm:mb-0">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="table">Table</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTreatment === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedTreatment('all')}
                >
                  All
                </button>
                {treatmentTypes.map(type => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTreatment === type
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedTreatment(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <TabsContent value="grid" className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTreatments.map((treatment) => (
                    <TreatmentCard key={treatment.id} treatment={treatment} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="table" className="mt-2">
                <TreatmentTable treatments={filteredTreatments} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

const TreatmentCard = ({ treatment }: { treatment: Treatment }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
        <CardTitle>{treatment.name}</CardTitle>
        <CardDescription>Duration: {treatment.duration} hours</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="mb-2">{treatment.description}</p>
        <p className="font-semibold text-right mt-4">Prix: {treatment.price.toFixed(2)} €</p>
      </CardContent>
    </Card>
  );
};

const TreatmentTable = ({ treatments }: { treatments: Treatment[] }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Traitement</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Durée (heures)</TableHead>
            <TableHead className="text-right">Prix (€)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treatments.map((treatment) => (
            <TableRow key={treatment.id}>
              <TableCell className="font-medium">{treatment.name}</TableCell>
              <TableCell>{treatment.description}</TableCell>
              <TableCell>{treatment.duration}</TableCell>
              <TableCell className="text-right">{treatment.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Treatments;
