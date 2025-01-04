import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import { useAuthStore } from '../store/authStore';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, loading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>
      
      <AuthForm
        email={email}
        password={password}
        loading={loading}
        error={error}
        submitLabel={isLogin ? 'Sign In' : 'Sign Up'}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-sm text-blue-500 hover:text-blue-700 text-center w-full"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </button>
    </div>
  );
}