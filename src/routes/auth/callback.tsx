import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const type = searchParams.get('type');
    
    // Handle the auth callback
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        toast.success('You can now reset your password');
      } else if (event === 'SIGNED_IN') {
        toast.success('Email confirmed successfully!');
      }
      
      // Redirect to home page
      navigate('/');
    });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Processing...</h1>
        <p>Please wait while we verify your request.</p>
      </div>
    </div>
  );
}