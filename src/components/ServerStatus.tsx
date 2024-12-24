import React from 'react';
import { Users, Signal, Server, Info, AlertCircle } from 'lucide-react';
import type { ServerStatus } from '../lib/types';

interface ServerStatusProps {
  status: ServerStatus;
}

export function ServerStatus({ status }: ServerStatusProps) {
  if (!status.online) {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <AlertCircle size={18} />
        <span>{status.error || 'Offline'}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {status.motd && (
        <div className="flex items-start gap-2 text-gray-200 bg-black/20 p-3 rounded-lg">
          <Info size={18} className="flex-shrink-0 mt-1" />
          <p className="text-sm whitespace-pre-wrap">{status.motd}</p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 text-gray-200">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span>{status.players?.online ?? 0}/{status.players?.max ?? 0}</span>
        </div>
        {status.ping !== null && (
          <div className="flex items-center gap-2">
            <Signal size={18} />
            <span>{status.ping}ms</span>
          </div>
        )}
        {status.version && (
          <div className="flex items-center gap-2">
            <Server size={18} />
            <span>{status.version}</span>
          </div>
        )}
      </div>
    </div>
  );
}