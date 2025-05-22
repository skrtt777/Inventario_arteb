import { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://192.168.0.188/login.php', {
        username: email, // Modificado para corresponder ao que o backend espera
        password: senha, // Modificado para corresponder ao que o backend espera
      });
      if (res.data.success) {
        onLogin(res.data.user);
      } else {
        setErro(res.data.message || 'Erro de autenticação');
      }
    } catch (err) {
      console.error('Erro de login:', err.response ? err.response.data : err);
      setErro(err.response?.data?.error || 'Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">🔐 Login</h2>

        {erro && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Senha</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Não tem uma conta?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={onSwitchToRegister}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}