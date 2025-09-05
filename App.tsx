import React, { useState, useCallback, useEffect } from 'react';
import { View } from './types';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ReadQuestion from './components/ReadQuestion';
import Practice from './components/Practice';
import Explain from './components/Explain';
import Solve from './components/Solve';
import Settings from './components/Settings';

const AUTH_STORAGE_KEY = 'miami_study_auth';
const USER_NAME = "Lal Su";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (rememberMe: boolean) => {
    setIsAuthenticated(true);
    setCurrentView(View.HOME);
    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    }
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // No need to set view to LOGIN, it's handled by the conditional render
  }, []);

  const handleSetView = useCallback((view: View) => {
    setCurrentView(view);
    setSidebarOpen(false); // Close sidebar on navigation on mobile
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home name={USER_NAME} />;
      case View.READ:
        return <ReadQuestion />;
      case View.PRACTICE:
        return <Practice />;
      case View.EXPLAIN:
        return <Explain />;
      case View.SOLVE:
        return <Solve />;
      case View.SETTINGS:
        return <Settings />;
      default:
        return <Home name={USER_NAME} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar 
        user={USER_NAME} 
        currentView={currentView} 
        setView={handleSetView} 
        logout={handleLogout}
        isOpen={isSidebarOpen}
        setOpen={setSidebarOpen}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">Miami Smart Study</h1>
            <button onClick={() => setSidebarOpen(true)} className="text-white p-2 -m-2" aria-label="Menüyü aç">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Menüyü aç</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
        <div className="p-4 md:p-8 flex-1">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
