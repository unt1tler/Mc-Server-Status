export interface ServerStatus {
  online: boolean;
  error?: string;
  players?: {
    online: number;
    max: number;
  };
  ping?: number | null;
  version?: string;
  motd?: string;
  favicon?: string | null;
  lastUpdated?: string;
}