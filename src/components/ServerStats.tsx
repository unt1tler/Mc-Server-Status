import React from 'react';
import { useServers } from '../hooks/useServers';
import { Activity, Server, Users } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export function ServerStats() {
  const { servers } = useServers();
  const { theme } = useTheme();
  
  const totalServers = servers.length;
  const onlineServers = servers.filter(s => s.status?.online).length;
  const totalPlayers = servers.reduce((acc, s) => acc + (s.status?.players?.online || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-4 flex items-center gap-3`}>
        <Server className={`text-${theme.accent}-400`} size={24} />
        <div>
          <h3 className={`text-sm ${theme.textSecondary}`}>Total Servers</h3>
          <p className={`text-2xl font-bold ${theme.textPrimary}`}>{totalServers}</p>
        </div>
      </div>
      
      <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-4 flex items-center gap-3`}>
        <Activity className={`text-${theme.accent}-400`} size={24} />
        <div>
          <h3 className={`text-sm ${theme.textSecondary}`}>Online Servers</h3>
          <p className={`text-2xl font-bold ${theme.textPrimary}`}>{onlineServers}</p>
        </div>
      </div>
      
      <div className={`${theme.cardBg} backdrop-blur-sm rounded-lg p-4 flex items-center gap-3`}>
        <Users className={`text-${theme.accent}-400`} size={24} />
        <div>
          <h3 className={`text-sm ${theme.textSecondary}`}>Total Players</h3>
          <p className={`text-2xl font-bold ${theme.textPrimary}`}>{totalPlayers}</p>
        </div>
      </div>
    </div>
  );
}