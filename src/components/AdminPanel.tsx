import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { isAdmin } from '../lib/auth';
import { Trash2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminPanel() {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    checkAdmin();
    fetchServers();
  }, []);

  async function checkAdmin() {
    const adminStatus = await isAdmin();
    setIsAdminUser(adminStatus);
  }

  async function fetchServers() {
    try {
      const { data, error } = await supabase
        .from('servers')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServers(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteServer(id: string) {
    if (!window.confirm('Are you sure you want to delete this server?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('servers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Server deleted successfully');
      fetchServers();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Category</th>
                <th className="p-3">Added</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server) => (
                <tr key={server.id} className="border-t border-white/10 text-gray-200">
                  <td className="p-3">{server.name}</td>
                  <td className="p-3">{server.address}</td>
                  <td className="p-3">{server.categories?.name}</td>
                  <td className="p-3">
                    {new Date(server.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteServer(server.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Server"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}