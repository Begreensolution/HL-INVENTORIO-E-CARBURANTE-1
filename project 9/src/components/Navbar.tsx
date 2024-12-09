import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ambulance, ClipboardList, Package, BarChart, Menu, X, Fuel, ShoppingCart } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export default function Navbar() {
  const { role } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = role === 'driver' 
    ? [
        { to: "/checklist", icon: ClipboardList, text: "Checklist Fine Turno" },
        { to: "/fuel", icon: Fuel, text: "Rifornimenti" }
      ]
    : [
        { to: "/inventory", icon: Package, text: "Inventario" },
        { to: "/analytics", icon: BarChart, text: "Analisi" },
        { to: "/orders", icon: ShoppingCart, text: "Ordini" },
        { to: "/fuel", icon: Fuel, text: "Carburante" }
      ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
              <Ambulance className="w-6 h-6 mr-2" />
              <span className="font-semibold hidden sm:block">Gestione Ambulanze</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                <item.icon className="w-5 h-5 mr-1" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}