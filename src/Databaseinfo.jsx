import { useEffect, useState } from 'react';

export default function DatabaseInfo() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://192.168.0.188/api_inventario.php';

  // Carrega as tabelas do banco ao abrir a página
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`${API_BASE_URL}/tabelas`)
      .then(async (response) => {
        const data = await response.json();
        console.log('Resposta completa:', data);
        
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        if (data.success && Array.isArray(data.data)) {
          setTables(data.data);
        } else {
          throw new Error('Formato de resposta inválido');
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar tabelas:', err);
        setError(`Erro ao carregar tabelas: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Carrega os dados da tabela selecionada
  const handleSelectTable = (tableName) => {
    setSelectedTable(tableName);
    setLoading(true);
    setError(null);
    
    // URL diferente dependendo da tabela
    const url = tableName === 'itens' 
      ? `${API_BASE_URL}/itens`
      : `${API_BASE_URL}/dados?tabela=${tableName}`;
    
    fetch(url)
      .then(async (response) => {
        const data = await response.json();
        console.log('Dados da tabela:', data);
        
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        if (data.success) {
          // Para a tabela 'itens' o formato é diferente
          if (tableName === 'itens') {
            setTableData(Array.isArray(data.data) ? data.data : []);
          } else {
            // Para outras tabelas, os dados estão em data.data.rows
            setTableData(Array.isArray(data.data.rows) ? data.data.rows : []);
          }
        } else {
          throw new Error(data.error || 'Erro desconhecido');
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar dados da tabela:', err);
        setError(`Erro ao carregar dados da tabela "${tableName}": ${err.message}`);
        setTableData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sistema de Inventário</h2>
      
      {/* Status de loading */}
      {loading && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-md">
          <p className="text-blue-700">Carregando...</p>
        </div>
      )}
      
      {/* Mensagens de erro */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Lista de Tabelas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Tabelas Disponíveis</h3>
        {tables.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {tables.map((table) => (
              <div key={table} className="flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="font-medium text-gray-700">{table}</span>
                <button
                  onClick={() => handleSelectTable(table)}
                  disabled={loading}
                  className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium transition-colors"
                >
                  Visualizar
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-500 italic">
              Nenhuma tabela encontrada. Verifique a conexão com o banco de dados.
            </p>
          )
        )}
      </div>

      {/* Dados da Tabela Selecionada */}
      {selectedTable && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Dados da tabela: <span className="text-blue-600">{selectedTable}</span>
          </h3>
          
          {tableData.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-700 text-sm">
                  Exibindo {tableData.length} registro(s) da tabela "{selectedTable}"
                </p>
              </div>
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {Object.keys(tableData[0]).map((col) => (
                      <th key={col} className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-3 text-gray-700 border-r border-gray-100 last:border-r-0">
                          <div className="max-w-xs truncate" title={String(val || '')}>
                            {val !== null && val !== undefined ? String(val) : '-'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">Nenhum dado encontrado na tabela selecionada.</p>
              </div>
            )
          )}
        </div>
      )}
      
      {/* Informações de debug */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2">Informações de Conexão:</h4>
        <p className="text-sm text-gray-600">Servidor: 192.168.0.188</p>
        <p className="text-sm text-gray-600">API Endpoint: {API_BASE_URL}</p>
        <p className="text-sm text-gray-600">Status: {error ? 'Erro' : tables.length > 0 ? 'Conectado' : 'Aguardando...'}</p>
      </div>
    </div>
  );
}