import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServer } from '../hooks/useServer';
import { ServerStatus } from '../components/ServerStatus';
import { VoteButtons } from '../components/VoteButtons';
import { ArrowLeft, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function ServerDetails() {
  const { id } = useParams();
  const { server, loading, error, handleVote } = useServer(id!);

  const copyAddress = () => {
    navigator.clipboard.writeText(server?.address || '');
    toast.success('Server address copied to clipboard!');
  };

  if (loading) {
    return <div className="text-center p-8 text-white">Loading...</div>;
  }

  if (error || !server) {
    return <div className="text-center p-8 text-red-400">Server not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft size={20} />
          Back to Servers
        </Link>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{server.name}</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyAddress}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-purple-300"
                >
                  <code>{server.address}</code>
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            <VoteButtons
              serverId={server.id}
              votesUp={server.votes_up}
              votesDown={server.votes_down}
              onVote={handleVote}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">About</h2>
              <p className="text-gray-300">{server.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Server Status</h2>
              <ServerStatus status={server.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Category</h3>
                <p className="text-white">{server.categories.name}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Version</h3>
                <p className="text-white">{server.version}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}