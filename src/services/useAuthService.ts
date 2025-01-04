import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useAuthService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    }
    
    setLoading(false);
  };

  return {
    signUp,
    loading,
    error
  };
}