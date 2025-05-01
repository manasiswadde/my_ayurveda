import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import PlantRecognition from './PlantRecognition';
import AyurvedicProfile from './components/AyurvedicProfile';
import './App.css';


// Lazy loading components for performance optimization
const HomePage = lazy(() => import('./HomePage'));
const LoginPage = lazy(() => import('./LoginPage'));
const SignupPage = lazy(() => import('./SignupPage'));
const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./ResetPasswordPage'));
const FeaturesPage = lazy(() => import('./FeaturesPage'));
const PlantInfo = lazy(() => import('./PlantInfo'));
const PlantDetails = lazy(() => import('./PlantDetails'));
const RemediesPage = lazy(() => import('./RemediesPage'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const AddUserForm = lazy(() => import('./components/AddUserForm'));
const AddPlantForm = lazy(() => import('./components/AddPlantForm'));
const EditPlantForm = lazy(() => import('./components/EditPlantForm'));


const App = () => {
  const [identifiedPlant, setIdentifiedPlant] = useState(null);

  return (
    <Router>
      <Toaster position="top-right" richColors closeButton />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/feature" element={<FeaturesPage />} />
          <Route path="/plant-info" element={<PlantInfo />} />
          <Route path="/remedies" element={<RemediesPage />} />
          <Route path="/plant/:id" element={<PlantDetails />} />
          <Route 
            path="/plant-recognition" 
            element={<PlantRecognition onPlantIdentified={setIdentifiedPlant} />} 
          />
          <Route 
            path="/ayurvedic-profile" 
            element={<AyurvedicProfile plant={identifiedPlant} />} 
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users/add" element={<AddUserForm />} />
          <Route path="/admin/plants/add" element={<AddPlantForm />} />
          <Route path="/admin/plants/edit/:id" element={<EditPlantForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
