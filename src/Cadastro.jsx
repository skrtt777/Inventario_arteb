import { useState } from 'react';
import axios from 'axios';

export default function Cadastro({ onSwitchToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const res = await axios.post('http://192.168.0.188/cadastro.php', {
        nome,
        email,
        senha,
      });

      if (res.data.success) {
        setSucesso('Conta criada com sucesso! Faça login.');
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      } else {
        setErro(res.data.message);
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-yellow-400">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">📝 Cadastro</h2>

        {erro && <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">{erro}</div>}
        {sucesso && <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">{sucesso}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nome</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Senha</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Confirmar Senha</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <span
            className="text-yellow-600 cursor-pointer hover:underline"
            onClick={onSwitchToLogin}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
