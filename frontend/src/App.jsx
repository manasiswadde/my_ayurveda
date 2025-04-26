import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';


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
const PlantRecognition = lazy(() => import('./PlantRecognition'));


        
const App = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors closeButton />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/feature" element={<FeaturesPage />} />
          <Route path="/plant-info" element={<PlantInfo />} />
          <Route path="/remedies" element={<RemediesPage />} />
          <Route path="/plant/:id" element={<PlantDetails />} />
          <Route path="/plant-recognition" element={<PlantRecognition />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
