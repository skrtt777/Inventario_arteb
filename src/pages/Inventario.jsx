import { useEffect, useState } from 'react';
import { getItens, addItem, updateItem, deleteItem } from '../services/api';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

export default function Inventario() {
  const [itens, setItens] = useState([]);
  const [itemEditando, setItemEditando] = useState(null);

  const carregarItens = async () => {
    const data = await getItens();
    setItens(data);
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const salvarItem = async (item) => {
    if (itemEditando) {
      await updateItem(itemEditando.id, item);
    } else {
      await addItem(item);
    }
    setItemEditando(null);
    carregarItens();
  };

  const editarItem = (item) => setItemEditando(item);
  const excluirItem = async (id) => {
    await deleteItem(id);
    carregarItens();
  };

  return (
    <div>
      <h1>Inventário</h1>
      <ItemForm onSave={salvarItem} itemToEdit={itemEditando} />
      <ItemList itens={itens} onEdit={editarItem} onDelete={excluirItem} />
    </div>
  );
}
