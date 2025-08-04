
import React from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
  toggleSidebar: () => void;
}

const getTitleFromPath = (path: string): string => {
  switch (path) {
    case '/dashboard':
      return 'Panel de Control';
    case '/schedule':
      return 'Cronograma de Migración';
    case '/checklist':
      return 'Checklist Técnico por Sede';
    case '/incidents':
      return 'Registro de Incidencias';
    case '/lessons':
      return 'Lecciones Aprendidas';
    default:
      return 'Dashboard';
  }
};

const Header: React.FC<HeaderProps> = ({ onLogout, toggleSidebar }) => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-corporate-blue-dark mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-corporate-blue-dark">{title}</h1>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-4">Usuario: Equipo Interno</span>
        <button
          onClick={onLogout}
          className="bg-corporate-blue-light hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Salir
        </button>
      </div>
    </header>
  );
};

export default Header;
