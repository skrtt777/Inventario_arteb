// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard({ user, onLogout }) {
  const [tabelas, setTabelas] = useState([]);
  const [dados, setDados] = useState([]);
  const [tabelaSelecionada, setTabelaSelecionada] = useState('');

  useEffect(() => {
    axios.get('http://192.168.0.188/api.php')
      .then(res => setTabelas(res.data))
      .catch(err => console.error('Erro ao buscar tabelas:', err));
  }, []);

  const carregarDados = (tabela) => {
    setTabelaSelecionada(tabela);
    axios.get(`http://192.168.0.188/api.php?tabela=${tabela}`)
      .then(res => setDados(res.data))
      .catch(err => console.error('Erro ao buscar dados:', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Olá, {user.nome}!</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tabelas Disponíveis</h2>
        <ul className="space-y-1">
          {tabelas.map((tabela, i) => (
            <li
              key={i}
              onClick={() => carregarDados(tabela)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {tabela}
            </li>
          ))}
        </ul>
      </section>

      {tabelaSelecionada && (
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Dados da Tabela: <span className="text-blue-600">{tabelaSelecionada}</span>
          </h2>

          {dados.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {Object.keys(dados[0]).map((col, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dados.map((linha, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      {Object.values(linha).map((val, j) => (
                        <td
                          key={j}
                          className="px-4 py-2 text-sm text-gray-800 border-b"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Nenhum dado encontrado.</p>
          )}
        </section>
      )}
    </div>
  );
}
