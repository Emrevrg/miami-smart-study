import React from 'react';
import { View } from '../types';

interface SidebarProps {
  user: string;
  currentView: View;
  setView: (view: View) => void;
  logout: () => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ReadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const PracticeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const ExplainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const SolveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


const menuItems = [
  { id: View.HOME, label: 'Ana Sayfa', icon: <HomeIcon /> },
  { id: View.READ, label: 'Soru Okutma', icon: <ReadIcon /> },
  { id: View.PRACTICE, label: 'Alıştırma Yaptırma', icon: <PracticeIcon /> },
  { id: View.EXPLAIN, label: 'Konu Anlatımı', icon: <ExplainIcon /> },
  { id: View.SOLVE, label: 'Soru Çözdürme', icon: <SolveIcon /> },
];

const bottomMenuItems = [
    { id: View.SETTINGS, label: 'API Ayarları', icon: <SettingsIcon /> },
]

const Sidebar: React.FC<SidebarProps> = ({ user, currentView, setView, logout, isOpen, setOpen }) => {

  const NavLink: React.FC<{view: View; label: string; icon: React.ReactNode}> = ({ view, label, icon }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`w-full flex items-center text-left px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-pink-500/20 text-white shadow-lg'
            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </button>
    );
  };
  
  const sidebarContent = (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
          Miami Smart Study
        </h2>
        <p className="text-slate-400 mt-1">Hoş geldin, {user}!</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map(item => <NavLink key={item.id} view={item.id} label={item.label} icon={item.icon} />)}
      </nav>
      <div className="p-4 mt-auto space-y-2">
        {bottomMenuItems.map(item => <NavLink key={item.id} view={item.id} label={item.label} icon={item.icon} />)}
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-200"
        >
          <LogoutIcon />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar (Overlay) */}
      <div 
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      ></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-800 border-r border-slate-700 flex flex-col z-40 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
