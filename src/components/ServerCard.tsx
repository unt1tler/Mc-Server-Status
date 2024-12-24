import React from 'react';
import { Link } from 'react-router-dom';
import { ServerStatus } from './ServerStatus';
import { VoteButtons } from './VoteButtons';
import { Tag } from './Tag';

interface ServerCardProps {
  server: {
    id: string;
    name: string;
    address: string;
    description: string;
    votes_up: number;
    votes_down: number;
    version: string;
    categories: {
      name: string;
      slug: string;
    };
    status: any;
  };
  onVote: (id: string, type: 'up' | 'down') => void;
}

export function ServerCard({ server, onVote }: ServerCardProps) {
  return (
    <Link 
      to={`/server/${server.id}`}
      className="block relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 p-6 shadow-xl border border-white/20 hover:bg-white/20 transition-all group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-30 group-hover:opacity-40 transition-opacity" />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-white">{server.name}</h3>
          {server.status?.favicon && (
            <img 
              src={server.status.favicon} 
              alt={`${server.name} favicon`} 
              className="w-8 h-8 rounded"
            />
          )}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Tag text={server.categories.name} />
          <Tag text={server.version} variant="secondary" />
        </div>
        <p className="text-gray-300 mb-4 line-clamp-2">{server.description}</p>
        
        <div className="mb-4">
          <ServerStatus status={server.status} />
        </div>

        <div onClick={(e) => e.preventDefault()}>
          <VoteButtons
            serverId={server.id}
            votesUp={server.votes_up}
            votesDown={server.votes_down}
            onVote={onVote}
          />
        </div>
      </div>
    </Link>
  );
}