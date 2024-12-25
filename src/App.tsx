import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCard } from './components/ServerCard';
import { AuthForm } from './components/AuthForm';
import { CategoryFilter } from './components/CategoryFilter';
import { AdminPanel } from './components/AdminPanel';
import { ThemeSelector } from './components/ThemeSelector';
import { ServerStats } from './components/ServerStats';
import { SearchBar } from './components/SearchBar';
import { useServers } from './hooks/useServers';
import { useTheme } from './lib/ThemeContext';
import { Gamepad2, Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const { 
    servers, 
    categories,
    selectedCategory,
    setSelectedCategory,
    handleVote,
    handleSearch
  } = useServers();

  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${theme.cardBg} backdrop-blur-sm`}>
              <Gamepad2 size={32} className={`text-${theme.accent}-400`} />
            </div>
            <h1 className={`text-3xl font-bold ${theme.textPrimary}`}>MC Server Status</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <Link
              to="/add-server"
              className={`flex items-center gap-2 px-4 py-2 bg-${theme.accent}-500 rounded-lg text-white hover:bg-${theme.accent}-600 transition-colors`}
            >
              <Plus size={20} />
              Add Server
            </Link>
            <AuthForm />
          </div>
        </header>

        <ServerStats />
        <SearchBar onSearch={handleSearch} />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <ServerCard
              key={server.id}
              server={server}
              onVote={handleVote}
            />
          ))}
        </div>

        <AdminPanel />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}