import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import RoleSwitcher from './components/RoleSwitcher';
import ChatBot from './components/ChatBot';
import InventoryManagement from './components/admin/InventoryManagement';
import InventoryAnalytics from './components/admin/InventoryAnalytics';
import OrderManagement from './components/admin/OrderManagement';
import FuelAnalytics from './components/admin/FuelAnalytics';
import FuelLog from './components/driver/FuelLog';
import RefuelingStations from './components/driver/RefuelingStations';
import { useUserStore } from './store/userStore';

function App() {
  const { role } = useUserStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Navbar />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {role === 'driver' ? (
                <>
                  <Route path="/checklist" element={<Checklist />} />
                  <Route path="/fuel" element={
                    <div className="space-y-6">
                      <FuelLog />
                      <RefuelingStations />
                    </div>
                  } />
                </>
              ) : (
                <>
                  <Route path="/inventory" element={<InventoryManagement />} />
                  <Route path="/analytics" element={<InventoryAnalytics />} />
                  <Route path="/orders" element={<OrderManagement />} />
                  <Route path="/fuel" element={<FuelAnalytics />} />
                </>
              )}
            </Routes>
          </div>
        </main>
        <RoleSwitcher />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;