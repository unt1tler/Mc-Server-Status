import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCard } from './components/ServerCard';
import { AuthForm } from './components/AuthForm';
import { CategoryFilter } from './components/CategoryFilter';
import { AdminPanel } from './components/AdminPanel';
import { useServers } from './hooks/useServers';
import { Gamepad2, Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const { 
    servers, 
    categories,
    selectedCategory,
    setSelectedCategory,
    handleVote
  } = useServers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <Gamepad2 size={32} className="text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">MC Server Status</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/add-server"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-colors"
            >
              <Plus size={20} />
              Add Server
            </Link>
            <AuthForm />
          </div>
        </header>

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