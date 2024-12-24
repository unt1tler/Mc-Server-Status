import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export function AddServer() {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { error } = await supabase
        .from('servers')
        .insert({
          name: formData.get('name'),
          address: formData.get('address'),
          description: formData.get('description'),
          category_id: formData.get('category'),
          version: formData.get('version'),
        });

      if (error) throw error;
      
      toast.success('Server added successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Servers
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-6">Add New Server</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Server Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                Server Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="e.g., play.example.com"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-300 mb-2">
                Minecraft Version
              </label>
              <input
                type="text"
                id="version"
                name="version"
                required
                placeholder="e.g., 1.8-1.20"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Adding Server...' : 'Add Server'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}