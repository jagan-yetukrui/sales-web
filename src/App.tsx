import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CustomizerProvider } from './context/CustomizerContext';
import LandingPage from './pages/LandingPage';
import CustomizePage from './pages/CustomizePage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';

function App() {
  return (
    <CustomizerProvider>
      <Router>
        <div className="App">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </CustomizerProvider>
  );
}

export default App;
