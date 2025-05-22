import { useState, useEffect } from 'react';

export default function ItemForm({ onSave, itemToEdit }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (itemToEdit) setNome(itemToEdit.Nome);
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() !== '') {
      onSave({ Nome: nome });
      setNome('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do item"
      />
      <button type="submit">
        {itemToEdit ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
}
