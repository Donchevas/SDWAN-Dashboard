
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple simulated login logic
    if (username && password) {
      setError('');
      onLogin();
    } else {
      setError('Por favor, ingrese usuario y contraseña.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-corporate-blue-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-corporate-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-corporate-blue-dark">
            Proyecto Migración SD-WAN
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acceso para equipo interno y stakeholders
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-corporate-blue-light focus:border-corporate-blue-light focus:z-10 sm:text-sm"
                placeholder="Usuario (ej: user)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-corporate-blue-light focus:border-corporate-blue-light focus:z-10 sm:text-sm"
                placeholder="Contraseña (ej: password)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-corporate-blue-light hover:bg-corporate-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-blue-light transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
