import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VoteButtonsProps {
  serverId: string;
  votesUp: number;
  votesDown: number;
  onVote: (id: string, type: 'up' | 'down') => void;
}

export function VoteButtons({ serverId, votesUp, votesDown, onVote }: VoteButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onVote(serverId, 'up')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors text-white"
        title="Vote Up"
      >
        <ThumbsUp size={18} />
        <span>{votesUp || 0}</span>
      </button>
      <button
        onClick={() => onVote(serverId, 'down')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-white"
        title="Vote Down"
      >
        <ThumbsDown size={18} />
        <span>{votesDown || 0}</span>
      </button>
    </div>
  );
}