import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { pingServer } from '../lib/minecraft';
import toast from 'react-hot-toast';

export function useServer(id: string) {
  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchServer();
    const interval = setInterval(fetchServer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [id]);

  async function fetchServer() {
    try {
      const { data, error } = await supabase
        .from('servers')
        .select('*, categories(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Server not found');

      // Get real-time status
      const status = await pingServer(data.address);
      setServer({ ...data, status });
    } catch (err: any) {
      setError(err);
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
      await fetchServer();
      toast.success('Vote recorded!');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return { server, loading, error, handleVote };
}