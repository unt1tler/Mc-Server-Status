import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { pingServer } from '../lib/minecraft';
import toast from 'react-hot-toast';

export function useServers() {
  const [servers, setServers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchServers();
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  }

  async function fetchServers() {
    try {
      let query = supabase
        .from('servers')
        .select('*, categories(*)')
        .order('votes_up', { ascending: false });
      
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;

      // Get real-time status for each server
      const serversWithStatus = await Promise.all(
        data.map(async (server) => {
          const status = await pingServer(server.address);
          return { ...server, status };
        })
      );

      setServers(serversWithStatus);
    } catch (error) {
      toast.error('Failed to fetch servers');
    } finally {
      setLoading(false);
    }
  }

  async function handleVote(serverId: string, type: 'up' | 'down') {
    try {
      const { error } = await supabase.rpc('vote_server', {
        server_id: serverId,
        vote_type: type
      });

      if (error) throw error;
      
      await fetchServers();
      toast.success('Vote recorded!');
    } catch (error: any) {
      console.error('Voting error:', error);
      toast.error(error.message || 'Failed to vote');
    }
  }

  return {
    servers,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading,
    handleVote
  };
}