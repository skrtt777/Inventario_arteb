import { useState } from 'react';
import DatabaseInfo from './Databaseinfo';
import Login from './Login';
import Inventario from './pages/Inventario';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('database');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() =>
              alert('Funcionalidade de registro em desenvolvimento')
            }
          />
        );
      case 'database':
        return <DatabaseInfo />;
      case 'inventario':
        return <Inventario />;
      default:
        return <div className="text-center text-red-500 text-xl">Tela não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <nav className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">Inventário QR</span>
              <span className="bg-indigo-500 px-2 py-1 rounded text-xs">Beta</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentScreen('database')}
                className="bg-indigo-500 hover:bg-indigo-700 px-3 py-1 rounded text-sm transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentScreen('inventario')}
                className="bg-indigo-500 hover:bg-indigo-700 px-3 py-1 rounded text-sm transition"
              >
                Inventário
              </button>
              <span>Olá, {user.nome || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
              >
                Sair
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className="container mx-auto py-4">{renderScreen()}</main>
    </div>
  );
}
