export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div style={{ border: '1px solid gray', margin: 5, padding: 10 }}>
      <strong>{item.Nome}</strong>
      <br />
      <button onClick={() => onEdit(item)}>Editar</button>
      <button onClick={() => onDelete(item.id)}>Excluir</button>
    </div>
  );
}
