import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Layout({ children }) {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-clay-bg flex flex-col md:flex-row relative">
      {!hideSidebar && (
        <>
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-clay-card shadow-sm z-20">
            <h1 className="text-xl font-black text-primary-600">1 Byte GK</h1>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-clay-bg rounded-xl shadow-clay-btn active:shadow-clay-btn-pressed"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          
          {/* Mobile Overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:z-auto`}>
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
      
      <div className="flex-1 flex flex-col py-6 px-4 md:py-10 md:px-8 h-screen overflow-y-auto w-full">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
