import type { ServerStatus } from './types';

const API_URL = 'https://api.mcsrvstat.us/3/';

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

export async function pingServer(address: string): Promise<ServerStatus> {
  try {
    // Validate server address
    if (!address || typeof address !== 'string') {
      console.warn('Invalid server address:', address);
      return { online: false, error: 'Invalid server address' };
    }

    // Clean the address
    const cleanAddress = address.trim().toLowerCase();
    
    const response = await fetchWithRetry(`${API_URL}${cleanAddress}`);
    const data = await response.json();
    
    if (!data.online) {
      return { 
        online: false,
        error: data.error || 'Server is offline'
      };
    }

    return {
      online: true,
      players: {
        online: data.players?.online ?? 0,
        max: data.players?.max ?? 0
      },
      ping: data.debug?.ping ?? null,
      version: data.version?.name_raw || data.version?.name || 'Unknown',
      motd: data.motd?.clean?.join('\n') || data.motd?.raw?.join('\n') || '',
      favicon: data.icon || null,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to ping server:', address, error);
    return { 
      online: false,
      error: 'Failed to connect to server'
    };
  }
}