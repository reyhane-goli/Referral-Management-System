import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReferralProvider } from '@/app/context/ReferralContext';
import Navigation from '@/app/components/Navigation';
import OverviewPage from '@/app/pages/OverviewPage';
import ReferrerPage from '@/app/pages/ReferrerPage';
import PatientPage from '@/app/pages/PatientPage';
import ReceiverPage from '@/app/pages/ReceiverPage';
import TrackingPage from '@/app/pages/TrackingPage';
import { Toaster } from '@/app/components/ui/sonner';

export default function App() {
  return (
    <ReferralProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/referrer" element={<ReferrerPage />} />
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/receiver" element={<ReceiverPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ReferralProvider>
  );
}
